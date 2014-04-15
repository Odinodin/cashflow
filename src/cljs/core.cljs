(ns acme.core
  (:require [goog.events :as events]
            [om.core :as om :include-macros true]
            [om.dom :as dom :include-macros true]
            [cljs-http.client :as http]))

(enable-console-print!)

(def app-state
  (atom
    {:transactions
      [{:description "General store" :amount 10 :tags ["store"]}
       {:description "ACME cars" :amount 1 :tags ["car"]}]}))


(defn display-transaction [{:keys [description amount]}]
  (str description " : " amount " NOK"))

(defn transaction-view [transaction owner]
  (reify
    om/IRender
    (render [this]
      (dom/li nil (display-transaction transaction)))))

(defn transactions-view [app owner]
  (reify
    om/IRender
    (render [this]
      (dom/div nil
               (dom/h1 nil "Transactions")
               (apply dom/ul nil
                      (om/build-all transaction-view (:transactions app)))))))

(om/root transactions-view app-state {:target (. js/document (getElementById "contents"))})
