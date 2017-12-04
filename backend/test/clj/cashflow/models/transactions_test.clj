(ns cashflow.models.transactions-test
  (:require [cashflow.models.transactions :refer :all]
            [cashflow.test-db :as test-db]
            [clojure.test :refer [deftest is testing use-fixtures]]
            [clj-time.core :as t]
            [clj-time.coerce :as tc]
            [datomic.api :as d]
            [mount.core :as mount]
            [cashflow.models.transactions :as trans]
            [cashflow.models.db :as cdb]))

(use-fixtures :each
  (fn [test]
    (test-db/create-empty-in-memory-db)
    (mount/start-with-states {#'cdb/db-conn {:start #(cdb/create-conn test-db/test-db-uri)}})
    (test)
    (mount/stop)))

(def test-file (.getFile (clojure.java.io/resource "test-transactions.csv")))

(deftest can-parse-file
  (count (parse-file (.getFile (clojure.java.io/resource "test-transactions.csv")))))

(deftest parse-test
  (testing "Can transform parsed file to list of transaction maps"
    (let [parsed-file (parse-file test-file)
          model (lines->transactions parsed-file)]
      (is (= (count model) 62))))

  (testing "Can transform lines to model"
    (is (= (lines->transactions
             [["06.05.2009" "06.05.2009" "VARER" "NARVESEN" "-119,00" "17017470066"]
              ["06.05.2009" "06.05.2009" "VARER" "REMA 1000" "-159,20" "17017532866"]])
           [{:transaction/date (t/date-time 2009 05 06) :transaction/code "VARER" :transaction/description "NARVESEN" :transaction/amount -119.00M}
            {:transaction/date (t/date-time 2009 05 06) :transaction/code "VARER" :transaction/description "REMA 1000" :transaction/amount -159.20M}]))))

(deftest add-transactions-to-file
  (testing "Can add transactions to file"
    (add-transactions-in-file! test-file)
    (is (= (count (trans/d-all-transactions (d/db cdb/db-conn))) 56)))

  (testing "Internal transfers are filtered out when adding transactions"
    (is (= (to-transactions [["06.05.2009" "06.05.2009" "VARER" "NARVESEN" "-119,00" "17017470066"]
                             ["06.05.2009" "06.05.2009" "OVFNETTB" "Internal transfer, filter me" "-159,20" "17017532866"]
                             ["06.05.2009" "06.05.2009" "VARER" "REMA 1000" "-159,20" "17017532866"]
                             ["06.05.2009" "06.05.2009" "AVTALE" "Transfer" "200,0" "17017532868"]
                             ["06.05.2009" "06.05.2009" "MOB.B.OVF" "Internal transfer, filter me" "-159,20" "17017532866"]])
           [{:transaction/date (t/date-time 2009 05 06) :transaction/code "VARER" :transaction/description "NARVESEN" :transaction/amount -119.00M}
            {:transaction/date (t/date-time 2009 05 06) :transaction/code "VARER" :transaction/description "REMA 1000" :transaction/amount -159.20M}])))

  (testing "Can sum transactions"
    (is (= (sum-transactions []) 0))
    (is (= (sum-transactions [{:transaction/amount 10} {:transaction/amount 20} {:transaction/amount 30}]) 60)))

  (testing "Can sum transactions for each category"
    (is (= (sum-transactions-pr-category []) []))

    (is (= (sum-transactions-pr-category
             [{:transaction/category "a" :transaction/amount 1}
              {:transaction/category "a" :transaction/amount 2}
              {:transaction/category "b" :transaction/amount 3}
              {:transaction/category "b" :transaction/amount 3}
              {:transaction/category "c" :transaction/amount 4}])
           [{:category "a" :sum 3}
            {:category "b" :sum 6}
            {:category "c" :sum 4}])))

  (testing "Can sum transactions for each category without transactions"
    (is (= (sum-transactions-pr-category []) [])))

  (testing "Can calculate income and expenses by month for a list of transactions"
    (is (= (net-income-by-month []) []))

    (is (= (net-income-by-month
             [{:transaction/date (t/date-time 2014 5 1) :transaction/amount 1}
              {:transaction/date (t/date-time 2014 5 2) :transaction/amount 2}
              {:transaction/date (t/date-time 2014 5 2) :transaction/amount -10}
              {:transaction/date (t/date-time 2014 5 3) :transaction/amount -20}
              {:transaction/date (t/date-time 2013 6 1) :transaction/amount 1}
              {:transaction/date (t/date-time 2013 6 2) :transaction/amount 1}
              {:transaction/date (t/date-time 2013 6 3) :transaction/amount -4}])
          [{:time "2013-6" :income 2 :expense -4}
           {:time "2014-5" :income 3 :expense -30}]))))

(deftest add-transaction-to-db-test
  (is (= (->
           (add-transactions [{:transaction/date (t/date-time 2009 05 06) :transaction/code "VARER" :transaction/description "NARVESEN" :transaction/amount -119.00M}
                              {:transaction/date (t/date-time 2009 05 06) :transaction/code "VARER" :transaction/description "REMA 1000" :transaction/amount -159.20M}])
           :tempids
           vals
           count)
         2)))

(deftest find-transactions-test
  (testing "Can find transaction by id in database"
    (let [new-trans-datom (add-transactions [{:transaction/date (t/date-time 2009 05 06)
                                              :transaction/code "VARER"
                                              :transaction/description "NARVESEN"
                                              :transaction/amount -119.00M}])
          transaction (test-db/datom->entity new-trans-datom)
          transaction-id (:transaction/id transaction)]

      (is (= (d-find-transaction-by-id (d/db cdb/db-conn) transaction-id)
             {:transaction/id transaction-id
              :transaction/date (t/date-time 2009 05 06)
              :transaction/code "VARER"
              :transaction/description "NARVESEN"
              :transaction/amount -119.00M})))))

(deftest can-find-transactions-by-year
  (testing "Can find transactions by year"
    (add-transactions [{:transaction/date (t/date-time 2009 05 06)
                        :transaction/code "VARER"
                        :transaction/description "NARVESEN"
                        :transaction/amount -119.00M}
                       {:transaction/date (t/date-time 2009 05 06)
                        :transaction/code "VARER"
                        :transaction/description "REMA 1000"
                        :transaction/amount -159.20M}])
    (is (= (->>
             (dfind-transactions-by-year (d/db cdb/db-conn) 2009)
             (map #(dissoc % :transaction/id)))
           [{:transaction/date (t/date-time 2009 05 06)
             :transaction/code "VARER"
             :transaction/description "NARVESEN"
             :transaction/amount -119.00M}
            {:transaction/date (t/date-time 2009 05 06)
             :transaction/code "VARER"
             :transaction/description "REMA 1000" :transaction/amount -159.20M}]))))

(deftest can-find-by-month
  (testing "Can find transactions by month"
    (add-transactions [{:transaction/date (t/date-time 2009 05 06) :transaction/code "VARER" :transaction/description "NARVESEN" :transaction/amount -119.00M}
                       {:transaction/date (t/date-time 2009 06 06) :transaction/code "VARER" :transaction/description "REMA 1000" :transaction/amount -159.20M}])
    (is (= (->>
             (dfind-transactions-by-month cdb/db-conn 2009 6)
             (map #(dissoc % :transaction/id)))
          [{:transaction/date (t/date-time 2009 06 06) :transaction/code "VARER" :transaction/description "REMA 1000" :transaction/amount -159.20M}]))))

(deftest can-find-unique-years
  (testing "Can find the list of unique years of transactions"
    (add-transactions [{:transaction/date (t/date-time 2008 05 06) :transaction/code "VARER" :transaction/description "NARVESEN" :transaction/amount -119.00M}
                       {:transaction/date (t/date-time 2008 05 06) :transaction/code "VARER" :transaction/description "NARVESEN" :transaction/amount -119.00M}
                       {:transaction/date (t/date-time 2009 05 06) :transaction/code "VARER" :transaction/description "REMA 1000" :transaction/amount -159.20M}])

    (is (= (dfind-unique-years-in-transactions (d/db cdb/db-conn))
           [2008 2009]))))