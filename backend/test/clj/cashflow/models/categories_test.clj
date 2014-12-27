(ns cashflow.models.categories-test
  (:require [cashflow.models.categories :refer :all]
            [cashflow.test-db :as test-db]
            [datomic.api :as d]
            [midje.sweet :refer :all]))

;; Datomic
(def db-uri "datomic:mem://cashflow-db")

(defn db [db-uri] (-> db-uri d/connect d/db))
(defn conn [db-uri] (-> db-uri d/connect))

(fact "Can add category to db"
      (test-db/create-empty-in-memory-db db-uri)
      (dt-add-category! (conn db-uri) {:category/name "store" :category/matches ["Kiwi" "Rimi"]})
      (dt-add-category! (conn db-uri) {:category/name "car" :category/matches ["BMW" "Peugeot"]})
      (dt-list-categories (conn db-uri))

      => [{:category/name "store" :category/matches #{"Kiwi" "Rimi"}}
          {:category/name "car" :category/matches #{"BMW" "Peugeot"}}])

(fact "Can find category by name"
      (test-db/create-empty-in-memory-db db-uri)
      (dt-add-category! (conn db-uri) {:category/name "store" :category/matches ["Kiwi" "Rimi"]})
      (dt-find-category (db db-uri) "store")

      => {:category/name "store" :category/matches #{"Kiwi" "Rimi"}})

(fact "Can remove category from db"
      (test-db/create-empty-in-memory-db db-uri)
      (dt-add-category! (conn db-uri) {:category/name "store" :category/matches ["Kiwi" "Rimi"]})
      (dt-remove-category! (conn db-uri) "store")
      (dt-list-categories (conn db-uri))

      => [])

(fact "Can update category"
      (test-db/create-empty-in-memory-db db-uri)
      (dt-add-category! (conn db-uri) {:category/name "store" :category/matches ["Kiwi" "Rimi"]})
      (dt-add-category! (conn db-uri) {:category/name "store" :category/matches ["Rema"]})
      (dt-list-categories (conn db-uri))

      => [{:category/name "store" :category/matches #{"Rema"}}])


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

