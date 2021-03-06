(ns cashflow.handler
  (:require [compojure.core :refer [defroutes routes context ANY]]
            [ring.middleware.resource :refer [wrap-resource]]
            [ring.middleware.file-info :refer [wrap-file-info]]
            [hiccup.middleware :refer [wrap-base-url]]
            [prone.middleware :as prone]
            [compojure.handler :as handler]
            [compojure.route :as route]
            clojure.tools.nrepl.server
            [ring.middleware.format :as middleware]
            [cashflow.encoding :as encoding]
            [cashflow.routes.transactions :refer [transactions-routes]]
            [cashflow.routes.categories :refer [category-routes]]
            [ring.middleware.file :as ring]))

(encoding/add-common-json-encoders!)

;; System configuration
(declare system)

(defn init [jetty-server]
  (println "cashflow is starting..")
  (def system
    {:database {:uri "datomic:mem://cashflow-db"}}))        ; TODO Currently hardcoded

(defn destroy []
  (println "cashflow is shutting down"))

(defroutes app-routes
           (route/not-found "Not Found"))

(def app
  (->
    (routes
      (context "/api" []
               category-routes
               transactions-routes)
      app-routes)
    (handler/site)
    (middleware/wrap-restful-format :formats [:json-kw])
    (ring/wrap-file "resources")
    wrap-file-info
    (prone/wrap-exceptions)))

;; TODO Validate the system map
(defn test-app-handler
  [request]
  (app request))

(defn lein-app-handler
  [request]
  (app (assoc request :system system)))

(defn datomic-app-handler
  [request]
  (app (assoc request :system {:database {:uri "datomic:dev://localhost:4334/cashflow"}})))