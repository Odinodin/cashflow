(defproject cashflow "0.1.0-SNAPSHOT"
  :description "FIXME: write description"
  :url "http://example.com/FIXME"
  :dependencies [[org.clojure/clojure "1.6.0"]
                 [compojure "1.1.6"]
                 [hiccup "1.0.5"]
                 [ring-server "0.3.1"]
                 [clj-time "0.6.0"]]
  :plugins [[lein-ring "0.8.10"]]
  :ring {:handler cashflow.handler/app
         :init cashflow.handler/init
         :destroy cashflow.handler/destroy}
  :aot :all
  :profiles
  {:production {:ring
                {:open-browser? false, :stacktraces? false, :auto-reload? false}}
   :dev {:dependencies [[ring-mock "0.1.5"]
                        [ring/ring-devel "1.2.1"]
                        [midje "1.6.3"]
                        [print-foo "0.5.0"]]
         :plugins [[lein-midje "3.1.3"]]
         :test-paths ["test"]
         :resource-paths ["test-resources"]
         }})
