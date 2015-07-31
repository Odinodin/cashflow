(ns cashflow.graphs-page
  (:require-macros [cljs.core.async.macros :refer [go]])
  (:require [cljs.core.async :refer [put!]]
            [quiescent.core :as q]
            [quiescent.dom :as d]
            [cashflow.common :as common]

            [Highcharts]
            ))

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


(defn dom-child-with-class
  "Search the dom elements children to find the first dom element that has the desired CSS class"
  [element css-class]
  (aget (.getElementsByClassName element css-class) 0))

(defn deep-merge
  "Recursively merges maps. If keys are not maps, the last value wins."
  [& vals]
  (if (every? map? vals)
    (apply merge-with deep-merge vals)
    (last vals)))

(def chart-theme {:chart    {:backgroundColor "#1a1a1a"}
                  :title    nil

                  :subtitle {:style {:color "#c0c0c0"}},
                  :xAxis    {:labels {:style {:color "#c0c0c0"}}},
                  :yAxis    {:labels {:style {:color "#c0c0c0"}}}


                  :legend   {:itemStyle      {:color "#c0c0c0"},
                             :itemHoverStyle {:color "gray"}
                             }})

(q/defcomponent CategoryGraph
                :on-mount (fn [dom-node component-value]
                            ;; Need to pass the dom-node reference to :renderTo
                            (new js/Highcharts.Chart
                                 (clj->js
                                   (deep-merge chart-theme
                                               {:chart
                                                        {:type     "column"
                                                         :renderTo (dom-child-with-class dom-node "graph")}
                                                :series [{
                                                          :name "Jane",
                                                          :data [1, 0, 4]
                                                          }, {
                                                              :name "John",
                                                              :data [5, 7, 3]
                                                              }]
                                                }))))
                [store action-chan]
                (d/div {}
                       (common/TimeFilter (select-keys store [:available-years :time-filter])
                                          action-chan)
                       (d/div {:className "graph"} "The target")))

(q/defcomponent NetIncomeGraph
                :on-mount (fn [dom-node component-value]
                            ;; Need to pass the dom-node reference to :renderTo

                            (new js/Highcharts.Chart
                                 (clj->js
                                   (deep-merge chart-theme
                                               {
                                                :chart
                                                        {:type     "column"
                                                         :renderTo (dom-child-with-class dom-node "graph")}
                                                :series [{:name "Income'",
                                                          :data (map (fn [item] [(:time item) (:income item)]) (:net-income component-value))
                                                          },
                                                         {:name "Expenses",
                                                          :data (map (fn [item] [(:time item) (js/Math.abs (:expense item))]) (:net-income component-value))
                                                          }]
                                                :xAxis  {:type "category"}
                                                }))))

                [store action-chan]
                ;; Target or chart renderTo

                (d/div {}
                       (common/YearFilter (select-keys store [:available-years :time-filter])
                                          action-chan)
                       (d/div {:className "graph"} "The target")))


(q/defcomponent Graph [store action-chan]
                (let [selected-graph-type (get-in store [:ui-state :graphs-page :show-graph])]
                  (case selected-graph-type
                    :net-income-graph (NetIncomeGraph store action-chan)
                    :category-graph (CategoryGraph store action-chan))))

(defn render [store action-chan]
  (q/render
    (d/div {:id "main"}
           (common/Menu)

           (GraphTypeSelector store action-chan)
           (Graph store action-chan))
    (.getElementById js/document "main")))