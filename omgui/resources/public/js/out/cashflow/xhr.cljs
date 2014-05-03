(ns cashflow.xhr
  (:require [goog.events :as events]))

(def ^:private meths
  {:get "GET"
   :put "PUT"
   :post "POST"
   :delete "DELETE"})

(defn json-xhr [{:keys [method url data on-complete]}]
  (let [xhr (goog.net.XhrIo.)]
    (events/listen xhr goog.net.EventType.COMPLETE
                   (fn [e]
                     (on-complete (js->clj (.getResponseJson xhr) :keywordize-keys true))))
    (. xhr
       (send url (meths method) (when data (pr-str data))
             #js {"Content-Type" "application/json"}))))