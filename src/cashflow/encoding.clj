(ns cashflow.encoding
  (:require [cheshire.generate :as generate]
            [clj-time.coerce :as coerce])
  (:import org.joda.time.DateTime))


(defn add-common-json-encoders!
  "Non-memoize version of add-common-json-encoders!"
  []
  (generate/add-encoder
    DateTime
    (fn [data jsonGenerator]
      (.writeString jsonGenerator (coerce/to-string data)))))