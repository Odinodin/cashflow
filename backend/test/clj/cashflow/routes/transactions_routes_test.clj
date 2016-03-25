(ns cashflow.routes.transactions-routes-test
  (:require [ring.mock.request :as ring-mock]
            [midje.sweet :refer :all]
            [cashflow.test-db :as test-db]
            [cashflow.handler :as cashflow]
            [cashflow.models.db :as cdb]
            [mount.core :as mount]
            [cashflow.models.transactions :as tmodel]
            [cashflow.json-util :as json-util]
            [cheshire.core :as json]
            [clj-time.core :as t]))

(background (before :facts (do
                             (test-db/create-empty-in-memory-db)
                             (mount/start-with-states {#'cdb/db-conn #'test-db/test-db})))
            (after :facts mount/stop))

(defn- filter-ids [transaction-list]
  (->> transaction-list (map #(dissoc % :id))))

(fact "can list transactions by year"
      (tmodel/add-transactions
        [{:transaction/date (t/date-time 2008 05 06) :transaction/code "VARER" :transaction/description "NARVESEN" :transaction/amount -119.00M}
         {:transaction/date (t/date-time 2008 05 06) :transaction/code "VARER" :transaction/description "NARVESEN" :transaction/amount -119.00M}
         {:transaction/date (t/date-time 2009 05 06) :transaction/code "VARER" :transaction/description "REMA 1000" :transaction/amount -159.20M}])
      (let [response (->
                       (cashflow/test-app-handler (ring-mock/request :get "/api/transactions/time/2009"))
                       json-util/json-parse-body)]

        response => (contains {:body anything :headers anything :status 200})
        (-> response :body filter-ids) => [{:date "2009-05-06" :code "VARER" :description "REMA 1000" :amount -159.2}]))

(fact "can list transactions by month"
      (tmodel/add-transactions
        [{:transaction/date (t/date-time 2012 5 10) :transaction/description "right date" :transaction/amount 100M}
         {:transaction/date (t/date-time 2012 9 12) :transaction/description "wrong date" :transaction/amount 100M}
         {:transaction/date (t/date-time 2013 5 11) :transaction/description "wrong date" :transaction/amount 200M}])

      (let [response (->
                       (cashflow/test-app-handler (ring-mock/request :get "/api/transactions/time/2012/5"))
                       json-util/json-parse-body)]

        response => (contains {:body anything :headers anything :status 200})
        (-> response :body filter-ids) => [{:date "2012-05-10" :description "right date" :amount 100}]))

(fact "can get the list of years of transaction data"
      (tmodel/add-transactions
        [{:transaction/date (t/date-time 2010 1 1) :transaction/description "right date" :transaction/amount 100M}
         {:transaction/date (t/date-time 2011 1 1) :transaction/description "wrong date" :transaction/amount 100M}
         {:transaction/date (t/date-time 2013 1 1) :transaction/description "wrong date" :transaction/amount 200M}])

      (let [response (->
                       (cashflow/test-app-handler (ring-mock/request :get "/api/transactions/time/years"))
                       json-util/json-parse-body)]

        response => (contains {:body anything :headers anything :status 200})
        (->> response :body :years) => [2010 2011 2013]))

(fact "can change existing transaction category"
      (let [new-trans (tmodel/add-transactions
                        [{:transaction/date (t/date-time 2010 1 1) :transaction/category "store"}])
            trans-id (-> new-trans test-db/datom->entity :transaction/id)
            response (->
                       (cashflow/test-app-handler {:request-method :post
                                                   :uri            (str "/api/transactions/" trans-id)
                                                   :body           (java.io.ByteArrayInputStream. (.getBytes (json/generate-string {:transaction/id trans-id :transaction/category "other"})))
                                                   :content-type   "application/json"})
                       json-util/json-parse-body)]

        response => (contains {:body anything :headers anything :status 200})
        (:body response) => {:id trans-id :date "2010-01-01" :category "other"}))

(fact "can list sum of transactions by category per month"
      (tmodel/add-transactions
        [{:transaction/date (t/date-time 2010 1 1) :transaction/category "store" :transaction/amount 1M}
         {:transaction/date (t/date-time 2012 5 1) :transaction/category "coffee" :transaction/amount 2M}
         {:transaction/date (t/date-time 2012 5 1) :transaction/category "store" :transaction/amount 2M}
         {:transaction/date (t/date-time 2012 5 2) :transaction/category "store" :transaction/amount 3M}])

      (let [response (->
                       (cashflow/test-app-handler (ring-mock/request :get "/api/transactions/sum/2012/5"))
                       json-util/json-parse-body)]

        response => (contains {:body anything :headers anything :status 200})
        (->> response :body (into #{})) => #{{:category "coffee" :sum 2}
                                             {:category "store" :sum 5}}))

(fact "can list sum of transactions by category per month in a year"
      (tmodel/add-transactions
        [{:transaction/date (t/date-time 2010 1 1) :transaction/category "store" :transaction/amount 1M}
         {:transaction/date (t/date-time 2012 5 1) :transaction/category "coffee" :transaction/amount 2M}
         {:transaction/date (t/date-time 2012 5 1) :transaction/category "store" :transaction/amount 2M}
         {:transaction/date (t/date-time 2012 5 2) :transaction/category "store" :transaction/amount 3M}])

      (let [response (->
                       (cashflow/test-app-handler (ring-mock/request :get "/api/transactions/sum-by-category/2012"))
                       json-util/json-parse-body)]

        response => (contains {:body anything :headers anything :status 200})
        (->> response :body :sum-by-category count ) => 12
        (->> response :body :sum-by-category (filter #(= (:month %) 5)) first :categories) => [{:category "coffee" :sum 2} {:category "store" :sum 5
                                                                                                                           }]))

(fact "can list sum of transactions by category per year"
      (tmodel/add-transactions
        [{:transaction/date (t/date-time 2010 1 1) :transaction/category "store" :transaction/amount 1M}
         {:transaction/date (t/date-time 2012 5 1) :transaction/category "coffee" :transaction/amount 2M}
         {:transaction/date (t/date-time 2012 5 1) :transaction/category "store" :transaction/amount 2M}
         {:transaction/date (t/date-time 2012 5 2) :transaction/category "store" :transaction/amount 3M}])

      (let [response (->
                       (cashflow/test-app-handler (ring-mock/request :get "/api/transactions/sum/2012"))
                       json-util/json-parse-body)]

        response => (contains {:body anything :headers anything :status 200})
        (->> response :body (into #{})) => #{{:category "coffee" :sum 2}
                                             {:category "store" :sum 5}}))

(fact "can get net-income"
      (tmodel/add-transactions
        [{:transaction/date (t/date-time 2010 1 1) :transaction/amount -1M}
         {:transaction/date (t/date-time 2010 1 2) :transaction/amount 1M}
         {:transaction/date (t/date-time 2011 5 1) :transaction/amount -2M}
         {:transaction/date (t/date-time 2012 5 1) :transaction/amount 2M}
         {:transaction/date (t/date-time 2012 5 2) :transaction/amount 3M}])

      (let [response (->
                       (cashflow/test-app-handler (ring-mock/request :get "/api/transactions/net-income"))
                       json-util/json-parse-body)]

        response => (contains {:body anything :headers anything :status 200})

        (:body response) => [{:time "2010-1" :income 1 :expense -1}
                             {:time "2011-5" :income 0 :expense -2}
                             {:time "2012-5" :income 5 :expense 0}]))