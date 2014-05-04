(ns cashflow.routes.tags-test
  (:require [ring.mock.request :as ring-mock]
            [midje.sweet :refer :all]
            cheshire.core
            [cashflow.handler :as cashflow]
            [cashflow.models.tags :as tags]
            [cashflow.json-util :as json-util]))

;; Required for initializing the application
(background (before :facts (cashflow/init)))

(fact "can list tags"
      (reset! tags/tags [{:name "store" :regexes [#"Rimi" #"Rema"]}])
      (let [response (->
                       (cashflow/app
                         (ring-mock/request :get "/api/tags"))
                       json-util/json-parse-body)]

        response => (contains {:body anything :headers anything :status 200})
        (:body response) => [{:name "store" :regexes ["Rimi" "Rema"]}]))

(fact "can get tag"
      (reset! tags/tags [{:name "power" :regexes [#"Pwr"]}
                         {:name "stuff" :regexes [#"stuff"]}])
      (let [response (->
                       (cashflow/app
                         (ring-mock/request :get "/api/tags/power"))
                       json-util/json-parse-body)]
        response => (contains {:body anything :headers anything :status 200})
        (:body response) => {:name "power" :regexes ["Pwr"]}))

(fact "can delete tags"
      (reset! tags/tags [{:name "power" :regexes [#"Pwr"]}])
      (let [response (->
                       (cashflow/app
                         (ring-mock/request :delete "/api/tags/power"))
                       json-util/json-parse-body)]
        response => (contains {:body anything :headers anything :status 200})
        (count @tags/tags) => 0))