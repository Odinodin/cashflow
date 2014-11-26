(ns cashflow.routes.categories
  (:require
    [cashflow.models.categories :as categories]
    [ring.handler.dump :refer [handle-dump]]
    [compojure.core :refer :all]
    [datomic.api :as d]))

;; TODO Check for duplicates
(defn- create-category [request]
  (let [db-conn (-> request :system :database :uri d/connect)
        new-category (-> request :body-params)
        category-map (categories/dt-add-category! db-conn new-category)]
    {:status 201
     :body category-map}))

(defn- list-categories [request]
  (let [db-conn (-> request :system :database :uri d/connect)]
    {:status 200
     :body (categories/dt-list-categories db-conn)}))

(defn- delete-category [request category-name]
  (let [db-conn (-> request :system :database :uri d/connect)]
    (categories/dt-remove-category! db-conn category-name))
    {:status 200
     :body nil})

(defn- find-category [request category-name]
  (let [db (-> request :system :database :uri d/connect d/db)]
    {:status 200
     :body (categories/dt-find-category  db category-name)}))

(defroutes category-routes
           (GET "/categories" [] list-categories)
           (POST "/categories" [] create-category)
           (GET "/categories/:category-name" [category-name :as req] (find-category req category-name))
           (DELETE "/categories/:category-name" [category-name :as req] (delete-category req category-name))
           (ANY "/ring-dump" [] handle-dump))               ;; For debugging