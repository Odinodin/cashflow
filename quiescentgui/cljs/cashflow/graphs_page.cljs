(ns cashflow.graphs-page
  (:require-macros [cljs.core.async.macros :refer [go]])
  (:require [cljs.core.async :refer [put!]]
            [quiescent.core :as q]
            [quiescent.dom :as d]
            [cashflow.common :as common]))

(def graph-types [:net-income-graph :category-graph])

(q/defcomponent GraphTypeSelector [{:keys [ui-state]} action-chan]
                (let [on-button-click (fn [graph-type event]
                                        (prn "dd" graph-type)
                                        (.preventDefault event))]

                  (d/div {:className "bg-box padded"}
                         (map #(d/button {:className "flat-button" :onClick (partial on-button-click %)} (name %)) graph-types)
                         )))

(defn render [store action-chan]
  (q/render
    (d/div {:id "main"}
           (common/Menu)
           (common/TimeFilter (select-keys store [:available-years :time-filter])
                              action-chan)
           (GraphTypeSelector)
           "graphs!")
    (.getElementById js/document "main"))

  )