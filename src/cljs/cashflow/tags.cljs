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

(defn display-transaction [{:keys [description amount code]}]
  (str description " : " amount " NOK " "(" code ")"))

(defn transaction-view [transaction owner]
  (reify
    om/IRender
    (render [this]
      (dom/li nil (display-transaction transaction)))))

(defn transactions-view [app owner]
  (reify
    ;; Initialize state by retrieving transactions from the backend
    om/IWillMount
    (will-mount [_]
      (xhr/json-xhr
        {:method :get
         :url "transactions"
         :on-complete #_(print %) #(om/transact! app :transactions (fn [_] %))}))
    ;; Render the transactions
    om/IRender
    (render [this]
      (dom/div nil
               (dom/h1 nil "Transactions")
               (apply dom/ul nil
                      (om/build-all transaction-view (:transactions app)))))))

(om/root tags-view app-state {:target (. js/document (getElementById "contents"))})
