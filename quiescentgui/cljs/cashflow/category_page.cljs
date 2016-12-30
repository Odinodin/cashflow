(ns cashflow.category-page
  (:require [quiescent.core :as q]
            [quiescent.dom :as d]
            [cashflow.common :as common]
            [cashflow.event-bus :as bus]))

(q/defcomponent CategoryEditor []
                (let [submit-fn (fn [event]
                                  ;; TODO figure out if there is a better way of getting form element values ..
                                  (let [category-name (.-value (aget (.-elements (.-target event)) "category-name"))
                                        matches (.-value (aget (.-elements (.-target event)) "matches"))]
                                    (when-not (clojure.string/blank? category-name)
                                      (bus/publish :create-category {:category-name category-name :matches matches}))
                                    (.reset (.-target event))
                                    (.preventDefault event)))]

                  (d/div {:className "bg-box"}
                         (d/form {:className "" :onSubmit submit-fn}
                                 (d/input {:name "category-name" :type "text" :placeholder "Category name" :className "form-control"})
                                 (d/input {:name "matches" :type "text" :placeholder "Matches" :className "form-control"})
                                 (d/button {:className "flat-button" :type "submit"} "Add category")))))

(q/defcomponent MatchesCell [category]
                (let [matches->string (fn [cat] (clojure.string/join ", " (sort (:matches cat))))
                      string->matches (fn [match-str] (map clojure.string/trim (clojure.string/split match-str ",")))

                      edit-fn (fn [event]
                                (let [edited-value (-> event .-target .-textContent string->matches)]
                                  ;; Only actually change value if there is a difference
                                  (when-not (= (into #{} edited-value) (into #{} (:matches category)))
                                    (bus/publish :create-category {:category-name (:name category) :matches edited-value}))
                                  (.preventDefault event)))]

                  (d/td {:contentEditable true
                         :onBlur          edit-fn}
                        (matches->string category))))

(q/defcomponent CategoryTable [categories]
                (let [delete-fn (fn [category-name event]
                                  (bus/publish :delete-category {:category-name category-name})
                                  (.preventDefault event))]
                  (d/div {:className "bg-box"}
                         (d/table {}
                                  (d/thead {}
                                    (d/tr {}
                                      (d/th {} "")
                                      (d/th {} "Category")
                                      (d/th {} "Matches")))
                                  (d/tbody {}
                                           (when (seq categories)
                                             (map-indexed (fn [idx category]
                                                            (d/tr {:key idx}
                                                              (d/td {} (d/button {:className "delete" :onClick (partial delete-fn (:name category))} "\u2716"))
                                                              (d/td {:className "category"} (:name category))
                                                              (MatchesCell category))) categories)))))))

(q/defcomponent Page [store]
                (d/div {}
                       (common/Menu)
                       (CategoryEditor)
                       (CategoryTable (:categories store))))