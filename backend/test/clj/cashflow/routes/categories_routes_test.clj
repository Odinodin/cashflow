(ns cashflow.routes.categories_routes_test
  (:import (java.io ByteArrayInputStream))
  (:require [ring.mock.request :as ring-mock]
            [midje.sweet :refer :all]
            [mount.core :as mount]
            [cheshire.core :as json]
            [cashflow.handler :as cashflow]
            [cashflow.models.db :as cdb]
            [cashflow.json-util :as json-util]
            [cashflow.test-db :as test-db]))

(background (before :facts (do
                             (test-db/create-empty-in-memory-db)
                             (mount/start-with-states {#'cdb/db-conn #'test-db/test-db})))
            (after :facts mount/stop))

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

(fact "can create category"
      (let [response (create-category {:name "test" :matches ["a" "b"]})]

        response => (contains {:body anything :headers anything :status 201})))

(fact "can update category"
      (create-category {:name "test" :matches ["a" "b"]})
      (let [update-resp (create-category {:name "test" :matches ["c"]})]

        update-resp => (contains {:body anything :headers anything :status 201})))

(fact "can list categories"
      (create-category {:name "store" :matches ["x"]})
      (let [response (list-categories)]

        response => (contains {:body anything :headers anything :status 200})
        (:body response)
        => [{:name "store" :matches ["x"]}]))

(fact "can get category"
      (create-category {:name "store" :matches ["x"]})
      (let [response (->
                       (cashflow/test-app-handler (ring-mock/request :get "/api/categories/store"))
                       json-util/json-parse-body)]

        response => (contains {:body anything :headers anything :status 200})
        (:body response) => {:name "store" :matches ["x"]}))

;; TODO Failed when upgrading deps, fix it
#_(fact "can delete category"
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