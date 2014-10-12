(ns cashflow.handler
  (:require [compojure.core :refer [defroutes routes context ANY]]
            [ring.middleware.file-info :refer [wrap-file-info]]
            [compojure.handler :as handler]
            [compojure.route :as route]
            [ring.middleware.json :as middleware]
            [cashflow.routes.home :refer [home-routes]]
            [cashflow.routes.api-proxy :refer [api-proxy-routes]]))

(defn destroy []
  (println "cashflow is shutting down"))

(defroutes app-routes
           (route/resources "/")
           (route/not-found "Not Found"))

;; TODO Extract routes that need json-body/response middlewares.
(def app
  (->
    (routes
      api-proxy-routes
      home-routes
      app-routes)
    (handler/site)
    #_(wrap-base-url)))