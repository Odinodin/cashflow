(defproject cashflow-backend "0.1.0-SNAPSHOT"
  :description "Cashflowing"
  :url "http://example.com/FIXME"
  :source-paths ["src/clj"]
  :test-paths ["test/clj"]
  :dependencies [[org.clojure/clojure "1.9.0-RC2"]
                 [clj-time "0.14.2"]
                 [cheshire "5.8.0"]
                 [compojure "1.6.0"]
                 [hiccup "1.0.5"]
                 [ring-middleware-format "0.7.2"]
                 [ring "1.6.3"]
                 [mount "0.1.11"]

                 [com.datomic/datomic-free "0.9.5651" :exclusions [joda-time]]

                 ;; Support
                 [prone "1.1.4"]
                 [org.clojure/tools.nrepl "0.2.13"]]
  :repl-options {:init-ns repl}

  :ring {:handler cashflow.handler/lein-app-handler
         :init cashflow.handler/init
         :destroy cashflow.handler/destroy}
  :aot :all
  :jvm-opts ["-Xmx768M"]
  :profiles
  {:production {:ring
                {:open-browser? false, :stacktraces? false, :auto-reload? false}}
   :dev {:source-paths ["dev"]
         :dependencies [[ring/ring-mock "0.3.2"]
                        [ring/ring-devel "1.6.3"]
                        [org.clojure/tools.namespace "0.2.10"]]
         :test-paths ["test"]
         :resource-paths ["test-resources"]}}

  :repositories {"my.datomic.com" {:url "https://my.datomic.com/repo"}})
