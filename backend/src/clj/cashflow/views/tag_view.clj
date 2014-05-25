(ns cashflow.views.tag-view
  (:require [cashflow.models.tags :as tags]
            [cashflow.models.transactions :as transactions]
            [selmer.parser :refer [render-file]]))

(defn- strings->regexes
  [regexes]
  (->>
    (clojure.string/split regexes #",")
    (map (comp re-pattern clojure.string/trim))
    (vec)))


(defn show-tags [& error]
  (render-file "public/templates/tags.html" (->
                                              {:tags @tags/tags}
                                              (cond-> error (assoc :error (first error))))))

(defn delete-tag [tagname]
  (do (tags/remove-tag! tagname)
      (show-tags)))

(defn create-tag [name regexes]
  (if (tags/tag-exists? name)
    (show-tags (str "Tag '" name "' already exists.."))
    (do (tags/add-tag! {:name name :regexes (strings->regexes regexes)})
        (tags/tag-and-update-transactions! transactions/transactions tags/tags)
        (show-tags))))