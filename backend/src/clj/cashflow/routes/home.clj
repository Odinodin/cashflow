(ns cashflow.routes.home
  (:require [compojure.core :refer :all]
            [cashflow.views.layout :as layout]
            [ring.util.response :refer [resource-response response redirect]]
            [selmer.parser :refer [render-file]]
            [clj-time.format :as t-format]
            [cashflow.models.transactions :as transactions]
            [cashflow.views.tag-view :as tag-view]
            [cashflow.views.graph-view :as graph-view]))

(defn- date-time->date-string [transactions]
  (map (fn [trans] (update-in trans [:date] #(t-format/unparse (t-format/formatters :date) %)) ) transactions))

(defroutes home-routes
           (GET "/" [] (render-file "public/templates/home.html" {}))

           ;; Tags
           (GET "/tags" [] (tag-view/show-tags))
           (DELETE "/tags/:tagname" [tagname] (tag-view/delete-tag tagname))
           (POST "/tags" [name regexes] (tag-view/create-tag name regexes))

           ;; Transactions
           (GET "/transactions" [] (render-file "public/templates/transactions.html"
                                                {:transactions (date-time->date-string @transactions/transactions)
                                                 :sum-by-tag   (transactions/sum-transactions-pr-tag @transactions/transactions)}))
           (GET "/transactions/:year/:month-index" [year month-index]
                (let [transactions-in-month (transactions/transactions-in-month @transactions/transactions (. Integer parseInt year) (. Integer parseInt month-index))]
                  (render-file
                    "public/templates/transactions.html"
                    {:transactions (date-time->date-string transactions-in-month)
                     :sum-by-tag   (transactions/sum-transactions-pr-tag transactions-in-month)})))

           ;; Graphs
           (GET "/graphs" []
                (redirect "/graphs/sum-by-tag")) ; default graph
           (GET "/graphs/:graph-type" [graph-type]
                (graph-view/graph (keyword graph-type)))
           (GET "/graphs/:graph-type/:year/:month-idx" [graph-type year month-idx]
                (graph-view/graph-month (keyword graph-type) (. Integer parseInt year) (. Integer parseInt month-idx)))
           (GET "/graphs/:graph-type/:year" [graph-type year]
                (graph-view/graph-year (keyword graph-type) (. Integer parseInt year))))