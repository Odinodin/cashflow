(ns cashflow.routes.transactions
  (:require
    [cashflow.models.transactions :as trans]
    [compojure.core :refer :all]
    [ring.middleware.json :as middleware]))

(defroutes transactions-routes
           (GET "/transactions" [] {:body @trans/transactions}))
