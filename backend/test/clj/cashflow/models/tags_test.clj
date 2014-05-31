(ns cashflow.models.tags-test
  (:require [cashflow.models.tags :refer :all]
            [midje.sweet :refer :all]))

(fact "can tag transaction list"
      (tag-transactions
        [{:description "Bananas for ever"}
         {:description "Acme Industries"}]
        [{:name "food" :regexes [#"Bananas"]}])

      => [{:description "Bananas for ever" :tags ["food"]}
          {:description "Acme Industries" :tags []}])

(fact "can match multiple tags"
      (tag-transactions
        [{:description "Monkeys and Sharks"}]
        [{:name "animals" :regexes [#"Monkey"]}
         {:name "fish" :regexes [#"Shark"]}])

      => [{:description "Monkeys and Sharks" :tags ["animals" "fish"]}])

(fact "can get transactions with tag"
      (get-tagged-transactions [] "a") => []
      (get-tagged-transactions [{:tags ["a"]}] "a") => [{:tags ["a"]}]

      (get-tagged-transactions [{:tags ["a" "b"] :description "something"}
                                {:tags ["c"] :description "something else"}]
                               "a")
      => [{:tags ["a" "b"] :description "something"}])


(fact "Can add tags"
      (add-tag! (atom []) {:name "store" :regexes [#"Kiwi"]}) => not-empty)

(fact "Can remove tags"
      (remove-tag! (atom ["store"]) "store") => empty)

(fact "Can get tag by name"
      (let [tags (atom [])]
        (add-tag! tags {:name "stuff" :regexes []}) => not-empty
        (tagname->tag @tags "stuff") => {:name "stuff" :regexes []}))