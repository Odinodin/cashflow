(ns cashflow.models.categories
  (:import (java.util.regex Pattern))
  (:require [datomic.api :as d]))

(defn- category-matches-text?
  [category text]
  (let [matches (:category/matches category)]
    (some #(re-find (re-pattern (str "(?i)" (Pattern/quote %))) text) matches)))

(defn suggest-categories
  "Find matching categories names by returning all categories that match the text.
  Returns a set of category names"
  [transaction categories]
  (->>
    categories
    (filter #(category-matches-text? % (:transaction/description transaction)))
    (map :category/name)
    (into #{})))

(defn hydrate-entity
  "Takes a datom and a tempid and retrieves the entity as a map"
  [datom tempid]
  (let [db (:db-after datom)]
    (->>
      (d/resolve-tempid db (:tempids datom) tempid)
      (d/entity db)
      d/touch
      (into {}))))

;; Datomic
(defn dt-add-category! [db-conn category]
  (let [tempid (d/tempid :db.part/user)
        category-with-db-id (assoc category :db/id tempid)]
    (->
      @(d/transact db-conn
                   [category-with-db-id])
      (hydrate-entity tempid))))

;; TODO extract in to separte ns
(defn- db-ids->entity-maps
  "Takes a list of datomic entity ids retrieves and returns
  a list of hydrated entities in the form of a list of maps."
  [db-conn db-ids]
  (->>
    db-ids
    seq
    flatten
    (map #(->>
           %
           ;; id -> lazy entity map
           (d/entity (d/db db-conn))
           d/touch
           (into {})))))

(defn dt-list-categories [db-conn]
  (->>
    (d/q
      '[:find ?e
        :where
        [?e :category/name]]
      (d/db db-conn))
    (db-ids->entity-maps db-conn)))


(defn dt-find-category [db category-name]
  (->> (d/q
         '[:find ?e
           :in $ ?category-name
           :where
           [?e :category/name ?category-name]]
         db
         category-name)
       ffirst
       (d/entity db)))

(defn dt-remove-category! [db-conn category-name]
  (let [category-id (->> (d/q
                           '[:find ?e
                             :in $ ?category-name
                             :where
                             [?e :category/name ?category-name]]
                           (d/db db-conn)
                           category-name)
                         ffirst)]
    (d/transact db-conn [[:db.fn/retractEntity category-id]])))