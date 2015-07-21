(ns cashflow.app
  (:require-macros [cljs.core.async.macros :refer [go go-loop]])
  (:require [cljs-http.client :as http]
            [cljs.core.async :refer [<! >! chan put!]]
            [secretary.core :as secretary :refer-macros [defroute]]

            [cashflow.pages :as pages]))

#_((use 'figwheel-sidecar.repl-api))

(enable-console-print!)

(def store (atom {:categories      []
                  :available-years []
                  :time-filter     {}
                  :transactions    []}))

(def action-chan (chan))

(go-loop []
         (let [action (<! action-chan)]
           (prn "Action: " action)

           ;; TODO error handling
           (case (:type action)
             :load-available-years (let [response (<! (http/get "/api/transactions/time/years"))
                                         available-years (:years (:body response))]
                                     (swap! store (fn [old] (-> old
                                                                (assoc :available-years available-years)
                                                                (assoc :time-filter {:year (last available-years)})))))
             :load-transactions (let [response (<! (http/get (str "/api/transactions/time/" (get-in @store [:time-filter :year]))))]
                                  (swap! store (fn [old] (assoc old :transactions (:body response)))))
             :load-categories (let [response (<! (http/get "/api/categories"))]
                                (swap! store (fn [old] (assoc old :categories (js->clj (:body response))))))
             :create-category (let [response (<! (http/post "api/categories"
                                                            {:json-params {:name (:category-name action) :matches (:matches action)}}))]
                                (put! action-chan {:type :load-categories}))
             :delete-category (let [response (<! (http/delete (str "/api/categories/" (:category-name action))))]
                                (put! action-chan {:type :load-categories}))
             :update-time-filter (do
                                   (swap! store (fn [old] (assoc old :time-filter (:time-filter action))))
                                   (put! action-chan {:type :load-transactions}))))

         (recur))

;; Load initial data
(put! action-chan {:type :load-categories})
(put! action-chan {:type :load-available-years})
(put! action-chan {:type :load-transactions})

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
          (pages/renderTransactions @store action-chan))

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