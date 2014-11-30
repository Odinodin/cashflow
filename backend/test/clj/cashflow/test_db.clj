(ns cashflow.test-db
  (:require [datomic.api :as d]))

(defn create-empty-in-memory-db [uri]
  (d/delete-database uri)
  (d/create-database uri)
  (let [conn (d/connect uri)
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