(defproject cashflow-backend "0.1.0-SNAPSHOT"
  :description "FIXME: write description"
  :url "http://example.com/FIXME"
  :source-paths ["src/clj"]
  :test-paths ["test/clj"]
  :dependencies [[org.clojure/clojure "1.8.0"]
                 [clj-time "0.11.0"]
                 [cheshire "5.5.0"]
                 [compojure "1.5.0"]
                 [hiccup "1.0.5"]
                 [ring-middleware-format "0.5.0"]
                 [ring "1.4.0"]

                 [prismatic/schema "0.4.3"]

                 [com.datomic/datomic-free "0.9.5350" :exclusions [joda-time]]

                 ;; GUI
                 [selmer "0.8.2"]

                 ;; Support
                 [prone "0.8.2"]
                 [org.clojure/tools.nrepl "0.2.10"]]
  :ring {:handler cashflow.handler/lein-app-handler
         :init cashflow.handler/init
         :destroy cashflow.handler/destroy}
  :aot :all
  :jvm-opts ["-Xmx768M"]
  :profiles
  {:production {:ring
                {:open-browser? false, :stacktraces? false, :auto-reload? false}}
   :dev {:source-paths ["dev"]
         :dependencies [[ring/ring-mock "0.2.0"]
                        [ring/ring-devel "1.4.0"]
                        [midje "1.7.0"]
                        [print-foo "1.0.2"]
                        [org.clojure/tools.namespace "0.2.10"]]
         :plugins [[lein-midje "3.1.3"]]
         :test-paths ["test"]
         :resource-paths ["test-resources"]}}

  :repositories {"my.datomic.com" {:url "https://my.datomic.com/repo"}})
