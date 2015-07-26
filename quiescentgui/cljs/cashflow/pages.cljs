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
                      (d/li {:className "nav-item"} (d/a {:href "#/graphs"} "Graphs"))))

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
                        (matches->string category))))

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

(defn- transaction-being-edited? [transaction ui-state]
  (= (get-in ui-state [:transaction-page :is-editing-transaction-with-id])
     (:id transaction)))

(q/defcomponent CategoryForTransactionSuggestion [{:keys [transaction categories]} action-chan]
                (let [matches (filter (fn [category] (some #(re-find (re-pattern (str "(?i)" %)) (:description transaction)) (:matches category))) categories)]
                  (d/div {} (map
                              (fn [match] (d/div {:className "category category-suggestion"
                                                  :onClick   (fn [] (put! action-chan {:type           :edit-transaction-category-finished
                                                                                       :transaction-id (:id transaction)
                                                                                       :category-name  (:name match)}))}
                                                 (str (:name match) "?"))
                                ) matches))))

(q/defcomponent CategoryForTransactionEditor [{:keys [transaction categories]} action-chan]
                (d/div {}
                       (map #(d/div {:className "category category-candidate fade-in"
                                     :onClick   (fn [] (put! action-chan {:type           :edit-transaction-category-finished
                                                                          :transaction-id (:id transaction)
                                                                          :category-name  (:name %)}))}
                                    (:name %))
                            categories)))

(q/defcomponent TransactionCategoryCell [{:keys [transaction categories ui-state] :as props} action-chan]

                (let [on-click-category-fn (fn [event]
                                             (put! action-chan {:type           :edit-transaction-category-started
                                                                :transaction-id (:id transaction)})
                                             (.preventDefault event))]

                  (if (:category transaction)
                    (d/td {:className "wide50"}
                          (d/div {:onClick on-click-category-fn :className "category"}
                                 (:category transaction))
                          (when (transaction-being-edited? transaction ui-state)
                            ;; Select category
                            (CategoryForTransactionEditor
                              (select-keys props [:categories :transaction :ui-state])
                              action-chan)))
                    (d/td {:className "wide50"}
                          (d/div {:onClick on-click-category-fn :className "category category-missing"}
                                 "?")
                          (if (transaction-being-edited? transaction ui-state)
                            ;; Select category
                            (CategoryForTransactionEditor
                              (select-keys props [:categories :transaction :ui-state])
                              action-chan)
                            ;; Suggest a category
                            (CategoryForTransactionSuggestion
                              (select-keys props [:categories :transaction :ui-state])
                              action-chan))))))

(q/defcomponent TransactionRow
                ;; Each row needs a unique react key
                :keyfn (fn [value] (-> value :transaction :id))
                [{:keys [transaction categories ui-state]} action-chan]
                ;; Filter transactions based on UI-state
                ;; TODO clean this up
                (when (and
                        ;; Category or no category filtering
                        (or (and (:category transaction)
                                 (get-in ui-state [:transaction-page :show-transactions-with-categories]))
                            (and (not (:category transaction))
                                 (get-in ui-state [:transaction-page :show-transactions-without-categories])))
                        ;; Transaction description search filter
                        (let [desc-filter (get-in ui-state [:transaction-page :transaction-description-filter])]
                          (or (clojure.string/blank? desc-filter)
                              (re-find (re-pattern (str "(?i)" desc-filter)) (:description transaction)))))
                  (let [amount-class (if (pos? (:amount transaction)) "positive" "negative")]

                    (d/tr {}
                          (d/td {} (:date transaction))
                          (d/td {} (:code transaction))
                          (d/td {} (:description transaction))
                          (d/td {:className amount-class} (:amount transaction))
                          (TransactionCategoryCell {:transaction transaction :categories categories :ui-state ui-state} action-chan)))))

(q/defcomponent TransactionFilter [{:keys [ui-state]} action-chan]

                (let [on-category-click (fn [event]
                                          (put! action-chan {:type :transaction-page-toggle-show-category})
                                          (.preventDefault event))
                      on-no-category-click (fn [event]
                                             (put! action-chan {:type :transaction-page-toggle-show-no-category})
                                             (.preventDefault event))
                      on-transaction-desc-filter-change (fn [event]
                                                          (put! action-chan {:type :transaction-page-update-transaction-desc-filter :value (.-value (.-target event))})
                                                          (.preventDefault event))]

                  (d/div {:className "bg-box padded"}
                         (d/input {:type     "checkbox"
                                   :checked  (get-in ui-state [:transaction-page :show-transactions-with-categories])
                                   :onChange on-category-click} "Category")

                         (d/input {:type     "checkbox"
                                   :checked  (get-in ui-state [:transaction-page :show-transactions-without-categories])
                                   :onChange on-no-category-click} "No Category")
                         (d/input {:type        "text"
                                   :placeholder "Transaction filter"
                                   :className   "form-control"
                                   :value       (get-in ui-state [:transaction-page :transaction-description-filter])
                                   :onChange    on-transaction-desc-filter-change}))))

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

                                  (d/tbody {}
                                           (map #(TransactionRow {:transaction %
                                                                  :categories  categories
                                                                  :ui-state    ui-state}
                                                                 action-chan)
                                                transactions)))))


(q/defcomponent TimeFilter [{:keys [available-years time-filter]} action-chan]
                (let [month-map (zipmap (range 1 13) ["Jan" "Feb" "Mar" "Apr" "May" "Jun" "Jul" "Aug" "Sep" "Oct" "Nov" "Dec"])
                      year-class-fn (fn [year] (if (= year (:year time-filter)) "flat-button selected" "flat-button"))
                      month-class-fn (fn [month-index] (if (= month-index (:month time-filter)) "flat-button selected" "flat-button"))
                      on-year-click (fn [year event] (put! action-chan {:type :update-time-filter :time-filter {:year year}}) (.preventDefault event))
                      on-month-click (fn [month event] (put! action-chan {:type :update-time-filter :time-filter (assoc time-filter :month month)}) (.preventDefault event))]

                  (d/div {:className "bg-box padded"}
                         (d/div {:className "container"}
                                (map-indexed (fn [idx year]
                                               (d/div {:key idx :className "item"}
                                                      (d/button {:className (year-class-fn year) :onClick (partial on-year-click year)} year)))
                                             available-years))
                         (d/div {:className "container"}
                                (map (fn [[index name]] (d/div {:key index :className "item"}
                                                               (d/button {:className (month-class-fn index) :onClick (partial on-month-click index)} name)))
                                     month-map)))))

(def graph-types [:net-income-graph :category-graph])

(q/defcomponent GraphTypeSelector [{:keys [ui-state]} action-chan]
                (let [on-button-click (fn [graph-type event]
                                        (prn "dd" graph-type)
                                        (.preventDefault event))]

                  (d/div {:className "bg-box padded"}
                         (map #(d/button {:className "flat-button" :onClick (partial on-button-click %)} (name %)) graph-types)
                         )))

(defn renderTransactions [store action-chan]
  (q/render
    (d/div {:id "main"}
           (Menu)
           (TimeFilter (select-keys store [:available-years :time-filter])
                       action-chan)
           (TransactionFilter store action-chan)
           (TransactionsTable store action-chan))
    (.getElementById js/document "main")))

(defn renderCategories [store action-chan]
  (q/render
    (d/div {:id "main"}
           (Menu)
           (CategoryEditor action-chan)
           (CategoryTable (:categories store) action-chan))
    (.getElementById js/document "main")))


(defn renderGraphs [store action-chan]
  (q/render
    (d/div {:id "main"}
           (Menu)
           (TimeFilter (select-keys store [:available-years :time-filter])
                       action-chan)
           (GraphTypeSelector)
           "graphs!")
    (.getElementById js/document "main"))

  )