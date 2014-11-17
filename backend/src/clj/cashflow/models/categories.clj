(ns cashflow.models.categories
  (:require [datomic.api :as d]))

(defn add-category! [categories category]
  (swap! categories conj category))

(defn remove-category! [categories category-name]
  (swap! categories #(remove (fn [category] (= (:name category) category-name)) %)))

(defn match-category-rules
  "Find matching category rules by returning all rules that
  have regexes that matches the text"
  [category-rules text]
  (filter
    (fn [rule]
      (some #(re-find % text) (:regexes rule)))
    category-rules))

(defn tag-transactions
  "Run all category rules over all transactions"
  [transactions category-rules]
  (map
    #(assoc % :category (->>
                          (match-category-rules category-rules (:description %))
                          (map :name)
                          (vec)
                          (first)))
    transactions))

(defn tag-and-update-transactions! [transactions categories]
  (reset! transactions (tag-transactions @transactions @categories)))

(defn get-transactions-in-category [transactions category]
  (filter #(= category (:category %)) transactions))

(defn categoryname->category [categories category-name]
  (first (filter #(= category-name (:name %)) categories)))

(defn delete! [categories category-name]
  (swap! categories #(remove (fn [category-rule] (= (:name category-rule) category-name)) %)))

;; Datomic
(defn dt-add-category! [db-conn category]
  (let [category-with-db-id (assoc category :db/id (d/tempid :db.part/user))]
    @(d/transact db-conn
                 [category-with-db-id])))


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
           ;; realize all values
           d/touch
           (into {:db/id %})))))

(defn dt-list-categories [db-conn]
  (->>
    (d/q
      '[:find ?e
        :where
        [?e :category/name]]
      (d/db db-conn))
    (db-ids->entity-maps db-conn)))


(defn dt-remove-category! [db-conn category-id]
  (d/transact db-conn [[:db.fn/retractEntity category-id]]))
