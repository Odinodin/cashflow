(ns cashflow.views.graph-view
  (:require
    [selmer.parser :refer [render-file]]
    [cashflow.models.transactions :as transactions]))


;; Graphing for all transactions
(defmulti graph (fn [graph-type _] graph-type))
(defmethod graph :sum-by-tag [_ mutants]
  (let [transactions (:transactions mutants)
         years (transactions/unique-years @transactions)]
    (render-file "public/templates/graph_sum_by_tag.html"
                 {:sum-by-tag   (vec (transactions/sum-transactions-pr-tag @transactions))
                  :years        years
                  :current-year (last years)})))

(defmethod graph :net-income [_ mutants]
  (render-file "public/templates/graph_net_income.html"
               {:net-income-by-month (vec (transactions/net-income-by-month @(:transactions mutants)))
                :years               (transactions/unique-years @(:transactions mutants))}))

;; Graphing by time
(defmulti graph-month (fn [graph-type _ _ _] graph-type))
(defmethod graph-month :sum-by-tag [_ mutants year month-idx]
  (let [transactions (:transactions mutants)
         transactions-in-month (transactions/transactions-in-month @transactions year month-idx)]
    (render-file
      "public/templates/graph_sum_by_tag.html"
      {:sum-by-tag    (vec (transactions/sum-transactions-pr-tag transactions-in-month))
       :years         (transactions/unique-years @transactions)
       :current-year  year
       :current-month month-idx})))

(defmulti graph-year (fn [graph-type _ _] graph-type))
(defmethod graph-year :net-income [_ mutants year]
  (let [transactions (:transactions mutants)
         transactions-in-all-months-of-year (transactions/transactions-in-year @transactions year)]
    (render-file
      "public/templates/graph_net_income.html"
      {:net-income-by-month (vec (transactions/net-income-by-month transactions-in-all-months-of-year))
       :years               (transactions/unique-years @transactions)
       :current-year        year})))
(defmethod graph-year :sum-by-tag [_ mutants year]
  (let [transactions (:transactions mutants)
         transactions-in-month (transactions/transactions-in-year @transactions year)]
    (render-file
      "public/templates/graph_sum_by_tag.html"
      {:sum-by-tag   (vec (transactions/sum-transactions-pr-tag transactions-in-month))
       :years        (transactions/unique-years @transactions)
       :current-year year})))