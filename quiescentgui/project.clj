(defproject quiescentgui "0.0.1"
  :description "Cashflow quiscent gui"
  :dependencies [[org.clojure/clojure "1.9.0-alpha14"]
                 [org.clojure/clojurescript "1.9.293"]

                 ;; Backend
                 [compojure "1.5.1"]
                 [hiccup "1.0.5"]
                 [ring-server "0.4.0"]
                 [ring/ring-json "0.4.0"]
                 [cheshire "5.6.3"]
                 [clj-time "0.12.2"]
                 [org.clojure/tools.nrepl "0.2.12"]
                 [clj-http "2.1.0"]

                 ;; Cljs
                 [quiescent "0.3.2"]
                 [cljs-http "0.1.42"]
                 [secretary "1.2.3"]]


  :clean-targets ^{:protect false} ["resources/public/js" "target"]

  ;; Start backend
  :ring {:handler cashflow.handler/app}

  :repl-options {:init-ns cashflow.repl}

  :plugins [[lein-ring "0.10.0"]]

  :profiles {:dev {:plugins [[lein-cljsbuild "1.1.5"]]
                   :dependencies [[figwheel-sidecar "0.5.8"]]}})
