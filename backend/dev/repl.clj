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

(defn import-all-files [files]
  (doseq [f files]
    (trans/add-transactions-in-file! f)))

(defn import-transactions [absolute-path]
  (-> (clojure.java.io/file absolute-path)
      (.listFiles)
      (import-all-files)))

(defn bootstrap-testdata []
  (trans/add-transactions-in-file! (.getFile (clojure.java.io/resource "test-transactions.csv")))
  (cashflow.models.categories/dt-add-category! {:category/name "Butikk" :category/matches ["Rema" "Kiwi"]})
  (cashflow.models.categories/dt-add-category! {:category/name "Klær" :category/matches ["Carlings"]})
  (cashflow.models.categories/dt-add-category! {:category/name "Bil" :category/matches ["Q-park" "parkering"]})
  (cashflow.models.categories/dt-add-category! {:category/name "Helse" :category/matches ["apotek"]})
  (cashflow.models.categories/dt-add-category! {:category/name "Kafe" :category/matches ["cafe"]})
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
  (create-empty-in-memory-db "datomic:mem://cashflow-db")
  (mount/start)
  (bootstrap-testdata))

(comment
  (run)
  )