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

(q/defcomponent CategoryEditor [action-chan]
                (let [submit-fn (fn [event]
                                  ;; TODO figure out if there is a better way of getting form element values ..
                                  (let [category-name (.-value (aget (.-elements (.-target event)) "category-name"))
                                        matches (.-value (aget (.-elements (.-target event)) "matches"))]
                                    (when-not (clojure.string/blank? category-name) (put! action-chan {:type :create-category :category-name category-name :matches matches}))
                                    (.reset (.-target event))
                                    (.preventDefault event)))]

                  (d/div {:className "bg-box"}
                         (d/form {:className "padded" :onSubmit submit-fn}
                                 (d/input {:name "category-name" :type "text" :placeholder "Category name" :className "form-control"})
                                 (d/input {:name "matches" :type "text" :placeholder "Matches" :className "form-control"})
                                 (d/button {:className "flat-button" :type "submit"} "Add category")))))

(q/defcomponent MatchesCell [category action-chan]

                (let [matches->string (fn [cat] (clojure.string/join ", " (sort (:matches cat))))
                      string->matches (fn [match-str] (map clojure.string/trim (clojure.string/split match-str ",")))

                      edit-fn (fn [event]
                                (let [edited-value (-> event .-target .-textContent string->matches)]
                                  ;; Only actually change value if there is a difference
                                  (when-not (= (into #{} edited-value) (into #{} (:matches category)))
                                    (put! action-chan {:type :create-category :category-name (:name category) :matches edited-value}))
                                  (.preventDefault event)))]

                  (d/td {:contentEditable true
                         :onBlur          edit-fn}
                        (matches->string category)))
                )

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
                                                         (MatchesCell % action-chan)) categories)))))))

(q/defcomponent TransactionCategoryCell [{:keys [transaction categories ui-state]} action-chan]

                (let [on-click-category-fn (fn [event]
                                             (put! action-chan {:type           :edit-transaction-category-started
                                                                :transaction-id (:id transaction)})
                                             (.preventDefault event))
                      potential-categories (fn []
                                             (when (= (:is-editing-transaction-with-id ui-state)
                                                      (:id transaction))
                                               (map #(d/div {:className "category" "category-candidate" "fade-in"
                                                             :onClick   (fn [] (put! action-chan {:type           :edit-transaction-category-finished
                                                                                                  :transaction-id (:id transaction)
                                                                                                  :category-name  (:name %)}))}
                                                            (:name %)

                                                            ;; TODO Continue with on click
                                                            )
                                                    categories)))]

                  (if (:category transaction)
                    (d/td {:className "wide50"}
                          (d/div {:onClick on-click-category-fn :className "category"}
                                 (:category transaction))
                          (potential-categories))
                    (d/td {:className "wide50"}
                          (d/div {:onClick on-click-category-fn :className "category category-missing"}
                                 "?")
                          (potential-categories))
                    ))

                )

(q/defcomponent TransactionRow [{:keys [transaction categories ui-state]} action-chan]
                (let [amount-class (if (pos? (:amount transaction)) "positive" "negative")]

                  (d/tr {}
                        (d/td {} (:date transaction))
                        (d/td {} (:code transaction))
                        (d/td {} (:description transaction))
                        (d/td {:className amount-class} (:amount transaction))
                        (TransactionCategoryCell {:transaction transaction :categories categories :ui-state ui-state} action-chan))))

(q/defcomponent TransactionsTable [{:keys [transactions categories ui-state]} action-chan]
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
                                           (map #(TransactionRow {:transaction %
                                                                  :categories  categories
                                                                  :ui-state    ui-state}
                                                                 action-chan)
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
           (TransactionsTable store action-chan))
    (.getElementById js/document "main")))

(defn renderCategories [store action-chan]
  (q/render
    (d/div {:id "main"}
           (Menu)
           (CategoryEditor action-chan)
           (CategoryTable (:categories store) action-chan))
    (.getElementById js/document "main")))