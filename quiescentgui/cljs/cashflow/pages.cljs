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


(defn renderTransactions [store]
  (q/render
    (d/div {:id "main"}
           (Menu)
           (d/div {} "Transaction"))
    (.getElementById js/document "main")))

(defn renderCategories [store action-chan]
  (q/render
    (d/div {:id "main"}
           (Menu)
           (CategoryEditor)
           (CategoryTable (:categories store) action-chan))
    (.getElementById js/document "main")))