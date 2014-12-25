(ns cashflow.models.categories-test
  (:require [cashflow.models.categories :refer :all]
            [cashflow.test-db :as test-db]
            [datomic.api :as d]
            [midje.sweet :refer :all]))

;; Datomic
(def db-uri "datomic:mem://cashflow-db")

(fact "Can add category to db"
      (test-db/create-empty-in-memory-db db-uri)
      (dt-add-category! (d/connect db-uri) {:category/name "store" :category/matches ["Kiwi" "Rimi"]})
      (dt-add-category! (d/connect db-uri) {:category/name "car" :category/matches ["BMW" "Peugeot"]})
      (dt-list-categories (d/connect db-uri))

      => [{:category/name "store" :category/matches #{"Kiwi" "Rimi"}}
          {:category/name "car" :category/matches #{"BMW" "Peugeot"}}])

(fact "Can remove category from db"
      (test-db/create-empty-in-memory-db db-uri)
      (dt-add-category! (d/connect db-uri) {:category/name "store" :category/matches ["Kiwi" "Rimi"]})
      (dt-remove-category! (d/connect db-uri) "store")
      (dt-list-categories (d/connect db-uri))

      => [])

(fact "Can suggest categories based on transaction description"
      (suggest-categories nil nil) => #{}
      (suggest-categories {} []) => #{}
      (suggest-categories {:transaction/description "something"} []) => #{}

      (suggest-categories
        {:transaction/description "Something Kiwi something"}
        [{:category/name "store" :category/matches ["Kiwi"]}])
      => #{"store"}

      (suggest-categories
        {:transaction/description "Something Kiwi something NSB"}
        [{:category/name "store" :category/matches ["kiwi" "Rimi"]}
         {:category/name "travel" :category/matches ["nsb"]}
         {:category/name "animals" :category/matches ["monkey"]}])
      => #{"store" "travel"})

