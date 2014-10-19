(ns cashflow.views.tag-view
  (:require [cashflow.models.categories :as categories]
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
  (do (categories/remove-category! (:tags mutants) tagname)
      (categories/tag-and-update-transactions! (:transactions mutants) (:tags mutants))
      (show-tags mutants)))

(defn create-tag [{:keys [tags transactions] :as mutants} name regexes]
  (if (categories/category-exists? @tags name)
    (show-tags @tags (str "Tag '" name "' already exists.."))
    (do (categories/add-category! tags {:name name :regexes (strings->regexes regexes)})
        (categories/tag-and-update-transactions! transactions tags)
        (show-tags mutants))))