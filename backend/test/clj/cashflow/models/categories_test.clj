(ns cashflow.models.categories-test
  (:require [cashflow.models.categories :refer :all]
            [cashflow.test-db :as test-db]
            [datomic.api :as d]
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


;; Datomic
(fact "Can add category to db"
      (let [uri "datomic:mem://cashflow-db"]
        (test-db/create-empty-in-memory-db uri)
        (dt-add-category! (d/connect uri) {:category/name "store" :category/regexes ["Kiwi" "Rimi"]})
        (dt-add-category! (d/connect uri) {:category/name "car" :category/regexes ["BMW" "Peugeot"]})
        (dt-list-categories (d/connect uri)))
      =>
      [{:category/name "store" :category/regexes #{"Kiwi" "Rimi"}}
       {:category/name "car" :category/regexes #{"BMW" "Peugeot"}}])

(fact "Can remove category from db"
      (let [uri "datomic:mem://cashflow-db"
            _ (test-db/create-empty-in-memory-db uri)
            result (dt-add-category! (d/connect uri) {:category/name "store" :category/regexes ["Kiwi" "Rimi"]})]
        (dt-remove-category! (d/connect uri) "store")
        (dt-list-categories (d/connect uri)))
      =>
      [])