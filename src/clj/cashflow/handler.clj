(ns cashflow.handler
  (:require [compojure.core :refer [defroutes routes context ANY]]
            [ring.middleware.resource :refer [wrap-resource]]
            [ring.middleware.file-info :refer [wrap-file-info]]
            [hiccup.middleware :refer [wrap-base-url]]
            [compojure.handler :as handler]
            [compojure.route :as route]
            [ring.middleware.json :as middleware]
            [cashflow.encoding :as encoding]
            [cashflow.routes.home :refer [home-routes]]
            [cashflow.routes.transactions :refer [transactions-routes]]
            [cashflow.routes.tags :refer [tags-routes]]))

(defn init []
  (println "cashflow is starting")
  (encoding/add-common-json-encoders!))

(defn destroy []
  (println "cashflow is shutting down"))

(defroutes app-routes
           (route/resources "/")
           (route/not-found "Not Found"))

;; TODO Extract routes that need json-body/response middlewares.
(def app
  (->
    (routes
      home-routes
      tags-routes
      transactions-routes
      app-routes)
    (handler/site)
    (wrap-base-url)
    (middleware/wrap-json-body)
    (middleware/wrap-json-response)))


