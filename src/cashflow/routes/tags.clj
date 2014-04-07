(ns cashflow.routes.tags
  (:require
    [cashflow.models.tags :as tags]
    [compojure.core :refer :all]))

(defroutes tags-routes
           (GET "/tags/:tagname" [tagname] {:body (tags/tagname->tag tagname)})
           (GET "/tags" [] {:body @tags/tags}))