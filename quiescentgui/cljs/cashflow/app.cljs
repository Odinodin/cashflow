(ns cashflow.app
  (:require-macros [cljs.core.async.macros :refer [go go-loop]])
  (:require [cljs-http.client :as http]
            [cljs.core.async :refer [<! >! chan put!]]
            [secretary.core :as secretary :refer-macros [defroute]]


            [cashflow.category-page :as category-page]
            [cashflow.transactions-page :as transactions-page]
            [cashflow.graphs-page :as graphs-page]))

#_((use 'figwheel-sidecar.repl-api))

(enable-console-print!)

(def store (atom {:categories      []
                  :available-years []
                  :time-filter     {}
                  :transactions    []
                  :ui-state        {:transaction-page {:show-transactions-with-categories    true
                                                       :show-transactions-without-categories true
                                                       :transaction-description-filter ""}}}))

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
                                   (put! action-chan {:type :load-transactions}))

             :edit-transaction-category-started (swap! store (fn [old] (assoc-in old [:ui-state :transaction-page :is-editing-transaction-with-id] (:transaction-id action))))
             :edit-transaction-category-finished (do (swap! store (fn [old] (assoc-in old [:ui-state :transaction-page :is-editing-transaction-with-id] nil)))
                                                     (let [response (<! (http/post (str "/api/transactions/" (:transaction-id action))
                                                                                   {:json-params {:id       (:transaction-id action)
                                                                                                  :category (:category-name action)}}))]
                                                       (put! action-chan {:type :load-transactions})))

             :transaction-page-update-transaction-desc-filter (do (swap! store (fn [old] (assoc-in old [:ui-state :transaction-page :transaction-description-filter] (:value action)))))
             :transaction-page-toggle-show-category (do (swap! store (fn [old] (update-in old [:ui-state :transaction-page :show-transactions-with-categories] not))))
             :transaction-page-toggle-show-no-category (do (swap! store (fn [old] (update-in old [:ui-state :transaction-page :show-transactions-without-categories] not))))
             ))

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
          (category-page/render @store action-chan))

(defroute categories "/categories" []
          (category-page/render @store action-chan))

(defroute transactions "/transactions" []
          (transactions-page/render @store action-chan))

(defroute graphs "/graphs" []
          (graphs-page/render @store action-chan))

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