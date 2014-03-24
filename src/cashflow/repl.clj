(ns cashflow.repl
  (:use cashflow.handler
        ring.server.standalone
        print.foo
        [ring.middleware file-info file])
  (:require [clj-time.coerce :as coerce]
           [clj-time.core :as time])

  (:require [cashflow.models.transactions :as trans]))

(comment
  (defonce server (atom nil))

  (defn get-handler []
    ;; #'app expands to (var app) so that when we reload our code,
    ;; the server is forced to re-resolve the symbol in the var
    ;; rather than having its own copy. When the root binding
    ;; changes, the server picks it up without having to restart.
    (-> #'app
        ; Makes static assets in $PROJECT_DIR/resources/public/ available.
        (wrap-file "resources")
        ; Content-Type, Content-Length, and Last Modified headers for files in body
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
    (reset! server nil)))



#_(def x (trans/parse-file (.getFile (clojure.java.io/resource "test-transactions.csv"))))

(println "BEFORE" @trans/transactions)
(trans/add-transactions (.getFile (clojure.java.io/resource "test-transactions.csv")))
(print "AFTER" (count @trans/transactions))

(clojure.pprint/pprint  (trans/transactions-at-date (time/date-time 2009 05 20)))




#_(trans/add-transactions (.getFile (clojure.java.io/resource "test-transactions.csv")))


#_(println (second (trans/lines->transactions
                  [
                    ["06.05.2009" "06.05.2009" "VARER" "05.05 PRINCESS AVD. STENERSGT. 1 OSLO" "-119,00" "17017470066"]
                    ["06.05.2009" "06.05.2009" "VARER" "05.05 MENY OSLO CITY STENERSGT.1 OSLO" "-159,20" "17017532866"]
                    ["05.05.2009" "05.05.2009" "OVFNETTB" "Laanekassen Mai Odin" "-5060,00" "91520467" "9775.10.03467"]
                    ["04.05.2009" "04.05.2009" "OVFNETTB" "Tilbakefort" "5060,00" "91520139" "9775.10.03467"]
                    ["04.05.2009" "04.05.2009" "OVFNETTB" "Laanekassen Mai Odin" "-5060,00" "91520136" "9775.10.03467"]
                    ["04.05.2009" "01.05.2009" "OVFNETTB" "Telenor Mobil regning" "-300,00" "91521256" "9775.10.03467"]
                    ["04.05.2009" "04.05.2009" "GIRO" "Nettgiro fra: Odin Hole Standal Betalt: 03.05.09" "25000,00" "50391039152" "3910.28.87488"]
                    ["28.04.2009" "28.04.2009" "GIRO" "Nettgiro fra: Odin Hole Standal Betalt: 27.04.09" "2000,00" "50391079152" "3910.28.87488"]
                    ["28.04.2009" "28.04.2009" "L?N" "Betalt: 28.04.09" "-5297,00" "20219991"]
                    ["22.04.2009" "22.04.2009" "GIRO" "Nettgiro fra: Odin Hole Standal Betalt: 21.04.09" "4000,00" "50391019152" "3910.28.87488"]])))
