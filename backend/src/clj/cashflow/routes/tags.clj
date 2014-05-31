(ns cashflow.routes.tags
  (:require
    [cashflow.models.tags :as tags]
    [compojure.core :refer :all]))

(defroutes tags-routes
           (GET "/tags" {{:keys [tags]} :mutants} {:body @tags})
           (GET "/tags/:tagname" [tagname :as {{:keys [tags]} :mutants}] {:body (tags/tagname->tag @tags tagname)})
           (DELETE "/tags/:tagname" [tagname :as {{:keys [tags]} :mutants}] {:body (tags/delete tags tagname)}))