(ns cashflow.models.categories-test
  (:require [cashflow.models.categories :refer :all]
            [cashflow.test-db :as test-db]
            [datomic.api :as d]
            [midje.sweet :refer :all]
            [mount.core :as mount]
            [cashflow.models.db :as cdb]))

(background (before :facts (do
                             (test-db/create-empty-in-memory-db)
                             (mount/start-with-states {#'cdb/db-conn #'test-db/test-db})))
            (after :facts mount/stop))

(fact "Can add category to db"
      (dt-add-category! {:category/name "store" :category/matches ["Kiwi" "Rimi"]})
      (dt-add-category! {:category/name "car" :category/matches ["BMW" "Peugeot"]})
      (dt-list-categories)

      => [{:category/name "store" :category/matches #{"Kiwi" "Rimi"}}
          {:category/name "car" :category/matches #{"BMW" "Peugeot"}}])

(fact "Can find category by name"
      (dt-add-category! {:category/name "store" :category/matches ["Kiwi" "Rimi"]})
      (dt-find-category (d/db cdb/db-conn) "store")

      => {:category/name "store" :category/matches #{"Kiwi" "Rimi"}})

(fact "Can remove category from db"
      (dt-add-category! {:category/name "store" :category/matches ["Kiwi" "Rimi"]})
      (dt-remove-category! "store")
      (dt-list-categories)

      => [])

(fact "Can update category"
      (dt-add-category! {:category/name "store" :category/matches ["Kiwi" "Rimi"]})
      (dt-add-category! {:category/name "store" :category/matches ["Rema"]})
      (dt-list-categories)

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

