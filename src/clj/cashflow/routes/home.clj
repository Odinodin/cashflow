(ns cashflow.routes.home
  (:require [compojure.core :refer :all]
            [cashflow.views.layout :as layout]
            [ring.util.response :refer [resource-response response]]
            ))

(defn home []
  (layout/common [:h1 "Hello World!"]))

(defroutes home-routes
           #_(GET "/" [] (home))
           (GET "/" [] (resource-response "index.html" {:root "public"})))
