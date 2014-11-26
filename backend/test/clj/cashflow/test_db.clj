(ns cashflow.test-db
  (:require [datomic.api :as d]))

(defn create-empty-in-memory-db [uri]
  (d/delete-database uri)
  (d/create-database uri)
  (let [conn (d/connect uri)
        schema (load-file (.getFile (clojure.java.io/resource "schema.edn")))]
    (d/transact conn schema)
    conn))