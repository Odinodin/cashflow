(ns cashflow.models.transactions-test
  (:require [cashflow.models.transactions :refer :all]
            [midje.sweet :refer :all]
            [clj-time.core :as t]
            [clj-time.coerce :as tc]
            [datomic.api :as d]))

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
      => [{:date (t/date-time 2009 05 06) :code "VARER" :description "NARVESEN" :amount -119.00M}
          {:date (t/date-time 2009 05 06) :code "VARER" :description "REMA 1000" :amount -159.20M}])

(fact "Can add transactions in file"
      (let [transactions (atom [])]
        (add-transactions-in-file! transactions test-file) => not-empty
        (count @transactions) => 56))

(fact "Internal transfers are filtered out when adding transactions"
      (to-transactions (atom 0) [["06.05.2009" "06.05.2009" "VARER" "NARVESEN" "-119,00" "17017470066"]
                                 ["06.05.2009" "06.05.2009" "OVFNETTB" "Internal transfer, filter me" "-159,20" "17017532866"]
                                 ["06.05.2009" "06.05.2009" "VARER" "REMA 1000" "-159,20" "17017532866"]
                                 ["06.05.2009" "06.05.2009" "MOB.B.OVF" "Internal transfer, filter me" "-159,20" "17017532866"]])
      => [{:id 1 :date (t/date-time 2009 05 06) :code "VARER" :description "NARVESEN" :amount -119.00M}
          {:id 2 :date (t/date-time 2009 05 06) :code "VARER" :description "REMA 1000" :amount -159.20M}])

(fact "Can find transactions for a day"
      (transactions-at-date
        [{:date (t/date-time 2014 05 10) :code "Varer" :description "wrong date" :amount 100}
         {:date (t/date-time 2014 05 11) :code "Varer" :description "right date" :amount 200}]
        (t/date-time 2014 05 11))

      => [{:date (t/date-time 2014 05 11) :code "Varer" :description "right date" :amount 200}])

(fact "Can filter transactions for a period"
      (transactions-in-interval
        [{:date (t/date-time 2014 5 1) :description "inside" :amount 1}
         {:date (t/date-time 2014 5 25) :description "inside" :amount 3}
         {:date (t/date-time 2014 6 30) :description "inside" :amount 2}
         {:date (t/date-time 2000 1 1) :description "outside" :amount 4}]
        (t/interval
          (t/date-time 2014 5 1)
          (t/date-time 2014 6 30 23 59 59)))

      =>
      [{:date (t/date-time 2014 5 1) :description "inside" :amount 1}
       {:date (t/date-time 2014 5 25) :description "inside" :amount 3}
       {:date (t/date-time 2014 6 30) :description "inside" :amount 2}])


(fact "Can filter transactions by year and month"
      (transactions-in-month [] 2014 5) => []

      (transactions-in-month
        [{:date (t/date-time 2014 5 1) :description "inside" :amount 1}
         {:date (t/date-time 2014 5 25) :description "inside" :amount 3}
         {:date (t/date-time 2014 6 30) :description "outside" :amount 2}
         {:date (t/date-time 2000 1 1) :description "outside" :amount 4}]
        2014
        5)

      =>
      [{:date (t/date-time 2014 5 1) :description "inside" :amount 1}
       {:date (t/date-time 2014 5 25) :description "inside" :amount 3}])

(fact "Can sum transactions"
      (sum-transactions []) => 0
      (sum-transactions [{:amount 10} {:amount 20} {:amount 30}]) => 60)

(fact "Can sum transactions for each category"
      (sum-transactions-pr-category []) => []

      (sum-transactions-pr-category
        [{:category "a" :amount 1}
         {:category "a" :amount 2}
         {:category "b" :amount 3}
         {:category "b" :amount 3}
         {:category "c" :amount 4}])

      => [{:category "a" :sum 3}
          {:category "b" :sum 6}
          {:category "c" :sum 4}])

(fact "Can sum transactions for each category without transactions"
      (sum-transactions-pr-category []) => [])

(fact "Can calculate income and expenses by month for a list of transactions"
      (net-income-by-month []) => []

      (net-income-by-month
        [{:date (t/date-time 2014 5 1) :amount 1}
         {:date (t/date-time 2014 5 2) :amount 2}
         {:date (t/date-time 2014 5 2) :amount -10}
         {:date (t/date-time 2014 5 3) :amount -20}
         {:date (t/date-time 2013 6 1) :amount 1}
         {:date (t/date-time 2013 6 2) :amount 1}
         {:date (t/date-time 2013 6 3) :amount -4}])

      =>
      [{:time "2013-6" :income 2 :expense -4}
       {:time "2014-5" :income 3 :expense -30}])

(fact "Can find all years in transactions"
      (unique-years []) => []

      (unique-years
        [{:date (t/date-time 2014 5 1)}
         {:date (t/date-time 2014 5 25)}
         {:date (t/date-time 2011 6 30)}
         {:date (t/date-time 2000 1 1)}])

      => [2000 2011 2014])

(fact "can change transaction category"
      (change-transaction
        (atom [{:id 1 :date (t/date-time 2014 5 1) :amount 1 :category "store"}])
        {:id 1 :category "coffee"})

      =>
      [{:id 1 :date (t/date-time 2014 5 1) :amount 1 :category "coffee"}])

(fact "Can find transaction with id"
      (find-transaction [] 1) => nil

      (find-transaction [{:id 1 :amount 123} {:id 2 :amount 2}] 1)

      => {:id 1 :amount 123})


(defn create-empty-in-memory-db [uri]
  (d/delete-database uri)
  (d/create-database uri)
  (let [conn (d/connect uri)
        schema (load-file (.getFile (clojure.java.io/resource "schema.edn")))]
    (d/transact conn schema)
    conn))


(fact "Can add transaction to database"
      (create-empty-in-memory-db "datomic:mem://cashflow-db")
      (->
        (add-transactions "datomic:mem://cashflow-db"
                          [{:transaction/date (tc/to-date (t/date-time 2009 05 06)) :transaction/code "VARER" :transaction/description "NARVESEN" :transaction/amount -119.00M}
                           {:transaction/date (tc/to-date (t/date-time 2009 05 06)) :transaction/code "VARER" :transaction/description "REMA 1000" :transaction/amount -159.20M}])
        :tempids
        vals
        count)
      => 2)

(fact "Can find transactions by year"
      (let [uri "datomic:mem://cashflow-db"]
        (create-empty-in-memory-db uri)
        (add-transactions (d/connect uri)
                          [{:transaction/date (tc/to-date (t/date-time 2009 05 06)) :transaction/code "VARER" :transaction/description "NARVESEN" :transaction/amount -119.00M}
                           {:transaction/date (tc/to-date (t/date-time 2009 05 06)) :transaction/code "VARER" :transaction/description "REMA 1000" :transaction/amount -159.20M}])
        (->>
          (dfind-transactions-by-year (d/connect uri) 2009)
          (map #(dissoc % :db/id))))
      =>
      [{:transaction/date (tc/to-date (t/date-time 2009 05 06)) :transaction/code "VARER" :transaction/description "NARVESEN" :transaction/amount -119.00M}
       {:transaction/date (tc/to-date (t/date-time 2009 05 06)) :transaction/code "VARER" :transaction/description "REMA 1000" :transaction/amount -159.20M}])


(fact "Can find transactions by month"
      (let [uri "datomic:mem://cashflow-db"]
        (create-empty-in-memory-db uri)
        (add-transactions (d/connect uri)
                          [{:transaction/date (tc/to-date (t/date-time 2009 05 06)) :transaction/code "VARER" :transaction/description "NARVESEN" :transaction/amount -119.00M}
                           {:transaction/date (tc/to-date (t/date-time 2009 06 06)) :transaction/code "VARER" :transaction/description "REMA 1000" :transaction/amount -159.20M}])
        (->>
          (dfind-transactions-by-month (d/connect uri) 2009 6)
          (map #(dissoc % :db/id))))
      =>
      [{:transaction/date (tc/to-date (t/date-time 2009 06 06)) :transaction/code "VARER" :transaction/description "REMA 1000" :transaction/amount -159.20M}])

(fact "Can find the list of unique years of transactions"
      (let [uri "datomic:mem://cashflow-db"]
        (create-empty-in-memory-db uri)
        (add-transactions (d/connect uri)
                          [{:transaction/date (tc/to-date (t/date-time 2008 05 06)) :transaction/code "VARER" :transaction/description "NARVESEN" :transaction/amount -119.00M}
                           {:transaction/date (tc/to-date (t/date-time 2008 05 06)) :transaction/code "VARER" :transaction/description "NARVESEN" :transaction/amount -119.00M}
                           {:transaction/date (tc/to-date (t/date-time 2009 05 06)) :transaction/code "VARER" :transaction/description "REMA 1000" :transaction/amount -159.20M}])
        (dfind-unique-years-in-transactions (d/connect uri)))
      =>
      #{2008 2009})