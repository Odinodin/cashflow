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
