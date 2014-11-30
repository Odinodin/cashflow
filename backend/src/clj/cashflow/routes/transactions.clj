(ns cashflow.routes.transactions
  (:require
    [cashflow.models.transactions :as trans]
    ;; TODO move datomic down a level, does not belong here
    [datomic.api :as d]
    [compojure.core :refer :all]))


(defn- format-date [transaction-list]
  (map #(assoc % :transaction/date (-> (:transaction/date %) (format))) transaction-list))

(defn- transactions-in-month [db-uri year month]
  (trans/dfind-transactions-by-month
    (d/connect db-uri)
    (. Integer parseInt year)
    (. Integer parseInt month)))

(defn- transactions-by-year [db-uri year]
  (trans/dfind-transactions-by-year
    (d/connect db-uri)
    (. Integer parseInt year)))

(defn- net-income-by-month [db-uri]
  (let [all-transactions (trans/d-all-transactions (d/db (d/connect db-uri)))
        income-by-month (trans/net-income-by-month all-transactions)]
    income-by-month))

(defroutes transactions-routes
           (GET "/transactions/time/years" {{{:keys [uri]} :database} :system}
                {:body {:years (trans/dfind-unique-years-in-transactions
                                 (d/db (d/connect uri)))}})

           (GET "/transactions/time/:year" [year :as {{{:keys [uri]} :database} :system}]
                {:body (transactions-by-year uri year)})

           (GET "/transactions/time/:year/:month" [year month :as {{{:keys [uri]} :database} :system}]
                {:body (transactions-in-month uri year month)})

           (GET "/transactions/sum/:year/:month" [year month :as {{{:keys [uri]} :database} :system}]
                (let [trans-in-month (transactions-in-month uri year month)]
                  {:body (trans/sum-transactions-pr-category trans-in-month)}))

           (GET "/transactions/sum/:year" [year :as {{{:keys [uri]} :database} :system}]
                (let [trans-in-year (transactions-by-year uri year)]
                  {:body (trans/sum-transactions-pr-category trans-in-year)}))

           (GET "/transactions/net-income" {{{:keys [uri]} :database} :system}
                {:body (net-income-by-month uri)})

           (POST ["/transactions/:id"] [id :as {{{:keys [uri]} :database} :system
                                                body-params               :body-params}]
                 (trans/update-transaction (d/connect uri) body-params)
                 {:body (trans/d-find-transaction-by-id (d/db (d/connect uri)) id)}))
