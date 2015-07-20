(ns cashflow.pages
  (:require-macros [cljs.core.async.macros :refer [go]])
  (:require [cljs.core.async :refer [put!]]
            [quiescent.core :as q]
            [quiescent.dom :as d]))

(q/defcomponent Menu []
                (d/ul {:className "navbar"}
                      (d/li {:className "title"} "Cashflow")
                      (d/li {:className "nav-item"} (d/a {:href "#/categories"} "Categories"))
                      (d/li {:className "nav-item"} (d/a {:href "#/transactions" } "Transactions"))
                      (d/li {:className "nav-item"} (d/a {} "Graphs"))))

(q/defcomponent CategoryEditor []
                (d/div {:className "bg-box"}
                       (d/form {:className "padded"}
                               (d/input {:name "name" :type "text" :placeholder "Category name" :className "form-control"})
                               (d/input {:name "matches" :type "text" :placeholder "Matches" :className "form-control"}))))

(q/defcomponent CategoryTable [categories action-chan]
                (let [delete-fn (fn [category-name event]
                                  (.preventDefault event)
                                  (put! action-chan {:type :delete-category
                                                                       :category-name category-name}))]

                  (prn "cats" categories)
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

                                (when (seq transactions)
                                  (d/tbody {}
                                           (map #(d/tr {}
                                                       (d/td {} "a")
                                                       (d/td {} "b")
                                                       (d/td {} "c")
                                                       (d/td {} "d")
                                                       (d/td {} "e")))

                                           ))
                                )))


(q/defcomponent TimeFilter [years timeFilter]
                (let [months {1 "Jan"
                              2 "Feb"
                              3 "Mar"
                              4 "Apr"
                              5 "May"
                              6 "Jun"
                              7 "Jul"
                              8 "Aug"
                              9 "Sep"
                              10 "Oct"
                              11 "Nov"
                              12 "Dec"}]

                  (d/div {:className "bg-box padded"}
                         (d/div {:className "container"}
                                (map #(d/div {:className "item"}
                                             (d/button {:className "flat-button"} %))
                                     years))
                         (d/div {:className "container"}
                                (map #(d/div {:className "item"}
                                             (d/button {:className "flat-button"} (second %)))
                                     months)
                                )
                         ))
                )

(defn renderTransactions [store]
  (q/render
    (d/div {:id "main"}
           (Menu)
           (TimeFilter (:available-years store) {:year 2013 :month 1})
           (TransactionsTable (:transactions store)))
    (.getElementById js/document "main")))

(defn renderCategories [store action-chan]
  (q/render
    (d/div {:id "main"}
           (Menu)
           (CategoryEditor)
           (CategoryTable (:categories store) action-chan))
    (.getElementById js/document "main")))