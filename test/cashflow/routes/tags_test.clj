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
      (reset! tags/tags [{:tag "store" :regexes [#"Rimi" #"Rema"]}])
      (let [response (->
                       (cashflow/app
                         (ring-mock/request :get "/tags"))
                       json-util/json-parse-body)]

        response => (contains {:body anything :headers anything :status 200})
        (:body response) => [{:tag "store" :regexes ["Rimi" "Rema"]}]))

(fact "can get tag"
      (reset! tags/tags [{:tag "power" :regexes [#"Pwr"]}
                         {:tag "stuff" :regexes [#"stuff"]}])
      (let [response (->
                       (cashflow/app
                         (ring-mock/request :get "/tags/power"))
                       json-util/json-parse-body)]
        response => (contains {:body anything :headers anything :status 200})
        (:body response) => {:tag "power" :regexes ["Pwr"]}))