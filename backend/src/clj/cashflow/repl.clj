(ns cashflow.repl
  (:use cashflow.handler
        ring.server.standalone
        clojure.repl
        [ring.middleware file-info file])
  (:require [clj-time.coerce :as t-coerce]
            [clj-time.format :as t-format]
            [clj-time.core :as t]
            [selmer.parser :as selmer]
            [clojure.pprint :refer [pprint]]
            [clojure.tools.namespace.repl :refer [refresh]]

            [cashflow.handler :as handler]
            [cashflow.models.transactions :as trans]
            [cashflow.models.categories :as categories]))

(defonce server (atom nil))

(defn get-handler []
  ;; #'app expands to (var app) so that when we reload our code,
  ;; the server is forced to re-resolve the symbol in the var
  ;; rather than having its own copy. When the root binding
  ;; changes, the server picks it up without having to restart.
  (-> #'lein-app-handler
      ; Makes static assets in $PROJECT_DIR/resources/public/ available.
      (wrap-file "resources")
      ; Content-Type, Content-Length, and Last Modified headers for files in body7
      (wrap-file-info)))

(defn start-server
  "used for starting the server in development mode from REPL"
  [& [port]]
  (let [port (if port (Integer/parseInt port) 8080)]
    (reset! server
            (serve (get-handler)
                   {:port         port
                    :init         init
                    :auto-reload? true
                    :destroy      destroy
                    :join         true}))
    (println (str "You can view the site at http://localhost:" port))))

(defn stop-server []
  (.stop @server)
  (reset! server nil))


(defn bootstrap-testdata []
  (let [categories (:categories handler/mutants)
        transactions (:transactions handler/mutants)]
    (reset! categories [])
    (reset! transactions [])
    (trans/add-transactions-in-file! transactions (.getFile (clojure.java.io/resource "test-transactions.csv")))
    (categories/add-category! categories {:name "Butikk" :regexes [#"Rema" #"Kiwi" #"Rimi" #"KIWI" #"Coop" #"REMA"]})
    (categories/add-category! categories {:name "Reise" :regexes [#"NSB" #"Jet"]})
    (categories/add-category! categories {:name "Barnehage" :regexes [#"Barnehage"]})
    (categories/add-category! categories {:name "Hus" :regexes [#"Housing", #"Kommunen" #"Husleie"]})
    (categories/add-category! categories {:name "Møbler" :regexes [#"Ikea", #"Plantasjon" #"Maxbo"]})
    (categories/add-category! categories {:name "Lommepenger" :regexes [#"Kantine" #"Narvesen" #"Botanisk" #"Baker"]})
    (categories/add-category! categories {:name "Mobil" :regexes [#"Mobil"]})
    (categories/add-category! categories {:name "Lønn" :regexes [#"Megacorp"]})
    (categories/tag-and-update-transactions! transactions categories)))

(defn start-and-bootstrap []
  (start-server)
  (bootstrap-testdata))