(ns cashflow.repl
  (:require-macros [cljs.core.async.macros :refer [go]])
  (:require [cljs-http.client :as http]
            [cljs.core.async :refer [<!]]
            [quiescent.core :as q]
            [quiescent.dom :as d]

            [secretary.core :as secretary :refer-macros [defroute]]))

#_((use 'figwheel-sidecar.repl-api))

(enable-console-print!)

(def store (atom {:categories []}))

(go (let [response (<! (http/get "/api/categories"))]
      #_(prn (:body response))
      #_(prn (js->clj (:body response)))
      (prn "retrieved")
      (swap! store (fn [old] (assoc old :categories (js->clj (:body response)))))))

(q/defcomponent Menu []
                (d/ul {:className "navbar"}
                      (d/li {:className "title"} "Cashflow")
                      (d/li {:className "nav-item"} (d/a {:href "#/categories"} "Categories"))
                      (d/li {:className "nav-item"} (d/a {:href "#/transactions" } "Transactions"))
                      (d/li {:className "nav-item"} (d/a {} "Graphs"))))

(q/defcomponent CategoryEditor []
                (d/div {:className "bg-box"}
                       (d/form {:className "padded"}
                               (d/input {:name "name" :type "text" :placeholder "Category name" :className "form-control"})
                               (d/input {:name "matches" :type "text" :placeholder "Matches" :className "form-control"}))
                       )
                )

(q/defcomponent CategoryTable [categories]
                (prn "cats" categories)
                (d/div {:className "bg-box padded"}
                       (d/table {}
                                (d/thead {}
                                         (d/th {} "")
                                         (d/th {} "Category")
                                         (d/th {} "Matches")
                                         )

                                (when (seq categories)
                                  (d/tbody {}
                                           (map #(d/tr {}
                                                       (d/td {}
                                                             (d/button {:className "delete"} "\u2716"))
                                                       (d/td {:className "category"} (:name %))
                                                       (d/td {} (clojure.string/join ", " (sort (:matches %))))) categories))))))

(defn renderTransactions []
  (q/render
    (d/div {:id "main"}
           (Menu)
           (d/div {} "Transaction"))
    (.getElementById js/document "main")))

(defn renderCategories []
  (q/render
    (d/div {:id "main"}
           (Menu)
           (CategoryEditor)
           (CategoryTable (:categories @store)))
    (.getElementById js/document "main")))


(secretary/set-config! :prefix "#")

(defn get-hash-url []
  "Retrieve the hash part of the url, e.g #/transactions"
  (str js/window.location.hash))

(defroute home "/" []
          (renderCategories))

(defroute categories "/categories" []
          (renderCategories))

(defroute transactions "/transactions" []
          (renderTransactions))

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