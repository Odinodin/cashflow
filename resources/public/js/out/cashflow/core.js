// Compiled by ClojureScript 0.0-2173
goog.provide('cashflow.core');
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
cashflow.core.app_state = cljs.core.atom.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"transactions","transactions",2968026311),cljs.core.PersistentVector.EMPTY], null));
cashflow.core.display_transaction = (function display_transaction(p__9363){var map__9365 = p__9363;var map__9365__$1 = ((cljs.core.seq_QMARK_.call(null,map__9365))?cljs.core.apply.call(null,cljs.core.hash_map,map__9365):map__9365);var code = cljs.core.get.call(null,map__9365__$1,new cljs.core.Keyword(null,"code","code",1016963423));var amount = cljs.core.get.call(null,map__9365__$1,new cljs.core.Keyword(null,"amount","amount",3895018442));var description = cljs.core.get.call(null,map__9365__$1,new cljs.core.Keyword(null,"description","description",3584325486));return [cljs.core.str(description),cljs.core.str(" : "),cljs.core.str(amount),cljs.core.str(" NOK "),cljs.core.str("("),cljs.core.str(code),cljs.core.str(")")].join('');
});
cashflow.core.transaction_view = (function transaction_view(transaction,owner){if(typeof cashflow.core.t9369 !== 'undefined')
{} else
{
/**
* @constructor
*/
cashflow.core.t9369 = (function (owner,transaction,transaction_view,meta9370){
this.owner = owner;
this.transaction = transaction;
this.transaction_view = transaction_view;
this.meta9370 = meta9370;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cashflow.core.t9369.cljs$lang$type = true;
cashflow.core.t9369.cljs$lang$ctorStr = "cashflow.core/t9369";
cashflow.core.t9369.cljs$lang$ctorPrWriter = (function (this__4010__auto__,writer__4011__auto__,opt__4012__auto__){return cljs.core._write.call(null,writer__4011__auto__,"cashflow.core/t9369");
});
cashflow.core.t9369.prototype.om$core$IRender$ = true;
cashflow.core.t9369.prototype.om$core$IRender$render$arity$1 = (function (this$){var self__ = this;
var this$__$1 = this;return React.DOM.li(null,cashflow.core.display_transaction.call(null,self__.transaction));
});
cashflow.core.t9369.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_9371){var self__ = this;
var _9371__$1 = this;return self__.meta9370;
});
cashflow.core.t9369.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_9371,meta9370__$1){var self__ = this;
var _9371__$1 = this;return (new cashflow.core.t9369(self__.owner,self__.transaction,self__.transaction_view,meta9370__$1));
});
cashflow.core.__GT_t9369 = (function __GT_t9369(owner__$1,transaction__$1,transaction_view__$1,meta9370){return (new cashflow.core.t9369(owner__$1,transaction__$1,transaction_view__$1,meta9370));
});
}
return (new cashflow.core.t9369(owner,transaction,transaction_view,null));
});
cashflow.core.transactions_view = (function transactions_view(app,owner){if(typeof cashflow.core.t9376 !== 'undefined')
{} else
{
/**
* @constructor
*/
cashflow.core.t9376 = (function (owner,app,transactions_view,meta9377){
this.owner = owner;
this.app = app;
this.transactions_view = transactions_view;
this.meta9377 = meta9377;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cashflow.core.t9376.cljs$lang$type = true;
cashflow.core.t9376.cljs$lang$ctorStr = "cashflow.core/t9376";
cashflow.core.t9376.cljs$lang$ctorPrWriter = (function (this__4010__auto__,writer__4011__auto__,opt__4012__auto__){return cljs.core._write.call(null,writer__4011__auto__,"cashflow.core/t9376");
});
cashflow.core.t9376.prototype.om$core$IRender$ = true;
cashflow.core.t9376.prototype.om$core$IRender$render$arity$1 = (function (this$){var self__ = this;
var this$__$1 = this;return React.DOM.div(null,React.DOM.h1(null,"Transactions"),cljs.core.apply.call(null,om.dom.ul,null,om.core.build_all.call(null,cashflow.core.transaction_view,new cljs.core.Keyword(null,"transactions","transactions",2968026311).cljs$core$IFn$_invoke$arity$1(self__.app))));
});
cashflow.core.t9376.prototype.om$core$IWillMount$ = true;
cashflow.core.t9376.prototype.om$core$IWillMount$will_mount$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return cashflow.xhr.json_xhr.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"method","method",4231316563),new cljs.core.Keyword(null,"get","get",1014006472),new cljs.core.Keyword(null,"url","url",1014020321),"../api/transactions",new cljs.core.Keyword(null,"on-complete","on-complete",2943599833),(function (p1__9372_SHARP_){return om.core.transact_BANG_.call(null,self__.app,new cljs.core.Keyword(null,"transactions","transactions",2968026311),(function (___$2){return p1__9372_SHARP_;
}));
})], null));
});
cashflow.core.t9376.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_9378){var self__ = this;
var _9378__$1 = this;return self__.meta9377;
});
cashflow.core.t9376.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_9378,meta9377__$1){var self__ = this;
var _9378__$1 = this;return (new cashflow.core.t9376(self__.owner,self__.app,self__.transactions_view,meta9377__$1));
});
cashflow.core.__GT_t9376 = (function __GT_t9376(owner__$1,app__$1,transactions_view__$1,meta9377){return (new cashflow.core.t9376(owner__$1,app__$1,transactions_view__$1,meta9377));
});
}
return (new cashflow.core.t9376(owner,app,transactions_view,null));
});
om.core.root.call(null,cashflow.core.transactions_view,cashflow.core.app_state,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"target","target",4427965699),document.getElementById("contents")], null));

//# sourceMappingURL=core.js.map