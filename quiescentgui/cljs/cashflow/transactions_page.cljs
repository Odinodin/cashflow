(ns cashflow.transactions-page
  (:require [quiescent.core :as q]
            [quiescent.dom :as d]
            [quiescent.dom.uncontrolled :as du]
            [clojure.string :refer [blank?]]
            [cashflow.common :as common]
            [cashflow.components.table :refer [Table]]
            [cashflow.event-bus :as bus]))

(defn- transaction-being-edited? [transaction ui-state]
  (and (some? (:id transaction))
       (= (get-in ui-state [:transaction-page :is-editing-transaction-with-id])
          (:id transaction))))

(q/defcomponent CategoryForTransactionSuggestion [{:keys [transaction categories]}]
  (let [matches (filter (fn [category] (some #(re-find (re-pattern (str "(?i)" %)) (:description transaction)) (:matches category))) categories)]
    (d/div {} (map-indexed
                (fn [index match] (d/div {:key index
                                          :className "category category-suggestion"
                                          :onClick (fn [event]
                                                     (bus/publish :edit-transaction-category-finished
                                                       {
                                                        :transaction-id (:id transaction)
                                                        :category-name (:name match)})
                                                     (.preventDefault event))}
                                    (str (:name match) "?"))) matches))))

(q/defcomponent CategoryForTransactionEditor [{:keys [transaction categories]}]
  (d/div {}
    (map-indexed (fn [index category] (d/div {:key index
                                              :className "category category-candidate fade-in"
                                              :onClick (fn [event]
                                                         (bus/publish :edit-transaction-category-finished
                                                           {:transaction-id (:id transaction)
                                                            :category-name (:name category)})
                                                         (.preventDefault event))}
                                        (:name category)))
      categories)))

(q/defcomponent TransactionCategoryCell [{:keys [transaction categories ui-state] :as props}]
  (let [on-click-category-fn (fn [event]
                               (bus/publish :edit-transaction-category-started {:transaction-id (:id transaction)})
                               (.preventDefault event))]

    (if (:category transaction)
      (d/div {:className "wide50"}
        (d/div {:onClick on-click-category-fn :className "category"}
          (:category transaction))
        (when (transaction-being-edited? transaction ui-state)
          ;; Select category
          (CategoryForTransactionEditor
            (select-keys props [:categories :transaction :ui-state]))))
      (d/div {:className "wide50"}
        (d/div {:onClick on-click-category-fn :className "category category-missing"}
          "?")
        (if (transaction-being-edited? transaction ui-state)
          ;; Select category
          (CategoryForTransactionEditor
            (select-keys props [:categories :transaction :ui-state]))
          ;; Suggest a category
          (CategoryForTransactionSuggestion
            (select-keys props [:categories :transaction :ui-state])))))))

(defn TransactionRow
  [{:keys [transaction categories ui-state]}]
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
            (or (blank? desc-filter)
                (re-find (re-pattern (str "(?i)" desc-filter)) (:description transaction))))
          ;; Transaction description search filter
          (let [category-filter (get-in ui-state [:transaction-page :category-filter])]
            (or (blank? category-filter)
                (re-find (re-pattern (str "(?i)" category-filter)) (or (:category transaction) "")))))
    (let [amount-class (if (pos? (:amount transaction)) "positive" "negative")]
      [(:date transaction)
       (:code transaction)
       (:description transaction)
       (d/div {:className amount-class} (:amount transaction))
       (TransactionCategoryCell {:transaction transaction :categories categories :ui-state ui-state})])))

(q/defcomponent TransactionFilter [{:keys [ui-state]}]
  (let [on-category-click (fn [event]
                            (bus/publish :transaction-page-toggle-show-category))
        on-no-category-click (fn [event]
                               (bus/publish :transaction-page-toggle-show-no-category))
        on-transaction-desc-filter-change (fn [event]
                                            (bus/publish :transaction-page-update-transaction-desc-filter {:value (.-value (.-target event))})
                                            (.preventDefault event))
        on-category-filter-change (fn [event]
                                    (bus/publish :transaction-page-update-category-filter {:value (.-value (.-target event))})
                                    (.preventDefault event))]

    (d/div {:className "bg-box"}
      (d/label {} "Category")
      (du/input {:type "checkbox"
                 :checked (get-in ui-state [:transaction-page :show-transactions-with-categories])
                 :onChange on-category-click})
      (d/label {} "No Category")
      (du/input {:type "checkbox"
                 :checked (get-in ui-state [:transaction-page :show-transactions-without-categories])
                 :onChange on-no-category-click})
      (du/input {:type "text"
                 :placeholder "Transaction filter"
                 :className "form-control"
                 :value (get-in ui-state [:transaction-page :transaction-description-filter])
                 :onChange on-transaction-desc-filter-change})
      (du/input {:type "text"
                 :placeholder "Category filter"
                 :className "form-control"
                 :value (get-in ui-state [:transaction-page :category-filter])
                 :onChange on-category-filter-change}))))

(q/defcomponent TransactionsTable [{:keys [transactions categories ui-state]}]
  (d/div {:className "bg-box"}
    (Table {:header ["Date" "Code" "Description" "Amount" "Category"]
            :rows (map (fn [transaction] (TransactionRow {:transaction transaction
                                                          :categories categories
                                                          :ui-state ui-state})) transactions)})))

(q/defcomponent Page [store]
  (d/div {}
    (common/Menu)
    (common/TimeFilter (select-keys store [:available-years :time-filter]))
    (TransactionFilter store)
    (TransactionsTable store)))
