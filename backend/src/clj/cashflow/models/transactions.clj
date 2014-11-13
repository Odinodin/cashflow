(ns cashflow.models.transactions
  (:require [clojure.java.io :as io]
            [clj-time.core :as t]
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

(defn transactions-at-date [transaction-list query-date]
  (->>
    (filter #(-> % :date (ct/same-date? query-date)) transaction-list)
    (sort-by :date)))

(defn transactions-in-interval [transaction-list interval]
  (->>
    (filter #(->>
              %
              :date
              (t/within? interval)) transaction-list)
    (sort-by :date)))

(defn transactions-in [transactions start-date end-date]
  (transactions-in-interval
    transactions
    (t/interval (ct/iso8600string->date start-date)
                (ct/iso8600string->date end-date))))

(defn transactions-at [transactions query-date]
  (transactions-at-date transactions (ct/iso8600string->date query-date)))

(defn unique-years [transaction-list]
  (->>
    transaction-list
    (map #(-> % :date t/year))
    distinct
    vec
    sort))

;; Operations over transactions
(defn sum-transactions [transaction-list]
  (reduce + (map :amount transaction-list)))

(defn sum-transactions-pr-category [transaction-list]
  (let [unique-categorynames (-> (map :category transaction-list)
                            distinct)]
    (for [categoryname unique-categorynames]
      {:category categoryname
       :sum     (sum-transactions (filter #(= categoryname (:category %)) transaction-list))})))

(defn- dt->year-month-map [dt]
  {:year (. dt getYear) :month (. dt getMonthOfYear)})

(defn- transactions->income
  "Takes a list of transactions and outputs the income sum
  [ {:amount -11} {:amount 2} {:amount -1}] -> -12"
  [transactions]
  (->>
    transactions
    (filter #(-> % :amount pos?))
    (reduce #(+ (:amount %2) %1) 0)))

(defn- transactions->expense
  "Takes a list of transactions and outputs the expense sum
  [ {:amount -11} {:amount 2} {:amount -1}] -> 2"
  [transactions]
  (->>
    transactions
    (filter #(-> % :amount neg?))
    (reduce #(+ (:amount %2) %1) 0)))

(defn net-income-by-month
  "Takes a list of transactions and outputs a list of {:time '2009-10' :income 121 :expense -233}"
  [transactions]
  (let [grouped-by-month (group-by #(dt->year-month-map (:date %)) transactions)
        sorted (sort-by
                 (fn [[k _]] ((juxt :year :month) k)) grouped-by-month)]
    (for [[k v] sorted]
      {:time    (str (:year k) "-" (:month k))
       :income  (transactions->income v)
       :expense (transactions->expense v)})))

;; Datomic
(defn add-transactions [db-uri transactions]
  (let [transactions-with-db-id (map #(assoc %1 :db/id (d/tempid :db.part/user)) transactions)]
    @(d/transact (d/connect db-uri)
                transactions-with-db-id)))