(ns cashflow.models.transactions-test
  (:require [cashflow.models.transactions :refer :all]
            [cashflow.test-db :as test-db]
            [midje.sweet :refer :all]
            [clj-time.core :as t]
            [clj-time.coerce :as tc]
            [datomic.api :as d]
            [cashflow.models.transactions :as trans]))

(def db-uri "datomic:mem://cashflow-db")

(def test-file (.getFile (clojure.java.io/resource "test-transactions.csv")))

(fact "Can parse file"
      (count (parse-file (.getFile (clojure.java.io/resource "test-transactions.csv")))) => 62)

(fact "Can transform parsed file to list of transaction maps"
      (let [parsed-file (parse-file test-file)
            model (lines->transactions parsed-file)]
        (count model) => 62))

(fact "Can transform lines to model"
      (lines->transactions
        [["06.05.2009" "06.05.2009" "VARER" "NARVESEN" "-119,00" "17017470066"]
         ["06.05.2009" "06.05.2009" "VARER" "REMA 1000" "-159,20" "17017532866"]])
      => [{:transaction/date (t/date-time 2009 05 06) :transaction/code "VARER" :transaction/description "NARVESEN" :transaction/amount -119.00M}
          {:transaction/date (t/date-time 2009 05 06) :transaction/code "VARER" :transaction/description "REMA 1000" :transaction/amount -159.20M}])

(fact "Can add transactions in file"
      (test-db/create-empty-in-memory-db db-uri)
      (add-transactions-in-file! (d/connect db-uri) test-file)
      (count (trans/d-all-transactions (d/db (d/connect db-uri)))) => 56)

(fact "Internal transfers are filtered out when adding transactions"
      (to-transactions [["06.05.2009" "06.05.2009" "VARER" "NARVESEN" "-119,00" "17017470066"]
                                 ["06.05.2009" "06.05.2009" "OVFNETTB" "Internal transfer, filter me" "-159,20" "17017532866"]
                                 ["06.05.2009" "06.05.2009" "VARER" "REMA 1000" "-159,20" "17017532866"]
                                 ["06.05.2009" "06.05.2009" "MOB.B.OVF" "Internal transfer, filter me" "-159,20" "17017532866"]])
      => [{:transaction/date (t/date-time 2009 05 06) :transaction/code "VARER" :transaction/description "NARVESEN" :transaction/amount -119.00M}
          {:transaction/date (t/date-time 2009 05 06) :transaction/code "VARER" :transaction/description "REMA 1000" :transaction/amount -159.20M}])

(fact "Can sum transactions"
      (sum-transactions []) => 0
      (sum-transactions [{:transaction/amount 10} {:transaction/amount 20} {:transaction/amount 30}]) => 60)

(fact "Can sum transactions for each category"
      (sum-transactions-pr-category []) => []

      (sum-transactions-pr-category
        [{:transaction/category "a" :transaction/amount 1}
         {:transaction/category "a" :transaction/amount 2}
         {:transaction/category "b" :transaction/amount 3}
         {:transaction/category "b" :transaction/amount 3}
         {:transaction/category "c" :transaction/amount 4}])

      => [{:category "a" :sum 3}
          {:category "b" :sum 6}
          {:category "c" :sum 4}])

(fact "Can sum transactions for each category without transactions"
      (sum-transactions-pr-category []) => [])

(fact "Can calculate income and expenses by month for a list of transactions"
      (net-income-by-month []) => []

      (net-income-by-month
        [{:transaction/date (t/date-time 2014 5 1) :transaction/amount 1}
         {:transaction/date (t/date-time 2014 5 2) :transaction/amount 2}
         {:transaction/date (t/date-time 2014 5 2) :transaction/amount -10}
         {:transaction/date (t/date-time 2014 5 3) :transaction/amount -20}
         {:transaction/date (t/date-time 2013 6 1) :transaction/amount 1}
         {:transaction/date (t/date-time 2013 6 2) :transaction/amount 1}
         {:transaction/date (t/date-time 2013 6 3) :transaction/amount -4}])

      =>
      [{:time "2013-6" :income 2 :expense -4}
       {:time "2014-5" :income 3 :expense -30}])

(fact "Can add transaction to database"
      (test-db/create-empty-in-memory-db db-uri)
      (->
        (add-transactions (d/connect db-uri)
                          [{:transaction/date (t/date-time 2009 05 06) :transaction/code "VARER" :transaction/description "NARVESEN" :transaction/amount -119.00M}
                           {:transaction/date (t/date-time 2009 05 06) :transaction/code "VARER" :transaction/description "REMA 1000" :transaction/amount -159.20M}])
        :tempids
        vals
        count)
      => 2)

(fact "Can find transaction by id in database"
      (test-db/create-empty-in-memory-db db-uri)
      (let [new-trans-datom (add-transactions (d/connect db-uri)
                                              [{:transaction/date        (t/date-time 2009 05 06)
                                                :transaction/code        "VARER"
                                                :transaction/description "NARVESEN"
                                                :transaction/amount      -119.00M}])
            transaction (test-db/datom->entity new-trans-datom)
            transaction-id (:transaction/id transaction)]

        (d-find-transaction-by-id (d/db (d/connect db-uri)) transaction-id)

        => {:transaction/id          transaction-id
            :transaction/date        (t/date-time 2009 05 06)
            :transaction/code        "VARER"
            :transaction/description "NARVESEN"
            :transaction/amount      -119.00M}))

(fact "Can find transactions by year"
      (test-db/create-empty-in-memory-db db-uri)
      (add-transactions (d/connect db-uri)
                        [{:transaction/date        (t/date-time 2009 05 06)
                          :transaction/code        "VARER"
                          :transaction/description "NARVESEN"
                          :transaction/amount      -119.00M}
                         {:transaction/date        (t/date-time 2009 05 06)
                          :transaction/code        "VARER"
                          :transaction/description "REMA 1000"
                          :transaction/amount      -159.20M}])
      (->>
        (dfind-transactions-by-year (d/connect db-uri) 2009)
        (map #(dissoc % :transaction/id)))
      =>
      [{:transaction/date        (t/date-time 2009 05 06)
        :transaction/code        "VARER"
        :transaction/description "NARVESEN"
        :transaction/amount      -119.00M}
       {:transaction/date        (t/date-time 2009 05 06)
        :transaction/code        "VARER"
        :transaction/description "REMA 1000" :transaction/amount -159.20M}])

(fact "Can find transactions by month"
      (test-db/create-empty-in-memory-db db-uri)
      (add-transactions (d/connect db-uri)
                        [{:transaction/date (t/date-time 2009 05 06) :transaction/code "VARER" :transaction/description "NARVESEN" :transaction/amount -119.00M}
                         {:transaction/date (t/date-time 2009 06 06) :transaction/code "VARER" :transaction/description "REMA 1000" :transaction/amount -159.20M}])
      (->>
        (dfind-transactions-by-month (d/connect db-uri) 2009 6)
        (map #(dissoc % :transaction/id)))
      =>
      [{:transaction/date (t/date-time 2009 06 06) :transaction/code "VARER" :transaction/description "REMA 1000" :transaction/amount -159.20M}])

(fact "Can find the list of unique years of transactions"
      (test-db/create-empty-in-memory-db db-uri)
      (add-transactions (d/connect db-uri)
                        [{:transaction/date (t/date-time 2008 05 06) :transaction/code "VARER" :transaction/description "NARVESEN" :transaction/amount -119.00M}
                         {:transaction/date (t/date-time 2008 05 06) :transaction/code "VARER" :transaction/description "NARVESEN" :transaction/amount -119.00M}
                         {:transaction/date (t/date-time 2009 05 06) :transaction/code "VARER" :transaction/description "REMA 1000" :transaction/amount -159.20M}])
      (dfind-unique-years-in-transactions (d/db (d/connect db-uri)))
      =>
      [2008 2009])