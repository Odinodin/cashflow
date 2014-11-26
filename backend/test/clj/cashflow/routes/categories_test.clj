(ns cashflow.routes.categories_test
  (:import java.io.ByteArrayInputStream)
  (:require [ring.mock.request :as ring-mock]
            [midje.sweet :refer :all]
            [cheshire.core :as json]
            [cashflow.handler :as cashflow]
            [cashflow.models.categories :as categories]
            [cashflow.json-util :as json-util]
            [cashflow.test-db :as db-util]))


(defn- create-category [testsystem category-map]
  (->
    (cashflow/test-app-handler
      testsystem
      {:request-method :post
       :uri            "/api/categories"
       :body           (java.io.ByteArrayInputStream.
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
      (let [db-uri "datomic:mem://cashflow-db"
            _ (db-util/create-empty-in-memory-db db-uri)
            response (create-category {:database {:uri db-uri}}
                                      {:category/name "test" :category/regexes ["a" "b"]})]

        response => (contains {:body anything :headers anything :status 201})))

(fact "can list categories"
      (let [db-uri "datomic:mem://cashflow-db"
            _ (db-util/create-empty-in-memory-db db-uri)
            _ (create-category {:database {:uri db-uri}}
                               {:category/name "store" :category/regexes ["x"]})
            response (list-categories {:database {:uri db-uri}})]

        response => (contains {:body anything :headers anything :status 200})
        (:body response) => [{:category/name "store" :category/regexes ["x"]}]))


(fact "can get category"
      (let [db-uri "datomic:mem://cashflow-db"
            _ (db-util/create-empty-in-memory-db db-uri)
            _ (create-category {:database {:uri db-uri}}
                               {:category/name "store" :category/regexes ["x"]})
            response (->
                       (cashflow/test-app-handler {:database {:uri db-uri}}
                                                  (ring-mock/request :get "/api/categories/store"))
                       json-util/json-parse-body)]
        response => (contains {:body anything :headers anything :status 200})
        (:body response) => {:category/name "store" :category/regexes ["x"]}))


(fact "can delete category"
      (let [db-uri "datomic:mem://cashflow-db"
            _ (db-util/create-empty-in-memory-db db-uri)
            _ (create-category {:database {:uri db-uri}}
                               {:category/name "power" :category/regexes ["x"]})
            delete-response (->
                              (cashflow/test-app-handler {:database {:uri db-uri}}
                                                         (ring-mock/request :delete "/api/categories/power"))
                              json-util/json-parse-body)
            list-response (list-categories {:database {:uri db-uri}})]
        delete-response => (contains {:body anything :headers anything :status 200})))