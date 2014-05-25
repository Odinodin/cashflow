(ns cashflow.views.graph-view
  (:require
    [selmer.parser :refer [render-file]]
    [cashflow.models.transactions :as transactions]))


;; Graphing for all transactions
(defmulti graph identity)
(defmethod graph :sum-by-tag [_]
  (let [years (transactions/unique-years @transactions/transactions)]
    (render-file "public/templates/graph_sum_by_tag.html"
                 {:sum-by-tag   (vec (transactions/sum-transactions-pr-tag @transactions/transactions))
                  :years        years
                  :current-year (first years)})))

(defmethod graph :net-income [_]
  (render-file "public/templates/graph_net_income.html"
               {:net-income-by-month (vec (transactions/net-income-by-month @transactions/transactions))
                :years               (transactions/unique-years @transactions/transactions)}))

;; Graphing by time
(defmulti graph-month (fn [graph-type _ _] graph-type))
(defmethod graph-month :sum-by-tag [_ year month-idx]
  (let [transactions-in-month (transactions/transactions-in-month @transactions/transactions year month-idx)]
    (render-file
      "public/templates/graph_sum_by_tag.html"
      {:sum-by-tag    (vec (transactions/sum-transactions-pr-tag transactions-in-month))
       :years         (transactions/unique-years @transactions/transactions)
       :current-year  year
       :current-month month-idx})))

(defmulti graph-year (fn [graph-type _] graph-type))
(defmethod graph-year :net-income [_ year]
  (let [transactions-in-all-months-of-year (transactions/transactions-in-year @transactions/transactions year)]
    (render-file
      "public/templates/graph_net_income.html"
      {:net-income-by-month (vec (transactions/net-income-by-month transactions-in-all-months-of-year))
       :years               (transactions/unique-years @transactions/transactions)
       :current-year        year})))
(defmethod graph-year :sum-by-tag [_ year]
  (let [transactions-in-month (transactions/transactions-in-year @transactions/transactions year)]
    (render-file
      "public/templates/graph_sum_by_tag.html"
      {:sum-by-tag   (vec (transactions/sum-transactions-pr-tag transactions-in-month))
       :years        (transactions/unique-years @transactions/transactions)
       :current-year year})))




