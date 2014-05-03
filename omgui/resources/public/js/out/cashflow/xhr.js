// Compiled by ClojureScript 0.0-2173
goog.provide('cashflow.xhr');
goog.require('cljs.core');
goog.require('goog.events');
goog.require('goog.events');
cashflow.xhr.meths = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"get","get",1014006472),"GET",new cljs.core.Keyword(null,"put","put",1014015617),"PUT",new cljs.core.Keyword(null,"post","post",1017351186),"POST",new cljs.core.Keyword(null,"delete","delete",3973413149),"DELETE"], null);
cashflow.xhr.json_xhr = (function json_xhr(p__9347){var map__9349 = p__9347;var map__9349__$1 = ((cljs.core.seq_QMARK_.call(null,map__9349))?cljs.core.apply.call(null,cljs.core.hash_map,map__9349):map__9349);var on_complete = cljs.core.get.call(null,map__9349__$1,new cljs.core.Keyword(null,"on-complete","on-complete",2943599833));var data = cljs.core.get.call(null,map__9349__$1,new cljs.core.Keyword(null,"data","data",1016980252));var url = cljs.core.get.call(null,map__9349__$1,new cljs.core.Keyword(null,"url","url",1014020321));var method = cljs.core.get.call(null,map__9349__$1,new cljs.core.Keyword(null,"method","method",4231316563));var xhr = (new goog.net.XhrIo());goog.events.listen(xhr,goog.net.EventType.COMPLETE,(function (e){return on_complete.call(null,cljs.core.js__GT_clj.call(null,xhr.getResponseJson(),new cljs.core.Keyword(null,"keywordize-keys","keywordize-keys",4191781672),true));
}));
return xhr.send(url,cashflow.xhr.meths.call(null,method),(cljs.core.truth_(data)?cljs.core.pr_str.call(null,data):null),{"Content-Type": "application/json"});
});

//# sourceMappingURL=xhr.js.map