(ns cashflow.views.tag-view
  (:require [cashflow.models.categories :as tags]
            [cashflow.models.transactions :as transactions]
            [selmer.parser :refer [render-file]]))

(defn- strings->regexes
  [regexes]
  (->>
    (clojure.string/split regexes #",")
    (map (comp re-pattern clojure.string/trim))
    (vec)))


(defn show-tags [{tags :tags} & error]
  (render-file "public/templates/tags.html" (->
                                              {:tags @tags}
                                              (cond-> error (assoc :error (first error))))))

(defn delete-tag [mutants tagname]
  (do (tags/remove-category! (:tags mutants) tagname)
      (tags/tag-and-update-transactions! (:transactions mutants) (:tags mutants))
      (show-tags mutants)))

(defn create-tag [{:keys [tags transactions] :as mutants} name regexes]
  (if (tags/category-exists? @tags name)
    (show-tags @tags (str "Tag '" name "' already exists.."))
    (do (tags/add-category! tags {:name name :regexes (strings->regexes regexes)})
        (tags/tag-and-update-transactions! transactions tags)
        (show-tags mutants))))