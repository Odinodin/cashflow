(ns cashflow.graphs-page
  (:require [quiescent.core :as q]
            [quiescent.dom :as d]
            [cashflow.common :as common]
            [cljs.pprint :refer [pprint print-table]]
            [Highcharts]
            [cashflow.event-bus :as bus]))

(def graph-types [{:id   :net-income-graph
                   :name "Net income"}
                  {:id   :category-graph
                   :name "Categories"}
                  {:id   :category-by-year-graph
                   :name "Categories by year"}])

(q/defcomponent GraphTypeSelector [{:keys [ui-state]}]
                (let [on-button-click (fn [graph-type event]
                                        (bus/publish :show-graph {:graph-type (:id graph-type)})
                                        (.preventDefault event))]

                  (d/div {:className "bg-box"}
                         (map (fn [graph-type]
                                (let [css (if (= (get-in ui-state [:graphs-page :show-graph])
                                                 (:id graph-type))
                                            "flat-button selected"
                                            "flat-button")]

                                  (d/button {:key (:id graph-type)
                                             :className css
                                             :onClick   (partial on-button-click graph-type)} (:name graph-type))))
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
                             :itemHoverStyle {:color "gray"}}})

(defn sum-by-category-month [sum-by-category year month]
  (if month
    (->> (get sum-by-category year)
         (filter #(= month (:month %)))
         first
         :categories
         (map (fn [item] [(:category item) (js/Math.abs (:sum item))])))
    (->> (get sum-by-category year)
         (mapcat :categories)
         (map (fn [item] [(:category item) (js/Math.abs (:sum item))])))))

(defn value-of-category-in [data-for-year category-name month-index]
  (let [month-map (first (filter #(= (:month %) month-index) data-for-year))
        category-in-month (first (filter #(= (:category %) category-name) (:categories month-map)))]
    ;; Return 0 if category data does not exist in that month
    (or (js/Math.abs (:sum category-in-month)) 0)))

(defn datum [sum-by-category year]
  (let [data-for-year (get sum-by-category year)
        unique-categories (->> (mapcat #(:categories %) data-for-year) (map :category) (remove nil?) (into #{}))]
    (-> (for [category unique-categories]
          {:name    category
           :visible false
           :data    (mapv (fn [month-index] (value-of-category-in data-for-year category month-index)) (range 1 13))}))))

(q/defcomponent CategoryGraph
                :on-render (fn [dom-node component-value]
                             ;; Need to pass the dom-node reference to :renderTo
                             (let [sum-by-category (:sum-by-category component-value)
                                   data (sum-by-category-month sum-by-category
                                                               (get-in component-value [:time-filter :year])
                                                               (get-in component-value [:time-filter :month]))]
                               (new js/Highcharts.Chart
                                    (clj->js
                                      (deep-merge chart-theme
                                        {:chart
                                         {:type "pie"
                                          :renderTo (dom-child-with-class dom-node "graph")}
                                         :plotOptions {:pie {:allowPointSelect true
                                                             :cursor "pointer"
                                                             :dataLabels {:enabled true
                                                                          :format "{point.name} : {point.y}"}}}
                                         :xAxis {:categories ["Jan" "Feb" "Mar" "Apr" "May" "Jun" "July"]}
                                         :series [{:name "Categories"
                                                   :type "pie"
                                                   :data data}]})))))
                [store]
                (d/div {}
                       (common/TimeFilter (select-keys store [:available-years :time-filter]))
                       (d/div {:className "graph"} "The target")))

(q/defcomponent CategoryByYearGraph
                :on-render (fn [dom-node component-value]
                             ;; Need to pass the dom-node reference to :renderTo
                             (let [sum-by-category (:sum-by-category component-value)
                                   data (datum sum-by-category (get-in component-value [:time-filter :year]))]

                               (pprint sum-by-category)
                               (print-table data)
                               #_(when-not (empty? sum-by-category) (prn (datum sum-by-category (get-in component-value [:time-filter :year]))))

                               (new js/Highcharts.Chart
                                    (clj->js
                                      (deep-merge chart-theme
                                        {:chart
                                         {:type "line"
                                          :renderTo (dom-child-with-class dom-node "graph")}

                                         :yAxis {:min 0}
                                         :series data})))))
                [store]
                (d/div {}
                       (common/YearFilter (select-keys store [:available-years :time-filter]))
                       (d/div {:className "graph"} "The target")))


(q/defcomponent NetIncomeGraph
                :on-render (fn [dom-node store]
                             ;; Need to pass the dom-node reference to :renderTo

                             (let [income-by-month (fn [store]
                                                     (->> (:net-income store)
                                                          (filter (fn [item] (.startsWith (:time item) (get-in store [:time-filter :year]))))
                                                          (map (fn [item] [(:time item) (:income item)]))))
                                   expense-by-month (fn [store]
                                                      (->> (:net-income store)
                                                           (filter (fn [item] (.startsWith (:time item) (get-in store [:time-filter :year]))))
                                                           (map (fn [item] [(:time item) (js/Math.abs (:expense item))]))))]

                               (new js/Highcharts.Chart
                                    (clj->js
                                      (deep-merge chart-theme
                                                  {
                                                   :chart
                                                           {:type     "column"
                                                            :renderTo (dom-child-with-class dom-node "graph")}
                                                   :series [{:name "Income'",
                                                             :data (income-by-month store)
                                                             },
                                                            {:name "Expenses",
                                                             :data (expense-by-month store)
                                                             }]
                                                   :xAxis  {:type "category"}
                                                   })))))

                [store]
                ;; Target or chart renderTo

                (d/div {}
                       (common/YearFilter (select-keys store [:available-years :time-filter]))
                       (d/div {:className "graph"} "The target")))


(q/defcomponent Graph [store]
                (let [selected-graph-type (get-in store [:ui-state :graphs-page :show-graph])]
                  (case selected-graph-type
                    :net-income-graph (NetIncomeGraph store)
                    :category-graph (CategoryGraph store)
                    :category-by-year-graph (CategoryByYearGraph store))))


(q/defcomponent Page [store]
                (d/div {}
                       (common/Menu)
                       (GraphTypeSelector store)
                       (Graph store)))