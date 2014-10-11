(ns cashflow.routes.tags-test
  (:import java.io.ByteArrayInputStream)
  (:require [ring.mock.request :as ring-mock]
            [midje.sweet :refer :all]
            [cheshire.core :as json]
            [cashflow.handler :as cashflow]
            [cashflow.models.tags :as tags]
            [cashflow.json-util :as json-util]))

(fact "can create tag"
      (let [response (->
                       {:tags (atom [])}
                       (cashflow/test-app-handler {:request-method :post
                                                   :uri            "/api/tags"
                                                   :body           (java.io.ByteArrayInputStream. (.getBytes (json/generate-string {:name "test" :regexes ["a" "b"]}))) ;; extract this into a function
                                                   :content-type   "application/json"})
                       json-util/json-parse-body)]

        response => (contains {:body anything :headers anything :status 201})
        (:body response) => [{:name "test" :regexes ["a" "b"]}]))

(fact "can list tags"
      (let [response (->
                       {:tags (atom [{:name "store" :regexes [#"Rimi" #"Rema"]}])}
                       (cashflow/test-app-handler (ring-mock/request :get "/api/tags"))
                       json-util/json-parse-body)]

        response => (contains {:body anything :headers anything :status 200})
        (:body response) => [{:name "store" :regexes ["Rimi" "Rema"]}]))

(fact "can get tag"
      (let [response (->
                       {:tags (atom [{:name "power" :regexes [#"Pwr"]}
                                     {:name "stuff" :regexes [#"stuff"]}])}
                       (cashflow/test-app-handler (ring-mock/request :get "/api/tags/power"))
                       json-util/json-parse-body)]
        response => (contains {:body anything :headers anything :status 200})
        (:body response) => {:name "power" :regexes ["Pwr"]}))

(fact "can delete tags"
      (let [mutants {:tags (atom [{:name "power" :regexes [#"Pwr"]}])}
            response (->
                       mutants
                       (cashflow/test-app-handler (ring-mock/request :delete "/api/tags/power"))
                       json-util/json-parse-body)]
        response => (contains {:body anything :headers anything :status 200})
        (count @(:tags mutants)) => 0))