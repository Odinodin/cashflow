(ns cashflow.models.categories-test
  (:require [cashflow.models.categories :refer :all]
            [cashflow.test-db :as test-db]
            [datomic.api :as d]
            [midje.sweet :refer :all]))

(fact "can tag transaction list"
      (tag-transactions
        [{:transaction/description "Bananas for ever"}
         {:transaction/description "Acme Industries"}]
        [{:category/name "food" :category/regexes [#"Bananas"]}])

      => [{:transaction/description "Bananas for ever" :transaction/category "food"}
          {:transaction/description "Acme Industries" :transaction/category nil}])

;; Datomic
(def db-uri "datomic:mem://cashflow-db")

(fact "Can add category to db"
      (test-db/create-empty-in-memory-db db-uri)
      (dt-add-category! (d/connect db-uri) {:category/name "store" :category/regexes ["Kiwi" "Rimi"]})
      (dt-add-category! (d/connect db-uri) {:category/name "car" :category/regexes ["BMW" "Peugeot"]})
      (dt-list-categories (d/connect db-uri))

      =>
      [{:category/name "store" :category/regexes #{"Kiwi" "Rimi"}}
       {:category/name "car" :category/regexes #{"BMW" "Peugeot"}}])

(fact "Can remove category from db"
      (test-db/create-empty-in-memory-db db-uri)
      (dt-add-category! (d/connect db-uri) {:category/name "store" :category/regexes ["Kiwi" "Rimi"]})
      (dt-remove-category! (d/connect db-uri) "store")
      (dt-list-categories (d/connect db-uri))
      =>
      [])