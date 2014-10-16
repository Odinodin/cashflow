(ns cashflow.routes.transactions-routes-test
  (:require [ring.mock.request :as ring-mock]
            [midje.sweet :refer :all]
            [cashflow.handler :as cashflow]
            [cashflow.json-util :as json-util]
            [clj-time.core :as t]))

(fact "can list transactions"
      (let [response (->
                       {:transactions (atom [{:description "ape" :amount 1 :tags ["store"]}])}
                       (cashflow/test-app-handler (ring-mock/request :get "/api/transactions"))
                       json-util/json-parse-body)]

        response => (contains {:body anything :headers anything :status 200})
        (:body response) => [{:description "ape" :amount 1 :tags ["store"]}]))


(fact "can filter transactions by year"
      (let [response (->
                       {:transactions
                         (atom [{:date (t/date-time 2012 5 10) :description "wrong date" :amount 100}
                                 {:date (t/date-time 2012 9 12) :description "wrong date" :amount 100}
                                 {:date (t/date-time 2013 5 11) :description "right date" :amount 200}])}
                       (cashflow/test-app-handler (ring-mock/request :get "/api/transactions/2013"))
                       json-util/json-parse-body)]

        response => (contains {:body anything :headers anything :status 200})
        (:body response) => [{:date "2013-05-11" :description "right date" :amount 200}]))

(fact "can filter transactions by month"
      (let [response (->
                       {:transactions
                         (atom [{:date (t/date-time 2012 5 10) :description "right date" :amount 100}
                                {:date (t/date-time 2012 9 12) :description "wrong date" :amount 100}
                                {:date (t/date-time 2013 5 11) :description "wrong date" :amount 200}])}
                       (cashflow/test-app-handler (ring-mock/request :get "/api/transactions/2012/5"))
                       json-util/json-parse-body)]

        response => (contains {:body anything :headers anything :status 200})
        (:body response) => [{:date "2012-05-10" :description "right date" :amount 100}]))

(fact "can get the list of years of transaction data"
      (let [response (->
                       {:transactions
                         (atom [{:date (t/date-time 2010 1 1)}
                                {:date (t/date-time 2011 1 1)}
                                {:date (t/date-time 2013 1 1)}])}
                       (cashflow/test-app-handler (ring-mock/request :get "/api/transactions/years"))
                       json-util/json-parse-body)]

        response => (contains {:body anything :headers anything :status 200})
        (:body response) => {:years [2010 2011 2013]}))