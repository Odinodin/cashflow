(ns cashflow.encoding
  (:require [cheshire.generate :as generate]
            [clj-time.coerce :as coerce]
            [clj-time.format :as format])
  (:import org.joda.time.DateTime
           java.util.regex.Pattern))


(defn add-common-json-encoders!
  "Non-memoize version of add-common-json-encoders!"
  []
  (generate/add-encoder
    Pattern
    (fn [data jsonGenerator]
      (.writeString jsonGenerator (.toString data))))
  (generate/add-encoder
    DateTime
    (fn [data jsonGenerator]
      (.writeString jsonGenerator (format/unparse (format/formatters :date) data)))))