(ns cashflow.routes.transactions-routes-test
  (:require [ring.mock.request :as ring-mock]
            [midje.sweet :refer :all]
            [cashflow.handler :as cashflow]
            [cashflow.json-util :as json-util]
            [cheshire.core :as json]
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
                       (cashflow/test-app-handler (ring-mock/request :get "/api/transactions/time/2013"))
                       json-util/json-parse-body)]

        response => (contains {:body anything :headers anything :status 200})
        (:body response) => [{:date "2013-05-11" :description "right date" :amount 200}]))

(fact "can filter transactions by month"
      (let [response (->
                       {:transactions
                         (atom [{:date (t/date-time 2012 5 10) :description "right date" :amount 100}
                                {:date (t/date-time 2012 9 12) :description "wrong date" :amount 100}
                                {:date (t/date-time 2013 5 11) :description "wrong date" :amount 200}])}
                       (cashflow/test-app-handler (ring-mock/request :get "/api/transactions/time/2012/5"))
                       json-util/json-parse-body)]

        response => (contains {:body anything :headers anything :status 200})
        (:body response) => [{:date "2012-05-10" :description "right date" :amount 100}]))

(fact "can get the list of years of transaction data"
      (let [response (->
                       {:transactions
                         (atom [{:date (t/date-time 2010 1 1)}
                                {:date (t/date-time 2011 1 1)}
                                {:date (t/date-time 2013 1 1)}])}
                       (cashflow/test-app-handler (ring-mock/request :get "/api/transactions/time/years"))
                       json-util/json-parse-body)]

        response => (contains {:body anything :headers anything :status 200})
        (:body response) => {:years [2010 2011 2013]}))


(fact "can change existing transaction category"
      (let [response (->
                       {:transactions
                         (atom [{:id 1 :date (t/date-time 2010 1 1) :category "store"}])}
                       (cashflow/test-app-handler {:request-method :post
                                                   :uri            "/api/transactions/1"
                                                   :body           (java.io.ByteArrayInputStream. (.getBytes (json/generate-string {:id 1 :category "other"})))
                                                   :content-type   "application/json"})
                       json-util/json-parse-body)]

        response => (contains {:body anything :headers anything :status 200})
        (:body response) => {:id 1 :date "2010-01-01" :category "other"}))

(fact "can list sum of transactions by category per month"
      (let [response (->
                       {:transactions
                         (atom [ {:id 1 :date (t/date-time 2010 1 1) :category "store" :amount 1}
                                 {:id 2 :date (t/date-time 2012 5 1) :category "coffee" :amount 2}
                                 {:id 2 :date (t/date-time 2012 5 1) :category "store" :amount 2}
                                 {:id 3 :date (t/date-time 2012 5 2) :category "store" :amount 3}])}
                       (cashflow/test-app-handler (ring-mock/request :get "/api/transactions/sum/2012/5"))
                       json-util/json-parse-body)]

        response => (contains {:body anything :headers anything :status 200})
        (:body response) => [{:category "coffee" :sum 2}
                             {:category "store" :sum 5}]))

(fact "can list sum of transactions by category per year"
      (let [response (->
                       {:transactions
                         (atom [ {:id 1 :date (t/date-time 2010 1 1) :category "store" :amount 1}
                                 {:id 2 :date (t/date-time 2012 5 1) :category "coffee" :amount 2}
                                 {:id 2 :date (t/date-time 2012 5 1) :category "store" :amount 2}
                                 {:id 3 :date (t/date-time 2012 5 2) :category "store" :amount 3}])}
                       (cashflow/test-app-handler (ring-mock/request :get "/api/transactions/sum/2012"))
                       json-util/json-parse-body)]

        response => (contains {:body anything :headers anything :status 200})
        (:body response) => [{:category "coffee" :sum 2}
                             {:category "store" :sum 5}]))

(fact "can get net-income"
      (let [response (->
                       {:transactions
                         (atom [ {:id 1 :date (t/date-time 2010 1 1) :category "store" :amount -1}
                                 {:id 1 :date (t/date-time 2010 1 2) :category "store" :amount 1}
                                 {:id 2 :date (t/date-time 2011 5 1) :category "coffee" :amount -2}
                                 {:id 2 :date (t/date-time 2012 5 1) :category "store" :amount 2}
                                 {:id 3 :date (t/date-time 2012 5 2) :category "store" :amount 3}])}
                       (cashflow/test-app-handler (ring-mock/request :get "/api/transactions/net-income"))
                       json-util/json-parse-body)]

        response => (contains {:body anything :headers anything :status 200})
        (:body response) => [{:time "2010-1" :income 1 :expense -1}
                             {:time "2011-5" :income 0 :expense -2}
                             {:time "2012-5" :income 5 :expense 0}]))