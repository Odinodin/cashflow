(ns cashflow.routes.home
  (:require [compojure.core :refer :all]
            [cashflow.views.layout :as layout]
            [ring.util.response :refer [resource-response response]]
            [selmer.parser :refer [render-file]]
            [cashflow.models.tags :as tags]))

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
                                            (show-tags)))
           (GET "/transactions" [] (render-file "public/templates/transactions.html" {:entries [{:name "monkey"} {:name ""}]})))

