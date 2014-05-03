(ns cashflow.models.tags-test
  (:require [cashflow.models.tags :refer :all]
            [midje.sweet :refer :all]))

(fact "can tag transaction list"
      (tag-transactions
        [{:description "Bananas for ever"}
         {:description "Acme Industries"}]
        [{:tag "food" :regexes [#"Bananas"]}])

      => [{:description "Bananas for ever" :tags ["food"]}
          {:description "Acme Industries" :tags []}])

(fact "can match multiple tags"
      (tag-transactions
        [{:description "Monkeys and Sharks"}]
        [{:tag "animals" :regexes [#"Monkey"]}
         {:tag "fish" :regexes [#"Shark"]}])

      => [{:description "Monkeys and Sharks" :tags ["animals" "fish"]}])

(fact "can get transactions with tag"
      (get-tagged-transactions [] "a") => []
      (get-tagged-transactions [{:tags ["a"]}] "a") => [{:tags ["a"]}]

      (get-tagged-transactions [{:tags ["a" "b"] :description "something"}
                                {:tags ["c"] :description "something else"}]
                               "a")
      => [{:tags ["a" "b"] :description "something"}])


(against-background
  [(before :contents (reset! tags []))]
  (fact "Can add tags"
        @tags => empty
        (add-tag! {:tag "store" :regexes [#"Kiwi"]}) => not-empty
        (count @tags) => 1)
  (fact "Can remove tags"
        (count @tags) => 1
        (remove-tag! "store") => empty
        @tags => empty)
  (fact "Can get tag by name"
        (add-tag! {:tag "stuff" :regexes []}) => not-empty
        (tagname->tag "stuff") => {:tag "stuff" :regexes []}))