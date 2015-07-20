(ns cashflow.app
  (:require-macros [cljs.core.async.macros :refer [go go-loop]])
  (:require [cljs-http.client :as http]
            [cljs.core.async :refer [<! >! chan put!]]
            [secretary.core :as secretary :refer-macros [defroute]]

            [cashflow.pages :as pages]))

#_((use 'figwheel-sidecar.repl-api))

(enable-console-print!)

(def store (atom {:categories []
                  :available-years []
                  :transactions []}))

(def action-chan (chan))

(go-loop []
         (let [action (<! action-chan)]
           (prn "action ... " action)

           ;; TODO error handling
           (case (:type action)
             :load-available-years (let [response (<! (http/get "/api/transactions/time/years"))]
                                         (swap! store (fn [old] (assoc old :available-years (:years (:body response))))))
             :load-transactions (let [response (<! (http/get "/api/"))])
             :load-categories (let [response (<! (http/get "/api/categories"))]

                                #_(prn (:body response))
                                #_(prn (js->clj (:body response)))
                                (swap! store (fn [old] (assoc old :categories (js->clj (:body response))))))
             :delete-category (let [response (<! (http/delete (str "/api/categories/" (:category-name action))))]
                                (put! action-chan {:type :load-categories})))

           (recur)))

;; Load initial data
(put! action-chan {:type :load-categories})
(put! action-chan {:type :load-available-years})

;; Routing
(secretary/set-config! :prefix "#")

(defn get-hash-url []
  "Retrieve the hash part of the url, e.g #/transactions"
  (str js/window.location.hash))

(defroute home "/" []
          (pages/renderCategories @store action-chan))

(defroute categories "/categories" []
          (pages/renderCategories @store action-chan))

(defroute transactions "/transactions" []
          (pages/renderTransactions @store))

(defn render []
  #_(prn "rendering")
  (secretary/dispatch! (get-hash-url)))

(defn mainloop
  "Render the current state atom, and schedule a render on the next
  frame"
  []
  (render)
  (.requestAnimationFrame js/window mainloop))

(mainloop)