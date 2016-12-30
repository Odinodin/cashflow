(ns cashflow.event-bus)

(def listeners (atom []))

(defn add-listener [id topic handler]
  (swap! listeners conj {:id id :topic topic :handler handler}))

(defn publish [topic & args]
  (doseq [listener @listeners]
    (when (= topic (:topic listener))
      (apply (:handler listener) args))))

(defn publish-all [events]
  (doseq [e events]
    (apply publish e)))
