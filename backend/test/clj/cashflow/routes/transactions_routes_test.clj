(ns cashflow.routes.transactions-routes-test
  (:require [ring.mock.request :as ring-mock]
            [midje.sweet :refer :all]
            [cashflow.test-db :as test-db]
            [cashflow.handler :as cashflow]
            [cashflow.models.transactions :as tmodel]
            [cashflow.json-util :as json-util]
            [cheshire.core :as json]
            [datomic.api :as d]
            [clj-time.core :as t]))

#_(fact "can list transactions"
      (let [db-uri "datomic:mem://cashflow-db"
            _ (test-db/create-empty-in-memory-db db-uri)
            response (->
                       {:database {:uri db-uri}
                        :transactions (atom [{:description "ape" :amount 1 :tags ["store"]}])}
                       (cashflow/test-app-handler (ring-mock/request :get "/api/transactions"))
                       json-util/json-parse-body)]

        response => (contains {:body anything :headers anything :status 200})
        (:body response) => [{:description "ape" :amount 1 :tags ["store"]}]))

(fact "can list transactions by year"
      (let [db-uri "datomic:mem://cashflow-db"
            _ (test-db/create-empty-in-memory-db db-uri)
            _ (tmodel/add-transactions
                (d/connect db-uri)
                [{:transaction/date (t/date-time 2008 05 06) :transaction/code "VARER" :transaction/description "NARVESEN" :transaction/amount -119.00M}
                 {:transaction/date (t/date-time 2008 05 06) :transaction/code "VARER" :transaction/description "NARVESEN" :transaction/amount -119.00M}
                 {:transaction/date (t/date-time 2009 05 06) :transaction/code "VARER" :transaction/description "REMA 1000" :transaction/amount -159.20M}])
            response (->
                       (cashflow/test-app-handler {:database {:uri db-uri}}
                                                  (ring-mock/request :get "/api/transactions/time/2009"))
                       json-util/json-parse-body)]

        response => (contains {:body anything :headers anything :status 200})
        (->> (:body response) (map #(dissoc % :transaction/id))) => [{:transaction/date "2009-05-06" :transaction/code "VARER" :transaction/description "REMA 1000" :transaction/amount -159.2}]))

(fact "can list transactions by month"
      (let [db-uri "datomic:mem://cashflow-db"
            response (->
                       {:database {:uri db-uri}
                        :transactions
                                  (atom [{:date (t/date-time 2012 5 10) :description "right date" :amount 100}
                                         {:date (t/date-time 2012 9 12) :description "wrong date" :amount 100}
                                         {:date (t/date-time 2013 5 11) :description "wrong date" :amount 200}])}
                       (cashflow/test-app-handler (ring-mock/request :get "/api/transactions/time/2012/5"))
                       json-util/json-parse-body)]

        response => (contains {:body anything :headers anything :status 200})
        (:body response) => [{:date "2012-05-10" :description "right date" :amount 100}]))

(fact "can get the list of years of transaction data"
      (let [db-uri "datomic:mem://cashflow-db"
            response (->
                       {:database {:uri db-uri}
                        :transactions
                                  (atom [{:date (t/date-time 2010 1 1)}
                                         {:date (t/date-time 2011 1 1)}
                                         {:date (t/date-time 2013 1 1)}])}
                       (cashflow/test-app-handler (ring-mock/request :get "/api/transactions/time/years"))
                       json-util/json-parse-body)]

        response => (contains {:body anything :headers anything :status 200})
        (:body response) => {:years [2010 2011 2013]}))


(fact "can change existing transaction category"
      (let [db-uri "datomic:mem://cashflow-db"
            response (->
                       {:database {:uri db-uri}
                        :transactions
                                  (atom [{:id 1 :date (t/date-time 2010 1 1) :category "store"}])}
                       (cashflow/test-app-handler {:request-method :post
                                                   :uri            "/api/transactions/1"
                                                   :body           (java.io.ByteArrayInputStream. (.getBytes (json/generate-string {:id 1 :category "other"})))
                                                   :content-type   "application/json"})
                       json-util/json-parse-body)]

        response => (contains {:body anything :headers anything :status 200})
        (:body response) => {:id 1 :date "2010-01-01" :category "other"}))

(fact "can list sum of transactions by category per month"
      (let [db-uri "datomic:mem://cashflow-db"
            response (->
                       {:database {:uri db-uri}
                        :transactions
                                  (atom [{:id 1 :date (t/date-time 2010 1 1) :category "store" :amount 1}
                                         {:id 2 :date (t/date-time 2012 5 1) :category "coffee" :amount 2}
                                         {:id 2 :date (t/date-time 2012 5 1) :category "store" :amount 2}
                                         {:id 3 :date (t/date-time 2012 5 2) :category "store" :amount 3}])}
                       (cashflow/test-app-handler (ring-mock/request :get "/api/transactions/sum/2012/5"))
                       json-util/json-parse-body)]

        response => (contains {:body anything :headers anything :status 200})
        (:body response) => [{:category "coffee" :sum 2}
                             {:category "store" :sum 5}]))

(fact "can list sum of transactions by category per year"
      (let [db-uri "datomic:mem://cashflow-db"
            response (->
                       {:database {:uri db-uri}
                        :transactions
                                  (atom [{:id 1 :date (t/date-time 2010 1 1) :category "store" :amount 1}
                                         {:id 2 :date (t/date-time 2012 5 1) :category "coffee" :amount 2}
                                         {:id 2 :date (t/date-time 2012 5 1) :category "store" :amount 2}
                                         {:id 3 :date (t/date-time 2012 5 2) :category "store" :amount 3}])}
                       (cashflow/test-app-handler (ring-mock/request :get "/api/transactions/sum/2012"))
                       json-util/json-parse-body)]

        response => (contains {:body anything :headers anything :status 200})
        (:body response) => [{:category "coffee" :sum 2}
                             {:category "store" :sum 5}]))

(fact "can get net-income"
      (let [db-uri "datomic:mem://cashflow-db"
            response (->
                       {:database {:uri db-uri}
                        :transactions
                                  (atom [{:id 1 :date (t/date-time 2010 1 1) :category "store" :amount -1}
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