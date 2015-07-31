(ns cashflow.common
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

(q/defcomponent YearFilter [{:keys [available-years time-filter]} action-chan]
                (let [year-class-fn (fn [year] (if (= year (:year time-filter)) "flat-button selected" "flat-button"))
                      on-year-click (fn [year event] (put! action-chan {:type :update-time-filter :time-filter {:year year}}) (.preventDefault event))]

                  (d/div {:className "bg-box padded"}
                         (d/div {:className "container"}
                                (map-indexed (fn [idx year]
                                               (d/div {:key idx :className "item"}
                                                      (d/button {:className (year-class-fn year) :onClick (partial on-year-click year)} year)))
                                             available-years)))))