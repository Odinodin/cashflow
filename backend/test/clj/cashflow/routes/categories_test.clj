(ns cashflow.routes.categories_test
  (:import java.io.ByteArrayInputStream)
  (:require [ring.mock.request :as ring-mock]
            [midje.sweet :refer :all]
            [cheshire.core :as json]
            [cashflow.handler :as cashflow]
            [cashflow.models.categories :as categories]
            [cashflow.json-util :as json-util]))

(fact "can create category"
      (let [response (->
                       {:categories (atom [])}
                       (cashflow/test-app-handler {:request-method :post
                                                   :uri            "/api/categories"
                                                   :body           (java.io.ByteArrayInputStream. (.getBytes (json/generate-string {:name "test" :regexes ["a" "b"]}))) ;; extract this into a function
                                                   :content-type   "application/json"})
                       json-util/json-parse-body)]

        response => (contains {:body anything :headers anything :status 201})
        (:body response) => [{:name "test" :regexes ["a" "b"]}]))

(fact "can list categories"
      (let [response (->
                       {:categories (atom [{:name "store" :regexes [#"Rimi" #"Rema"]}])}
                       (cashflow/test-app-handler (ring-mock/request :get "/api/categories"))
                       json-util/json-parse-body)]

        response => (contains {:body anything :headers anything :status 200})
        (:body response) => [{:name "store" :regexes ["Rimi" "Rema"]}]))

(fact "can get category"
      (let [response (->
                       {:categories (atom [{:name "power" :regexes [#"Pwr"]}
                                           {:name "stuff" :regexes [#"stuff"]}])}
                       (cashflow/test-app-handler (ring-mock/request :get "/api/categories/power"))
                       json-util/json-parse-body)]
        response => (contains {:body anything :headers anything :status 200})
        (:body response) => {:name "power" :regexes ["Pwr"]}))

(fact "can delete category"
      (let [mutants {:categories (atom [{:name "power" :regexes [#"Pwr"]}])}
            response (->
                       mutants
                       (cashflow/test-app-handler (ring-mock/request :delete "/api/categories/power"))
                       json-util/json-parse-body)]
        response => (contains {:body anything :headers anything :status 200})
        (count @(:categories mutants)) => 0))