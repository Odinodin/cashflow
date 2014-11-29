(ns cashflow.routes.transactions
  (:require
    [cashflow.models.transactions :as trans]
    [datomic.api :as d]
    [compojure.core :refer :all]))


(defn- format-date [transaction-list]
  (map #(assoc % :transaction/date (-> (:transaction/date %) (format))) transaction-list))

(defn- transasctions-by-year [db-uri year]
  {:body (trans/dfind-transactions-by-year
           (d/connect db-uri)
           (. Integer parseInt year))})

(defroutes transactions-routes
           #_(GET "/transactions" [start-date end-date :as {{:keys [transactions]} :system}]
                (cond (and start-date end-date)
                      {:body (trans/transactions-in @transactions start-date end-date)}
                      start-date
                      {:body (trans/transactions-at @transactions start-date)}
                      :else
                      {:body @transactions}))

           (GET "/transactions/time/years" {{:keys [transactions]} :system}
                {:body {:years (trans/unique-years
                                 @transactions)}})

           (GET "/transactions/time/:year" [year :as {{{:keys [uri]} :database} :system}]
                (transasctions-by-year uri year))

           (GET "/transactions/time/:year/:month" [year month :as {{:keys [transactions]} :system}]
                {:body (trans/transactions-in-month
                         @transactions
                         (. Integer parseInt year)
                         (. Integer parseInt month))})

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

           (GET "/transactions/net-income"  {{:keys [transactions]} :system}
                {:body (trans/net-income-by-month @transactions)})

           (POST ["/transactions/:id", :id #"[0-9]+"] [id :as {{:keys [transactions]} :system body-params :body-params}]
                 (let [updated-transactions (trans/change-transaction transactions body-params)]
                   {:body (trans/find-transaction updated-transactions (. Integer parseInt id))})))
