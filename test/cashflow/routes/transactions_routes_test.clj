(ns cashflow.routes.transactions-routes-test
  (:require [ring.mock.request :as ring-mock]

            [midje.sweet :refer :all]
            cheshire.core
            [cashflow.handler :as cashflow]
            [cashflow.models.transactions :as trans]))

(defn- json-parse-body
  "JSON-parses body into a Clojure datastructure"
  [response]
  (assoc response :body (cheshire.core/parse-string (:body response) true)))

(fact "can list transactions"
      (reset! trans/transactions [{:description "ape" :amount 1 :tags ["store"]}])
      (let [response (->
                       (cashflow/app
                         (ring-mock/request :get "/transactions"))
                       json-parse-body)]

        response => (contains {:body anything :headers anything :status 200})
        (:body response) => [{:description "ape" :amount 1 :tags ["store"]}]))




