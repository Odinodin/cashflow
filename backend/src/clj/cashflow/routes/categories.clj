(ns cashflow.routes.categories
  (:require
    [cashflow.models.categories :as categories]
    [ring.handler.dump :refer [handle-dump]]
    [compojure.core :refer :all]))

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
  (let [new-category (-> request :body-params from-public-keys)
        category-map (-> (categories/dt-add-category! new-category) to-public-keys)]
    {:status 201
     :body category-map}))

(defn- list-categories []
  (let [public-categories (->> (categories/dt-list-categories) (map to-public-keys))]
    {:status 200
     :body public-categories}))

(defn- delete-category [category-name]
  (categories/dt-remove-category! category-name)
    {:status 200
     :body nil})

(defn- find-category [category-name]
  {:status 200
   :body (-> (categories/find-category category-name) to-public-keys)})

(defroutes category-routes
           (GET "/categories" [] (list-categories))
           (POST "/categories" [] create-category)
           (GET "/categories/:category-name" [category-name] (find-category category-name))
           (DELETE "/categories/:category-name" [category-name] (delete-category category-name))
           (ANY "/ring-dump" [] handle-dump))               ;; For debugging