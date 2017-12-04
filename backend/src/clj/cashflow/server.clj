(ns cashflow.server
  (:require [mount.core :refer [defstate] :as mount]
            [ring.adapter.jetty :as jetty]
            [cashflow.handler :refer [lein-app-handler init]]))

(defn start
  "used for starting the server in development mode from REPL"
  [& [port]]
  (let [port (if port (Integer/parseInt port) 8080)]
    (jetty/run-jetty
      lein-app-handler
      {:port port
       :configurator init
       :open-browser? false
       :join? false})))

(defstate server
  :start (start)
  :stop (.stop server))

(defn -main [args]
  (start))