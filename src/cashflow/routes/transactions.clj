(ns cashflow.routes.transactions
  (:require
    [cashflow.models.transactions :as trans]
    [compojure.core :refer :all]
    [ring.middleware.json :as middleware]))

(defroutes transactions-routes
           (GET "/transactions" [start-date end-date]
                (cond (and start-date end-date)
                      {:body (trans/transactions-in start-date end-date)}
                      start-date
                      {:body (trans/transactions-at start-date)}
                      :else
                      {:body @trans/transactions})))
