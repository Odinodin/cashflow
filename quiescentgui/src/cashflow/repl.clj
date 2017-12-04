(ns cashflow.repl
  (:use cashflow.handler
        ring.server.standalone
        [figwheel-sidecar.repl-api :as fig]
        [ring.middleware file-info file]))

(defn start-figwheel []
  (fig/start-figwheel!
    {:figwheel-options {:css-dirs ["resources/public/css"]}
     :build-ids ["dev"]
     :all-builds [{:id "dev"
                   :source-paths ["cljs"]
                   :figwheel {:on-jsload "cashflow.app/force-rerender"}

                   :compiler {:main 'cashflow.app
                              :asset-path "/js/out"
                              :output-to "resources/public/js/app.js"
                              :output-dir "resources/public/js/out"
                              :source-map-timestamp true
                              :foreign-libs [{:file "lib/standalone-framework.src.js" :provides ["Standalone"]}
                                             {:file "lib/highcharts.src.js" :provides ["Highcharts"] :requires ["Standalone"]}]}}]}))

(defonce server (atom nil))

(defn get-handler []
  ;; #'app expands to (var app) so that when we reload our code,
  ;; the server is forced to re-resolve the symbol in the var
  ;; rather than having its own copy. When the root binding
  ;; changes, the server picks it up without having to restart.
  (-> #'app
      ; Makes static assets in $PROJECT_DIR/resources/public/ available.
      (wrap-file "resources")
      ; Content-Type, Content-Length, and Last Modified headers for files in body7
      (wrap-file-info)))

(defn start-server
  "used for starting the server in development mode from REPL"
  [& [port]]
  (let [port (if port (Integer/parseInt port) 3000)]
    (reset! server
            (serve (get-handler)
                   {:port         port
                    :auto-reload? true
                    :destroy      destroy
                    :join         false}))
    (println (str "You can view the site at http://localhost:" port))))

(defn stop-server []
  (.stop @server)
  (reset! server nil))

(defn start []
  (start-server)
  (start-figwheel))