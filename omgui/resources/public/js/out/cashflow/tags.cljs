(ns cashflow.tags
  (:require [goog.events :as events]
            [om.core :as om :include-macros true]
            [om.dom :as dom :include-macros true]
            [cljs-http.client :as http]
            [cashflow.xhr :as xhr]))

(enable-console-print!)

;; Contains entire app state in an atom.
(def app-state
  (atom
    {:tags []}))

(defn display-tag [{:keys [tag regexes]}]
  (str tag " : " (clojure.string/join " " regexes)))

(defn tag-view [tag owner]
  (reify
    om/IRender
    (render [this]
      (dom/li nil (display-tag tag)))))

(defn tags-view [app owner]
  (reify
    ;; Initialize state by retrieving transactions from the backend
    om/IWillMount
    (will-mount [_]
      (xhr/json-xhr
        {:method :get
         :url "localhost:8080/api/tags"
         :on-complete #_(print %) #(om/transact! app :tags (fn [_] %))}))
    ;; Render the transactions
    om/IRender
    (render [this]
      (dom/div nil
               (dom/h1 nil "Tags")
               (apply dom/ul nil
                      (om/build-all tag-view (:tags app)))))))

(om/root tags-view app-state {:target (. js/document (getElementById "contents"))})
