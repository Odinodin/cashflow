(ns cashflow.views.transactions-views
  (:require
    [ring.util.response :refer [resource-response response redirect]]
    [selmer.parser :refer [render-file]]
    [clj-time.format :as t-format]
    [cashflow.models.transactions :as trans]))


(defn all-transactions [transactions]
  (if-let [year (last (trans/unique-years @transactions))]
    (redirect (str "/transactions/" year))
    (render-file "public/templates/transactions.html" {:transactions []
                                                       :sum-by-tag   []
                                                       :years        []})))

(defn- date-time->date-string [transactions]
  (map (fn [trans] (update-in trans [:date] #(t-format/unparse (t-format/formatters :date) %))) transactions))


(defn transactions-in-year [transactions year]
  (let [transactions-in-year (trans/transactions-in-year @transactions (. Integer parseInt year))]
    (render-file "public/templates/transactions.html"
                 {:transactions (date-time->date-string transactions-in-year)
                  :sum-by-tag   (trans/sum-transactions-pr-category transactions-in-year)
                  :years        (trans/unique-years @transactions)
                  :current-year year})))


(defn transactions-in-month [transactions year month-index]
  (let [transactions-in-month (trans/transactions-in-month @transactions (. Integer parseInt year) (. Integer parseInt month-index))]
    (render-file
      "public/templates/transactions.html"
      {:transactions (date-time->date-string transactions-in-month)
       :sum-by-tag   (trans/sum-transactions-pr-category transactions-in-month)
       :years        (trans/unique-years @transactions)
       :current-year year
       :current-month month-index})))