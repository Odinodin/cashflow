(ns cashflow.effects
  (:require-macros [cljs.core.async.macros :refer [go go-loop]])
  (:require [cashflow.event-bus :as bus]
            [cljs.core.async :refer [<! >! chan]]
            [cljs-http.client :as http]))

(defonce store (atom {:route :category-page
                      :render-count 0
                      :categories []
                      :available-years []
                      :time-filter {:year 2017}
                      :transactions []
                      :net-income []
                      :sum-by-category {}
                      :ui-state {:transaction-page {:show-transactions-with-categories true
                                                    :show-transactions-without-categories true
                                                    :transaction-description-filter ""
                                                    :category-filter ""}
                                 :graphs-page {:show-graph :net-income-graph}}}))

(defn init []
  ;; Backend actions
  (bus/add-listener :app :load-available-years (fn [_] (go (let [response (<! (http/get "/api/transactions/time/years"))
                                                                 available-years (:years (:body response))]
                                                             (when (= (:status response) 200)
                                                               (swap! store (fn [old] (-> old
                                                                                          (assoc :available-years available-years)
                                                                                          (assoc :time-filter {:year (last available-years)})))))))))
  (bus/add-listener :app :load-transactions (fn [_] (go (let [time-path (str "/api/transactions/time/"
                                                                             (get-in @store [:time-filter :year])
                                                                             (when-let [month (get-in @store [:time-filter :month])] (str "/" month)))
                                                              response (<! (http/get time-path))]
                                                          (when (= (:status response) 200)
                                                            (swap! store (fn [old] (assoc old :transactions (:body response)))))))))

  (bus/add-listener :app :load-categories (fn [_] (go (let [response (<! (http/get "/api/categories"))]
                                                        (when (= (:status response) 200)
                                                          (swap! store (fn [old] (assoc old :categories (js->clj (:body response))))))))))

  (bus/add-listener :app :load-net-income (fn [_] (go (let [response (<! (http/get "/api/transactions/net-income"))]
                                                        (when (= (:status response) 200)
                                                          (swap! store (fn [old] (assoc old :net-income (js->clj (:body response))))))))))

  (bus/add-listener :app :load-sum-by-category (fn [args] (go (let [response (<! (http/get (str "/api/transactions/sum-by-category/" (:year args))))]
                                                                (when (= (:status response) 200)
                                                                  (swap! store (fn [old] (assoc-in old [:sum-by-category (:year args)] (js->clj (:sum-by-category (:body response)))))))))))

  (bus/add-listener :app :load-data-for-chart (fn [_] (when (or (= :category-graph (get-in @store [:ui-state :graphs-page :show-graph] @store))
                                                                (= :category-by-year-graph (get-in @store [:ui-state :graphs-page :show-graph] @store)))
                                                        (bus/publish :load-sum-by-category {:year (-> @store :time-filter :year)}))))

  (bus/add-listener :app :show-graph (fn [args]
                                       (swap! store (fn [old] (assoc-in old [:ui-state :graphs-page :show-graph] (:graph-type args))))
                                       (bus/publish :load-data-for-chart {:graph-type (:graph-type args)})))

  ;; UI state

  (bus/add-listener :app :create-category (fn [args]
                                            (go (let [response (<! (http/post "api/categories"
                                                                     {:json-params {:name (:category-name args) :matches (:matches args)}}))]
                                                  (bus/publish :load-categories)))))
  (bus/add-listener :app :delete-category (fn [args]
                                            (go (let [response (<! (http/delete (str "/api/categories/" (:category-name args))))]
                                                  (bus/publish :load-categories)))))

  (bus/add-listener :app :update-time-filter (fn [args]
                                               (swap! store (fn [old] (assoc old :time-filter (:time-filter args))))
                                               (cond (= (:route @store) :transactions-page)
                                                     (bus/publish :load-transactions)
                                                     (= (:route @store) :graphs-page)
                                                     (bus/publish :load-data-for-chart))))

  (bus/add-listener :app :edit-transaction-category-started (fn [args]
                                                              (swap! store (fn [old] (assoc-in old [:ui-state :transaction-page :is-editing-transaction-with-id] (:transaction-id args))))))
  (bus/add-listener :app :edit-transaction-category-finished (fn [args]
                                                               (go (swap! store (fn [old] (assoc-in old [:ui-state :transaction-page :is-editing-transaction-with-id] nil)))
                                                                 (let [response (<! (http/post (str "/api/transactions/" (:transaction-id args))
                                                                                      {:json-params {:id (:transaction-id args)
                                                                                                     :category (:category-name args)}}))]
                                                                   (bus/publish :load-transactions)))))

  (bus/add-listener :app :transaction-page-update-transaction-desc-filter (fn [args]
                                                                            (swap! store (fn [old] (assoc-in old [:ui-state :transaction-page :transaction-description-filter] (:value args))))))
  (bus/add-listener :app :transaction-page-update-category-filter (fn [args]
                                                                    (swap! store (fn [old] (assoc-in old [:ui-state :transaction-page :category-filter] (:value args))))))
  (bus/add-listener :app :transaction-page-toggle-show-category (fn [args]
                                                                  (swap! store (fn [old] (update-in old [:ui-state :transaction-page :show-transactions-with-categories] not)))))
  (bus/add-listener :app :transaction-page-toggle-show-no-category (fn [args]
                                                                     (swap! store (fn [old] (update-in old [:ui-state :transaction-page :show-transactions-without-categories] not)))))


  ;; Load initial data
  (bus/publish-all [[:load-categories]
                    [:load-available-years]
                    [:load-transactions]
                    [:load-net-income]]))