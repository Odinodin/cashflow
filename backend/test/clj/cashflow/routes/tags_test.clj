(ns cashflow.routes.tags-test
  (:require [ring.mock.request :as ring-mock]
            [midje.sweet :refer :all]
            cheshire.core
            [cashflow.handler :as cashflow]
            [cashflow.models.tags :as tags]
            [cashflow.json-util :as json-util]))

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