(ns cashflow.routes.home
  (:require [compojure.core :refer :all]
            [cashflow.views.layout :as layout]
            [ring.util.response :refer [resource-response response redirect]]
            [selmer.parser :refer [render-file]]
            [cashflow.models.transactions :as transactions]
            [cashflow.models.tags :as tags]
            [cashflow.views.graph-view :as graph-view]))

(defn strings->regexes
  [regexes]
  (->>
    (clojure.string/split regexes #",")
    (map (comp re-pattern clojure.string/trim))
    (vec)))

(defn show-tags []
  (render-file "public/templates/tags.html" {:tags @tags/tags}))

(defroutes home-routes
           (GET "/" [] (render-file "public/templates/home.html" {}))
           (GET "/tags" [] (show-tags))
           (DELETE "/tags/:tagname" [tagname] (do (tags/remove-tag! tagname)
                                                  (show-tags)))
           (POST "/tags" [name regexes] (do (tags/add-tag! {:name name :regexes (strings->regexes regexes)})
                                            (tags/tag-and-update-transactions! transactions/transactions tags/tags)
                                            (show-tags)))
           (GET "/transactions" [] (render-file "public/templates/transactions.html"
                                                {:transactions @transactions/transactions
                                                 :sum-by-tag   (transactions/sum-transactions-pr-tag @transactions/transactions)}))
           (GET "/transactions/:year/:month-index" [year month-index]
                (let [transactions-in-month (transactions/transactions-in-month @transactions/transactions (. Integer parseInt year) (. Integer parseInt month-index))]
                  (render-file
                    "public/templates/transactions.html"
                    {:transactions transactions-in-month
                     :sum-by-tag   (transactions/sum-transactions-pr-tag transactions-in-month)})))
           (GET "/graphs" []
                ;; default graph
                (redirect "/graphs/sum-by-tag"))
           (GET "/graphs/:graph-type" [graph-type]
                (graph-view/graph (keyword graph-type)))
           (GET "/graphs/:graph-type/:year/:month-idx" [graph-type year month-idx]
                (graph-view/graph-at-time (keyword graph-type) (. Integer parseInt year) (. Integer parseInt month-idx))))