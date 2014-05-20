(ns cashflow.models.transactions-test
  (:require [cashflow.models.transactions :refer :all]
            [midje.sweet :refer :all]
            [clj-time.core :as t]))

(def test-file (.getFile (clojure.java.io/resource "test-transactions.csv")))

(fact "Can parse file"
      (count (parse-file (.getFile (clojure.java.io/resource "test-transactions.csv")))) => 57)

(fact "Can transform parsed file to list of transaction maps"
      (let [parsed-file (parse-file test-file)
            model (lines->transactions parsed-file)]
        (count model) => 57))

(fact "Can transform lines to model"
      (lines->transactions
        [["06.05.2009" "06.05.2009" "VARER" "NARVESEN" "-119,00" "17017470066"]
         ["06.05.2009" "06.05.2009" "VARER" "REMA 1000" "-159,20" "17017532866"]])
      => [{:date (t/date-time 2009 05 06) :code "VARER" :description "NARVESEN" :amount -119.00M}
          {:date (t/date-time 2009 05 06) :code "VARER" :description "REMA 1000" :amount -159.20M}])


(against-background
  [(before :contents (reset! transactions []))]
  (fact "Can add transactions"
        @transactions => empty
        (add-transactions! test-file) => not-empty
        (count @transactions) => 57))


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
      (sum-transactions [{:amount 10} {:amount 20} {:amount 30}]) => 60
      (sum-transactions []) => 0)

(fact "Can sum transactions for each tag"
      (sum-transactions-pr-tag
        [{:tags ["a" "b"] :amount 1} {:tags ["a"] :amount 2}
                                {:tags ["c" "d"] :amount 3} {:tags ["c"] :amount 4}])

      => [{:tagname "a" :sum 3}
          {:tagname "b" :sum 1}
          {:tagname "c" :sum 7}
          {:tagname "d" :sum 3}])

(fact "Can calculate income and expenses by month for a list of transactions"
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
