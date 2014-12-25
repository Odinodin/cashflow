(ns cashflow.routes.categories_routes_test
  (:import (java.io ByteArrayInputStream))
  (:require [ring.mock.request :as ring-mock]
            [midje.sweet :refer :all]
            [cheshire.core :as json]
            [cashflow.handler :as cashflow]
            [cashflow.models.categories :as categories]
            [cashflow.json-util :as json-util]
            [cashflow.test-db :as test-db]))


(def db-uri "datomic:mem://cashflow-db")

(defn- create-category [testsystem category-map]
  (->
    (cashflow/test-app-handler
      testsystem
      {:request-method :post
       :uri            "/api/categories"
       :body           (ByteArrayInputStream.
                         (.getBytes
                           (json/generate-string category-map)))
       :content-type   "application/json"})
    json-util/json-parse-body))


(defn- list-categories [testsystem]
  (->
    (cashflow/test-app-handler testsystem
                               (ring-mock/request :get "/api/categories"))
    json-util/json-parse-body))

(fact "can create category"
      (test-db/create-empty-in-memory-db db-uri)
      (let [response (create-category {:database {:uri db-uri}}
                                      {:name "test" :matches ["a" "b"]})]

        response => (contains {:body anything :headers anything :status 201})))

(fact "can update category"
      (test-db/create-empty-in-memory-db db-uri)
      (create-category {:database {:uri db-uri}}
                       {:name "test" :matches ["a" "b"]})
      (let [update-resp (create-category {:database {:uri db-uri}}
                                         {:name "test" :matches ["c"]})]

        update-resp => (contains {:body anything :headers anything :status 201})))

(fact "can list categories"
      (test-db/create-empty-in-memory-db db-uri)
      (create-category {:database {:uri db-uri}}
                       {:name "store" :matches ["x"]})
      (let [response (list-categories {:database {:uri db-uri}})]

        response => (contains {:body anything :headers anything :status 200})
        (:body response)
        => [{:name "store" :matches ["x"]}]))

(fact "can get category"
      (test-db/create-empty-in-memory-db db-uri)
      (create-category {:database {:uri db-uri}}
                       {:name "store" :matches ["x"]})
      (let [response (->
                       (cashflow/test-app-handler {:database {:uri db-uri}}
                                                  (ring-mock/request :get "/api/categories/store"))
                       json-util/json-parse-body)]

        response => (contains {:body anything :headers anything :status 200})
        (:body response) => {:name "store" :matches ["x"]}))

(fact "can delete category"
      (test-db/create-empty-in-memory-db db-uri)
      (create-category {:database {:uri db-uri}}
                       {:name "power" :matches ["x"]})
      (let [delete-response (->
                              (cashflow/test-app-handler {:database {:uri db-uri}}
                                                         (ring-mock/request :delete "/api/categories/power"))
                              json-util/json-parse-body)
            list-response (list-categories {:database {:uri db-uri}})]

        delete-response => (contains {:body anything :headers anything :status 200})
        (-> list-response :body count) => 0))