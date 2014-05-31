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
  (map (fn [trans] (update-in trans [:date] #(t-format/unparse (t-format/formatters :date) %))) transactions))

(defroutes home-routes
           (GET "/" {{:keys [transactions tags]} :mutants}

                (println (str "TRANS:" transactions))
                (println (str "tags:" tags))
                (render-file "public/templates/home.html" {}))

           ;; Tags
           (GET "/tags" {mutants :mutants} (tag-view/show-tags mutants))
           (DELETE "/tags/:tagname" [tagname :as {mutants :mutants}]
                   (tag-view/delete-tag mutants tagname))
           (POST "/tags" [name regexes :as {mutants :mutants}]
                 (tag-view/create-tag mutants name regexes))

           ;; Transactions
           ;; TODO Extract out into own namespace
           (GET "/transactions" {{:keys [transactions]} :mutants}
                (let [year (first (transactions/unique-years @transactions))]
                  (redirect (str "/transactions/" year))))

           (GET "/transactions/:year" [year :as {{:keys [transactions tags]} :mutants}]
                (let [transactions-in-year (transactions/transactions-in-year @transactions (. Integer parseInt year))]
                  (render-file "public/templates/transactions.html"
                               {:transactions (date-time->date-string transactions-in-year)
                                :sum-by-tag   (transactions/sum-transactions-pr-tag transactions-in-year)
                                :years        (transactions/unique-years @transactions)
                                :current-year year})))
           (GET "/transactions/:year/:month-index" [year month-index :as {{:keys [transactions]} :mutants}]
                (let [transactions-in-month (transactions/transactions-in-month @transactions (. Integer parseInt year) (. Integer parseInt month-index))]
                  (render-file
                    "public/templates/transactions.html"
                    {:transactions (date-time->date-string transactions-in-month)
                     :sum-by-tag   (transactions/sum-transactions-pr-tag transactions-in-month)
                     :years        (transactions/unique-years @transactions)
                     :current-year year
                     :current-month month-index})))

           ;; Graphs
           (GET "/graphs" []
                (redirect "/graphs/sum-by-tag"))            ; default graph
           (GET "/graphs/:graph-type" [graph-type :as {mutants :mutants}]
                (graph-view/graph (keyword graph-type) mutants))
           (GET "/graphs/:graph-type/:year/:month-idx" [graph-type year month-idx :as {mutants :mutants}]
                (graph-view/graph-month (keyword graph-type) mutants (. Integer parseInt year) (. Integer parseInt month-idx)))
           (GET "/graphs/:graph-type/:year" [graph-type year :as {mutants :mutants}]
                (graph-view/graph-year (keyword graph-type) mutants (. Integer parseInt year))))