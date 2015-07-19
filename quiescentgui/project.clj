(defproject quiescentgui "0.0.1"
  :description "Cashflow quiscent gui"
  :dependencies [[org.clojure/clojure "1.7.0"]
                 [org.clojure/clojurescript "0.0-3308"]

                 ;; Backend
                 [compojure "1.1.6"]
                 [hiccup "1.0.5"]
                 [ring-server "0.3.1"]
                 [ring/ring-json "0.3.0"]
                 [cheshire "5.3.1"]
                 [clj-time "0.6.0"]
                 [org.clojure/tools.nrepl "0.2.3"]
                 [clj-http "0.5.5"]

                 ;; Cljs
                 [figwheel "0.3.7"]

                 ]

  ;; Start backend
  :ring {:handler cashflow.handler/app}


  :plugins [[lein-ring "0.8.10"]]

  :profiles {:dev {:plugins      [[lein-cljsbuild "1.0.6"]
                                  [lein-figwheel "0.3.7"]]

                   :dependencies [[cljs-http "0.1.35"]
                                  [quiescent "0.2.0-RC2"]
                                  [secretary "1.2.3"]]
                   :cljsbuild    {
                                  :builds [{:id           "dev"
                                            :source-paths ["cljs"]
                                            :figwheel     true

                                            :compiler     {:main          "cashflow.repl"
                                                           :output-to     "resources/public/js/app.js"
                                                           :output-dir    "resources/public/js/out"
                                                           :optimizations :none
                                                           :asset-path    "js/out"
                                                           :source-map    true
                                                           :pretty-print  true}}]
                                  }

                   :figwheel     {
                                  :http-server-root "public"
                                  :server-port      3448
                                  :css-dirs         ["resources/public/css"]
                                  :nrepl-port       7888}}

             }
  )
