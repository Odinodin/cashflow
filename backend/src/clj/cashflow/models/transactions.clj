(ns cashflow.models.transactions
  (:require [clojure.java.io :as io]
            [clj-time.core :as t]
            [clj-time.format :as t-format]
            [clj-time.coerce :as t-coerce])
  (:import [java.io BufferedReader FileReader]))

;; Contains all transactions.
;; Contains a list of maps with the following keys: [:date :code :description :amount :tags]
(def transactions (atom []))

(defn- string->date [date]
  (t-format/parse (t-format/formatter "dd.MM.yyyy") date))

(defn- iso8600string->date [date]
  (t-format/parse (t-format/formatter "yyyy-MM-dd") date))

;; Example line:
;;  Date                       Code   Description                             Amount    Reference
;; ["06.05.2009" "06.05.2009" "VARER" "05.05 PRINCESS AVD. STENERSGT. 1 OSLO" "-119,00" "17017470066"]
(defn lines->transactions [lines-as-vectors]
  (for [[date date2 code description amount & dontcare] lines-as-vectors]
    {:date (string->date date) :code code :description description :amount (-> amount
                                                                               (clojure.string/replace "," ".")
                                                                               bigdec)}))
(defn parse-file [file]
  {:pre [(not (nil? file))]}
  (with-open [rdr (BufferedReader.
                    (FileReader. file))]
    (let [lines (doall (line-seq rdr))]
      (for [line (rest lines)]
        (clojure.string/split line #"\t")))))


(defn add-transactions! [file]
  (->> (parse-file file)
       lines->transactions
       (swap! transactions into)))

;; Date helpers
(defn- same-date? [date1 date2]
  (= (t-coerce/to-local-date date1)
     (t-coerce/to-local-date date2)))

(defn- same-year-month? [date year month]
  (and (= (clj-time.core/year date) year)
       (= (clj-time.core/month date) month)))

;; Queries
;; TODO Add test + submit patch to clj-time (same-year?, same-year-month?)
(defn transactions-in-month [transaction-list year month-index]
  (->>
    (filter #(-> % :date (same-year-month? year month-index)) transaction-list)
    (sort-by :date)))

(defn transactions-at-date [transaction-list query-date]
  (->>
    (filter #(-> % :date (same-date? query-date)) transaction-list)
    (sort-by :date)))

(defn transactions-in-interval [transaction-list interval]
  (->>
    (filter #(->>
              %
              :date
              (t/within? interval)) transaction-list)
    (sort-by :date)))

(defn transactions-in [start-date end-date]
  (transactions-in-interval
    @transactions
    (t/interval (iso8600string->date start-date)
                (iso8600string->date end-date))))

(defn transactions-at [query-date]
  (transactions-at-date @transactions (iso8600string->date query-date)))

;; Operations over transactions
(defn sum-transactions [transaction-list]
  (reduce + (map :amount transaction-list)))


(defn sum-transactions-pr-tag [transaction-list]
  (let [unique-tagnames (-> (map :tags transaction-list)
                            flatten
                            distinct)]
    (for [tagname unique-tagnames]
      {:tagname      tagname
       :sum          (sum-transactions (filter #(some #{tagname} (:tags %)) transaction-list))})))

(defn sum-transactions-pr-tag [transaction-list]
  (let [unique-tagnames (-> (map :tags transaction-list)
                            flatten
                            distinct)]
    (for [tagname unique-tagnames]
      {:tagname      tagname
       :sum          (sum-transactions (filter #(some #{tagname} (:tags %)) transaction-list))})))


(defn- dt->year-month-map [dt]
  {:year (. dt getYear) :month (. dt getMonthOfYear)})

;; Takes a list of transactions and outputs the income sum
;; [ {:amount -11} {:amount 2} {:amount -1}] -> -12
(defn- transactions->income [transactions]
  (->>
    transactions
    (filter #(-> % :amount pos?))
    (reduce #(+ (:amount %2) %1) 0)))

;; Takes a list of transactions and outputs the expense sum
;; [ {:amount -11} {:amount 2} {:amount -1}] -> 2
(defn- transactions->expense [transactions]
  (->>
    transactions
    (filter #(-> % :amount neg?))
    (reduce #(+ (:amount %2) %1) 0)))

(defn net-income-by-month [transactions]
  (for [[k v] (group-by #(dt->year-month-map (:date %)) transactions)]
    {k {:income  (transactions->income v)
        :expense (transactions->expense v)}}))
