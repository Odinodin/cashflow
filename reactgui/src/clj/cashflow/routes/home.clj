(ns cashflow.routes.home
  (:require [compojure.core :refer :all]
            [cashflow.views.layout :as layout]
            [ring.util.response :refer [resource-response response]]))

(defroutes home-routes
           (GET "/" [] (resource-response "index.html" {:root "public"})))
