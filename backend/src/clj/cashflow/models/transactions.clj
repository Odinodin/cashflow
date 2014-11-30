(ns cashflow.models.transactions
  (:require [clojure.java.io :as io]
            [clj-time.core :as t]
            [clj-time.coerce :as tc]
            [datomic.api :as d]
            [cashflow.time :as ct])
  (:import [java.io BufferedReader FileReader]))

(def transaction-id-sequence (atom 0))

;; Example line:
;;  Date                       Code   Description                             Amount    Reference
;; ["06.05.2009" "06.05.2009" "VARER" "05.05 PRINCESS AVD. STENERSGT. 1 OSLO" "-119,00" "17017470066"]
(defn lines->transactions [lines-as-vectors]
  (for [[date date2 code description amount & dontcare] lines-as-vectors]
    {:date        (ct/string->date date)
     :code        code
     :description description :amount (-> amount
                                          (clojure.string/replace "," ".")
                                          bigdec)}))
(defn parse-file [file]
  {:pre [(not (nil? file))]}
  (with-open [rdr (BufferedReader.
                    (FileReader. file))]
    (let [lines (doall (line-seq rdr))]
      (for [line (rest lines)]
        (clojure.string/split line #"\t")))))

(defn to-transactions [id-atom lines]
  (->>
    lines
    lines->transactions
    (remove (comp #{"OVFNETTB" "MOB.B.OVF"} :code))
    (map #(assoc %1 :id (swap! id-atom inc)))))

(defn add-transactions-in-file! [transactions file]
  (->> (parse-file file)
       (to-transactions transaction-id-sequence)
       (swap! transactions into)))

(defn find-transaction [transactions id]
  (->> transactions
       (filter #(= id (:id %1)))
       first))

(defn change-transaction [transactions mutation]
  (swap! transactions
         (fn [trans]
           (map #(if (= (:id mutation) (:id %)) (merge % mutation) %)
                trans))))


;; Queries
(defn transactions-in-month [transaction-list year month-index]
  (->>
    (filter #(-> % :date (ct/same-year-month? year month-index)) transaction-list)
    (sort-by :date)))

(defn transactions-in-year [transaction-list year]
  (->>
    (filter #(-> % :date (ct/same-year? year)) transaction-list)
    (sort-by :date)))

;; Operations over transactions
(defn sum-transactions [transaction-list]
  (reduce + (map :transaction/amount transaction-list)))

(defn sum-transactions-pr-category [transaction-list]
  (let [unique-categorynames (-> (map :transaction/category transaction-list)
                                 distinct)]
    (for [categoryname unique-categorynames]
      {:category categoryname
       :sum      (sum-transactions (filter #(= categoryname (:transaction/category %)) transaction-list))})))

(defn- dt->year-month-map [dt]
  {:year (. dt getYear) :month (. dt getMonthOfYear)})

(defn- transactions->income
  "Takes a list of transactions and outputs the income sum
  [ {:amount -11} {:amount 2} {:amount -1}] -> -12"
  [transactions]
  (->>
    transactions
    (filter #(-> % :transaction/amount pos?))
    (reduce #(+ (:transaction/amount %2) %1) 0)))

(defn- transactions->expense
  "Takes a list of transactions and outputs the expense sum
  [ {:amount -11} {:amount 2} {:amount -1}] -> 2"
  [transactions]
  (->>
    transactions
    (filter #(-> % :transaction/amount neg?))
    (reduce #(+ (:transaction/amount %2) %1) 0)))

(defn net-income-by-month
  "Takes a list of transactions and outputs a list of {:time '2009-10' :income 121 :expense -233}"
  [transactions]
  (let [grouped-by-month (group-by #(dt->year-month-map (:transaction/date %)) transactions)
        sorted (sort-by
                 (fn [[k _]] ((juxt :year :month) k)) grouped-by-month)]
    (for [[k v] sorted]
      {:time    (str (:year k) "-" (:month k))
       :income  (transactions->income v)
       :expense (transactions->expense v)})))

;; Datomic
(defn- date->datetime [transaction-list]
  (map #(->
         %1
         (update-in [:transaction/date] tc/to-date-time))
       transaction-list))


(defn add-transactions [db-conn transactions]
  (let [transactions-with-db-id (map #(->
                                       %1
                                       (update-in [:transaction/date] tc/to-date)
                                       (assoc :db/id (d/tempid :db.part/user))
                                       (assoc :transaction/id (str (java.util.UUID/randomUUID)))) transactions)]
    @(d/transact db-conn
                 transactions-with-db-id)))

;; TODO extract in to separte ns
(defn- db-ids->entity-maps
  "Takes a list of datomic entity ids retrieves and returns
  a list of hydrated entities in the form of a list of maps."
  [db db-ids]
  (->>
    db-ids
    seq
    flatten
    (map #(->>
           %
           ;; id -> lazy entity map
           (d/entity db)
           ;; realize all values
           d/touch
           (into {})))))

(defn d-all-transactions [db]
  (->>
    (d/q
      '[:find ?e
        :where
        [?e :transaction/id]]
      db)
    (db-ids->entity-maps db)
    date->datetime))

(defn d-find-transaction-by-id [db id]
  (->>
    (d/q
      '[:find ?e
        :in $ ?q-id
        :where
        [?e :transaction/id ?q-id]]
      db
      id)
    (db-ids->entity-maps db)
    date->datetime
    first))

;; TODO take db as param, not db-conn
(defn dfind-transactions-by-year [db-conn year]
  (->>
    (d/q
      '[:find ?e
        :in $ ?q-year
        :where
        [?e :transaction/date ?date]
        [((fn [dt] (+ (.getYear dt) 1900)) ?date) ?tyear]
        [(= ?q-year ?tyear)]]
      (d/db db-conn)
      year)
    (db-ids->entity-maps (d/db db-conn))
    date->datetime))

;; TODO take db as param, not db-conn
(defn dfind-transactions-by-month [db-conn year month-index]
  (->>
    (d/q
      '[:find ?e
        :in $ ?q-year ?q-month
        :where
        [?e :transaction/date ?date]
        [((fn [dt] (+ (.getYear dt) 1900)) ?date) ?tyear]
        [((fn [dt] (+ (.getMonth dt) 1)) ?date) ?tmonth]
        [(= ?q-year ?tyear)]
        [(= ?q-month ?tmonth)]]
      (d/db db-conn)
      year
      month-index)
    (db-ids->entity-maps (d/db db-conn))
    date->datetime))

(defn dfind-unique-years-in-transactions [db]
  (->
    (d/q
      '[:find (distinct ?year)
        :where
        [_ :transaction/date ?date]
        [((fn [dt] (+ (.getYear dt) 1900)) ?date) ?year]
        ]
      db)
    ffirst))