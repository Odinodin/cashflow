(ns cashflow.models.tags)

(defn add-tag! [tags tag]
  (swap! tags conj tag))

(defn remove-tag! [tags tag-name]
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
                         (map :name)
                         (vec)))
    transactions))

(defn tag-and-update-transactions! [transactions tags]
  (reset! transactions (tag-transactions @transactions @tags)))

(defn get-tagged-transactions [transactions tag]
  (filter #(some #{tag} (:tags %)) transactions))

(defn tagname->tag [tags tagname]
  (first (filter #(= tagname (:name %)) tags)))

(defn delete [tags tagname]
  (swap! tags #(remove (fn [tag-rule] (= (:name tag-rule) tagname)) %)))


(defn tag-exists? [tags name]
  (some #(= (:name %) name) tags))