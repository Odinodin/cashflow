(ns cashflow.time
  (:require [clj-time.core :as t]
            [clj-time.format :as t-format]
            [clj-time.coerce :as t-coerce]))

;; Date helpers
(defn same-date? [date1 date2]
  (= (t-coerce/to-local-date date1)
     (t-coerce/to-local-date date2)))

(defn same-year-month? [date year month]
  (and (= (clj-time.core/year date) year)
       (= (clj-time.core/month date) month)))

(defn same-year? [date year]
  (= (clj-time.core/year date) year))

(defn string->date [date]
  (t-format/parse (t-format/formatter "dd.MM.yyyy") date))

(defn iso8600string->date [date]
  (t-format/parse (t-format/formatter "yyyy-MM-dd") date))