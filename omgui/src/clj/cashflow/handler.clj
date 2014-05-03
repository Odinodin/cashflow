(ns cashflow.handler
  (:require [compojure.core :refer [defroutes routes context ANY]]
            [ring.middleware.resource :refer [wrap-resource]]
            [ring.middleware.file-info :refer [wrap-file-info]]
            [hiccup.middleware :refer [wrap-base-url]]
            [compojure.handler :as handler]
            [compojure.route :as route]
            clojure.tools.nrepl.server
            [ring.middleware.json :as middleware]
            [cashflow.routes.home :refer [home-routes]]
            [cashflow.routes.api-proxy :refer [api-proxy-routes]]))

(defn init []
  (println "omgui is starting")
  (let [repl (clojure.tools.nrepl.server/start-server :port 0 :bind "127.0.0.1")]
    (println "Repl started at" (:port repl))))

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