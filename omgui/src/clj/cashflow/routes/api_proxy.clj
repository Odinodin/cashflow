(ns cashflow.routes.api-proxy
  (:require clj-http.client
            cheshire.core
            clojure.walk
            [compojure.core :refer :all]))

(defn log-and-return-body
  [req]
  (let [json-body (:body req)
        parsed-body (cheshire.core/parse-string (slurp json-body))
        new-body-json (cheshire.core/generate-string parsed-body)]

    new-body-json))

(defn api-proxy
  [req]
  (println "API PROXY!")
  (let [url (str "http://localhost:8080/api"
                 (get-in req [:route-params :*]))
        api-req {:url url
                 :method (req :request-method)
                 :body (log-and-return-body req)
                 :headers (req :headers)
                 :throw-exceptions false
                 :follow-redirects false}]
    (println (str "API req " api-req))
    (clj-http.client/request api-req)))

(defroutes api-proxy-routes
           (ANY "/api*" [:as request] (api-proxy request)))
