(ns cashflow.routes.transactions
  (:require
    [cashflow.models.transactions :as trans]
    [compojure.core :refer :all]))


(defroutes transactions-routes
           (GET "/transactions" [] {:body @trans/transactions}))
