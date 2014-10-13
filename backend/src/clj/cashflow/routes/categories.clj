(ns cashflow.routes.categories
  (:require
    [cashflow.models.categories :as categories]
    [ring.handler.dump :refer [handle-dump]]
    [compojure.core :refer :all]))

;; TODO Check for duplicates
(defn- create-category [request]
  (let [categories (-> request :mutants :categories)
        new-category (-> request :body-params)]
    {:status 201
     :body   (categories/add-category! categories new-category)}))

(defroutes category-routes
           (GET "/categories" {{:keys [categories]} :mutants} {:body @categories})
           (POST "/categories" [] create-category)
           (GET "/categories/:categoryname" [categoryname :as {{:keys [categories]} :mutants}] {:body (categories/categoryname->category @categories categoryname)})
           (DELETE "/categories/:categoryname" [categoryname :as {{:keys [categories]} :mutants}] {:body (categories/delete! categories categoryname)})
           (ANY "/ring-dump" [] handle-dump))               ;; For debugging