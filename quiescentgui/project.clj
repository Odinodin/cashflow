(defproject quiescentgui "0.0.1"
  :description "Cashflow quiscent gui"
  :dependencies [[org.clojure/clojure "1.8.0"]
                 [org.clojure/clojurescript "1.8.34"]

                 ;; Backend
                 [compojure "1.5.0"]
                 [hiccup "1.0.5"]
                 [ring-server "0.4.0"]
                 [ring/ring-json "0.4.0"]
                 [cheshire "5.3.1"]
                 [clj-time "0.11.0"]
                 [org.clojure/tools.nrepl "0.2.3"]
                 [clj-http "2.1.0"]

                 ;; Cljs
                 [quiescent "0.3.1"]
                 [cljs-http "0.1.39"]
                 [secretary "1.2.3"]]


  :clean-targets ^{:protect false} ["resources/public/js" "target"]

  ;; Start backend
  :ring {:handler cashflow.handler/app}

  :repl-options {:init-ns cashflow.repl}

  :plugins [[lein-ring "0.8.10"]]

  :profiles {:dev {:plugins [[lein-cljsbuild "1.1.3"]]
                   :dependencies [[figwheel-sidecar "0.5.3-1"]]}})
