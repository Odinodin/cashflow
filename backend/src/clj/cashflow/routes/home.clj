(ns cashflow.routes.home
  (:require [compojure.core :refer :all]
            [cashflow.views.layout :as layout]
            [ring.util.response :refer [resource-response response redirect]]
            [selmer.parser :refer [render-file]]
            [cashflow.views.tag-view :as tag-view]
            [cashflow.views.graph-view :as graph-view]
            [cashflow.views.transactions-views :as transactions-views]))

(defroutes home-routes
           (GET "/" {{:keys [transactions tags]} :mutants}
                (render-file "public/templates/home.html" {}))

           ;; Tags
           (GET "/tags" {mutants :mutants} (tag-view/show-tags mutants))
           (DELETE "/tags/:tagname" [tagname :as {mutants :mutants}]
                   (tag-view/delete-tag mutants tagname))
           (POST "/tags" [name regexes :as {mutants :mutants}]
                 (tag-view/create-tag mutants name regexes))

           ;; Transactions
           (GET "/transactions" {{:keys [transactions]} :mutants}
                (transactions-views/all-transactions transactions))
           (GET "/transactions/:year" [year :as {{:keys [transactions]} :mutants}]
                (transactions-views/transactions-in-year transactions year))
           (GET "/transactions/:year/:month-index" [year month-index :as {{:keys [transactions]} :mutants}]
                (transactions-views/transactions-in-month transactions year month-index))

           ;; Graphs
           (GET "/graphs" []
                (redirect "/graphs/sum-by-tag"))            ; default graph
           (GET "/graphs/:graph-type" [graph-type :as {mutants :mutants}]
                (graph-view/graph (keyword graph-type) mutants))
           (GET "/graphs/:graph-type/:year/:month-idx" [graph-type year month-idx :as {mutants :mutants}]
                (graph-view/graph-month (keyword graph-type) mutants (. Integer parseInt year) (. Integer parseInt month-idx)))
           (GET "/graphs/:graph-type/:year" [graph-type year :as {mutants :mutants}]
                (graph-view/graph-year (keyword graph-type) mutants (. Integer parseInt year))))