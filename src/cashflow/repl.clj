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

(tags/add-tag! {:tag "butikk" :regexes [#"Rema" #"Kiwi" #"Rimi"]})

(tags/tag-and-update-transactions! trans/transactions tags/tags)

(tags/get-tagged-transactions @trans/transactions "butikk")



