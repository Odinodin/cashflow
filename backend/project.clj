(defproject cashflow-backend "0.1.0-SNAPSHOT"
  :description "Cashflowing"
  :url "http://example.com/FIXME"
  :source-paths ["src/clj"]
  :test-paths ["test/clj"]
  :dependencies [[org.clojure/clojure "1.10.0"]
                 [clj-time "0.15.1"]
                 [cheshire "5.8.1"]
                 [compojure "1.6.1"]
                 [hiccup "1.0.5"]
                 [ring-middleware-format "0.7.4"]
                 [ring "1.7.1"]
                 [mount "0.1.16"]

                 [com.datomic/datomic-free "0.9.5697" :exclusions [joda-time]]

                 ;; Support
                 [prone "1.6.1"]
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
                        [ring/ring-devel "1.7.1"]
                        [org.clojure/tools.namespace "0.2.10"]]
         :test-paths ["test"]
         :resource-paths ["test-resources"]}}

  :repositories {"my.datomic.com" {:url "https://my.datomic.com/repo"}})
