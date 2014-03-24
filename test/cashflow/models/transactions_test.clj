(ns cashflow.models.transactions-test
  (:require [cashflow.models.transactions :refer :all]
            [midje.sweet :refer :all]
            [clj-time.core :as t]))

(fact "Can parse file"
      (parse-file (.getFile (clojure.java.io/resource "test-transactions.csv"))) => not-empty
      (parse-file (.getFile (clojure.java.io/resource "test-transactions.csv"))) => (n-of (comp not nil?) 57))


(fact "Can transform parsed file to list of transaction maps"
      (let [parsed-file (parse-file (.getFile (clojure.java.io/resource "test-transactions.csv")))
            model (lines->transactions parsed-file)]
        model => (n-of (comp not nil?) 57)))


(fact "Can transform lines to model"
      (lines->transactions
        [["06.05.2009" "06.05.2009" "VARER" "NARVESEN" "-119,00" "17017470066"]
          ["06.05.2009" "06.05.2009" "VARER" "REMA 1000" "-159,20" "17017532866"]])
      => [{:date (t/date-time 2009 05 06) :code "VARER" :description "NARVESEN" :amount -119.00M}
          {:date (t/date-time 2009 05 06) :code "VARER" :description "REMA 1000" :amount -159.20M}])