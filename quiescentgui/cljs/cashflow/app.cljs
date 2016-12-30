(ns cashflow.app
  (:import goog.History)
  (:require [quiescent.core :as q]
            [quiescent.dom :as d]
            [secretary.core :as secretary :refer-macros [defroute]]
            [goog.events :as events]
            [cashflow.effects :as effects]
            [goog.history.EventType :as EventType]
            [cashflow.category-page :as category-page]
            [cashflow.transactions-page :as transactions-page]
            [cashflow.graphs-page :as graphs-page]))

(enable-console-print!)

;; Routing
(secretary/set-config! :prefix "#")

(defn get-hash-url []
  "Retrieve the hash part of the url, e.g #/transactions"
  (str js/window.location.hash))

(defroute home "/" []
          (swap! effects/store #(assoc % :route :category-page)))

(defroute categories "/categories" []
          (swap! effects/store #(assoc % :route :category-page)))

(defroute transactions "/transactions" []
          (swap! effects/store #(assoc % :route :transactions-page)))

(defroute graphs "/graphs" []
          (swap! effects/store #(assoc % :route :graphs-page)))

;; Root component that shows the current route in the store atom
(q/defcomponent RootComp [store]
                (case (:route store)
                  :category-page
                  (category-page/Page store)
                  :transactions-page
                  (transactions-page/Page store)
                  :graphs-page
                  (graphs-page/Page store)))

(defn render [state]
  (prn "rendering")
  (q/render
    (d/div {}
           (RootComp state))
    (.getElementById js/document "main")))

(defn ^:export main []
  ;; Listen for navigation changes
  (let [history (History.)
        navigation EventType/NAVIGATE]
    (goog.events/listen history
      navigation
      #(-> % .-token secretary/dispatch!))
    (doto history (.setEnabled true)))

  (effects/init)

  ;; Rerender every time the store changes
  (add-watch effects/store :watcher
    (fn [key atom old-state new-state]
      (prn "re-rendering!")
      (render new-state)))

  ;; Initialize route to current URL
  (secretary/dispatch! (get-hash-url)))

(defn force-rerender []
  (swap! effects/store update :render-count inc))