(ns cashflow.category-page
  (:require-macros [cljs.core.async.macros :refer [go]])
  (:require [cljs.core.async :refer [put!]]
            [quiescent.core :as q]
            [quiescent.dom :as d]
            [cashflow.common :as common]))

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


(defn render [store action-chan]
  (q/render
    (d/div {:id "main"}
           (common/Menu)
           (CategoryEditor action-chan)
           (CategoryTable (:categories store) action-chan))
    (.getElementById js/document "main")))