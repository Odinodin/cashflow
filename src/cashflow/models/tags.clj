(ns cashflow.models.tags)

;; TODO put tag rules in an atom and add functionality for adding and removing rules
;; Tags
(def tagging-rules
  [{:tag "butikk" :regexes [#"Rema" #"Kiwi" #"Rimi"]}
   {:tag "kafe" :regexes [#"Narvesen"]}
   {:tag "lonn" :regexes [#"Kodemaker" #"Ullevål"]}])

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
                         (map :tag)))
    transactions))

(defn get-tagged-transactions [transactions tag]
  (filter #(some #{tag} (:tags %)) transactions))