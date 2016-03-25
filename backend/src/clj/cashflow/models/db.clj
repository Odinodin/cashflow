(ns cashflow.models.db
  (:require [mount.core :refer [defstate]]
            [datomic.api :as d]))

(defn create-conn [uri]
  (d/connect uri))

(defstate db-conn :start (create-conn "datomic:mem://cashflow-db"))