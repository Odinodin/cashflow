(ns cashflow.routes.home
  (:require [compojure.core :refer :all]
            [cashflow.views.layout :as layout]
            [ring.util.response :refer [resource-response response]]))

(defn home []
  (layout/common [:h1 "Hello World!"]))

(defroutes home-routes
           (GET "/" [] (resource-response "index.html" {:root "public"}))
           (GET "/tags" [] (resource-response "tags.html" {:root "public"})))
