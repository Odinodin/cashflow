(ns cashflow.views.graph-view
  (:require
    [selmer.parser :refer [render-file]]
    [cashflow.models.transactions :as transactions]))


;; Graphing for all transactions
(defmulti graph identity)
(defmethod graph :sum-by-tag [_]
           (render-file "public/templates/graph_sum_by_tag.html"
                        {:sum-by-tag  (vec (transactions/sum-transactions-pr-tag @transactions/transactions))}))

(defmethod graph :net-income [_]
  (render-file "public/templates/graph_net_income.html"
               {:sum-by-tag  (vec (transactions/sum-transactions-pr-tag @transactions/transactions))}))

;; Graphing by time
(defmulti graph-at-time (fn [graph-type _ _] graph-type))
(defmethod graph-at-time :sum-by-tag [_ year month-idx]
  (let [transactions-in-month (transactions/transactions-in-month @transactions/transactions year month-idx)]
    (render-file
      "public/templates/graph_sum_by_tag.html"
      {:sum-by-tag (vec (transactions/sum-transactions-pr-tag transactions-in-month))})))

;; TODO Implement in / out funciton in transactions
(defmethod graph-at-time :net-income [_ year month-idx]
  (let [transactions-in-month (transactions/transactions-in-month @transactions/transactions year month-idx)]
    (render-file
      "public/templates/graph_net_income.html"
      {:sum-by-tag (vec (transactions/sum-transactions-pr-tag transactions-in-month))})))




