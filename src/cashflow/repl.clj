(ns cashflow.repl
  (:use cashflow.handler
        ring.server.standalone
        print.foo
        [ring.middleware file-info file])
  (:require [clj-time.coerce :as t-coerce]
            [clj-time.core :as t]
            [clojure.pprint :refer [pprint]])

  (:require [cashflow.models.transactions :as trans]
            [cashflow.models.tags :as tags]))

#_(trans/add-transactions! (.getFile (clojure.java.io/resource "test-transactions.csv")))


(def single-day (trans/transactions-at-date @trans/transactions (t/date-time 2009 05 19)))
(pprint single-day)


(def tagged (tags/tag-transactions single-day tags/tagging-rules))

(pprint (trans/sum-transactions single-day))



(pprint (tags/get-tagged-transactions tagged "kafe"))
