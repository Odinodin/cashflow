(ns cashflow.routes.tags
  (:require
    [cashflow.models.tags :as tags]
    [ring.handler.dump :refer [handle-dump]]
    [compojure.core :refer :all]))

;; TODO Check for duplicates
(defn- create-tag [request]
  (let [tags (-> request :mutants :tags)
        new-tag (-> request :body-params)]
    {:status 201
     :body   (tags/add-tag! tags new-tag)}))

(defroutes tags-routes
           (GET "/tags" {{:keys [tags]} :mutants} {:body @tags})
           (POST "/tags" [] create-tag)
           (GET "/tags/:tagname" [tagname :as {{:keys [tags]} :mutants}] {:body (tags/tagname->tag @tags tagname)})
           (DELETE "/tags/:tagname" [tagname :as {{:keys [tags]} :mutants}] {:body (tags/delete tags tagname)})
           (ANY "/ring-dump" [] handle-dump))               ;; For debugging