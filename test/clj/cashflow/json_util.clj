(ns cashflow.json-util
  (:require cheshire.core))

(defn json-parse-body
  "JSON-parses body into a Clojure datastructure"
  [response]
  (assoc response :body (cheshire.core/parse-string (:body response) true)))