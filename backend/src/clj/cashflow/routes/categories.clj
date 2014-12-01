(ns cashflow.routes.categories
  (:require
    [cashflow.models.categories :as categories]
    [ring.handler.dump :refer [handle-dump]]
    [compojure.core :refer :all]
    [datomic.api :as d]))

(defn- map-keys [f m]
  (zipmap (map f (keys m))
          (vals m)))

(defn- to-public-keys
  "Takes a list of maps and transforms all keys from :prefix/keyword -> keyword
  Note that (-> :x/y name keyword) returns :y"
  [category]
  (map-keys (comp keyword name) category))

(defn- from-public-keys [public-category]
  (map-keys #(->> % name (str "category/") keyword) public-category))

;; TODO Check for duplicates
(defn- create-category [request]
  (let [db-conn (-> request :system :database :uri d/connect)
        new-category (-> request :body-params from-public-keys)
        category-map (-> (categories/dt-add-category! db-conn new-category) to-public-keys)]
    {:status 201
     :body category-map}))

(defn- list-categories [request]
  (let [db-conn (-> request :system :database :uri d/connect)
        public-categories (->> (categories/dt-list-categories db-conn) (map to-public-keys))]
    {:status 200
     :body public-categories}))

(defn- delete-category [request category-name]
  (let [db-conn (-> request :system :database :uri d/connect)]
    (categories/dt-remove-category! db-conn category-name))
    {:status 200
     :body nil})

(defn- find-category [request category-name]
  (let [db (-> request :system :database :uri d/connect d/db)]
    {:status 200
     :body (-> (categories/dt-find-category db category-name) to-public-keys)}))

(defroutes category-routes
           (GET "/categories" [] list-categories)
           (POST "/categories" [] create-category)
           (GET "/categories/:category-name" [category-name :as req] (find-category req category-name))
           (DELETE "/categories/:category-name" [category-name :as req] (delete-category req category-name))
           (ANY "/ring-dump" [] handle-dump))               ;; For debugging