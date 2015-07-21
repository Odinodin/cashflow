(ns cashflow.pages
  (:require-macros [cljs.core.async.macros :refer [go]])
  (:require [cljs.core.async :refer [put!]]
            [quiescent.core :as q]
            [quiescent.dom :as d]))

(q/defcomponent Menu []
                (d/ul {:className "navbar"}
                      (d/li {:className "title"} "Cashflow")
                      (d/li {:className "nav-item"} (d/a {:href "#/categories"} "Categories"))
                      (d/li {:className "nav-item"} (d/a {:href "#/transactions"} "Transactions"))
                      (d/li {:className "nav-item"} (d/a {} "Graphs"))))

(q/defcomponent CategoryEditor []
                (d/div {:className "bg-box"}
                       (d/form {:className "padded"}
                               (d/input {:name "name" :type "text" :placeholder "Category name" :className "form-control"})
                               (d/input {:name "matches" :type "text" :placeholder "Matches" :className "form-control"}))))

(q/defcomponent CategoryTable [categories action-chan]
                (let [delete-fn (fn [category-name event]
                                  (put! action-chan {:type          :delete-category
                                                     :category-name category-name})
                                  (.preventDefault event))]
                  (d/div {:className "bg-box padded"}
                         (d/table {}
                                  (d/thead {}
                                           (d/th {} "")
                                           (d/th {} "Category")
                                           (d/th {} "Matches"))

                                  (when (seq categories)
                                    (d/tbody {}
                                             (map #(d/tr {}
                                                         (d/td {}
                                                               (d/button {:className "delete" :onClick (partial delete-fn (:name %))} "\u2716"))
                                                         (d/td {:className "category"} (:name %))
                                                         (d/td {} (clojure.string/join ", " (sort (:matches %))))) categories)))))))


(q/defcomponent TransactionRow [transaction]
                (let [amount-class (if (pos? (:amount transaction)) "positive" "negative")]

                  (d/tr {}
                        (d/td {} (:date transaction))
                        (d/td {} (:code transaction))
                        (d/td {} (:description transaction))
                        (d/td {:className amount-class} (:amount transaction))
                        (d/td {:className (when (:category transaction) "category")} (:category transaction)))))

(q/defcomponent TransactionsTable [transactions]
                (d/div {:className "bg-box padded"}
                       (d/table {}
                                (d/thead {}
                                         (d/tr {}
                                               (d/th {} "Date")
                                               (d/th {} "Code")
                                               (d/th {} "Description")
                                               (d/th {} "Amount")
                                               (d/th {} "Category")))

                                ;; Only show rows when there are transactions
                                (when (seq transactions)
                                  (d/tbody {}
                                           (map #(TransactionRow %)
                                                transactions))))))


(q/defcomponent TimeFilter [{:keys [available-years time-filter]} action-chan]
                (let [month-map (zipmap (range 1 13) ["Jan" "Feb" "Mar" "Apr" "May" "Jun" "Jul" "Aug" "Sep" "Oct" "Nov" "Dec"])
                      year-class-fn (fn [year] (if (= year (:year time-filter)) "flat-button selected" "flat-button"))
                      month-class-fn (fn [month-index] (if (= month-index (:month time-filter)) "flat-button selected" "flat-button"))
                      on-year-click (fn [year event] (put! action-chan {:type :update-time-filter :time-filter {:year year}}) (.preventDefault event))
                      on-month-click (fn [month event] (put! action-chan {:type :update-time-filter :time-filter (assoc time-filter :month month)}) (.preventDefault event))]

                  (d/div {:className "bg-box padded"}
                         (d/div {:className "container"}
                                (map (fn [year] (d/div {:className "item"}
                                                       (d/button {:className (year-class-fn year) :onClick (partial on-year-click year)} year)))
                                     available-years))
                         (d/div {:className "container"}
                                (map (fn [[index name]] (d/div {:className "item"}
                                                               (d/button {:className (month-class-fn index) :onClick (partial on-month-click index)} name)))
                                     month-map)))))

(defn renderTransactions [store action-chan]
  (q/render
    (d/div {:id "main"}
           (Menu)
           (TimeFilter (select-keys store [:available-years :time-filter])
                       action-chan)
           (TransactionsTable (:transactions store)))
    (.getElementById js/document "main")))

(defn renderCategories [store action-chan]
  (q/render
    (d/div {:id "main"}
           (Menu)
           (CategoryEditor)
           (CategoryTable (:categories store) action-chan))
    (.getElementById js/document "main")))