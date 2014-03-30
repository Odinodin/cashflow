(ns cashflow.repl
  (:use cashflow.handler
        ring.server.standalone
        print.foo
        [ring.middleware file-info file])
  (:require [clj-time.coerce :as t-coerce]
            [clj-time.core :as t]
            [clojure.pprint :refer [pprint]])

  (:require [cashflow.models.transactions :as trans]))

(trans/add-transactions! (.getFile (clojure.java.io/resource "test-transactions.csv")))


(def rules
  [{:tag "butikk" :regexes [#"REMA" #"KIWI" #"RIMI"]}
   {:tag "lonn" :regexes [#"Kodemaker" #"Ullevål"]}])

(defn match-tag-rules
  "Find matching tag rules by returning all rules that
  have regexes that matches the text"
  [tag-rules text]
  (filter
    (fn [rule]
      (some #(re-find % text) (:regexes rule)))
    tag-rules))

(defn tag-transactions
  [transaction-list tag-rules]
  (map
    (fn [trans] (assoc trans :tags (->>
                                     (match-tag-rules tag-rules (:description trans))
                                     (map :tag))))
    transaction-list))


(def tagged (tag-transactions [{:description "Something REMA Kodemaker"}
                               {:description "Something RIMI "}
                               {:description "Blahblah KIWI blahblah"}]
                              rules
                              ))

(pprint tagged)



