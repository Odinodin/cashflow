(ns cashflow.models.categories-test
  (:require [cashflow.models.categories :refer :all]
            [midje.sweet :refer :all]))

(fact "can tag transaction list"
      (tag-transactions
        [{:description "Bananas for ever"}
         {:description "Acme Industries"}]
        [{:name "food" :regexes [#"Bananas"]}])

      => [{:description "Bananas for ever" :category "food"}
          {:description "Acme Industries" :category nil}])

(fact "can get transactions in category"
      (get-transactions-in-category [] "a") => []
      (get-transactions-in-category [{:category "a"}] "a") => [{:category "a"}]

      (get-transactions-in-category [{:category "a" :description "something"}
                                     {:category "c" :description "something else"}]
                                    "a")
      => [{:category "a" :description "something"}])


(fact "Can add category"
      (add-category! (atom []) {:name "store" :regexes [#"Kiwi"]}) => not-empty)

(fact "Can remove category"
      (remove-category! (atom ["store"]) "store") => empty)

(fact "Can get category by name"
      (let [categories (atom [])]
        (add-category! categories {:name "stuff" :regexes []}) => not-empty
        (categoryname->category @categories "stuff") => {:name "stuff" :regexes []}))