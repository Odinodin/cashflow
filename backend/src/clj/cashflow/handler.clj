(ns cashflow.handler
  (:require [compojure.core :refer [defroutes routes context ANY]]
            [ring.middleware.resource :refer [wrap-resource]]
            [ring.middleware.file-info :refer [wrap-file-info]]
            [hiccup.middleware :refer [wrap-base-url]]
            [compojure.handler :as handler]
            [compojure.route :as route]
            clojure.tools.nrepl.server
            [ring.middleware.json :as middleware]
            [cashflow.encoding :as encoding]
            [cashflow.routes.home :refer [home-routes]]
            [cashflow.routes.transactions :refer [transactions-routes]]
            [cashflow.routes.tags :refer [tags-routes]]))

(encoding/add-common-json-encoders!)

;; Contains all mutants.
;; :transactions are lists of maps with these keys:   {:date :code :description :amount :tags}
;; :tags are lists of                                 {:name "tagname" :regexes [#"list" #"of" #"regexes"]}
(declare mutants)

(defn init []
  (println "cashflow is starting..")
  (def mutants
    {:transactions (atom [])
     :tags (atom [])})
  #_(let [repl (clojure.tools.nrepl.server/start-server :port 0 :bind "127.0.0.1")]
    (println "Repl started at" (:port repl))))

(defn destroy []
  (println "cashflow is shutting down"))

(defroutes app-routes
           (route/resources "/")
           (route/not-found "Not Found"))

(def app
  (->
    (routes
      (context "/api" []
               tags-routes
               transactions-routes)
      home-routes
      app-routes)
    (handler/site)
    (wrap-base-url)
    (middleware/wrap-json-body)
    (middleware/wrap-json-response)))

(defn test-app-handler
  [testmutants request]
  (app (assoc request :mutants testmutants)))

(defn lein-app-handler
  [request]
  (app (assoc request :mutants mutants)))