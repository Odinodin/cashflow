(defproject cashflow-backend "0.1.0-SNAPSHOT"
  :description "FIXME: write description"
  :url "http://example.com/FIXME"
  :source-paths ["src/clj"]
  :test-paths ["test/clj"]
  :dependencies [[org.clojure/clojure "1.6.0"]
                 [clj-time "0.6.0"]
                 [cheshire "5.3.1"]
                 [compojure "1.1.6"]
                 [hiccup "1.0.5"]
                 [ring-middleware-format "0.4.0"]
                 [ring "1.3.1"]
                 [ring-server "0.3.1"]

                 [prismatic/schema "0.2.6"]

                 [com.datomic/datomic-pro "0.9.4956"]

                 ;; GUI
                 [selmer "0.6.6"]

                 ;; Support
                 [prone "0.6.0"]
                 [org.clojure/tools.nrepl "0.2.3"]]
  :plugins [[lein-ring "0.8.12"]]
  :ring {:handler cashflow.handler/lein-app-handler
         :init cashflow.handler/init
         :destroy cashflow.handler/destroy}
  :aot :all
  :jvm-opts ["-Xmx768M"]
  :profiles
  {:production {:ring
                {:open-browser? false, :stacktraces? false, :auto-reload? false}}
   :dev {:dependencies [[ring-mock "0.1.5"]
                        [ring/ring-devel "1.2.1"]
                        [midje "1.6.3"]
                        [print-foo "0.5.0"]
                        [org.clojure/tools.namespace "0.2.4"]]
         :plugins [[lein-midje "3.1.3"]]
         :test-paths ["test"]
         :resource-paths ["test-resources"]}})
