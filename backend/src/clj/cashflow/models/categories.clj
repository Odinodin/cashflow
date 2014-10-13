(ns cashflow.models.categories)

(defn add-category! [categories category]
  (swap! categories conj category))

(defn remove-category! [categories category-name]
  (swap! categories #(remove (fn [category] (= (:name category) category-name)) %)))

(defn match-category-rules
  "Find matching category rules by returning all rules that
  have regexes that matches the text"
  [category-rules text]
  (filter
    (fn [rule]
      (some #(re-find % text) (:regexes rule)))
    category-rules))

(defn tag-transactions
  "Run all category rules over all transactions"
  [transactions category-rules]
  (map
    #(assoc % :category (->>
                         (match-category-rules category-rules (:description %))
                         (map :name)
                         (vec)
                         (first)))
    transactions))

(defn tag-and-update-transactions! [transactions categories]
  (reset! transactions (tag-transactions @transactions @categories)))

(defn get-transactions-in-category [transactions category]
  (filter #(= category (:category %)) transactions))

(defn categoryname->category [categories category-name]
  (first (filter #(= category-name (:name %)) categories)))

(defn delete! [categories category-name]
  (swap! categories #(remove (fn [category-rule] (= (:name category-rule) category-name)) %)))

(defn category-exists? [categories name]
  (some #(= (:name %) name) categories))