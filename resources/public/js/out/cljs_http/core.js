// Compiled by ClojureScript 0.0-2173
goog.provide('cljs_http.core');
goog.require('cljs.core');
goog.require('cljs.core.async');
goog.require('cljs.core.async');
goog.require('cljs_http.util');
goog.require('cljs_http.util');
goog.require('goog.net.EventType');
goog.require('goog.net.XhrIo');
cljs_http.core.pending_requests = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
/**
* Attempt to close the given channel and abort the pending HTTP request
* with which it is associated.
*/
cljs_http.core.abort_BANG_ = (function abort_BANG_(channel){var temp__4092__auto__ = cljs.core.deref.call(null,cljs_http.core.pending_requests).call(null,channel);if(cljs.core.truth_(temp__4092__auto__))
{var xhr = temp__4092__auto__;cljs.core.swap_BANG_.call(null,cljs_http.core.pending_requests,cljs.core.dissoc,channel);
cljs.core.async.close_BANG_.call(null,channel);
return xhr.abort();
} else
{return null;
}
});
/**
* Execute the HTTP request corresponding to the given Ring request
* map and return a core.async channel.
*/
cljs_http.core.request = (function request(p__13297){var map__13300 = p__13297;var map__13300__$1 = ((cljs.core.seq_QMARK_.call(null,map__13300))?cljs.core.apply.call(null,cljs.core.hash_map,map__13300):map__13300);var request__$1 = map__13300__$1;var with_credentials_QMARK_ = cljs.core.get.call(null,map__13300__$1,new cljs.core.Keyword(null,"with-credentials?","with-credentials?",3165820380));var body = cljs.core.get.call(null,map__13300__$1,new cljs.core.Keyword(null,"body","body",1016933652));var headers = cljs.core.get.call(null,map__13300__$1,new cljs.core.Keyword(null,"headers","headers",1809212152));var request_method = cljs.core.get.call(null,map__13300__$1,new cljs.core.Keyword(null,"request-method","request-method",1993477457));var channel = cljs.core.async.chan.call(null);var request_url = cljs_http.util.build_url.call(null,request__$1);var method = cljs.core.name.call(null,(function (){var or__3443__auto__ = request_method;if(cljs.core.truth_(or__3443__auto__))
{return or__3443__auto__;
} else
{return new cljs.core.Keyword(null,"get","get",1014006472);
}
})());var timeout = (function (){var or__3443__auto__ = new cljs.core.Keyword(null,"timeout","timeout",3994960083).cljs$core$IFn$_invoke$arity$1(request__$1);if(cljs.core.truth_(or__3443__auto__))
{return or__3443__auto__;
} else
{return 0;
}
})();var headers__$1 = cljs_http.util.build_headers.call(null,headers);var send_credentials = (((with_credentials_QMARK_ == null))?true:with_credentials_QMARK_);var xhr = (function (){var G__13301 = (new goog.net.XhrIo());G__13301.setTimeoutInterval(timeout);
G__13301.setWithCredentials(send_credentials);
return G__13301;
})();cljs.core.swap_BANG_.call(null,cljs_http.core.pending_requests,cljs.core.assoc,channel,xhr);
xhr.listen(goog.net.EventType.COMPLETE,(function (p1__13296_SHARP_){var target = p1__13296_SHARP_.target;cljs.core.async.put_BANG_.call(null,channel,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"status","status",4416389988),target.getStatus(),new cljs.core.Keyword(null,"body","body",1016933652),target.getResponseText(),new cljs.core.Keyword(null,"headers","headers",1809212152),cljs_http.util.parse_headers.call(null,target.getAllResponseHeaders()),new cljs.core.Keyword(null,"trace-redirects","trace-redirects",4143757569),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [request_url,target.getLastUri()], null)], null));
cljs.core.swap_BANG_.call(null,cljs_http.core.pending_requests,cljs.core.dissoc,channel);
return cljs.core.async.close_BANG_.call(null,channel);
}));
xhr.send(request_url,method,body,headers__$1);
return channel;
});

//# sourceMappingURL=core.js.map