(ns cashflow.common
  (:require [quiescent.core :as q]
            [quiescent.dom :as d]
            [cashflow.event-bus :as bus]))

(q/defcomponent Menu []
                (d/ul {:className "horizontal-left-list v-spaced"}
                      (d/li {:className "nav-item"} (d/span {:className "navbar-title"} "Cashflow"))
                      (d/li {:className "nav-item"} (d/a {:className "navbar-link" :href "#/categories"} "Categories"))
                      (d/li {:className "nav-item"} (d/a {:className "navbar-link" :href "#/transactions"} "Transactions"))
                      (d/li {:className "nav-item"} (d/a {:className "navbar-link" :href "#/graphs"} "Graphs"))))

(q/defcomponent TimeFilter [{:keys [available-years time-filter]}]
                (let [month-map (zipmap (range 1 13) ["Jan" "Feb" "Mar" "Apr" "May" "Jun" "Jul" "Aug" "Sep" "Oct" "Nov" "Dec"])
                      year-class-fn (fn [year] (if (= year (:year time-filter)) "flat-button selected" "flat-button"))
                      month-class-fn (fn [month-index] (if (= month-index (:month time-filter)) "flat-button selected" "flat-button"))
                      on-year-click (fn [year event]
                                      (bus/publish :update-time-filter {:time-filter {:year year}}))
                      on-month-click (fn [month event]
                                       (bus/publish :update-time-filter {:time-filter (assoc time-filter :month month)}))]

                  (d/div {:className "bg-box"}
                         (d/div {:className "container"}
                                (map-indexed (fn [idx year]
                                               (d/div {:key idx :className "item"}
                                                      (d/button {:className (year-class-fn year) :onClick (partial on-year-click year)} year)))
                                             available-years))
                         (d/div {:className "container"}
                                (map (fn [[month-idx name]] (d/div {:key month-idx :className "item"}
                                                               (d/button {:className (month-class-fn month-idx) :onClick (partial on-month-click month-idx)} name)))
                                     month-map)))))

(q/defcomponent YearFilter [{:keys [available-years time-filter]}]
                (let [year-class-fn (fn [year] (if (= year (:year time-filter)) "flat-button selected" "flat-button"))
                      on-year-click (fn [year event]
                                      (bus/publish :update-time-filter {:time-filter {:year year}}))]

                  (d/div {:className "bg-box"}
                         (d/div {:className "container"}
                                (map-indexed (fn [idx year]
                                               (d/div {:key idx :className "item"}
                                                      (d/button {:className (year-class-fn year) :onClick (partial on-year-click year)} year)))
                                             available-years)))))