(ns cashflow.routes.transactions
  (:require
    [cashflow.models.transactions :as trans]
    ;; TODO move datomic down a level, does not belong here
    [datomic.api :as d]
    [compojure.core :refer :all]
    [cashflow.models.db :as cdb]))

(defn- map-keys [f m]
  (zipmap (map f (keys m))
          (vals m)))

(defn- to-public-keys
  "Takes a list of maps and transforms all keys from :prefix/keyword -> keyword
  Note that (-> :x/y name keyword) returns :y"
  [transaction]
  (map-keys (comp keyword name) transaction))

(defn- from-public-keys [public-transaction]
  (map-keys #(->> % name (str "transaction/") keyword) public-transaction))

(defn- transactions-in-month [year month]
  (trans/dfind-transactions-by-month
    cdb/db-conn
    (. Integer parseInt year)
    (. Integer parseInt month)))

(defn- transactions-by-year [year]
  (trans/dfind-transactions-by-year
    (d/db cdb/db-conn)
    (. Integer parseInt year)))

(defn- net-income-by-month []
  (let [all-transactions (trans/d-all-transactions (d/db cdb/db-conn))
        income-by-month (trans/net-income-by-month all-transactions)]
    income-by-month))

(defroutes transactions-routes
           (GET "/transactions/time/years" []
             {:body {:years (trans/dfind-unique-years-in-transactions
                              (d/db cdb/db-conn))}})

           (GET "/transactions/time/:year" [year]
             {:body (->> (transactions-by-year year) (map to-public-keys))})

           (GET "/transactions/time/:year/:month" [year month]
             {:body (->> (transactions-in-month year month) (map to-public-keys))})

           (GET "/transactions/sum/:year/:month" [year month]
             (let [trans-in-month (transactions-in-month year month)]
               {:body (trans/sum-transactions-pr-category trans-in-month)}))

           (GET "/transactions/sum/:year" [year]
             (let [trans-in-year (transactions-by-year year)]
               {:body (trans/sum-transactions-pr-category trans-in-year)}))

           (GET "/transactions/net-income" []
             {:body (net-income-by-month)})

           (GET "/transactions/sum-by-category/:year" [year]
             {:body {:year year
                     :sum-by-category (for [month-idx (range 1 13)]
                                        (let [trans-in-month (transactions-in-month year (str month-idx))]
                                          {:month      month-idx
                                           :categories (trans/sum-transactions-pr-category trans-in-month)}))}})

           (POST ["/transactions/:id"] [id :as {body-params :body-params}]
             (trans/update-transaction cdb/db-conn (-> body-params from-public-keys))
             {:body (->> (trans/d-find-transaction-by-id (d/db cdb/db-conn) id) to-public-keys)}))
