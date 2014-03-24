(ns cashflow.models.transactions
  (:require [clojure.java.io :as io]
            [clj-time.core :as t]
            [clj-time.format :as f]
            )
  (:import [java.io BufferedReader FileReader]))

(def transactions (atom []))

;; Example line:
;;  Date                       Code   Description                             Amount    Reference
;; ["06.05.2009" "06.05.2009" "VARER" "05.05 PRINCESS AVD. STENERSGT. 1 OSLO" "-119,00" "17017470066"]
(defn lines->transactions [lines-as-vectors]
  (for [[date date2 code description amount & dontcare] lines-as-vectors]
    {:date (f/parse (f/formatter "dd.MM.yyyy") date) :code code :description description :amount (-> amount
                                                              (clojure.string/replace "," ".")
                                                              bigdec)}))

(defn parse-file [file]
  {:pre [(not (nil? file))]}
  (with-open [rdr (BufferedReader.
                    (FileReader. file))]
    (let [lines (doall (line-seq rdr))]
      (for [line lines]
        (clojure.string/split line #"\t")))))


#_(defn add-transactions! [trans]
  (swap! transactions into trans))