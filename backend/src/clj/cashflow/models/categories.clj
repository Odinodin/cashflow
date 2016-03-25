(ns cashflow.models.categories
  (:import (java.util.regex Pattern))
  (:require [datomic.api :as d]
            [cashflow.models.db :as cdb]))

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

(defn- db-id->entity-map
  "Takes a db-id (datomic entity id) and returns a hydrated entity in the form of a regular map"
  [db db-id]
  (when db-id
    (->>
      db-id
      (d/entity db)                                         ;; id -> lazy entity map
      d/touch
      (into {}))))

;; TODO extract in to separte ns
(defn- db-ids->entity-maps
  "Takes a list of datomic entity ids retrieves and returns
  a list of hydrated entities in the form of a list of maps."
  [db-conn db-ids]
  (->>
    db-ids
    seq
    flatten
    (map #(db-id->entity-map (d/db db-conn) %))))

(defn dt-list-categories []
  (->>
    (d/q
      '[:find ?e
        :where
        [?e :category/name]]
      (d/db cdb/db-conn))
    (db-ids->entity-maps cdb/db-conn)))

(defn dt-find-category-id [db category-name]
  (->> (d/q
         '[:find ?e
           :in $ ?category-name
           :where
           [?e :category/name ?category-name]]
         db
         category-name)
       ffirst))

(defn dt-find-category [db category-name]
  (->> (dt-find-category-id db category-name)
       (db-id->entity-map db)))

(defn find-category [category-name]
  (dt-find-category (d/db cdb/db-conn) category-name))

(defn- create-new-category!
  [category]
  (let [tempid (d/tempid :db.part/user)
        category-with-db-id (assoc category :db/id tempid)]
    (->
      @(d/transact cdb/db-conn
                   [category-with-db-id])
      (hydrate-entity tempid))))

;; TODO can be simplified
(defn- values-to-retract [key oldmap newmap]
  (clojure.set/difference
    (-> (get oldmap key) set)
    (-> (get newmap key) set)))

(defn- update-category!
  [prev-cat-db-id new-cat]
  (let [new-cat (assoc new-cat :db/id #db/id [:db.part/user])
        prev-cat (db-id->entity-map (d/db cdb/db-conn) prev-cat-db-id)
        retracts-vals (values-to-retract :category/matches prev-cat new-cat)
        retract-statements (for [match retracts-vals]
                             [:db/retract prev-cat-db-id :category/matches match])]

      @(d/transact cdb/db-conn (conj retract-statements new-cat))
      (dt-find-category (d/db cdb/db-conn) (:category/name new-cat))))


(defn dt-add-category! [category]
  (if-let [prev-cat-db-id (dt-find-category-id (d/db cdb/db-conn) (:category/name category))]
    (update-category! prev-cat-db-id category)
    (create-new-category! category)))

(defn dt-remove-category! [category-name]
  (let [category-id (->> (d/q
                           '[:find ?e
                             :in $ ?category-name
                             :where
                             [?e :category/name ?category-name]]
                           (d/db cdb/db-conn)
                           category-name)
                         ffirst)]
    (d/transact cdb/db-conn [[:db.fn/retractEntity category-id]])))