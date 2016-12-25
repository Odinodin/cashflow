(ns repl
  (:use cashflow.handler
        ring.adapter.jetty
        clojure.repl
        [ring.middleware file-info file])
  (:require [clj-time.coerce :as t-coerce]
            [clj-time.format :as t-format]
            [clj-time.core :as t]
            [clojure.pprint :refer [pprint]]
            [clojure.tools.namespace.repl :refer [refresh]]
            [datomic.api :as d]
            [mount.core :refer [defstate] :as mount]
            [cashflow.server :as server]
            [cashflow.handler :as handler]
            [cashflow.models.transactions :as trans]
            [cashflow.models.categories :as categories]))

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

(defn bootstrap-testdata []
  (trans/add-transactions-in-file! (.getFile (clojure.java.io/resource "test-transactions.csv")))
  (cashflow.models.categories/dt-add-category! {:category/name "Butikk" :category/matches ["Rema" "Kiwi"]})

  #_(comment
      (categories/add-category! categories {:name "Butikk" :regexes [#"Rema" #"Kiwi" #"Rimi" #"KIWI" #"Coop" #"REMA"]})
      (categories/add-category! categories {:name "Reise" :regexes [#"NSB" #"Jet"]})
      (categories/add-category! categories {:name "Barnehage" :regexes [#"Barnehage"]})
      (categories/add-category! categories {:name "Hus" :regexes [#"Housing", #"Kommunen" #"Husleie"]})
      (categories/add-category! categories {:name "Møbler" :regexes [#"Ikea", #"Plantasjon" #"Maxbo"]})
      (categories/add-category! categories {:name "Lommepenger" :regexes [#"Kantine" #"Narvesen" #"Botanisk" #"Baker"]})
      (categories/add-category! categories {:name "Mobil" :regexes [#"Mobil"]})
      (categories/add-category! categories {:name "Lønn" :regexes [#"Megacorp"]})
      (categories/tag-and-update-transactions! transactions categories)))

(defn create-empty-in-memory-db [uri]
  (d/delete-database uri)
  (d/create-database uri)
  (let [conn (d/connect uri)
        schema (load-file (.getFile (clojure.java.io/resource "schema.edn")))]
    (d/transact conn schema)
    conn))

(defn run []
  (create-empty-in-memory-db "datomic:mem://cashflow-db")
  (mount/start)
  (bootstrap-testdata))

(defn reset []
  (mount/stop)
  (mount/start))