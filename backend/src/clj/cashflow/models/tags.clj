(ns cashflow.models.tags)

;; Contains a list of all tags.
;; A tag is represented as {:name "tagname" :regexes [#"list" #"of" #"regexes"]}
(def tags (atom []))

(defn add-tag! [tag]
  (swap! tags conj tag))

(defn remove-tag! [tag-name]
  (swap! tags #(remove (fn [tag] (= (:name tag) tag-name)) %)))

(defn match-tag-rules
  "Find matching tag rules by returning all rules that
  have regexes that matches the text"
  [tag-rules text]
  (filter
    (fn [rule]
      (some #(re-find % text) (:regexes rule)))
    tag-rules))

(defn tag-transactions
  "Run all tag rules over all transactions"
  [transactions tag-rules]
  (map
    #(assoc % :tags (->>
                         (match-tag-rules tag-rules (:description %))
                         (map :name)))
    transactions))

(defn tag-and-update-transactions! [transactions tags]
  (reset! transactions (tag-transactions @transactions @tags)))

(defn get-tagged-transactions [transactions tag]
  (filter #(some #{tag} (:tags %)) transactions))

(defn tagname->tag [tagname]
  (first (filter #(= tagname (:name %)) @tags)))

(defn delete [tagname]
  (swap! tags #(remove (fn [tag-rule] (= (:name tag-rule) tagname)) %)))