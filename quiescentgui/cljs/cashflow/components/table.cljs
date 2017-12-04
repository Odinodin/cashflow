(ns cashflow.components.table
  (:require [quiescent.core :as q]
            [quiescent.dom :as d]))

(q/defcomponent Cell :keyfn (fn [value] (:index value))
  [{:keys [cell]}]
  (d/td {} cell))

(q/defcomponent Row
  :keyfn (fn [value] (:index value))
  [{:keys [row]}]
  (d/tr {}
    (map-indexed (fn [idx cell]
                   (Cell {:index idx
                          :cell cell})) row)))

(q/defcomponent Header [header]
  (d/thead {}
    (d/tr {}
      (map-indexed (fn [idx h] (d/th {:key idx} h)) header))))

(q/defcomponent Table [{:keys [header rows]}]
  (d/table {}
    (Header header)
    (d/tbody {}
      (map-indexed (fn [idx row] (Row {:index idx :row row})) rows))))

