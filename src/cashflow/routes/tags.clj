(ns cashflow.routes.tags
  (:require
    [cashflow.models.tags :as tags]
    [compojure.core :refer :all]))

(defroutes tags-routes
           (GET "/tags" [] {:body @tags/tags}))