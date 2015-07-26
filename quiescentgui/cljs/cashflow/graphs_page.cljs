(ns cashflow.graphs-page
  (:require-macros [cljs.core.async.macros :refer [go]])
  (:require [cljs.core.async :refer [put!]]
            [quiescent.core :as q]
            [quiescent.dom :as d]
            [cashflow.common :as common]))

(def graph-types [:net-income-graph :category-graph])

(q/defcomponent GraphTypeSelector [{:keys [ui-state]} action-chan]
                (let [on-button-click (fn [graph-type event]
                                        (put! action-chan {:type       :show-graph
                                                           :graph-type graph-type})
                                        (.preventDefault event))]

                  (d/div {:className "bg-box padded"}
                         (map (fn [graph-type-kw]
                                (let [css (if (= (get-in ui-state [:graphs-page :show-graph])
                                                 graph-type-kw)
                                              "flat-button selected"
                                              "flat-button")]

                                  (d/button {:className css
                                             :onClick   (partial on-button-click graph-type-kw)} (name graph-type-kw))))
                              graph-types))))

(defn render [store action-chan]
  (q/render
    (d/div {:id "main"}
           (common/Menu)
           (common/TimeFilter (select-keys store [:available-years :time-filter])
                              action-chan)
           (GraphTypeSelector store action-chan)
           "graphs!")
    (.getElementById js/document "main")))