(ns cashflow.routes.transactions
  (:require
    [cashflow.models.transactions :as trans]
    [compojure.core :refer :all]))

(defroutes transactions-routes
           (GET "/transactions" [start-date end-date :as {{:keys [transactions]} :mutants}]
                (cond (and start-date end-date)
                      {:body (trans/transactions-in @transactions start-date end-date)}
                      start-date
                      {:body (trans/transactions-at @transactions start-date)}
                      :else
                      {:body @transactions}))

           (GET "/transactions/:year" [year :as {{:keys [transactions]} :mutants}]
                {:body (trans/transactions-in-year @transactions (. Integer parseInt year))})

           (GET "/transactions/:year/:month" [year month :as {{:keys [transactions]} :mutants}]
                {:body (trans/transactions-in-month
                         @transactions
                         (. Integer parseInt year)
                         (. Integer parseInt month))}))
