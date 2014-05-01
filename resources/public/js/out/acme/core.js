// Compiled by ClojureScript 0.0-2173
goog.provide('acme.core');
goog.require('cljs.core');
goog.require('acme.xhr');
goog.require('goog.events');
goog.require('cljs_http.client');
goog.require('om.dom');
goog.require('om.core');
goog.require('om.core');
goog.require('cljs_http.client');
goog.require('om.dom');
goog.require('acme.xhr');
goog.require('goog.events');
cljs.core.enable_console_print_BANG_.call(null);
acme.core.app_state = cljs.core.atom.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"transactions","transactions",2968026311),cljs.core.PersistentVector.EMPTY], null));
acme.core.display_transaction = (function display_transaction(p__14094){var map__14096 = p__14094;var map__14096__$1 = ((cljs.core.seq_QMARK_.call(null,map__14096))?cljs.core.apply.call(null,cljs.core.hash_map,map__14096):map__14096);var code = cljs.core.get.call(null,map__14096__$1,new cljs.core.Keyword(null,"code","code",1016963423));var amount = cljs.core.get.call(null,map__14096__$1,new cljs.core.Keyword(null,"amount","amount",3895018442));var description = cljs.core.get.call(null,map__14096__$1,new cljs.core.Keyword(null,"description","description",3584325486));return [cljs.core.str(description),cljs.core.str(" : "),cljs.core.str(amount),cljs.core.str(" NOK "),cljs.core.str("("),cljs.core.str(code),cljs.core.str(")")].join('');
});
acme.core.transaction_view = (function transaction_view(transaction,owner){if(typeof acme.core.t14100 !== 'undefined')
{} else
{
/**
* @constructor
*/
acme.core.t14100 = (function (owner,transaction,transaction_view,meta14101){
this.owner = owner;
this.transaction = transaction;
this.transaction_view = transaction_view;
this.meta14101 = meta14101;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
acme.core.t14100.cljs$lang$type = true;
acme.core.t14100.cljs$lang$ctorStr = "acme.core/t14100";
acme.core.t14100.cljs$lang$ctorPrWriter = (function (this__4010__auto__,writer__4011__auto__,opt__4012__auto__){return cljs.core._write.call(null,writer__4011__auto__,"acme.core/t14100");
});
acme.core.t14100.prototype.om$core$IRender$ = true;
acme.core.t14100.prototype.om$core$IRender$render$arity$1 = (function (this$){var self__ = this;
var this$__$1 = this;return React.DOM.li(null,acme.core.display_transaction.call(null,self__.transaction));
});
acme.core.t14100.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_14102){var self__ = this;
var _14102__$1 = this;return self__.meta14101;
});
acme.core.t14100.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_14102,meta14101__$1){var self__ = this;
var _14102__$1 = this;return (new acme.core.t14100(self__.owner,self__.transaction,self__.transaction_view,meta14101__$1));
});
acme.core.__GT_t14100 = (function __GT_t14100(owner__$1,transaction__$1,transaction_view__$1,meta14101){return (new acme.core.t14100(owner__$1,transaction__$1,transaction_view__$1,meta14101));
});
}
return (new acme.core.t14100(owner,transaction,transaction_view,null));
});
acme.core.transactions_view = (function transactions_view(app,owner){if(typeof acme.core.t14107 !== 'undefined')
{} else
{
/**
* @constructor
*/
acme.core.t14107 = (function (owner,app,transactions_view,meta14108){
this.owner = owner;
this.app = app;
this.transactions_view = transactions_view;
this.meta14108 = meta14108;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
acme.core.t14107.cljs$lang$type = true;
acme.core.t14107.cljs$lang$ctorStr = "acme.core/t14107";
acme.core.t14107.cljs$lang$ctorPrWriter = (function (this__4010__auto__,writer__4011__auto__,opt__4012__auto__){return cljs.core._write.call(null,writer__4011__auto__,"acme.core/t14107");
});
acme.core.t14107.prototype.om$core$IRender$ = true;
acme.core.t14107.prototype.om$core$IRender$render$arity$1 = (function (this$){var self__ = this;
var this$__$1 = this;return React.DOM.div(null,React.DOM.h1(null,"Transactions"),cljs.core.apply.call(null,om.dom.ul,null,om.core.build_all.call(null,acme.core.transaction_view,new cljs.core.Keyword(null,"transactions","transactions",2968026311).cljs$core$IFn$_invoke$arity$1(self__.app))));
});
acme.core.t14107.prototype.om$core$IWillMount$ = true;
acme.core.t14107.prototype.om$core$IWillMount$will_mount$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return acme.xhr.json_xhr.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"method","method",4231316563),new cljs.core.Keyword(null,"get","get",1014006472),new cljs.core.Keyword(null,"url","url",1014020321),"transactions",new cljs.core.Keyword(null,"on-complete","on-complete",2943599833),(function (p1__14103_SHARP_){return om.core.transact_BANG_.call(null,self__.app,new cljs.core.Keyword(null,"transactions","transactions",2968026311),(function (___$2){return p1__14103_SHARP_;
}));
})], null));
});
acme.core.t14107.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_14109){var self__ = this;
var _14109__$1 = this;return self__.meta14108;
});
acme.core.t14107.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_14109,meta14108__$1){var self__ = this;
var _14109__$1 = this;return (new acme.core.t14107(self__.owner,self__.app,self__.transactions_view,meta14108__$1));
});
acme.core.__GT_t14107 = (function __GT_t14107(owner__$1,app__$1,transactions_view__$1,meta14108){return (new acme.core.t14107(owner__$1,app__$1,transactions_view__$1,meta14108));
});
}
return (new acme.core.t14107(owner,app,transactions_view,null));
});
om.core.root.call(null,acme.core.transactions_view,acme.core.app_state,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"target","target",4427965699),document.getElementById("contents")], null));

//# sourceMappingURL=core.js.map