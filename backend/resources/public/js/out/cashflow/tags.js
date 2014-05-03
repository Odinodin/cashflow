// Compiled by ClojureScript 0.0-2173
goog.provide('cashflow.tags');
goog.require('cljs.core');
goog.require('cashflow.xhr');
goog.require('goog.events');
goog.require('cljs_http.client');
goog.require('om.dom');
goog.require('om.core');
goog.require('om.core');
goog.require('cljs_http.client');
goog.require('om.dom');
goog.require('cashflow.xhr');
goog.require('goog.events');
cljs.core.enable_console_print_BANG_.call(null);
cashflow.tags.app_state = cljs.core.atom.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tags","tags",1017456523),cljs.core.PersistentVector.EMPTY], null));
cashflow.tags.display_tag = (function display_tag(p__9347){var map__9349 = p__9347;var map__9349__$1 = ((cljs.core.seq_QMARK_.call(null,map__9349))?cljs.core.apply.call(null,cljs.core.hash_map,map__9349):map__9349);var regexes = cljs.core.get.call(null,map__9349__$1,new cljs.core.Keyword(null,"regexes","regexes",2099903143));var tag = cljs.core.get.call(null,map__9349__$1,new cljs.core.Keyword(null,"tag","tag",1014018828));return [cljs.core.str(tag),cljs.core.str(" : "),cljs.core.str(clojure.string.join.call(null," ",regexes))].join('');
});
cashflow.tags.tag_view = (function tag_view(tag,owner){if(typeof cashflow.tags.t9353 !== 'undefined')
{} else
{
/**
* @constructor
*/
cashflow.tags.t9353 = (function (owner,tag,tag_view,meta9354){
this.owner = owner;
this.tag = tag;
this.tag_view = tag_view;
this.meta9354 = meta9354;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cashflow.tags.t9353.cljs$lang$type = true;
cashflow.tags.t9353.cljs$lang$ctorStr = "cashflow.tags/t9353";
cashflow.tags.t9353.cljs$lang$ctorPrWriter = (function (this__4010__auto__,writer__4011__auto__,opt__4012__auto__){return cljs.core._write.call(null,writer__4011__auto__,"cashflow.tags/t9353");
});
cashflow.tags.t9353.prototype.om$core$IRender$ = true;
cashflow.tags.t9353.prototype.om$core$IRender$render$arity$1 = (function (this$){var self__ = this;
var this$__$1 = this;return React.DOM.li(null,cashflow.tags.display_tag.call(null,self__.tag));
});
cashflow.tags.t9353.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_9355){var self__ = this;
var _9355__$1 = this;return self__.meta9354;
});
cashflow.tags.t9353.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_9355,meta9354__$1){var self__ = this;
var _9355__$1 = this;return (new cashflow.tags.t9353(self__.owner,self__.tag,self__.tag_view,meta9354__$1));
});
cashflow.tags.__GT_t9353 = (function __GT_t9353(owner__$1,tag__$1,tag_view__$1,meta9354){return (new cashflow.tags.t9353(owner__$1,tag__$1,tag_view__$1,meta9354));
});
}
return (new cashflow.tags.t9353(owner,tag,tag_view,null));
});
cashflow.tags.tags_view = (function tags_view(app,owner){if(typeof cashflow.tags.t9360 !== 'undefined')
{} else
{
/**
* @constructor
*/
cashflow.tags.t9360 = (function (owner,app,tags_view,meta9361){
this.owner = owner;
this.app = app;
this.tags_view = tags_view;
this.meta9361 = meta9361;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cashflow.tags.t9360.cljs$lang$type = true;
cashflow.tags.t9360.cljs$lang$ctorStr = "cashflow.tags/t9360";
cashflow.tags.t9360.cljs$lang$ctorPrWriter = (function (this__4010__auto__,writer__4011__auto__,opt__4012__auto__){return cljs.core._write.call(null,writer__4011__auto__,"cashflow.tags/t9360");
});
cashflow.tags.t9360.prototype.om$core$IRender$ = true;
cashflow.tags.t9360.prototype.om$core$IRender$render$arity$1 = (function (this$){var self__ = this;
var this$__$1 = this;return React.DOM.div(null,React.DOM.h1(null,"Tags"),cljs.core.apply.call(null,om.dom.ul,null,om.core.build_all.call(null,cashflow.tags.tag_view,new cljs.core.Keyword(null,"tags","tags",1017456523).cljs$core$IFn$_invoke$arity$1(self__.app))));
});
cashflow.tags.t9360.prototype.om$core$IWillMount$ = true;
cashflow.tags.t9360.prototype.om$core$IWillMount$will_mount$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return cashflow.xhr.json_xhr.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"method","method",4231316563),new cljs.core.Keyword(null,"get","get",1014006472),new cljs.core.Keyword(null,"url","url",1014020321),"../api/tags",new cljs.core.Keyword(null,"on-complete","on-complete",2943599833),(function (p1__9356_SHARP_){return om.core.transact_BANG_.call(null,self__.app,new cljs.core.Keyword(null,"tags","tags",1017456523),(function (___$2){return p1__9356_SHARP_;
}));
})], null));
});
cashflow.tags.t9360.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_9362){var self__ = this;
var _9362__$1 = this;return self__.meta9361;
});
cashflow.tags.t9360.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_9362,meta9361__$1){var self__ = this;
var _9362__$1 = this;return (new cashflow.tags.t9360(self__.owner,self__.app,self__.tags_view,meta9361__$1));
});
cashflow.tags.__GT_t9360 = (function __GT_t9360(owner__$1,app__$1,tags_view__$1,meta9361){return (new cashflow.tags.t9360(owner__$1,app__$1,tags_view__$1,meta9361));
});
}
return (new cashflow.tags.t9360(owner,app,tags_view,null));
});
om.core.root.call(null,cashflow.tags.tags_view,cashflow.tags.app_state,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"target","target",4427965699),document.getElementById("contents")], null));

//# sourceMappingURL=tags.js.map