(ns cashflow.transactions-page
  (:require-macros [cljs.core.async.macros :refer [go]])
  (:require [cljs.core.async :refer [put!]]
            [quiescent.core :as q]
            [quiescent.dom :as d]
            [cashflow.common :as common]))

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

                  (d/div {:className "bg-box"}
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
                (d/div {:className "bg-box"}
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

(defn render [store action-chan]
  (q/render
    (d/div {:id "main"}
           (common/Menu)
           (common/TimeFilter (select-keys store [:available-years :time-filter])
                              action-chan)
           (TransactionFilter store action-chan)
           (TransactionsTable store action-chan))
    (.getElementById js/document "main")))

