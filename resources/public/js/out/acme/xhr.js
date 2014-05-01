// Compiled by ClojureScript 0.0-2173
goog.provide('acme.xhr');
goog.require('cljs.core');
goog.require('goog.events');
goog.require('goog.events');
acme.xhr.meths = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"get","get",1014006472),"GET",new cljs.core.Keyword(null,"put","put",1014015617),"PUT",new cljs.core.Keyword(null,"post","post",1017351186),"POST",new cljs.core.Keyword(null,"delete","delete",3973413149),"DELETE"], null);
acme.xhr.json_xhr = (function json_xhr(p__13979){var map__13981 = p__13979;var map__13981__$1 = ((cljs.core.seq_QMARK_.call(null,map__13981))?cljs.core.apply.call(null,cljs.core.hash_map,map__13981):map__13981);var on_complete = cljs.core.get.call(null,map__13981__$1,new cljs.core.Keyword(null,"on-complete","on-complete",2943599833));var data = cljs.core.get.call(null,map__13981__$1,new cljs.core.Keyword(null,"data","data",1016980252));var url = cljs.core.get.call(null,map__13981__$1,new cljs.core.Keyword(null,"url","url",1014020321));var method = cljs.core.get.call(null,map__13981__$1,new cljs.core.Keyword(null,"method","method",4231316563));var xhr = (new goog.net.XhrIo());goog.events.listen(xhr,goog.net.EventType.COMPLETE,(function (e){return on_complete.call(null,cljs.core.js__GT_clj.call(null,xhr.getResponseJson(),new cljs.core.Keyword(null,"keywordize-keys","keywordize-keys",4191781672),true));
}));
return xhr.send(url,acme.xhr.meths.call(null,method),(cljs.core.truth_(data)?cljs.core.pr_str.call(null,data):null),{"Content-Type": "application/json"});
});

//# sourceMappingURL=xhr.js.map