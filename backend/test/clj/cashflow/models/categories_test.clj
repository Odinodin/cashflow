(ns cashflow.models.categories-test
  (:require [cashflow.models.categories :refer :all]
            [cashflow.test-db :as test-db]
            [clojure.test :refer [deftest is testing use-fixtures]]
            [datomic.api :as d]
            [mount.core :as mount]
            [cashflow.models.db :as cdb]))

(use-fixtures :each
  (fn [test]
    (test-db/create-empty-in-memory-db)
    (mount/start-with-states {#'cdb/db-conn {:start #(cdb/create-conn test-db/test-db-uri)}})
    (test)
    (mount/stop)))

(deftest can-add-category-to-db
  (dt-add-category! {:category/name "store" :category/matches ["Kiwi" "Rimi"]})
  (dt-add-category! {:category/name "car" :category/matches ["BMW" "Peugeot"]})
  (is (= (dt-list-categories)
         [{:category/name "store" :category/matches #{"Kiwi" "Rimi"}}
          {:category/name "car" :category/matches #{"BMW" "Peugeot"}}])))

(deftest can-find-category-by-name
  (dt-add-category! {:category/name "store" :category/matches ["Kiwi" "Rimi"]})
  (is (= (dt-find-category (d/db cdb/db-conn) "store")

         {:category/name "store" :category/matches #{"Kiwi" "Rimi"}})))

(deftest can-remove-category-from-db
  (dt-add-category! {:category/name "store" :category/matches ["Kiwi" "Rimi"]})
  (dt-remove-category! "store")
  (is (= (dt-list-categories) [])))

(deftest can-update-category
  (dt-add-category! {:category/name "store" :category/matches ["Kiwi" "Rimi"]})
  (dt-add-category! {:category/name "store" :category/matches ["Rema"]})
  (is (= (dt-list-categories)
         [{:category/name "store" :category/matches #{"Rema"}}])))

(deftest can-suggest-categories
  (testing "Can suggest categories based on transaction description"
    (is (= (suggest-categories nil nil) #{}))
    (is (= (suggest-categories {} []) #{}))
    (is (= (suggest-categories {:transaction/description "something"} []) #{}))

    (is (= (suggest-categories
             {:transaction/description "Something Kiwi something"}
             [{:category/name "store" :category/matches ["Kiwi"]}])
          #{"store"}))

    (is (= (suggest-categories
             {:transaction/description "Something Kiwi something NSB"}
             [{:category/name "store" :category/matches ["kiwi" "Rimi"]}
              {:category/name "travel" :category/matches ["nsb"]}
              {:category/name "animals" :category/matches ["monkey"]}])
          #{"store" "travel"}))))

