(defproject cashflow "0.1.0-SNAPSHOT"
  :description "FIXME: write description"
  :url "http://example.com/FIXME"
  :source-paths ["src/clj"]
  :test-paths ["test/clj"]
  :dependencies [[org.clojure/clojure "1.6.0"]
                 [compojure "1.1.6"]
                 [hiccup "1.0.5"]
                 [ring-server "0.3.1"]
                 [ring/ring-json "0.3.0"]
                 [cheshire "5.3.1"]
                 [clj-time "0.6.0"]
                 [org.clojure/tools.nrepl "0.2.3"]
                 [clj-http "0.5.5"]]
  :plugins [[lein-ring "0.8.10"]]
  :ring {:handler cashflow.handler/app
         :init cashflow.handler/init
         :destroy cashflow.handler/destroy}

  :profiles
  {:production {:ring
                {:open-browser? false, :stacktraces? false, :auto-reload? false}}
   :dev {:dependencies [[ring-mock "0.1.5"]
                        [ring/ring-devel "1.2.1"]
                        [print-foo "0.5.0"]]}})
