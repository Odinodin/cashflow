(ns cashflow.test-db
  (:require [datomic.api :as d]
            [cashflow.models.db :as cdb]
            [mount.core :refer [defstate]]))

(def test-db-uri "datomic:mem://cashflow-db")

(defn create-empty-in-memory-db []
  (d/delete-database test-db-uri)
  (d/create-database test-db-uri)
  (let [conn (d/connect test-db-uri)
        schema (load-file (.getFile (clojure.java.io/resource "schema.edn")))]
    (d/transact conn schema)
    conn))

(defn datom->entity
  "Takes a datom i.e the result of a datomic transaction and finds the single
  entity in that transaction. "
  [datom]
  (->>
    datom
    :tempids
    vals
    first
    (d/entity (:db-after datom))
    d/touch))

(defstate test-db :start (cdb/create-conn test-db-uri))