(ns cashflow.routes.transactions
  (:require
    [cashflow.models.transactions :as trans]
    ;; TODO move datomic down a level, does not belong here
    [datomic.api :as d]
    [compojure.core :refer :all]))


(defn- format-date [transaction-list]
  (map #(assoc % :transaction/date (-> (:transaction/date %) (format))) transaction-list))

(defn- transactions-in-month [db-uri year month]
  {:body (trans/dfind-transactions-by-month
           (d/connect db-uri)
           (. Integer parseInt year)
           (. Integer parseInt month))})

(defn- transasctions-by-year [db-uri year]
  {:body (trans/dfind-transactions-by-year
           (d/connect db-uri)
           (. Integer parseInt year))})

(defn- net-income-by-month [db-uri]
  (let [all-transactions (trans/d-all-transactions (d/db (d/connect db-uri)))
        income-by-month (trans/net-income-by-month all-transactions)]
    {:body income-by-month}))

(defroutes transactions-routes
           #_(GET "/transactions" [start-date end-date :as {{:keys [transactions]} :system}]
                (cond (and start-date end-date)
                      {:body (trans/transactions-in @transactions start-date end-date)}
                      start-date
                      {:body (trans/transactions-at @transactions start-date)}
                      :else
                      {:body @transactions}))

           (GET "/transactions/time/years" {{{:keys [uri]} :database} :system}
                {:body {:years (trans/dfind-unique-years-in-transactions
                                 (d/db (d/connect uri)))}})

           (GET "/transactions/time/:year" [year :as {{{:keys [uri]} :database} :system}]
                (transasctions-by-year uri year))

           (GET "/transactions/time/:year/:month" [year month :as {{{:keys [uri]} :database} :system}]
                (transactions-in-month uri year month))

           (GET "/transactions/sum/:year/:month" [year month :as {{:keys [transactions categories]} :system}]
                (let [trans-in-month (trans/transactions-in-month
                                       @transactions
                                       (. Integer parseInt year)
                                       (. Integer parseInt month))]
                  {:body (trans/sum-transactions-pr-category trans-in-month)}))

           (GET "/transactions/sum/:year" [year :as {{:keys [transactions categories]} :system}]
                (let [trans-in-year (trans/transactions-in-year
                                       @transactions
                                       (. Integer parseInt year))]
                  {:body (trans/sum-transactions-pr-category trans-in-year)}))

           (GET "/transactions/net-income"  {{{:keys [uri]} :database} :system}
                (net-income-by-month uri))

           (POST ["/transactions/:id", :id #"[0-9]+"] [id :as {{:keys [transactions]} :system body-params :body-params}]
                 (let [updated-transactions (trans/change-transaction transactions body-params)]
                   {:body (trans/find-transaction updated-transactions (. Integer parseInt id))})))
