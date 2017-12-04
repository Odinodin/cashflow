(ns cashflow.routes.categories_routes_test
  (:import (java.io ByteArrayInputStream))
  (:require [cashflow.handler :as cashflow]
            [cashflow.models.db :as cdb]
            [cashflow.json-util :as json-util]
            [cashflow.test-db :as test-db]
            [cheshire.core :as json]
            [clojure.test :refer [deftest is testing use-fixtures]]
            [mount.core :as mount]
            [ring.mock.request :as ring-mock]))

(use-fixtures :each
  (fn [test]
    (test-db/create-empty-in-memory-db)
    (mount/start-with-states {#'cdb/db-conn {:start #(cdb/create-conn test-db/test-db-uri)}})
    (test)
    (mount/stop)))

(defn- create-category [category-map]
  (->
    (cashflow/test-app-handler
      {:request-method :post
       :uri            "/api/categories"
       :body           (ByteArrayInputStream.
                         (.getBytes
                           (json/generate-string category-map)))
       :content-type   "application/json"})
    json-util/json-parse-body))


(defn- list-categories []
  (->
    (cashflow/test-app-handler (ring-mock/request :get "/api/categories"))
    json-util/json-parse-body))

(deftest can-create-category
  (is (= (:status (create-category {:name "test" :matches ["a" "b"]}) 201))))


(deftest can-update-category
  (create-category {:name "test" :matches ["a" "b"]})
  (is (= (:status (create-category {:name "test" :matches ["c"]})) 201)))

(deftest can-list-categories
  (create-category {:name "store" :matches ["x"]})
  (let [response (list-categories)]
    (is (= (:status response) 200))
    (is (= (:body response) [{:name "store" :matches ["x"]}]))))

(deftest can-get-category
      (create-category {:name "store" :matches ["x"]})
      (let [response (-> (cashflow/test-app-handler (ring-mock/request :get "/api/categories/store"))
                         json-util/json-parse-body)]
        (is (= (:status response) 200))
        (is (= (:body response) {:name "store" :matches ["x"]}))))

(deftest can-delete-category
  (create-category {:name "power" :matches ["x"]})
  (let [delete-response (cashflow/test-app-handler (ring-mock/request :delete "/api/categories/power"))
        list-response (list-categories)]

    (is (= (:status delete-response) 200))
    (is (= (:body (list-categories) [])))))