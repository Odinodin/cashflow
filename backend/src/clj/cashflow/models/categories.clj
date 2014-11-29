(ns cashflow.models.categories
  (:require [datomic.api :as d]))

(defn match-category-rules
  "Find matching category rules by returning all rules that
  have regexes that matches the text"
  [category-rules text]
  (filter
    (fn [rule]
      (some #(re-find % text) (:category/regexes rule)))
    category-rules))

(defn tag-transactions
  "Run all category rules over all transactions"
  [transactions category-rules]
  (map
    #(assoc %
            :transaction/category
            (->>
              (match-category-rules category-rules (:transaction/description %))
              (mapv :category/name)
              first))
    transactions))

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