(ns cashflow.repl
  (:use cashflow.handler
        ring.server.standalone
        print.foo
        clojure.repl
        [ring.middleware file-info file])
  (:require [clj-time.coerce :as t-coerce]
            [clj-time.format :as t-format]
            [clj-time.core :as t]
            [selmer.parser :as selmer]
            [clojure.pprint :refer [pprint]]
            [clojure.tools.namespace.repl :refer [refresh]]

            [cashflow.handler :as handler]
            [cashflow.models.transactions :as trans]
            [cashflow.models.tags :as tags]))

(defonce server (atom nil))

(defn get-handler []
  ;; #'app expands to (var app) so that when we reload our code,
  ;; the server is forced to re-resolve the symbol in the var
  ;; rather than having its own copy. When the root binding
  ;; changes, the server picks it up without having to restart.
  (-> #'lein-app-handler
      ; Makes static assets in $PROJECT_DIR/resources/public/ available.
      (wrap-file "resources")
      ; Content-Type, Content-Length, and Last Modified headers for files in body7
      (wrap-file-info)))

(defn start-server
  "used for starting the server in development mode from REPL"
  [& [port]]
  (let [port (if port (Integer/parseInt port) 8080)]
    (reset! server
            (serve (get-handler)
                   {:port         port
                    :init         init
                    :auto-reload? true
                    :destroy      destroy
                    :join         true}))
    (println (str "You can view the site at http://localhost:" port))))

(defn stop-server []
  (.stop @server)
  (reset! server nil))


(defn bootstrap-testdata []
  (let [tags (:tags handler/mutants)
        transactions (:transactions handler/mutants)]
    (reset! tags [])
    (reset! transactions [])
    (trans/add-transactions! transactions (.getFile (clojure.java.io/resource "test-transactions.csv")))
    (tags/add-tag! tags {:name "Butikk" :regexes [#"Rema" #"Kiwi" #"Rimi" #"KIWI" #"Coop" #"REMA"]})
    (tags/add-tag! tags {:name "Reise" :regexes [#"NSB" #"Jet"]})
    (tags/add-tag! tags {:name "Barnehage" :regexes [#"Barnehage"]})
    (tags/add-tag! tags {:name "Hus" :regexes [#"Housing", #"Kommunen" #"Husleie"]})
    (tags/add-tag! tags {:name "Møbler" :regexes [#"Ikea", #"Plantasjon" #"Maxbo"]})
    (tags/add-tag! tags {:name "Lommepenger" :regexes [#"Kantine" #"Narvesen" #"Botanisk" #"Baker"]})
    (tags/add-tag! tags {:name "Mobil" :regexes [#"Mobil"]})
    (tags/tag-and-update-transactions! transactions tags)))

(defn start-and-bootstrap []
  (start-server)
  (bootstrap-testdata))

#_(trans/add-transactions! (.getFile (clojure.java.io/resource "test-transactions.csv")))


#_(tags/add-tag! {:name "butikk" :regexes [#"Rema" #"Kiwi" #"Rimi"]})
#_(tags/add-tag! {:name "tog" :regexes [#"NSB"]})

#_(tags/tag-and-update-transactions! trans/transactions tags/tags)

#_(tags/get-tagged-transactions @trans/transactions "butikk")

#_(. (t/date-time 2014 5 1) getYear)
#_(. (t/date-time 2014 5 1) getMonthOfYear)




