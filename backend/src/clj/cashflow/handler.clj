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
            [cashflow.routes.home :refer [home-routes]]
            [cashflow.routes.transactions :refer [transactions-routes]]
            [cashflow.routes.categories :refer [category-routes]]))

(encoding/add-common-json-encoders!)

;; Contains all mutants.
;; :transactions are lists of maps with these keys:   {:date :code :description :amount :category}
;; :categories are lists of                                 {:name "categoryname" :regexes [#"list" #"of" #"regexes"]}
(declare mutants)

(defn init []
  (println "cashflow is starting..")
  (def mutants
    {:transactions (atom [])
     :categories (atom [])})
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
               category-routes
               transactions-routes)
      home-routes
      app-routes)
    (handler/site)
    (middleware/wrap-restful-format :formats [:json-kw])
    #_(prone/wrap-exceptions)))

(defn test-app-handler
  [testmutants request]
  (app (assoc request :mutants testmutants)))

(defn lein-app-handler
  [request]
  (app (assoc request :mutants mutants)))