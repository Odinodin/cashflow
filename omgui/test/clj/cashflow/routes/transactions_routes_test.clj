(ns cashflow.routes.transactions-routes-test
  (:require [ring.mock.request :as ring-mock]
            [midje.sweet :refer :all]
            [cashflow.handler :as cashflow]
            [cashflow.models.transactions :as trans]
            [cashflow.json-util :as json-util]))

(fact "can list transactions"
      (reset! trans/transactions [{:description "ape" :amount 1 :tags ["store"]}])
      (let [response (->
                       (cashflow/app
                         (ring-mock/request :get "/api/transactions"))
                       json-util/json-parse-body)]

        response => (contains {:body anything :headers anything :status 200})
        (:body response) => [{:description "ape" :amount 1 :tags ["store"]}]))