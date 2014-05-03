// Compiled by ClojureScript 0.0-2173
goog.provide('cljs.core.async');
goog.require('cljs.core');
goog.require('cljs.core.async.impl.ioc_helpers');
goog.require('cljs.core.async.impl.protocols');
goog.require('cljs.core.async.impl.buffers');
goog.require('cljs.core.async.impl.timers');
goog.require('cljs.core.async.impl.channels');
goog.require('cljs.core.async.impl.dispatch');
goog.require('cljs.core.async.impl.dispatch');
goog.require('cljs.core.async.impl.buffers');
goog.require('cljs.core.async.impl.protocols');
goog.require('cljs.core.async.impl.timers');
goog.require('cljs.core.async.impl.channels');
goog.require('cljs.core.async.impl.ioc_helpers');
cljs.core.async.fn_handler = (function fn_handler(f){if(typeof cljs.core.async.t10514 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t10514 = (function (f,fn_handler,meta10515){
this.f = f;
this.fn_handler = fn_handler;
this.meta10515 = meta10515;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t10514.cljs$lang$type = true;
cljs.core.async.t10514.cljs$lang$ctorStr = "cljs.core.async/t10514";
cljs.core.async.t10514.cljs$lang$ctorPrWriter = (function (this__4010__auto__,writer__4011__auto__,opt__4012__auto__){return cljs.core._write.call(null,writer__4011__auto__,"cljs.core.async/t10514");
});
cljs.core.async.t10514.prototype.cljs$core$async$impl$protocols$Handler$ = true;
cljs.core.async.t10514.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return true;
});
cljs.core.async.t10514.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return self__.f;
});
cljs.core.async.t10514.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_10516){var self__ = this;
var _10516__$1 = this;return self__.meta10515;
});
cljs.core.async.t10514.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_10516,meta10515__$1){var self__ = this;
var _10516__$1 = this;return (new cljs.core.async.t10514(self__.f,self__.fn_handler,meta10515__$1));
});
cljs.core.async.__GT_t10514 = (function __GT_t10514(f__$1,fn_handler__$1,meta10515){return (new cljs.core.async.t10514(f__$1,fn_handler__$1,meta10515));
});
}
return (new cljs.core.async.t10514(f,fn_handler,null));
});
/**
* Returns a fixed buffer of size n. When full, puts will block/park.
*/
cljs.core.async.buffer = (function buffer(n){return cljs.core.async.impl.buffers.fixed_buffer.call(null,n);
});
/**
* Returns a buffer of size n. When full, puts will complete but
* val will be dropped (no transfer).
*/
cljs.core.async.dropping_buffer = (function dropping_buffer(n){return cljs.core.async.impl.buffers.dropping_buffer.call(null,n);
});
/**
* Returns a buffer of size n. When full, puts will complete, and be
* buffered, but oldest elements in buffer will be dropped (not
* transferred).
*/
cljs.core.async.sliding_buffer = (function sliding_buffer(n){return cljs.core.async.impl.buffers.sliding_buffer.call(null,n);
});
/**
* Returns true if a channel created with buff will never block. That is to say,
* puts into this buffer will never cause the buffer to be full.
*/
cljs.core.async.unblocking_buffer_QMARK_ = (function unblocking_buffer_QMARK_(buff){var G__10518 = buff;if(G__10518)
{var bit__4093__auto__ = null;if(cljs.core.truth_((function (){var or__3443__auto__ = bit__4093__auto__;if(cljs.core.truth_(or__3443__auto__))
{return or__3443__auto__;
} else
{return G__10518.cljs$core$async$impl$protocols$UnblockingBuffer$;
}
})()))
{return true;
} else
{if((!G__10518.cljs$lang$protocol_mask$partition$))
{return cljs.core.native_satisfies_QMARK_.call(null,cljs.core.async.impl.protocols.UnblockingBuffer,G__10518);
} else
{return false;
}
}
} else
{return cljs.core.native_satisfies_QMARK_.call(null,cljs.core.async.impl.protocols.UnblockingBuffer,G__10518);
}
});
/**
* Creates a channel with an optional buffer. If buf-or-n is a number,
* will create and use a fixed buffer of that size.
*/
cljs.core.async.chan = (function() {
var chan = null;
var chan__0 = (function (){return chan.call(null,null);
});
var chan__1 = (function (buf_or_n){var buf_or_n__$1 = ((cljs.core._EQ_.call(null,buf_or_n,0))?null:buf_or_n);return cljs.core.async.impl.channels.chan.call(null,((typeof buf_or_n__$1 === 'number')?cljs.core.async.buffer.call(null,buf_or_n__$1):buf_or_n__$1));
});
chan = function(buf_or_n){
switch(arguments.length){
case 0:
return chan__0.call(this);
case 1:
return chan__1.call(this,buf_or_n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
chan.cljs$core$IFn$_invoke$arity$0 = chan__0;
chan.cljs$core$IFn$_invoke$arity$1 = chan__1;
return chan;
})()
;
/**
* Returns a channel that will close after msecs
*/
cljs.core.async.timeout = (function timeout(msecs){return cljs.core.async.impl.timers.timeout.call(null,msecs);
});
/**
* takes a val from port. Must be called inside a (go ...) block. Will
* return nil if closed. Will park if nothing is available.
*/
cljs.core.async._LT__BANG_ = (function _LT__BANG_(port){if(null)
{return null;
} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str("<! used not in (go ...) block"),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.call(null,null))].join('')));
}
});
/**
* Asynchronously takes a val from port, passing to fn1. Will pass nil
* if closed. If on-caller? (default true) is true, and value is
* immediately available, will call fn1 on calling thread.
* Returns nil.
*/
cljs.core.async.take_BANG_ = (function() {
var take_BANG_ = null;
var take_BANG___2 = (function (port,fn1){return take_BANG_.call(null,port,fn1,true);
});
var take_BANG___3 = (function (port,fn1,on_caller_QMARK_){var ret = cljs.core.async.impl.protocols.take_BANG_.call(null,port,cljs.core.async.fn_handler.call(null,fn1));if(cljs.core.truth_(ret))
{var val_10519 = cljs.core.deref.call(null,ret);if(cljs.core.truth_(on_caller_QMARK_))
{fn1.call(null,val_10519);
} else
{cljs.core.async.impl.dispatch.run.call(null,(function (){return fn1.call(null,val_10519);
}));
}
} else
{}
return null;
});
take_BANG_ = function(port,fn1,on_caller_QMARK_){
switch(arguments.length){
case 2:
return take_BANG___2.call(this,port,fn1);
case 3:
return take_BANG___3.call(this,port,fn1,on_caller_QMARK_);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
take_BANG_.cljs$core$IFn$_invoke$arity$2 = take_BANG___2;
take_BANG_.cljs$core$IFn$_invoke$arity$3 = take_BANG___3;
return take_BANG_;
})()
;
cljs.core.async.nop = (function nop(){return null;
});
/**
* puts a val into port. nil values are not allowed. Must be called
* inside a (go ...) block. Will park if no buffer space is available.
*/
cljs.core.async._GT__BANG_ = (function _GT__BANG_(port,val){if(null)
{return null;
} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(">! used not in (go ...) block"),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.call(null,null))].join('')));
}
});
/**
* Asynchronously puts a val into port, calling fn0 (if supplied) when
* complete. nil values are not allowed. Will throw if closed. If
* on-caller? (default true) is true, and the put is immediately
* accepted, will call fn0 on calling thread.  Returns nil.
*/
cljs.core.async.put_BANG_ = (function() {
var put_BANG_ = null;
var put_BANG___2 = (function (port,val){return put_BANG_.call(null,port,val,cljs.core.async.nop);
});
var put_BANG___3 = (function (port,val,fn0){return put_BANG_.call(null,port,val,fn0,true);
});
var put_BANG___4 = (function (port,val,fn0,on_caller_QMARK_){var ret = cljs.core.async.impl.protocols.put_BANG_.call(null,port,val,cljs.core.async.fn_handler.call(null,fn0));if(cljs.core.truth_((function (){var and__3431__auto__ = ret;if(cljs.core.truth_(and__3431__auto__))
{return cljs.core.not_EQ_.call(null,fn0,cljs.core.async.nop);
} else
{return and__3431__auto__;
}
})()))
{if(cljs.core.truth_(on_caller_QMARK_))
{fn0.call(null);
} else
{cljs.core.async.impl.dispatch.run.call(null,fn0);
}
} else
{}
return null;
});
put_BANG_ = function(port,val,fn0,on_caller_QMARK_){
switch(arguments.length){
case 2:
return put_BANG___2.call(this,port,val);
case 3:
return put_BANG___3.call(this,port,val,fn0);
case 4:
return put_BANG___4.call(this,port,val,fn0,on_caller_QMARK_);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
put_BANG_.cljs$core$IFn$_invoke$arity$2 = put_BANG___2;
put_BANG_.cljs$core$IFn$_invoke$arity$3 = put_BANG___3;
put_BANG_.cljs$core$IFn$_invoke$arity$4 = put_BANG___4;
return put_BANG_;
})()
;
cljs.core.async.close_BANG_ = (function close_BANG_(port){return cljs.core.async.impl.protocols.close_BANG_.call(null,port);
});
cljs.core.async.random_array = (function random_array(n){var a = (new Array(n));var n__4291__auto___10520 = n;var x_10521 = 0;while(true){
if((x_10521 < n__4291__auto___10520))
{(a[x_10521] = 0);
{
var G__10522 = (x_10521 + 1);
x_10521 = G__10522;
continue;
}
} else
{}
break;
}
var i = 1;while(true){
if(cljs.core._EQ_.call(null,i,n))
{return a;
} else
{var j = cljs.core.rand_int.call(null,i);(a[i] = (a[j]));
(a[j] = i);
{
var G__10523 = (i + 1);
i = G__10523;
continue;
}
}
break;
}
});
cljs.core.async.alt_flag = (function alt_flag(){var flag = cljs.core.atom.call(null,true);if(typeof cljs.core.async.t10527 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t10527 = (function (flag,alt_flag,meta10528){
this.flag = flag;
this.alt_flag = alt_flag;
this.meta10528 = meta10528;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t10527.cljs$lang$type = true;
cljs.core.async.t10527.cljs$lang$ctorStr = "cljs.core.async/t10527";
cljs.core.async.t10527.cljs$lang$ctorPrWriter = (function (this__4010__auto__,writer__4011__auto__,opt__4012__auto__){return cljs.core._write.call(null,writer__4011__auto__,"cljs.core.async/t10527");
});
cljs.core.async.t10527.prototype.cljs$core$async$impl$protocols$Handler$ = true;
cljs.core.async.t10527.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return cljs.core.deref.call(null,self__.flag);
});
cljs.core.async.t10527.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){var self__ = this;
var ___$1 = this;cljs.core.reset_BANG_.call(null,self__.flag,null);
return true;
});
cljs.core.async.t10527.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_10529){var self__ = this;
var _10529__$1 = this;return self__.meta10528;
});
cljs.core.async.t10527.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_10529,meta10528__$1){var self__ = this;
var _10529__$1 = this;return (new cljs.core.async.t10527(self__.flag,self__.alt_flag,meta10528__$1));
});
cljs.core.async.__GT_t10527 = (function __GT_t10527(flag__$1,alt_flag__$1,meta10528){return (new cljs.core.async.t10527(flag__$1,alt_flag__$1,meta10528));
});
}
return (new cljs.core.async.t10527(flag,alt_flag,null));
});
cljs.core.async.alt_handler = (function alt_handler(flag,cb){if(typeof cljs.core.async.t10533 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t10533 = (function (cb,flag,alt_handler,meta10534){
this.cb = cb;
this.flag = flag;
this.alt_handler = alt_handler;
this.meta10534 = meta10534;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t10533.cljs$lang$type = true;
cljs.core.async.t10533.cljs$lang$ctorStr = "cljs.core.async/t10533";
cljs.core.async.t10533.cljs$lang$ctorPrWriter = (function (this__4010__auto__,writer__4011__auto__,opt__4012__auto__){return cljs.core._write.call(null,writer__4011__auto__,"cljs.core.async/t10533");
});
cljs.core.async.t10533.prototype.cljs$core$async$impl$protocols$Handler$ = true;
cljs.core.async.t10533.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.active_QMARK_.call(null,self__.flag);
});
cljs.core.async.t10533.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){var self__ = this;
var ___$1 = this;cljs.core.async.impl.protocols.commit.call(null,self__.flag);
return self__.cb;
});
cljs.core.async.t10533.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_10535){var self__ = this;
var _10535__$1 = this;return self__.meta10534;
});
cljs.core.async.t10533.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_10535,meta10534__$1){var self__ = this;
var _10535__$1 = this;return (new cljs.core.async.t10533(self__.cb,self__.flag,self__.alt_handler,meta10534__$1));
});
cljs.core.async.__GT_t10533 = (function __GT_t10533(cb__$1,flag__$1,alt_handler__$1,meta10534){return (new cljs.core.async.t10533(cb__$1,flag__$1,alt_handler__$1,meta10534));
});
}
return (new cljs.core.async.t10533(cb,flag,alt_handler,null));
});
/**
* returns derefable [val port] if immediate, nil if enqueued
*/
cljs.core.async.do_alts = (function do_alts(fret,ports,opts){var flag = cljs.core.async.alt_flag.call(null);var n = cljs.core.count.call(null,ports);var idxs = cljs.core.async.random_array.call(null,n);var priority = new cljs.core.Keyword(null,"priority","priority",4143410454).cljs$core$IFn$_invoke$arity$1(opts);var ret = (function (){var i = 0;while(true){
if((i < n))
{var idx = (cljs.core.truth_(priority)?i:(idxs[i]));var port = cljs.core.nth.call(null,ports,idx);var wport = ((cljs.core.vector_QMARK_.call(null,port))?port.call(null,0):null);var vbox = (cljs.core.truth_(wport)?(function (){var val = port.call(null,1);return cljs.core.async.impl.protocols.put_BANG_.call(null,wport,val,cljs.core.async.alt_handler.call(null,flag,((function (i,val,idx,port,wport,flag,n,idxs,priority){
return (function (){return fret.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,wport], null));
});})(i,val,idx,port,wport,flag,n,idxs,priority))
));
})():cljs.core.async.impl.protocols.take_BANG_.call(null,port,cljs.core.async.alt_handler.call(null,flag,((function (i,idx,port,wport,flag,n,idxs,priority){
return (function (p1__10536_SHARP_){return fret.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__10536_SHARP_,port], null));
});})(i,idx,port,wport,flag,n,idxs,priority))
)));if(cljs.core.truth_(vbox))
{return cljs.core.async.impl.channels.box.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.deref.call(null,vbox),(function (){var or__3443__auto__ = wport;if(cljs.core.truth_(or__3443__auto__))
{return or__3443__auto__;
} else
{return port;
}
})()], null));
} else
{{
var G__10537 = (i + 1);
i = G__10537;
continue;
}
}
} else
{return null;
}
break;
}
})();var or__3443__auto__ = ret;if(cljs.core.truth_(or__3443__auto__))
{return or__3443__auto__;
} else
{if(cljs.core.contains_QMARK_.call(null,opts,new cljs.core.Keyword(null,"default","default",2558708147)))
{var temp__4092__auto__ = (function (){var and__3431__auto__ = cljs.core.async.impl.protocols.active_QMARK_.call(null,flag);if(cljs.core.truth_(and__3431__auto__))
{return cljs.core.async.impl.protocols.commit.call(null,flag);
} else
{return and__3431__auto__;
}
})();if(cljs.core.truth_(temp__4092__auto__))
{var got = temp__4092__auto__;return cljs.core.async.impl.channels.box.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"default","default",2558708147).cljs$core$IFn$_invoke$arity$1(opts),new cljs.core.Keyword(null,"default","default",2558708147)], null));
} else
{return null;
}
} else
{return null;
}
}
});
/**
* Completes at most one of several channel operations. Must be called
* inside a (go ...) block. ports is a vector of channel endpoints, which
* can be either a channel to take from or a vector of
* [channel-to-put-to val-to-put], in any combination. Takes will be
* made as if by <!, and puts will be made as if by >!. Unless
* the :priority option is true, if more than one port operation is
* ready a non-deterministic choice will be made. If no operation is
* ready and a :default value is supplied, [default-val :default] will
* be returned, otherwise alts! will park until the first operation to
* become ready completes. Returns [val port] of the completed
* operation, where val is the value taken for takes, and nil for puts.
* 
* opts are passed as :key val ... Supported options:
* 
* :default val - the value to use if none of the operations are immediately ready
* :priority true - (default nil) when true, the operations will be tried in order.
* 
* Note: there is no guarantee that the port exps or val exprs will be
* used, nor in what order should they be, so they should not be
* depended upon for side effects.
* @param {...*} var_args
*/
cljs.core.async.alts_BANG_ = (function() { 
var alts_BANG___delegate = function (ports,p__10538){var map__10540 = p__10538;var map__10540__$1 = ((cljs.core.seq_QMARK_.call(null,map__10540))?cljs.core.apply.call(null,cljs.core.hash_map,map__10540):map__10540);var opts = map__10540__$1;if(null)
{return null;
} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str("alts! used not in (go ...) block"),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.call(null,null))].join('')));
}
};
var alts_BANG_ = function (ports,var_args){
var p__10538 = null;if (arguments.length > 1) {
  p__10538 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);} 
return alts_BANG___delegate.call(this,ports,p__10538);};
alts_BANG_.cljs$lang$maxFixedArity = 1;
alts_BANG_.cljs$lang$applyTo = (function (arglist__10541){
var ports = cljs.core.first(arglist__10541);
var p__10538 = cljs.core.rest(arglist__10541);
return alts_BANG___delegate(ports,p__10538);
});
alts_BANG_.cljs$core$IFn$_invoke$arity$variadic = alts_BANG___delegate;
return alts_BANG_;
})()
;
/**
* Takes a function and a source channel, and returns a channel which
* contains the values produced by applying f to each value taken from
* the source channel
*/
cljs.core.async.map_LT_ = (function map_LT_(f,ch){if(typeof cljs.core.async.t10549 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t10549 = (function (ch,f,map_LT_,meta10550){
this.ch = ch;
this.f = f;
this.map_LT_ = map_LT_;
this.meta10550 = meta10550;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t10549.cljs$lang$type = true;
cljs.core.async.t10549.cljs$lang$ctorStr = "cljs.core.async/t10549";
cljs.core.async.t10549.cljs$lang$ctorPrWriter = (function (this__4010__auto__,writer__4011__auto__,opt__4012__auto__){return cljs.core._write.call(null,writer__4011__auto__,"cljs.core.async/t10549");
});
cljs.core.async.t10549.prototype.cljs$core$async$impl$protocols$WritePort$ = true;
cljs.core.async.t10549.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn0){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,val,fn0);
});
cljs.core.async.t10549.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;
cljs.core.async.t10549.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){var self__ = this;
var ___$1 = this;var ret = cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,(function (){if(typeof cljs.core.async.t10552 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t10552 = (function (fn1,_,meta10550,ch,f,map_LT_,meta10553){
this.fn1 = fn1;
this._ = _;
this.meta10550 = meta10550;
this.ch = ch;
this.f = f;
this.map_LT_ = map_LT_;
this.meta10553 = meta10553;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t10552.cljs$lang$type = true;
cljs.core.async.t10552.cljs$lang$ctorStr = "cljs.core.async/t10552";
cljs.core.async.t10552.cljs$lang$ctorPrWriter = (function (this__4010__auto__,writer__4011__auto__,opt__4012__auto__){return cljs.core._write.call(null,writer__4011__auto__,"cljs.core.async/t10552");
});
cljs.core.async.t10552.prototype.cljs$core$async$impl$protocols$Handler$ = true;
cljs.core.async.t10552.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (___$3){var self__ = this;
var ___$4 = this;return cljs.core.async.impl.protocols.active_QMARK_.call(null,self__.fn1);
});
cljs.core.async.t10552.prototype.cljs$core$async$impl$protocols$Handler$lock_id$arity$1 = (function (___$3){var self__ = this;
var ___$4 = this;return cljs.core.async.impl.protocols.lock_id.call(null,self__.fn1);
});
cljs.core.async.t10552.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (___$3){var self__ = this;
var ___$4 = this;var f1 = cljs.core.async.impl.protocols.commit.call(null,self__.fn1);return ((function (f1,___$4){
return (function (p1__10542_SHARP_){return f1.call(null,(((p1__10542_SHARP_ == null))?null:self__.f.call(null,p1__10542_SHARP_)));
});
;})(f1,___$4))
});
cljs.core.async.t10552.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_10554){var self__ = this;
var _10554__$1 = this;return self__.meta10553;
});
cljs.core.async.t10552.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_10554,meta10553__$1){var self__ = this;
var _10554__$1 = this;return (new cljs.core.async.t10552(self__.fn1,self__._,self__.meta10550,self__.ch,self__.f,self__.map_LT_,meta10553__$1));
});
cljs.core.async.__GT_t10552 = (function __GT_t10552(fn1__$1,___$2,meta10550__$1,ch__$2,f__$2,map_LT___$2,meta10553){return (new cljs.core.async.t10552(fn1__$1,___$2,meta10550__$1,ch__$2,f__$2,map_LT___$2,meta10553));
});
}
return (new cljs.core.async.t10552(fn1,___$1,self__.meta10550,self__.ch,self__.f,self__.map_LT_,null));
})());if(cljs.core.truth_((function (){var and__3431__auto__ = ret;if(cljs.core.truth_(and__3431__auto__))
{return !((cljs.core.deref.call(null,ret) == null));
} else
{return and__3431__auto__;
}
})()))
{return cljs.core.async.impl.channels.box.call(null,self__.f.call(null,cljs.core.deref.call(null,ret)));
} else
{return ret;
}
});
cljs.core.async.t10549.prototype.cljs$core$async$impl$protocols$Channel$ = true;
cljs.core.async.t10549.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
});
cljs.core.async.t10549.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_10551){var self__ = this;
var _10551__$1 = this;return self__.meta10550;
});
cljs.core.async.t10549.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_10551,meta10550__$1){var self__ = this;
var _10551__$1 = this;return (new cljs.core.async.t10549(self__.ch,self__.f,self__.map_LT_,meta10550__$1));
});
cljs.core.async.__GT_t10549 = (function __GT_t10549(ch__$1,f__$1,map_LT___$1,meta10550){return (new cljs.core.async.t10549(ch__$1,f__$1,map_LT___$1,meta10550));
});
}
return (new cljs.core.async.t10549(ch,f,map_LT_,null));
});
/**
* Takes a function and a target channel, and returns a channel which
* applies f to each value before supplying it to the target channel.
*/
cljs.core.async.map_GT_ = (function map_GT_(f,ch){if(typeof cljs.core.async.t10558 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t10558 = (function (ch,f,map_GT_,meta10559){
this.ch = ch;
this.f = f;
this.map_GT_ = map_GT_;
this.meta10559 = meta10559;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t10558.cljs$lang$type = true;
cljs.core.async.t10558.cljs$lang$ctorStr = "cljs.core.async/t10558";
cljs.core.async.t10558.cljs$lang$ctorPrWriter = (function (this__4010__auto__,writer__4011__auto__,opt__4012__auto__){return cljs.core._write.call(null,writer__4011__auto__,"cljs.core.async/t10558");
});
cljs.core.async.t10558.prototype.cljs$core$async$impl$protocols$WritePort$ = true;
cljs.core.async.t10558.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn0){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,self__.f.call(null,val),fn0);
});
cljs.core.async.t10558.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;
cljs.core.async.t10558.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,fn1);
});
cljs.core.async.t10558.prototype.cljs$core$async$impl$protocols$Channel$ = true;
cljs.core.async.t10558.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
});
cljs.core.async.t10558.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_10560){var self__ = this;
var _10560__$1 = this;return self__.meta10559;
});
cljs.core.async.t10558.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_10560,meta10559__$1){var self__ = this;
var _10560__$1 = this;return (new cljs.core.async.t10558(self__.ch,self__.f,self__.map_GT_,meta10559__$1));
});
cljs.core.async.__GT_t10558 = (function __GT_t10558(ch__$1,f__$1,map_GT___$1,meta10559){return (new cljs.core.async.t10558(ch__$1,f__$1,map_GT___$1,meta10559));
});
}
return (new cljs.core.async.t10558(ch,f,map_GT_,null));
});
/**
* Takes a predicate and a target channel, and returns a channel which
* supplies only the values for which the predicate returns true to the
* target channel.
*/
cljs.core.async.filter_GT_ = (function filter_GT_(p,ch){if(typeof cljs.core.async.t10564 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t10564 = (function (ch,p,filter_GT_,meta10565){
this.ch = ch;
this.p = p;
this.filter_GT_ = filter_GT_;
this.meta10565 = meta10565;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t10564.cljs$lang$type = true;
cljs.core.async.t10564.cljs$lang$ctorStr = "cljs.core.async/t10564";
cljs.core.async.t10564.cljs$lang$ctorPrWriter = (function (this__4010__auto__,writer__4011__auto__,opt__4012__auto__){return cljs.core._write.call(null,writer__4011__auto__,"cljs.core.async/t10564");
});
cljs.core.async.t10564.prototype.cljs$core$async$impl$protocols$WritePort$ = true;
cljs.core.async.t10564.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn0){var self__ = this;
var ___$1 = this;if(cljs.core.truth_(self__.p.call(null,val)))
{return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,val,fn0);
} else
{return cljs.core.async.impl.channels.box.call(null,null);
}
});
cljs.core.async.t10564.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;
cljs.core.async.t10564.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,fn1);
});
cljs.core.async.t10564.prototype.cljs$core$async$impl$protocols$Channel$ = true;
cljs.core.async.t10564.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
});
cljs.core.async.t10564.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_10566){var self__ = this;
var _10566__$1 = this;return self__.meta10565;
});
cljs.core.async.t10564.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_10566,meta10565__$1){var self__ = this;
var _10566__$1 = this;return (new cljs.core.async.t10564(self__.ch,self__.p,self__.filter_GT_,meta10565__$1));
});
cljs.core.async.__GT_t10564 = (function __GT_t10564(ch__$1,p__$1,filter_GT___$1,meta10565){return (new cljs.core.async.t10564(ch__$1,p__$1,filter_GT___$1,meta10565));
});
}
return (new cljs.core.async.t10564(ch,p,filter_GT_,null));
});
/**
* Takes a predicate and a target channel, and returns a channel which
* supplies only the values for which the predicate returns false to the
* target channel.
*/
cljs.core.async.remove_GT_ = (function remove_GT_(p,ch){return cljs.core.async.filter_GT_.call(null,cljs.core.complement.call(null,p),ch);
});
/**
* Takes a predicate and a source channel, and returns a channel which
* contains only the values taken from the source channel for which the
* predicate returns true. The returned channel will be unbuffered by
* default, or a buf-or-n can be supplied. The channel will close
* when the source channel closes.
*/
cljs.core.async.filter_LT_ = (function() {
var filter_LT_ = null;
var filter_LT___2 = (function (p,ch){return filter_LT_.call(null,p,ch,null);
});
var filter_LT___3 = (function (p,ch,buf_or_n){var out = cljs.core.async.chan.call(null,buf_or_n);var c__6192__auto___10649 = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__6193__auto__ = (function (){var switch__6177__auto__ = (function (state_10628){var state_val_10629 = (state_10628[1]);if((state_val_10629 === 1))
{var state_10628__$1 = state_10628;var statearr_10630_10650 = state_10628__$1;(statearr_10630_10650[2] = null);
(statearr_10630_10650[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_10629 === 2))
{var state_10628__$1 = state_10628;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_10628__$1,4,ch);
} else
{if((state_val_10629 === 3))
{var inst_10626 = (state_10628[2]);var state_10628__$1 = state_10628;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_10628__$1,inst_10626);
} else
{if((state_val_10629 === 4))
{var inst_10610 = (state_10628[7]);var inst_10610__$1 = (state_10628[2]);var inst_10611 = (inst_10610__$1 == null);var state_10628__$1 = (function (){var statearr_10631 = state_10628;(statearr_10631[7] = inst_10610__$1);
return statearr_10631;
})();if(cljs.core.truth_(inst_10611))
{var statearr_10632_10651 = state_10628__$1;(statearr_10632_10651[1] = 5);
} else
{var statearr_10633_10652 = state_10628__$1;(statearr_10633_10652[1] = 6);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_10629 === 5))
{var inst_10613 = cljs.core.async.close_BANG_.call(null,out);var state_10628__$1 = state_10628;var statearr_10634_10653 = state_10628__$1;(statearr_10634_10653[2] = inst_10613);
(statearr_10634_10653[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_10629 === 6))
{var inst_10610 = (state_10628[7]);var inst_10615 = p.call(null,inst_10610);var state_10628__$1 = state_10628;if(cljs.core.truth_(inst_10615))
{var statearr_10635_10654 = state_10628__$1;(statearr_10635_10654[1] = 8);
} else
{var statearr_10636_10655 = state_10628__$1;(statearr_10636_10655[1] = 9);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_10629 === 7))
{var inst_10624 = (state_10628[2]);var state_10628__$1 = state_10628;var statearr_10637_10656 = state_10628__$1;(statearr_10637_10656[2] = inst_10624);
(statearr_10637_10656[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_10629 === 8))
{var inst_10610 = (state_10628[7]);var state_10628__$1 = state_10628;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_10628__$1,11,out,inst_10610);
} else
{if((state_val_10629 === 9))
{var state_10628__$1 = state_10628;var statearr_10638_10657 = state_10628__$1;(statearr_10638_10657[2] = null);
(statearr_10638_10657[1] = 10);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_10629 === 10))
{var inst_10621 = (state_10628[2]);var state_10628__$1 = (function (){var statearr_10639 = state_10628;(statearr_10639[8] = inst_10621);
return statearr_10639;
})();var statearr_10640_10658 = state_10628__$1;(statearr_10640_10658[2] = null);
(statearr_10640_10658[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_10629 === 11))
{var inst_10618 = (state_10628[2]);var state_10628__$1 = state_10628;var statearr_10641_10659 = state_10628__$1;(statearr_10641_10659[2] = inst_10618);
(statearr_10641_10659[1] = 10);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{return null;
}
}
}
}
}
}
}
}
}
}
}
});return ((function (switch__6177__auto__){
return (function() {
var state_machine__6178__auto__ = null;
var state_machine__6178__auto____0 = (function (){var statearr_10645 = [null,null,null,null,null,null,null,null,null];(statearr_10645[0] = state_machine__6178__auto__);
(statearr_10645[1] = 1);
return statearr_10645;
});
var state_machine__6178__auto____1 = (function (state_10628){while(true){
var ret_value__6179__auto__ = (function (){try{while(true){
var result__6180__auto__ = switch__6177__auto__.call(null,state_10628);if(cljs.core.keyword_identical_QMARK_.call(null,result__6180__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__6180__auto__;
}
break;
}
}catch (e10646){if((e10646 instanceof Object))
{var ex__6181__auto__ = e10646;var statearr_10647_10660 = state_10628;(statearr_10647_10660[5] = ex__6181__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_10628);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e10646;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6179__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__10661 = state_10628;
state_10628 = G__10661;
continue;
}
} else
{return ret_value__6179__auto__;
}
break;
}
});
state_machine__6178__auto__ = function(state_10628){
switch(arguments.length){
case 0:
return state_machine__6178__auto____0.call(this);
case 1:
return state_machine__6178__auto____1.call(this,state_10628);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__6178__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__6178__auto____0;
state_machine__6178__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__6178__auto____1;
return state_machine__6178__auto__;
})()
;})(switch__6177__auto__))
})();var state__6194__auto__ = (function (){var statearr_10648 = f__6193__auto__.call(null);(statearr_10648[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6192__auto___10649);
return statearr_10648;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6194__auto__);
}));
return out;
});
filter_LT_ = function(p,ch,buf_or_n){
switch(arguments.length){
case 2:
return filter_LT___2.call(this,p,ch);
case 3:
return filter_LT___3.call(this,p,ch,buf_or_n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
filter_LT_.cljs$core$IFn$_invoke$arity$2 = filter_LT___2;
filter_LT_.cljs$core$IFn$_invoke$arity$3 = filter_LT___3;
return filter_LT_;
})()
;
/**
* Takes a predicate and a source channel, and returns a channel which
* contains only the values taken from the source channel for which the
* predicate returns false. The returned channel will be unbuffered by
* default, or a buf-or-n can be supplied. The channel will close
* when the source channel closes.
*/
cljs.core.async.remove_LT_ = (function() {
var remove_LT_ = null;
var remove_LT___2 = (function (p,ch){return remove_LT_.call(null,p,ch,null);
});
var remove_LT___3 = (function (p,ch,buf_or_n){return cljs.core.async.filter_LT_.call(null,cljs.core.complement.call(null,p),ch,buf_or_n);
});
remove_LT_ = function(p,ch,buf_or_n){
switch(arguments.length){
case 2:
return remove_LT___2.call(this,p,ch);
case 3:
return remove_LT___3.call(this,p,ch,buf_or_n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
remove_LT_.cljs$core$IFn$_invoke$arity$2 = remove_LT___2;
remove_LT_.cljs$core$IFn$_invoke$arity$3 = remove_LT___3;
return remove_LT_;
})()
;
cljs.core.async.mapcat_STAR_ = (function mapcat_STAR_(f,in$,out){var c__6192__auto__ = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__6193__auto__ = (function (){var switch__6177__auto__ = (function (state_10813){var state_val_10814 = (state_10813[1]);if((state_val_10814 === 1))
{var state_10813__$1 = state_10813;var statearr_10815_10852 = state_10813__$1;(statearr_10815_10852[2] = null);
(statearr_10815_10852[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_10814 === 2))
{var state_10813__$1 = state_10813;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_10813__$1,4,in$);
} else
{if((state_val_10814 === 3))
{var inst_10811 = (state_10813[2]);var state_10813__$1 = state_10813;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_10813__$1,inst_10811);
} else
{if((state_val_10814 === 4))
{var inst_10759 = (state_10813[7]);var inst_10759__$1 = (state_10813[2]);var inst_10760 = (inst_10759__$1 == null);var state_10813__$1 = (function (){var statearr_10816 = state_10813;(statearr_10816[7] = inst_10759__$1);
return statearr_10816;
})();if(cljs.core.truth_(inst_10760))
{var statearr_10817_10853 = state_10813__$1;(statearr_10817_10853[1] = 5);
} else
{var statearr_10818_10854 = state_10813__$1;(statearr_10818_10854[1] = 6);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_10814 === 5))
{var inst_10762 = cljs.core.async.close_BANG_.call(null,out);var state_10813__$1 = state_10813;var statearr_10819_10855 = state_10813__$1;(statearr_10819_10855[2] = inst_10762);
(statearr_10819_10855[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_10814 === 6))
{var inst_10759 = (state_10813[7]);var inst_10764 = f.call(null,inst_10759);var inst_10769 = cljs.core.seq.call(null,inst_10764);var inst_10770 = inst_10769;var inst_10771 = null;var inst_10772 = 0;var inst_10773 = 0;var state_10813__$1 = (function (){var statearr_10820 = state_10813;(statearr_10820[8] = inst_10773);
(statearr_10820[9] = inst_10772);
(statearr_10820[10] = inst_10771);
(statearr_10820[11] = inst_10770);
return statearr_10820;
})();var statearr_10821_10856 = state_10813__$1;(statearr_10821_10856[2] = null);
(statearr_10821_10856[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_10814 === 7))
{var inst_10809 = (state_10813[2]);var state_10813__$1 = state_10813;var statearr_10822_10857 = state_10813__$1;(statearr_10822_10857[2] = inst_10809);
(statearr_10822_10857[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_10814 === 8))
{var inst_10773 = (state_10813[8]);var inst_10772 = (state_10813[9]);var inst_10775 = (inst_10773 < inst_10772);var inst_10776 = inst_10775;var state_10813__$1 = state_10813;if(cljs.core.truth_(inst_10776))
{var statearr_10823_10858 = state_10813__$1;(statearr_10823_10858[1] = 10);
} else
{var statearr_10824_10859 = state_10813__$1;(statearr_10824_10859[1] = 11);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_10814 === 9))
{var inst_10806 = (state_10813[2]);var state_10813__$1 = (function (){var statearr_10825 = state_10813;(statearr_10825[12] = inst_10806);
return statearr_10825;
})();var statearr_10826_10860 = state_10813__$1;(statearr_10826_10860[2] = null);
(statearr_10826_10860[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_10814 === 10))
{var inst_10773 = (state_10813[8]);var inst_10771 = (state_10813[10]);var inst_10778 = cljs.core._nth.call(null,inst_10771,inst_10773);var state_10813__$1 = state_10813;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_10813__$1,13,out,inst_10778);
} else
{if((state_val_10814 === 11))
{var inst_10770 = (state_10813[11]);var inst_10784 = (state_10813[13]);var inst_10784__$1 = cljs.core.seq.call(null,inst_10770);var state_10813__$1 = (function (){var statearr_10830 = state_10813;(statearr_10830[13] = inst_10784__$1);
return statearr_10830;
})();if(inst_10784__$1)
{var statearr_10831_10861 = state_10813__$1;(statearr_10831_10861[1] = 14);
} else
{var statearr_10832_10862 = state_10813__$1;(statearr_10832_10862[1] = 15);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_10814 === 12))
{var inst_10804 = (state_10813[2]);var state_10813__$1 = state_10813;var statearr_10833_10863 = state_10813__$1;(statearr_10833_10863[2] = inst_10804);
(statearr_10833_10863[1] = 9);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_10814 === 13))
{var inst_10773 = (state_10813[8]);var inst_10772 = (state_10813[9]);var inst_10771 = (state_10813[10]);var inst_10770 = (state_10813[11]);var inst_10780 = (state_10813[2]);var inst_10781 = (inst_10773 + 1);var tmp10827 = inst_10772;var tmp10828 = inst_10771;var tmp10829 = inst_10770;var inst_10770__$1 = tmp10829;var inst_10771__$1 = tmp10828;var inst_10772__$1 = tmp10827;var inst_10773__$1 = inst_10781;var state_10813__$1 = (function (){var statearr_10834 = state_10813;(statearr_10834[8] = inst_10773__$1);
(statearr_10834[9] = inst_10772__$1);
(statearr_10834[10] = inst_10771__$1);
(statearr_10834[11] = inst_10770__$1);
(statearr_10834[14] = inst_10780);
return statearr_10834;
})();var statearr_10835_10864 = state_10813__$1;(statearr_10835_10864[2] = null);
(statearr_10835_10864[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_10814 === 14))
{var inst_10784 = (state_10813[13]);var inst_10786 = cljs.core.chunked_seq_QMARK_.call(null,inst_10784);var state_10813__$1 = state_10813;if(inst_10786)
{var statearr_10836_10865 = state_10813__$1;(statearr_10836_10865[1] = 17);
} else
{var statearr_10837_10866 = state_10813__$1;(statearr_10837_10866[1] = 18);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_10814 === 15))
{var state_10813__$1 = state_10813;var statearr_10838_10867 = state_10813__$1;(statearr_10838_10867[2] = null);
(statearr_10838_10867[1] = 16);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_10814 === 16))
{var inst_10802 = (state_10813[2]);var state_10813__$1 = state_10813;var statearr_10839_10868 = state_10813__$1;(statearr_10839_10868[2] = inst_10802);
(statearr_10839_10868[1] = 12);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_10814 === 17))
{var inst_10784 = (state_10813[13]);var inst_10788 = cljs.core.chunk_first.call(null,inst_10784);var inst_10789 = cljs.core.chunk_rest.call(null,inst_10784);var inst_10790 = cljs.core.count.call(null,inst_10788);var inst_10770 = inst_10789;var inst_10771 = inst_10788;var inst_10772 = inst_10790;var inst_10773 = 0;var state_10813__$1 = (function (){var statearr_10840 = state_10813;(statearr_10840[8] = inst_10773);
(statearr_10840[9] = inst_10772);
(statearr_10840[10] = inst_10771);
(statearr_10840[11] = inst_10770);
return statearr_10840;
})();var statearr_10841_10869 = state_10813__$1;(statearr_10841_10869[2] = null);
(statearr_10841_10869[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_10814 === 18))
{var inst_10784 = (state_10813[13]);var inst_10793 = cljs.core.first.call(null,inst_10784);var state_10813__$1 = state_10813;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_10813__$1,20,out,inst_10793);
} else
{if((state_val_10814 === 19))
{var inst_10799 = (state_10813[2]);var state_10813__$1 = state_10813;var statearr_10842_10870 = state_10813__$1;(statearr_10842_10870[2] = inst_10799);
(statearr_10842_10870[1] = 16);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_10814 === 20))
{var inst_10784 = (state_10813[13]);var inst_10795 = (state_10813[2]);var inst_10796 = cljs.core.next.call(null,inst_10784);var inst_10770 = inst_10796;var inst_10771 = null;var inst_10772 = 0;var inst_10773 = 0;var state_10813__$1 = (function (){var statearr_10843 = state_10813;(statearr_10843[8] = inst_10773);
(statearr_10843[9] = inst_10772);
(statearr_10843[10] = inst_10771);
(statearr_10843[11] = inst_10770);
(statearr_10843[15] = inst_10795);
return statearr_10843;
})();var statearr_10844_10871 = state_10813__$1;(statearr_10844_10871[2] = null);
(statearr_10844_10871[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});return ((function (switch__6177__auto__){
return (function() {
var state_machine__6178__auto__ = null;
var state_machine__6178__auto____0 = (function (){var statearr_10848 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];(statearr_10848[0] = state_machine__6178__auto__);
(statearr_10848[1] = 1);
return statearr_10848;
});
var state_machine__6178__auto____1 = (function (state_10813){while(true){
var ret_value__6179__auto__ = (function (){try{while(true){
var result__6180__auto__ = switch__6177__auto__.call(null,state_10813);if(cljs.core.keyword_identical_QMARK_.call(null,result__6180__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__6180__auto__;
}
break;
}
}catch (e10849){if((e10849 instanceof Object))
{var ex__6181__auto__ = e10849;var statearr_10850_10872 = state_10813;(statearr_10850_10872[5] = ex__6181__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_10813);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e10849;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6179__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__10873 = state_10813;
state_10813 = G__10873;
continue;
}
} else
{return ret_value__6179__auto__;
}
break;
}
});
state_machine__6178__auto__ = function(state_10813){
switch(arguments.length){
case 0:
return state_machine__6178__auto____0.call(this);
case 1:
return state_machine__6178__auto____1.call(this,state_10813);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__6178__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__6178__auto____0;
state_machine__6178__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__6178__auto____1;
return state_machine__6178__auto__;
})()
;})(switch__6177__auto__))
})();var state__6194__auto__ = (function (){var statearr_10851 = f__6193__auto__.call(null);(statearr_10851[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6192__auto__);
return statearr_10851;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6194__auto__);
}));
return c__6192__auto__;
});
/**
* Takes a function and a source channel, and returns a channel which
* contains the values in each collection produced by applying f to
* each value taken from the source channel. f must return a
* collection.
* 
* The returned channel will be unbuffered by default, or a buf-or-n
* can be supplied. The channel will close when the source channel
* closes.
*/
cljs.core.async.mapcat_LT_ = (function() {
var mapcat_LT_ = null;
var mapcat_LT___2 = (function (f,in$){return mapcat_LT_.call(null,f,in$,null);
});
var mapcat_LT___3 = (function (f,in$,buf_or_n){var out = cljs.core.async.chan.call(null,buf_or_n);cljs.core.async.mapcat_STAR_.call(null,f,in$,out);
return out;
});
mapcat_LT_ = function(f,in$,buf_or_n){
switch(arguments.length){
case 2:
return mapcat_LT___2.call(this,f,in$);
case 3:
return mapcat_LT___3.call(this,f,in$,buf_or_n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
mapcat_LT_.cljs$core$IFn$_invoke$arity$2 = mapcat_LT___2;
mapcat_LT_.cljs$core$IFn$_invoke$arity$3 = mapcat_LT___3;
return mapcat_LT_;
})()
;
/**
* Takes a function and a target channel, and returns a channel which
* applies f to each value put, then supplies each element of the result
* to the target channel. f must return a collection.
* 
* The returned channel will be unbuffered by default, or a buf-or-n
* can be supplied. The target channel will be closed when the source
* channel closes.
*/
cljs.core.async.mapcat_GT_ = (function() {
var mapcat_GT_ = null;
var mapcat_GT___2 = (function (f,out){return mapcat_GT_.call(null,f,out,null);
});
var mapcat_GT___3 = (function (f,out,buf_or_n){var in$ = cljs.core.async.chan.call(null,buf_or_n);cljs.core.async.mapcat_STAR_.call(null,f,in$,out);
return in$;
});
mapcat_GT_ = function(f,out,buf_or_n){
switch(arguments.length){
case 2:
return mapcat_GT___2.call(this,f,out);
case 3:
return mapcat_GT___3.call(this,f,out,buf_or_n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
mapcat_GT_.cljs$core$IFn$_invoke$arity$2 = mapcat_GT___2;
mapcat_GT_.cljs$core$IFn$_invoke$arity$3 = mapcat_GT___3;
return mapcat_GT_;
})()
;
/**
* Takes elements from the from channel and supplies them to the to
* channel. By default, the to channel will be closed when the
* from channel closes, but can be determined by the close?
* parameter.
*/
cljs.core.async.pipe = (function() {
var pipe = null;
var pipe__2 = (function (from,to){return pipe.call(null,from,to,true);
});
var pipe__3 = (function (from,to,close_QMARK_){var c__6192__auto___10954 = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__6193__auto__ = (function (){var switch__6177__auto__ = (function (state_10933){var state_val_10934 = (state_10933[1]);if((state_val_10934 === 1))
{var state_10933__$1 = state_10933;var statearr_10935_10955 = state_10933__$1;(statearr_10935_10955[2] = null);
(statearr_10935_10955[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_10934 === 2))
{var state_10933__$1 = state_10933;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_10933__$1,4,from);
} else
{if((state_val_10934 === 3))
{var inst_10931 = (state_10933[2]);var state_10933__$1 = state_10933;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_10933__$1,inst_10931);
} else
{if((state_val_10934 === 4))
{var inst_10916 = (state_10933[7]);var inst_10916__$1 = (state_10933[2]);var inst_10917 = (inst_10916__$1 == null);var state_10933__$1 = (function (){var statearr_10936 = state_10933;(statearr_10936[7] = inst_10916__$1);
return statearr_10936;
})();if(cljs.core.truth_(inst_10917))
{var statearr_10937_10956 = state_10933__$1;(statearr_10937_10956[1] = 5);
} else
{var statearr_10938_10957 = state_10933__$1;(statearr_10938_10957[1] = 6);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_10934 === 5))
{var state_10933__$1 = state_10933;if(cljs.core.truth_(close_QMARK_))
{var statearr_10939_10958 = state_10933__$1;(statearr_10939_10958[1] = 8);
} else
{var statearr_10940_10959 = state_10933__$1;(statearr_10940_10959[1] = 9);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_10934 === 6))
{var inst_10916 = (state_10933[7]);var state_10933__$1 = state_10933;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_10933__$1,11,to,inst_10916);
} else
{if((state_val_10934 === 7))
{var inst_10929 = (state_10933[2]);var state_10933__$1 = state_10933;var statearr_10941_10960 = state_10933__$1;(statearr_10941_10960[2] = inst_10929);
(statearr_10941_10960[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_10934 === 8))
{var inst_10920 = cljs.core.async.close_BANG_.call(null,to);var state_10933__$1 = state_10933;var statearr_10942_10961 = state_10933__$1;(statearr_10942_10961[2] = inst_10920);
(statearr_10942_10961[1] = 10);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_10934 === 9))
{var state_10933__$1 = state_10933;var statearr_10943_10962 = state_10933__$1;(statearr_10943_10962[2] = null);
(statearr_10943_10962[1] = 10);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_10934 === 10))
{var inst_10923 = (state_10933[2]);var state_10933__$1 = state_10933;var statearr_10944_10963 = state_10933__$1;(statearr_10944_10963[2] = inst_10923);
(statearr_10944_10963[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_10934 === 11))
{var inst_10926 = (state_10933[2]);var state_10933__$1 = (function (){var statearr_10945 = state_10933;(statearr_10945[8] = inst_10926);
return statearr_10945;
})();var statearr_10946_10964 = state_10933__$1;(statearr_10946_10964[2] = null);
(statearr_10946_10964[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{return null;
}
}
}
}
}
}
}
}
}
}
}
});return ((function (switch__6177__auto__){
return (function() {
var state_machine__6178__auto__ = null;
var state_machine__6178__auto____0 = (function (){var statearr_10950 = [null,null,null,null,null,null,null,null,null];(statearr_10950[0] = state_machine__6178__auto__);
(statearr_10950[1] = 1);
return statearr_10950;
});
var state_machine__6178__auto____1 = (function (state_10933){while(true){
var ret_value__6179__auto__ = (function (){try{while(true){
var result__6180__auto__ = switch__6177__auto__.call(null,state_10933);if(cljs.core.keyword_identical_QMARK_.call(null,result__6180__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__6180__auto__;
}
break;
}
}catch (e10951){if((e10951 instanceof Object))
{var ex__6181__auto__ = e10951;var statearr_10952_10965 = state_10933;(statearr_10952_10965[5] = ex__6181__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_10933);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e10951;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6179__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__10966 = state_10933;
state_10933 = G__10966;
continue;
}
} else
{return ret_value__6179__auto__;
}
break;
}
});
state_machine__6178__auto__ = function(state_10933){
switch(arguments.length){
case 0:
return state_machine__6178__auto____0.call(this);
case 1:
return state_machine__6178__auto____1.call(this,state_10933);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__6178__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__6178__auto____0;
state_machine__6178__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__6178__auto____1;
return state_machine__6178__auto__;
})()
;})(switch__6177__auto__))
})();var state__6194__auto__ = (function (){var statearr_10953 = f__6193__auto__.call(null);(statearr_10953[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6192__auto___10954);
return statearr_10953;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6194__auto__);
}));
return to;
});
pipe = function(from,to,close_QMARK_){
switch(arguments.length){
case 2:
return pipe__2.call(this,from,to);
case 3:
return pipe__3.call(this,from,to,close_QMARK_);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
pipe.cljs$core$IFn$_invoke$arity$2 = pipe__2;
pipe.cljs$core$IFn$_invoke$arity$3 = pipe__3;
return pipe;
})()
;
/**
* Takes a predicate and a source channel and returns a vector of two
* channels, the first of which will contain the values for which the
* predicate returned true, the second those for which it returned
* false.
* 
* The out channels will be unbuffered by default, or two buf-or-ns can
* be supplied. The channels will close after the source channel has
* closed.
*/
cljs.core.async.split = (function() {
var split = null;
var split__2 = (function (p,ch){return split.call(null,p,ch,null,null);
});
var split__4 = (function (p,ch,t_buf_or_n,f_buf_or_n){var tc = cljs.core.async.chan.call(null,t_buf_or_n);var fc = cljs.core.async.chan.call(null,f_buf_or_n);var c__6192__auto___11053 = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__6193__auto__ = (function (){var switch__6177__auto__ = (function (state_11031){var state_val_11032 = (state_11031[1]);if((state_val_11032 === 1))
{var state_11031__$1 = state_11031;var statearr_11033_11054 = state_11031__$1;(statearr_11033_11054[2] = null);
(statearr_11033_11054[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11032 === 2))
{var state_11031__$1 = state_11031;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_11031__$1,4,ch);
} else
{if((state_val_11032 === 3))
{var inst_11029 = (state_11031[2]);var state_11031__$1 = state_11031;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_11031__$1,inst_11029);
} else
{if((state_val_11032 === 4))
{var inst_11012 = (state_11031[7]);var inst_11012__$1 = (state_11031[2]);var inst_11013 = (inst_11012__$1 == null);var state_11031__$1 = (function (){var statearr_11034 = state_11031;(statearr_11034[7] = inst_11012__$1);
return statearr_11034;
})();if(cljs.core.truth_(inst_11013))
{var statearr_11035_11055 = state_11031__$1;(statearr_11035_11055[1] = 5);
} else
{var statearr_11036_11056 = state_11031__$1;(statearr_11036_11056[1] = 6);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11032 === 5))
{var inst_11015 = cljs.core.async.close_BANG_.call(null,tc);var inst_11016 = cljs.core.async.close_BANG_.call(null,fc);var state_11031__$1 = (function (){var statearr_11037 = state_11031;(statearr_11037[8] = inst_11015);
return statearr_11037;
})();var statearr_11038_11057 = state_11031__$1;(statearr_11038_11057[2] = inst_11016);
(statearr_11038_11057[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11032 === 6))
{var inst_11012 = (state_11031[7]);var inst_11018 = p.call(null,inst_11012);var state_11031__$1 = state_11031;if(cljs.core.truth_(inst_11018))
{var statearr_11039_11058 = state_11031__$1;(statearr_11039_11058[1] = 9);
} else
{var statearr_11040_11059 = state_11031__$1;(statearr_11040_11059[1] = 10);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11032 === 7))
{var inst_11027 = (state_11031[2]);var state_11031__$1 = state_11031;var statearr_11041_11060 = state_11031__$1;(statearr_11041_11060[2] = inst_11027);
(statearr_11041_11060[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11032 === 8))
{var inst_11024 = (state_11031[2]);var state_11031__$1 = (function (){var statearr_11042 = state_11031;(statearr_11042[9] = inst_11024);
return statearr_11042;
})();var statearr_11043_11061 = state_11031__$1;(statearr_11043_11061[2] = null);
(statearr_11043_11061[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11032 === 9))
{var state_11031__$1 = state_11031;var statearr_11044_11062 = state_11031__$1;(statearr_11044_11062[2] = tc);
(statearr_11044_11062[1] = 11);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11032 === 10))
{var state_11031__$1 = state_11031;var statearr_11045_11063 = state_11031__$1;(statearr_11045_11063[2] = fc);
(statearr_11045_11063[1] = 11);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11032 === 11))
{var inst_11012 = (state_11031[7]);var inst_11022 = (state_11031[2]);var state_11031__$1 = state_11031;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_11031__$1,8,inst_11022,inst_11012);
} else
{return null;
}
}
}
}
}
}
}
}
}
}
}
});return ((function (switch__6177__auto__){
return (function() {
var state_machine__6178__auto__ = null;
var state_machine__6178__auto____0 = (function (){var statearr_11049 = [null,null,null,null,null,null,null,null,null,null];(statearr_11049[0] = state_machine__6178__auto__);
(statearr_11049[1] = 1);
return statearr_11049;
});
var state_machine__6178__auto____1 = (function (state_11031){while(true){
var ret_value__6179__auto__ = (function (){try{while(true){
var result__6180__auto__ = switch__6177__auto__.call(null,state_11031);if(cljs.core.keyword_identical_QMARK_.call(null,result__6180__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__6180__auto__;
}
break;
}
}catch (e11050){if((e11050 instanceof Object))
{var ex__6181__auto__ = e11050;var statearr_11051_11064 = state_11031;(statearr_11051_11064[5] = ex__6181__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_11031);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e11050;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6179__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__11065 = state_11031;
state_11031 = G__11065;
continue;
}
} else
{return ret_value__6179__auto__;
}
break;
}
});
state_machine__6178__auto__ = function(state_11031){
switch(arguments.length){
case 0:
return state_machine__6178__auto____0.call(this);
case 1:
return state_machine__6178__auto____1.call(this,state_11031);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__6178__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__6178__auto____0;
state_machine__6178__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__6178__auto____1;
return state_machine__6178__auto__;
})()
;})(switch__6177__auto__))
})();var state__6194__auto__ = (function (){var statearr_11052 = f__6193__auto__.call(null);(statearr_11052[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6192__auto___11053);
return statearr_11052;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6194__auto__);
}));
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [tc,fc], null);
});
split = function(p,ch,t_buf_or_n,f_buf_or_n){
switch(arguments.length){
case 2:
return split__2.call(this,p,ch);
case 4:
return split__4.call(this,p,ch,t_buf_or_n,f_buf_or_n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
split.cljs$core$IFn$_invoke$arity$2 = split__2;
split.cljs$core$IFn$_invoke$arity$4 = split__4;
return split;
})()
;
/**
* f should be a function of 2 arguments. Returns a channel containing
* the single result of applying f to init and the first item from the
* channel, then applying f to that result and the 2nd item, etc. If
* the channel closes without yielding items, returns init and f is not
* called. ch must close before reduce produces a result.
*/
cljs.core.async.reduce = (function reduce(f,init,ch){var c__6192__auto__ = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__6193__auto__ = (function (){var switch__6177__auto__ = (function (state_11112){var state_val_11113 = (state_11112[1]);if((state_val_11113 === 7))
{var inst_11108 = (state_11112[2]);var state_11112__$1 = state_11112;var statearr_11114_11130 = state_11112__$1;(statearr_11114_11130[2] = inst_11108);
(statearr_11114_11130[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11113 === 6))
{var inst_11098 = (state_11112[7]);var inst_11101 = (state_11112[8]);var inst_11105 = f.call(null,inst_11098,inst_11101);var inst_11098__$1 = inst_11105;var state_11112__$1 = (function (){var statearr_11115 = state_11112;(statearr_11115[7] = inst_11098__$1);
return statearr_11115;
})();var statearr_11116_11131 = state_11112__$1;(statearr_11116_11131[2] = null);
(statearr_11116_11131[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11113 === 5))
{var inst_11098 = (state_11112[7]);var state_11112__$1 = state_11112;var statearr_11117_11132 = state_11112__$1;(statearr_11117_11132[2] = inst_11098);
(statearr_11117_11132[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11113 === 4))
{var inst_11101 = (state_11112[8]);var inst_11101__$1 = (state_11112[2]);var inst_11102 = (inst_11101__$1 == null);var state_11112__$1 = (function (){var statearr_11118 = state_11112;(statearr_11118[8] = inst_11101__$1);
return statearr_11118;
})();if(cljs.core.truth_(inst_11102))
{var statearr_11119_11133 = state_11112__$1;(statearr_11119_11133[1] = 5);
} else
{var statearr_11120_11134 = state_11112__$1;(statearr_11120_11134[1] = 6);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11113 === 3))
{var inst_11110 = (state_11112[2]);var state_11112__$1 = state_11112;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_11112__$1,inst_11110);
} else
{if((state_val_11113 === 2))
{var state_11112__$1 = state_11112;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_11112__$1,4,ch);
} else
{if((state_val_11113 === 1))
{var inst_11098 = init;var state_11112__$1 = (function (){var statearr_11121 = state_11112;(statearr_11121[7] = inst_11098);
return statearr_11121;
})();var statearr_11122_11135 = state_11112__$1;(statearr_11122_11135[2] = null);
(statearr_11122_11135[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{return null;
}
}
}
}
}
}
}
});return ((function (switch__6177__auto__){
return (function() {
var state_machine__6178__auto__ = null;
var state_machine__6178__auto____0 = (function (){var statearr_11126 = [null,null,null,null,null,null,null,null,null];(statearr_11126[0] = state_machine__6178__auto__);
(statearr_11126[1] = 1);
return statearr_11126;
});
var state_machine__6178__auto____1 = (function (state_11112){while(true){
var ret_value__6179__auto__ = (function (){try{while(true){
var result__6180__auto__ = switch__6177__auto__.call(null,state_11112);if(cljs.core.keyword_identical_QMARK_.call(null,result__6180__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__6180__auto__;
}
break;
}
}catch (e11127){if((e11127 instanceof Object))
{var ex__6181__auto__ = e11127;var statearr_11128_11136 = state_11112;(statearr_11128_11136[5] = ex__6181__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_11112);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e11127;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6179__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__11137 = state_11112;
state_11112 = G__11137;
continue;
}
} else
{return ret_value__6179__auto__;
}
break;
}
});
state_machine__6178__auto__ = function(state_11112){
switch(arguments.length){
case 0:
return state_machine__6178__auto____0.call(this);
case 1:
return state_machine__6178__auto____1.call(this,state_11112);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__6178__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__6178__auto____0;
state_machine__6178__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__6178__auto____1;
return state_machine__6178__auto__;
})()
;})(switch__6177__auto__))
})();var state__6194__auto__ = (function (){var statearr_11129 = f__6193__auto__.call(null);(statearr_11129[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6192__auto__);
return statearr_11129;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6194__auto__);
}));
return c__6192__auto__;
});
/**
* Puts the contents of coll into the supplied channel.
* 
* By default the channel will be closed after the items are copied,
* but can be determined by the close? parameter.
* 
* Returns a channel which will close after the items are copied.
*/
cljs.core.async.onto_chan = (function() {
var onto_chan = null;
var onto_chan__2 = (function (ch,coll){return onto_chan.call(null,ch,coll,true);
});
var onto_chan__3 = (function (ch,coll,close_QMARK_){var c__6192__auto__ = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__6193__auto__ = (function (){var switch__6177__auto__ = (function (state_11199){var state_val_11200 = (state_11199[1]);if((state_val_11200 === 1))
{var inst_11179 = cljs.core.seq.call(null,coll);var inst_11180 = inst_11179;var state_11199__$1 = (function (){var statearr_11201 = state_11199;(statearr_11201[7] = inst_11180);
return statearr_11201;
})();var statearr_11202_11220 = state_11199__$1;(statearr_11202_11220[2] = null);
(statearr_11202_11220[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11200 === 2))
{var inst_11180 = (state_11199[7]);var state_11199__$1 = state_11199;if(cljs.core.truth_(inst_11180))
{var statearr_11203_11221 = state_11199__$1;(statearr_11203_11221[1] = 4);
} else
{var statearr_11204_11222 = state_11199__$1;(statearr_11204_11222[1] = 5);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11200 === 3))
{var inst_11197 = (state_11199[2]);var state_11199__$1 = state_11199;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_11199__$1,inst_11197);
} else
{if((state_val_11200 === 4))
{var inst_11180 = (state_11199[7]);var inst_11183 = cljs.core.first.call(null,inst_11180);var state_11199__$1 = state_11199;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_11199__$1,7,ch,inst_11183);
} else
{if((state_val_11200 === 5))
{var state_11199__$1 = state_11199;if(cljs.core.truth_(close_QMARK_))
{var statearr_11205_11223 = state_11199__$1;(statearr_11205_11223[1] = 8);
} else
{var statearr_11206_11224 = state_11199__$1;(statearr_11206_11224[1] = 9);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11200 === 6))
{var inst_11195 = (state_11199[2]);var state_11199__$1 = state_11199;var statearr_11207_11225 = state_11199__$1;(statearr_11207_11225[2] = inst_11195);
(statearr_11207_11225[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11200 === 7))
{var inst_11180 = (state_11199[7]);var inst_11185 = (state_11199[2]);var inst_11186 = cljs.core.next.call(null,inst_11180);var inst_11180__$1 = inst_11186;var state_11199__$1 = (function (){var statearr_11208 = state_11199;(statearr_11208[8] = inst_11185);
(statearr_11208[7] = inst_11180__$1);
return statearr_11208;
})();var statearr_11209_11226 = state_11199__$1;(statearr_11209_11226[2] = null);
(statearr_11209_11226[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11200 === 8))
{var inst_11190 = cljs.core.async.close_BANG_.call(null,ch);var state_11199__$1 = state_11199;var statearr_11210_11227 = state_11199__$1;(statearr_11210_11227[2] = inst_11190);
(statearr_11210_11227[1] = 10);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11200 === 9))
{var state_11199__$1 = state_11199;var statearr_11211_11228 = state_11199__$1;(statearr_11211_11228[2] = null);
(statearr_11211_11228[1] = 10);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11200 === 10))
{var inst_11193 = (state_11199[2]);var state_11199__$1 = state_11199;var statearr_11212_11229 = state_11199__$1;(statearr_11212_11229[2] = inst_11193);
(statearr_11212_11229[1] = 6);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{return null;
}
}
}
}
}
}
}
}
}
}
});return ((function (switch__6177__auto__){
return (function() {
var state_machine__6178__auto__ = null;
var state_machine__6178__auto____0 = (function (){var statearr_11216 = [null,null,null,null,null,null,null,null,null];(statearr_11216[0] = state_machine__6178__auto__);
(statearr_11216[1] = 1);
return statearr_11216;
});
var state_machine__6178__auto____1 = (function (state_11199){while(true){
var ret_value__6179__auto__ = (function (){try{while(true){
var result__6180__auto__ = switch__6177__auto__.call(null,state_11199);if(cljs.core.keyword_identical_QMARK_.call(null,result__6180__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__6180__auto__;
}
break;
}
}catch (e11217){if((e11217 instanceof Object))
{var ex__6181__auto__ = e11217;var statearr_11218_11230 = state_11199;(statearr_11218_11230[5] = ex__6181__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_11199);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e11217;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6179__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__11231 = state_11199;
state_11199 = G__11231;
continue;
}
} else
{return ret_value__6179__auto__;
}
break;
}
});
state_machine__6178__auto__ = function(state_11199){
switch(arguments.length){
case 0:
return state_machine__6178__auto____0.call(this);
case 1:
return state_machine__6178__auto____1.call(this,state_11199);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__6178__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__6178__auto____0;
state_machine__6178__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__6178__auto____1;
return state_machine__6178__auto__;
})()
;})(switch__6177__auto__))
})();var state__6194__auto__ = (function (){var statearr_11219 = f__6193__auto__.call(null);(statearr_11219[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6192__auto__);
return statearr_11219;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6194__auto__);
}));
return c__6192__auto__;
});
onto_chan = function(ch,coll,close_QMARK_){
switch(arguments.length){
case 2:
return onto_chan__2.call(this,ch,coll);
case 3:
return onto_chan__3.call(this,ch,coll,close_QMARK_);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
onto_chan.cljs$core$IFn$_invoke$arity$2 = onto_chan__2;
onto_chan.cljs$core$IFn$_invoke$arity$3 = onto_chan__3;
return onto_chan;
})()
;
/**
* Creates and returns a channel which contains the contents of coll,
* closing when exhausted.
*/
cljs.core.async.to_chan = (function to_chan(coll){var ch = cljs.core.async.chan.call(null,cljs.core.bounded_count.call(null,100,coll));cljs.core.async.onto_chan.call(null,ch,coll);
return ch;
});
cljs.core.async.Mux = (function (){var obj11233 = {};return obj11233;
})();
cljs.core.async.muxch_STAR_ = (function muxch_STAR_(_){if((function (){var and__3431__auto__ = _;if(and__3431__auto__)
{return _.cljs$core$async$Mux$muxch_STAR_$arity$1;
} else
{return and__3431__auto__;
}
})())
{return _.cljs$core$async$Mux$muxch_STAR_$arity$1(_);
} else
{var x__4070__auto__ = (((_ == null))?null:_);return (function (){var or__3443__auto__ = (cljs.core.async.muxch_STAR_[goog.typeOf(x__4070__auto__)]);if(or__3443__auto__)
{return or__3443__auto__;
} else
{var or__3443__auto____$1 = (cljs.core.async.muxch_STAR_["_"]);if(or__3443__auto____$1)
{return or__3443__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Mux.muxch*",_);
}
}
})().call(null,_);
}
});
cljs.core.async.Mult = (function (){var obj11235 = {};return obj11235;
})();
cljs.core.async.tap_STAR_ = (function tap_STAR_(m,ch,close_QMARK_){if((function (){var and__3431__auto__ = m;if(and__3431__auto__)
{return m.cljs$core$async$Mult$tap_STAR_$arity$3;
} else
{return and__3431__auto__;
}
})())
{return m.cljs$core$async$Mult$tap_STAR_$arity$3(m,ch,close_QMARK_);
} else
{var x__4070__auto__ = (((m == null))?null:m);return (function (){var or__3443__auto__ = (cljs.core.async.tap_STAR_[goog.typeOf(x__4070__auto__)]);if(or__3443__auto__)
{return or__3443__auto__;
} else
{var or__3443__auto____$1 = (cljs.core.async.tap_STAR_["_"]);if(or__3443__auto____$1)
{return or__3443__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Mult.tap*",m);
}
}
})().call(null,m,ch,close_QMARK_);
}
});
cljs.core.async.untap_STAR_ = (function untap_STAR_(m,ch){if((function (){var and__3431__auto__ = m;if(and__3431__auto__)
{return m.cljs$core$async$Mult$untap_STAR_$arity$2;
} else
{return and__3431__auto__;
}
})())
{return m.cljs$core$async$Mult$untap_STAR_$arity$2(m,ch);
} else
{var x__4070__auto__ = (((m == null))?null:m);return (function (){var or__3443__auto__ = (cljs.core.async.untap_STAR_[goog.typeOf(x__4070__auto__)]);if(or__3443__auto__)
{return or__3443__auto__;
} else
{var or__3443__auto____$1 = (cljs.core.async.untap_STAR_["_"]);if(or__3443__auto____$1)
{return or__3443__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Mult.untap*",m);
}
}
})().call(null,m,ch);
}
});
cljs.core.async.untap_all_STAR_ = (function untap_all_STAR_(m){if((function (){var and__3431__auto__ = m;if(and__3431__auto__)
{return m.cljs$core$async$Mult$untap_all_STAR_$arity$1;
} else
{return and__3431__auto__;
}
})())
{return m.cljs$core$async$Mult$untap_all_STAR_$arity$1(m);
} else
{var x__4070__auto__ = (((m == null))?null:m);return (function (){var or__3443__auto__ = (cljs.core.async.untap_all_STAR_[goog.typeOf(x__4070__auto__)]);if(or__3443__auto__)
{return or__3443__auto__;
} else
{var or__3443__auto____$1 = (cljs.core.async.untap_all_STAR_["_"]);if(or__3443__auto____$1)
{return or__3443__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Mult.untap-all*",m);
}
}
})().call(null,m);
}
});
/**
* Creates and returns a mult(iple) of the supplied channel. Channels
* containing copies of the channel can be created with 'tap', and
* detached with 'untap'.
* 
* Each item is distributed to all taps in parallel and synchronously,
* i.e. each tap must accept before the next item is distributed. Use
* buffering/windowing to prevent slow taps from holding up the mult.
* 
* Items received when there are no taps get dropped.
* 
* If a tap put throws an exception, it will be removed from the mult.
*/
cljs.core.async.mult = (function mult(ch){var cs = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var m = (function (){if(typeof cljs.core.async.t11459 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t11459 = (function (cs,ch,mult,meta11460){
this.cs = cs;
this.ch = ch;
this.mult = mult;
this.meta11460 = meta11460;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t11459.cljs$lang$type = true;
cljs.core.async.t11459.cljs$lang$ctorStr = "cljs.core.async/t11459";
cljs.core.async.t11459.cljs$lang$ctorPrWriter = ((function (cs){
return (function (this__4010__auto__,writer__4011__auto__,opt__4012__auto__){return cljs.core._write.call(null,writer__4011__auto__,"cljs.core.async/t11459");
});})(cs))
;
cljs.core.async.t11459.prototype.cljs$core$async$Mult$ = true;
cljs.core.async.t11459.prototype.cljs$core$async$Mult$tap_STAR_$arity$3 = ((function (cs){
return (function (_,ch__$2,close_QMARK_){var self__ = this;
var ___$1 = this;cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.assoc,ch__$2,close_QMARK_);
return null;
});})(cs))
;
cljs.core.async.t11459.prototype.cljs$core$async$Mult$untap_STAR_$arity$2 = ((function (cs){
return (function (_,ch__$2){var self__ = this;
var ___$1 = this;cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.dissoc,ch__$2);
return null;
});})(cs))
;
cljs.core.async.t11459.prototype.cljs$core$async$Mult$untap_all_STAR_$arity$1 = ((function (cs){
return (function (_){var self__ = this;
var ___$1 = this;cljs.core.reset_BANG_.call(null,self__.cs,cljs.core.PersistentArrayMap.EMPTY);
return null;
});})(cs))
;
cljs.core.async.t11459.prototype.cljs$core$async$Mux$ = true;
cljs.core.async.t11459.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (cs){
return (function (_){var self__ = this;
var ___$1 = this;return self__.ch;
});})(cs))
;
cljs.core.async.t11459.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (cs){
return (function (_11461){var self__ = this;
var _11461__$1 = this;return self__.meta11460;
});})(cs))
;
cljs.core.async.t11459.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (cs){
return (function (_11461,meta11460__$1){var self__ = this;
var _11461__$1 = this;return (new cljs.core.async.t11459(self__.cs,self__.ch,self__.mult,meta11460__$1));
});})(cs))
;
cljs.core.async.__GT_t11459 = ((function (cs){
return (function __GT_t11459(cs__$1,ch__$1,mult__$1,meta11460){return (new cljs.core.async.t11459(cs__$1,ch__$1,mult__$1,meta11460));
});})(cs))
;
}
return (new cljs.core.async.t11459(cs,ch,mult,null));
})();var dchan = cljs.core.async.chan.call(null,1);var dctr = cljs.core.atom.call(null,null);var done = ((function (cs,m,dchan,dctr){
return (function (){if((cljs.core.swap_BANG_.call(null,dctr,cljs.core.dec) === 0))
{return cljs.core.async.put_BANG_.call(null,dchan,true);
} else
{return null;
}
});})(cs,m,dchan,dctr))
;var c__6192__auto___11682 = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__6193__auto__ = (function (){var switch__6177__auto__ = (function (state_11596){var state_val_11597 = (state_11596[1]);if((state_val_11597 === 32))
{var inst_11464 = (state_11596[7]);var inst_11540 = (state_11596[8]);var _ = cljs.core.async.impl.ioc_helpers.add_exception_frame.call(null,state_11596,31,Object,null,30);var inst_11547 = cljs.core.async.put_BANG_.call(null,inst_11540,inst_11464,done);var state_11596__$1 = state_11596;var statearr_11598_11683 = state_11596__$1;(statearr_11598_11683[2] = inst_11547);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_11596__$1);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11597 === 1))
{var state_11596__$1 = state_11596;var statearr_11599_11684 = state_11596__$1;(statearr_11599_11684[2] = null);
(statearr_11599_11684[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11597 === 33))
{var inst_11553 = (state_11596[9]);var inst_11555 = cljs.core.chunked_seq_QMARK_.call(null,inst_11553);var state_11596__$1 = state_11596;if(inst_11555)
{var statearr_11600_11685 = state_11596__$1;(statearr_11600_11685[1] = 36);
} else
{var statearr_11601_11686 = state_11596__$1;(statearr_11601_11686[1] = 37);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11597 === 2))
{var state_11596__$1 = state_11596;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_11596__$1,4,ch);
} else
{if((state_val_11597 === 34))
{var state_11596__$1 = state_11596;var statearr_11602_11687 = state_11596__$1;(statearr_11602_11687[2] = null);
(statearr_11602_11687[1] = 35);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11597 === 3))
{var inst_11594 = (state_11596[2]);var state_11596__$1 = state_11596;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_11596__$1,inst_11594);
} else
{if((state_val_11597 === 35))
{var inst_11578 = (state_11596[2]);var state_11596__$1 = state_11596;var statearr_11603_11688 = state_11596__$1;(statearr_11603_11688[2] = inst_11578);
(statearr_11603_11688[1] = 29);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11597 === 4))
{var inst_11464 = (state_11596[7]);var inst_11464__$1 = (state_11596[2]);var inst_11465 = (inst_11464__$1 == null);var state_11596__$1 = (function (){var statearr_11604 = state_11596;(statearr_11604[7] = inst_11464__$1);
return statearr_11604;
})();if(cljs.core.truth_(inst_11465))
{var statearr_11605_11689 = state_11596__$1;(statearr_11605_11689[1] = 5);
} else
{var statearr_11606_11690 = state_11596__$1;(statearr_11606_11690[1] = 6);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11597 === 36))
{var inst_11553 = (state_11596[9]);var inst_11557 = cljs.core.chunk_first.call(null,inst_11553);var inst_11558 = cljs.core.chunk_rest.call(null,inst_11553);var inst_11559 = cljs.core.count.call(null,inst_11557);var inst_11532 = inst_11558;var inst_11533 = inst_11557;var inst_11534 = inst_11559;var inst_11535 = 0;var state_11596__$1 = (function (){var statearr_11607 = state_11596;(statearr_11607[10] = inst_11533);
(statearr_11607[11] = inst_11534);
(statearr_11607[12] = inst_11535);
(statearr_11607[13] = inst_11532);
return statearr_11607;
})();var statearr_11608_11691 = state_11596__$1;(statearr_11608_11691[2] = null);
(statearr_11608_11691[1] = 25);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11597 === 5))
{var inst_11471 = cljs.core.deref.call(null,cs);var inst_11472 = cljs.core.seq.call(null,inst_11471);var inst_11473 = inst_11472;var inst_11474 = null;var inst_11475 = 0;var inst_11476 = 0;var state_11596__$1 = (function (){var statearr_11609 = state_11596;(statearr_11609[14] = inst_11473);
(statearr_11609[15] = inst_11476);
(statearr_11609[16] = inst_11475);
(statearr_11609[17] = inst_11474);
return statearr_11609;
})();var statearr_11610_11692 = state_11596__$1;(statearr_11610_11692[2] = null);
(statearr_11610_11692[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11597 === 37))
{var inst_11553 = (state_11596[9]);var inst_11562 = cljs.core.first.call(null,inst_11553);var state_11596__$1 = (function (){var statearr_11611 = state_11596;(statearr_11611[18] = inst_11562);
return statearr_11611;
})();var statearr_11612_11693 = state_11596__$1;(statearr_11612_11693[2] = null);
(statearr_11612_11693[1] = 41);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11597 === 6))
{var inst_11524 = (state_11596[19]);var inst_11523 = cljs.core.deref.call(null,cs);var inst_11524__$1 = cljs.core.keys.call(null,inst_11523);var inst_11525 = cljs.core.count.call(null,inst_11524__$1);var inst_11526 = cljs.core.reset_BANG_.call(null,dctr,inst_11525);var inst_11531 = cljs.core.seq.call(null,inst_11524__$1);var inst_11532 = inst_11531;var inst_11533 = null;var inst_11534 = 0;var inst_11535 = 0;var state_11596__$1 = (function (){var statearr_11613 = state_11596;(statearr_11613[10] = inst_11533);
(statearr_11613[11] = inst_11534);
(statearr_11613[12] = inst_11535);
(statearr_11613[13] = inst_11532);
(statearr_11613[19] = inst_11524__$1);
(statearr_11613[20] = inst_11526);
return statearr_11613;
})();var statearr_11614_11694 = state_11596__$1;(statearr_11614_11694[2] = null);
(statearr_11614_11694[1] = 25);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11597 === 38))
{var inst_11575 = (state_11596[2]);var state_11596__$1 = state_11596;var statearr_11615_11695 = state_11596__$1;(statearr_11615_11695[2] = inst_11575);
(statearr_11615_11695[1] = 35);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11597 === 7))
{var inst_11592 = (state_11596[2]);var state_11596__$1 = state_11596;var statearr_11616_11696 = state_11596__$1;(statearr_11616_11696[2] = inst_11592);
(statearr_11616_11696[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11597 === 39))
{var inst_11553 = (state_11596[9]);var inst_11571 = (state_11596[2]);var inst_11572 = cljs.core.next.call(null,inst_11553);var inst_11532 = inst_11572;var inst_11533 = null;var inst_11534 = 0;var inst_11535 = 0;var state_11596__$1 = (function (){var statearr_11617 = state_11596;(statearr_11617[21] = inst_11571);
(statearr_11617[10] = inst_11533);
(statearr_11617[11] = inst_11534);
(statearr_11617[12] = inst_11535);
(statearr_11617[13] = inst_11532);
return statearr_11617;
})();var statearr_11618_11697 = state_11596__$1;(statearr_11618_11697[2] = null);
(statearr_11618_11697[1] = 25);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11597 === 8))
{var inst_11476 = (state_11596[15]);var inst_11475 = (state_11596[16]);var inst_11478 = (inst_11476 < inst_11475);var inst_11479 = inst_11478;var state_11596__$1 = state_11596;if(cljs.core.truth_(inst_11479))
{var statearr_11619_11698 = state_11596__$1;(statearr_11619_11698[1] = 10);
} else
{var statearr_11620_11699 = state_11596__$1;(statearr_11620_11699[1] = 11);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11597 === 40))
{var inst_11562 = (state_11596[18]);var inst_11563 = (state_11596[2]);var inst_11564 = cljs.core.swap_BANG_.call(null,dctr,cljs.core.dec);var inst_11565 = cljs.core.async.untap_STAR_.call(null,m,inst_11562);var state_11596__$1 = (function (){var statearr_11621 = state_11596;(statearr_11621[22] = inst_11564);
(statearr_11621[23] = inst_11563);
return statearr_11621;
})();var statearr_11622_11700 = state_11596__$1;(statearr_11622_11700[2] = inst_11565);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_11596__$1);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11597 === 9))
{var inst_11521 = (state_11596[2]);var state_11596__$1 = state_11596;var statearr_11623_11701 = state_11596__$1;(statearr_11623_11701[2] = inst_11521);
(statearr_11623_11701[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11597 === 41))
{var inst_11464 = (state_11596[7]);var inst_11562 = (state_11596[18]);var _ = cljs.core.async.impl.ioc_helpers.add_exception_frame.call(null,state_11596,40,Object,null,39);var inst_11569 = cljs.core.async.put_BANG_.call(null,inst_11562,inst_11464,done);var state_11596__$1 = state_11596;var statearr_11624_11702 = state_11596__$1;(statearr_11624_11702[2] = inst_11569);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_11596__$1);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11597 === 10))
{var inst_11476 = (state_11596[15]);var inst_11474 = (state_11596[17]);var inst_11482 = cljs.core._nth.call(null,inst_11474,inst_11476);var inst_11483 = cljs.core.nth.call(null,inst_11482,0,null);var inst_11484 = cljs.core.nth.call(null,inst_11482,1,null);var state_11596__$1 = (function (){var statearr_11625 = state_11596;(statearr_11625[24] = inst_11483);
return statearr_11625;
})();if(cljs.core.truth_(inst_11484))
{var statearr_11626_11703 = state_11596__$1;(statearr_11626_11703[1] = 13);
} else
{var statearr_11627_11704 = state_11596__$1;(statearr_11627_11704[1] = 14);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11597 === 42))
{var state_11596__$1 = state_11596;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_11596__$1,45,dchan);
} else
{if((state_val_11597 === 11))
{var inst_11493 = (state_11596[25]);var inst_11473 = (state_11596[14]);var inst_11493__$1 = cljs.core.seq.call(null,inst_11473);var state_11596__$1 = (function (){var statearr_11628 = state_11596;(statearr_11628[25] = inst_11493__$1);
return statearr_11628;
})();if(inst_11493__$1)
{var statearr_11629_11705 = state_11596__$1;(statearr_11629_11705[1] = 16);
} else
{var statearr_11630_11706 = state_11596__$1;(statearr_11630_11706[1] = 17);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11597 === 43))
{var state_11596__$1 = state_11596;var statearr_11631_11707 = state_11596__$1;(statearr_11631_11707[2] = null);
(statearr_11631_11707[1] = 44);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11597 === 12))
{var inst_11519 = (state_11596[2]);var state_11596__$1 = state_11596;var statearr_11632_11708 = state_11596__$1;(statearr_11632_11708[2] = inst_11519);
(statearr_11632_11708[1] = 9);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11597 === 44))
{var inst_11589 = (state_11596[2]);var state_11596__$1 = (function (){var statearr_11633 = state_11596;(statearr_11633[26] = inst_11589);
return statearr_11633;
})();var statearr_11634_11709 = state_11596__$1;(statearr_11634_11709[2] = null);
(statearr_11634_11709[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11597 === 13))
{var inst_11483 = (state_11596[24]);var inst_11486 = cljs.core.async.close_BANG_.call(null,inst_11483);var state_11596__$1 = state_11596;var statearr_11635_11710 = state_11596__$1;(statearr_11635_11710[2] = inst_11486);
(statearr_11635_11710[1] = 15);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11597 === 45))
{var inst_11586 = (state_11596[2]);var state_11596__$1 = state_11596;var statearr_11639_11711 = state_11596__$1;(statearr_11639_11711[2] = inst_11586);
(statearr_11639_11711[1] = 44);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11597 === 14))
{var state_11596__$1 = state_11596;var statearr_11640_11712 = state_11596__$1;(statearr_11640_11712[2] = null);
(statearr_11640_11712[1] = 15);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11597 === 15))
{var inst_11473 = (state_11596[14]);var inst_11476 = (state_11596[15]);var inst_11475 = (state_11596[16]);var inst_11474 = (state_11596[17]);var inst_11489 = (state_11596[2]);var inst_11490 = (inst_11476 + 1);var tmp11636 = inst_11473;var tmp11637 = inst_11475;var tmp11638 = inst_11474;var inst_11473__$1 = tmp11636;var inst_11474__$1 = tmp11638;var inst_11475__$1 = tmp11637;var inst_11476__$1 = inst_11490;var state_11596__$1 = (function (){var statearr_11641 = state_11596;(statearr_11641[27] = inst_11489);
(statearr_11641[14] = inst_11473__$1);
(statearr_11641[15] = inst_11476__$1);
(statearr_11641[16] = inst_11475__$1);
(statearr_11641[17] = inst_11474__$1);
return statearr_11641;
})();var statearr_11642_11713 = state_11596__$1;(statearr_11642_11713[2] = null);
(statearr_11642_11713[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11597 === 16))
{var inst_11493 = (state_11596[25]);var inst_11495 = cljs.core.chunked_seq_QMARK_.call(null,inst_11493);var state_11596__$1 = state_11596;if(inst_11495)
{var statearr_11643_11714 = state_11596__$1;(statearr_11643_11714[1] = 19);
} else
{var statearr_11644_11715 = state_11596__$1;(statearr_11644_11715[1] = 20);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11597 === 17))
{var state_11596__$1 = state_11596;var statearr_11645_11716 = state_11596__$1;(statearr_11645_11716[2] = null);
(statearr_11645_11716[1] = 18);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11597 === 18))
{var inst_11517 = (state_11596[2]);var state_11596__$1 = state_11596;var statearr_11646_11717 = state_11596__$1;(statearr_11646_11717[2] = inst_11517);
(statearr_11646_11717[1] = 12);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11597 === 19))
{var inst_11493 = (state_11596[25]);var inst_11497 = cljs.core.chunk_first.call(null,inst_11493);var inst_11498 = cljs.core.chunk_rest.call(null,inst_11493);var inst_11499 = cljs.core.count.call(null,inst_11497);var inst_11473 = inst_11498;var inst_11474 = inst_11497;var inst_11475 = inst_11499;var inst_11476 = 0;var state_11596__$1 = (function (){var statearr_11647 = state_11596;(statearr_11647[14] = inst_11473);
(statearr_11647[15] = inst_11476);
(statearr_11647[16] = inst_11475);
(statearr_11647[17] = inst_11474);
return statearr_11647;
})();var statearr_11648_11718 = state_11596__$1;(statearr_11648_11718[2] = null);
(statearr_11648_11718[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11597 === 20))
{var inst_11493 = (state_11596[25]);var inst_11503 = cljs.core.first.call(null,inst_11493);var inst_11504 = cljs.core.nth.call(null,inst_11503,0,null);var inst_11505 = cljs.core.nth.call(null,inst_11503,1,null);var state_11596__$1 = (function (){var statearr_11649 = state_11596;(statearr_11649[28] = inst_11504);
return statearr_11649;
})();if(cljs.core.truth_(inst_11505))
{var statearr_11650_11719 = state_11596__$1;(statearr_11650_11719[1] = 22);
} else
{var statearr_11651_11720 = state_11596__$1;(statearr_11651_11720[1] = 23);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11597 === 21))
{var inst_11514 = (state_11596[2]);var state_11596__$1 = state_11596;var statearr_11652_11721 = state_11596__$1;(statearr_11652_11721[2] = inst_11514);
(statearr_11652_11721[1] = 18);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11597 === 22))
{var inst_11504 = (state_11596[28]);var inst_11507 = cljs.core.async.close_BANG_.call(null,inst_11504);var state_11596__$1 = state_11596;var statearr_11653_11722 = state_11596__$1;(statearr_11653_11722[2] = inst_11507);
(statearr_11653_11722[1] = 24);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11597 === 23))
{var state_11596__$1 = state_11596;var statearr_11654_11723 = state_11596__$1;(statearr_11654_11723[2] = null);
(statearr_11654_11723[1] = 24);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11597 === 24))
{var inst_11493 = (state_11596[25]);var inst_11510 = (state_11596[2]);var inst_11511 = cljs.core.next.call(null,inst_11493);var inst_11473 = inst_11511;var inst_11474 = null;var inst_11475 = 0;var inst_11476 = 0;var state_11596__$1 = (function (){var statearr_11655 = state_11596;(statearr_11655[14] = inst_11473);
(statearr_11655[29] = inst_11510);
(statearr_11655[15] = inst_11476);
(statearr_11655[16] = inst_11475);
(statearr_11655[17] = inst_11474);
return statearr_11655;
})();var statearr_11656_11724 = state_11596__$1;(statearr_11656_11724[2] = null);
(statearr_11656_11724[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11597 === 25))
{var inst_11534 = (state_11596[11]);var inst_11535 = (state_11596[12]);var inst_11537 = (inst_11535 < inst_11534);var inst_11538 = inst_11537;var state_11596__$1 = state_11596;if(cljs.core.truth_(inst_11538))
{var statearr_11657_11725 = state_11596__$1;(statearr_11657_11725[1] = 27);
} else
{var statearr_11658_11726 = state_11596__$1;(statearr_11658_11726[1] = 28);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11597 === 26))
{var inst_11524 = (state_11596[19]);var inst_11582 = (state_11596[2]);var inst_11583 = cljs.core.seq.call(null,inst_11524);var state_11596__$1 = (function (){var statearr_11659 = state_11596;(statearr_11659[30] = inst_11582);
return statearr_11659;
})();if(inst_11583)
{var statearr_11660_11727 = state_11596__$1;(statearr_11660_11727[1] = 42);
} else
{var statearr_11661_11728 = state_11596__$1;(statearr_11661_11728[1] = 43);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11597 === 27))
{var inst_11533 = (state_11596[10]);var inst_11535 = (state_11596[12]);var inst_11540 = cljs.core._nth.call(null,inst_11533,inst_11535);var state_11596__$1 = (function (){var statearr_11662 = state_11596;(statearr_11662[8] = inst_11540);
return statearr_11662;
})();var statearr_11663_11729 = state_11596__$1;(statearr_11663_11729[2] = null);
(statearr_11663_11729[1] = 32);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11597 === 28))
{var inst_11532 = (state_11596[13]);var inst_11553 = (state_11596[9]);var inst_11553__$1 = cljs.core.seq.call(null,inst_11532);var state_11596__$1 = (function (){var statearr_11667 = state_11596;(statearr_11667[9] = inst_11553__$1);
return statearr_11667;
})();if(inst_11553__$1)
{var statearr_11668_11730 = state_11596__$1;(statearr_11668_11730[1] = 33);
} else
{var statearr_11669_11731 = state_11596__$1;(statearr_11669_11731[1] = 34);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11597 === 29))
{var inst_11580 = (state_11596[2]);var state_11596__$1 = state_11596;var statearr_11670_11732 = state_11596__$1;(statearr_11670_11732[2] = inst_11580);
(statearr_11670_11732[1] = 26);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11597 === 30))
{var inst_11533 = (state_11596[10]);var inst_11534 = (state_11596[11]);var inst_11535 = (state_11596[12]);var inst_11532 = (state_11596[13]);var inst_11549 = (state_11596[2]);var inst_11550 = (inst_11535 + 1);var tmp11664 = inst_11533;var tmp11665 = inst_11534;var tmp11666 = inst_11532;var inst_11532__$1 = tmp11666;var inst_11533__$1 = tmp11664;var inst_11534__$1 = tmp11665;var inst_11535__$1 = inst_11550;var state_11596__$1 = (function (){var statearr_11671 = state_11596;(statearr_11671[31] = inst_11549);
(statearr_11671[10] = inst_11533__$1);
(statearr_11671[11] = inst_11534__$1);
(statearr_11671[12] = inst_11535__$1);
(statearr_11671[13] = inst_11532__$1);
return statearr_11671;
})();var statearr_11672_11733 = state_11596__$1;(statearr_11672_11733[2] = null);
(statearr_11672_11733[1] = 25);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11597 === 31))
{var inst_11540 = (state_11596[8]);var inst_11541 = (state_11596[2]);var inst_11542 = cljs.core.swap_BANG_.call(null,dctr,cljs.core.dec);var inst_11543 = cljs.core.async.untap_STAR_.call(null,m,inst_11540);var state_11596__$1 = (function (){var statearr_11673 = state_11596;(statearr_11673[32] = inst_11542);
(statearr_11673[33] = inst_11541);
return statearr_11673;
})();var statearr_11674_11734 = state_11596__$1;(statearr_11674_11734[2] = inst_11543);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_11596__$1);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});return ((function (switch__6177__auto__){
return (function() {
var state_machine__6178__auto__ = null;
var state_machine__6178__auto____0 = (function (){var statearr_11678 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];(statearr_11678[0] = state_machine__6178__auto__);
(statearr_11678[1] = 1);
return statearr_11678;
});
var state_machine__6178__auto____1 = (function (state_11596){while(true){
var ret_value__6179__auto__ = (function (){try{while(true){
var result__6180__auto__ = switch__6177__auto__.call(null,state_11596);if(cljs.core.keyword_identical_QMARK_.call(null,result__6180__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__6180__auto__;
}
break;
}
}catch (e11679){if((e11679 instanceof Object))
{var ex__6181__auto__ = e11679;var statearr_11680_11735 = state_11596;(statearr_11680_11735[5] = ex__6181__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_11596);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e11679;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6179__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__11736 = state_11596;
state_11596 = G__11736;
continue;
}
} else
{return ret_value__6179__auto__;
}
break;
}
});
state_machine__6178__auto__ = function(state_11596){
switch(arguments.length){
case 0:
return state_machine__6178__auto____0.call(this);
case 1:
return state_machine__6178__auto____1.call(this,state_11596);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__6178__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__6178__auto____0;
state_machine__6178__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__6178__auto____1;
return state_machine__6178__auto__;
})()
;})(switch__6177__auto__))
})();var state__6194__auto__ = (function (){var statearr_11681 = f__6193__auto__.call(null);(statearr_11681[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6192__auto___11682);
return statearr_11681;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6194__auto__);
}));
return m;
});
/**
* Copies the mult source onto the supplied channel.
* 
* By default the channel will be closed when the source closes,
* but can be determined by the close? parameter.
*/
cljs.core.async.tap = (function() {
var tap = null;
var tap__2 = (function (mult,ch){return tap.call(null,mult,ch,true);
});
var tap__3 = (function (mult,ch,close_QMARK_){cljs.core.async.tap_STAR_.call(null,mult,ch,close_QMARK_);
return ch;
});
tap = function(mult,ch,close_QMARK_){
switch(arguments.length){
case 2:
return tap__2.call(this,mult,ch);
case 3:
return tap__3.call(this,mult,ch,close_QMARK_);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
tap.cljs$core$IFn$_invoke$arity$2 = tap__2;
tap.cljs$core$IFn$_invoke$arity$3 = tap__3;
return tap;
})()
;
/**
* Disconnects a target channel from a mult
*/
cljs.core.async.untap = (function untap(mult,ch){return cljs.core.async.untap_STAR_.call(null,mult,ch);
});
/**
* Disconnects all target channels from a mult
*/
cljs.core.async.untap_all = (function untap_all(mult){return cljs.core.async.untap_all_STAR_.call(null,mult);
});
cljs.core.async.Mix = (function (){var obj11738 = {};return obj11738;
})();
cljs.core.async.admix_STAR_ = (function admix_STAR_(m,ch){if((function (){var and__3431__auto__ = m;if(and__3431__auto__)
{return m.cljs$core$async$Mix$admix_STAR_$arity$2;
} else
{return and__3431__auto__;
}
})())
{return m.cljs$core$async$Mix$admix_STAR_$arity$2(m,ch);
} else
{var x__4070__auto__ = (((m == null))?null:m);return (function (){var or__3443__auto__ = (cljs.core.async.admix_STAR_[goog.typeOf(x__4070__auto__)]);if(or__3443__auto__)
{return or__3443__auto__;
} else
{var or__3443__auto____$1 = (cljs.core.async.admix_STAR_["_"]);if(or__3443__auto____$1)
{return or__3443__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Mix.admix*",m);
}
}
})().call(null,m,ch);
}
});
cljs.core.async.unmix_STAR_ = (function unmix_STAR_(m,ch){if((function (){var and__3431__auto__ = m;if(and__3431__auto__)
{return m.cljs$core$async$Mix$unmix_STAR_$arity$2;
} else
{return and__3431__auto__;
}
})())
{return m.cljs$core$async$Mix$unmix_STAR_$arity$2(m,ch);
} else
{var x__4070__auto__ = (((m == null))?null:m);return (function (){var or__3443__auto__ = (cljs.core.async.unmix_STAR_[goog.typeOf(x__4070__auto__)]);if(or__3443__auto__)
{return or__3443__auto__;
} else
{var or__3443__auto____$1 = (cljs.core.async.unmix_STAR_["_"]);if(or__3443__auto____$1)
{return or__3443__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Mix.unmix*",m);
}
}
})().call(null,m,ch);
}
});
cljs.core.async.unmix_all_STAR_ = (function unmix_all_STAR_(m){if((function (){var and__3431__auto__ = m;if(and__3431__auto__)
{return m.cljs$core$async$Mix$unmix_all_STAR_$arity$1;
} else
{return and__3431__auto__;
}
})())
{return m.cljs$core$async$Mix$unmix_all_STAR_$arity$1(m);
} else
{var x__4070__auto__ = (((m == null))?null:m);return (function (){var or__3443__auto__ = (cljs.core.async.unmix_all_STAR_[goog.typeOf(x__4070__auto__)]);if(or__3443__auto__)
{return or__3443__auto__;
} else
{var or__3443__auto____$1 = (cljs.core.async.unmix_all_STAR_["_"]);if(or__3443__auto____$1)
{return or__3443__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Mix.unmix-all*",m);
}
}
})().call(null,m);
}
});
cljs.core.async.toggle_STAR_ = (function toggle_STAR_(m,state_map){if((function (){var and__3431__auto__ = m;if(and__3431__auto__)
{return m.cljs$core$async$Mix$toggle_STAR_$arity$2;
} else
{return and__3431__auto__;
}
})())
{return m.cljs$core$async$Mix$toggle_STAR_$arity$2(m,state_map);
} else
{var x__4070__auto__ = (((m == null))?null:m);return (function (){var or__3443__auto__ = (cljs.core.async.toggle_STAR_[goog.typeOf(x__4070__auto__)]);if(or__3443__auto__)
{return or__3443__auto__;
} else
{var or__3443__auto____$1 = (cljs.core.async.toggle_STAR_["_"]);if(or__3443__auto____$1)
{return or__3443__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Mix.toggle*",m);
}
}
})().call(null,m,state_map);
}
});
cljs.core.async.solo_mode_STAR_ = (function solo_mode_STAR_(m,mode){if((function (){var and__3431__auto__ = m;if(and__3431__auto__)
{return m.cljs$core$async$Mix$solo_mode_STAR_$arity$2;
} else
{return and__3431__auto__;
}
})())
{return m.cljs$core$async$Mix$solo_mode_STAR_$arity$2(m,mode);
} else
{var x__4070__auto__ = (((m == null))?null:m);return (function (){var or__3443__auto__ = (cljs.core.async.solo_mode_STAR_[goog.typeOf(x__4070__auto__)]);if(or__3443__auto__)
{return or__3443__auto__;
} else
{var or__3443__auto____$1 = (cljs.core.async.solo_mode_STAR_["_"]);if(or__3443__auto____$1)
{return or__3443__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Mix.solo-mode*",m);
}
}
})().call(null,m,mode);
}
});
/**
* Creates and returns a mix of one or more input channels which will
* be put on the supplied out channel. Input sources can be added to
* the mix with 'admix', and removed with 'unmix'. A mix supports
* soloing, muting and pausing multiple inputs atomically using
* 'toggle', and can solo using either muting or pausing as determined
* by 'solo-mode'.
* 
* Each channel can have zero or more boolean modes set via 'toggle':
* 
* :solo - when true, only this (ond other soloed) channel(s) will appear
* in the mix output channel. :mute and :pause states of soloed
* channels are ignored. If solo-mode is :mute, non-soloed
* channels are muted, if :pause, non-soloed channels are
* paused.
* 
* :mute - muted channels will have their contents consumed but not included in the mix
* :pause - paused channels will not have their contents consumed (and thus also not included in the mix)
*/
cljs.core.async.mix = (function mix(out){var cs = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var solo_modes = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"pause","pause",1120344424),null,new cljs.core.Keyword(null,"mute","mute",1017267595),null], null), null);var attrs = cljs.core.conj.call(null,solo_modes,new cljs.core.Keyword(null,"solo","solo",1017440337));var solo_mode = cljs.core.atom.call(null,new cljs.core.Keyword(null,"mute","mute",1017267595));var change = cljs.core.async.chan.call(null);var changed = ((function (cs,solo_modes,attrs,solo_mode,change){
return (function (){return cljs.core.async.put_BANG_.call(null,change,true);
});})(cs,solo_modes,attrs,solo_mode,change))
;var pick = ((function (cs,solo_modes,attrs,solo_mode,change,changed){
return (function (attr,chs){return cljs.core.reduce_kv.call(null,((function (cs,solo_modes,attrs,solo_mode,change,changed){
return (function (ret,c,v){if(cljs.core.truth_(attr.call(null,v)))
{return cljs.core.conj.call(null,ret,c);
} else
{return ret;
}
});})(cs,solo_modes,attrs,solo_mode,change,changed))
,cljs.core.PersistentHashSet.EMPTY,chs);
});})(cs,solo_modes,attrs,solo_mode,change,changed))
;var calc_state = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick){
return (function (){var chs = cljs.core.deref.call(null,cs);var mode = cljs.core.deref.call(null,solo_mode);var solos = pick.call(null,new cljs.core.Keyword(null,"solo","solo",1017440337),chs);var pauses = pick.call(null,new cljs.core.Keyword(null,"pause","pause",1120344424),chs);return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"solos","solos",1123523302),solos,new cljs.core.Keyword(null,"mutes","mutes",1118168300),pick.call(null,new cljs.core.Keyword(null,"mute","mute",1017267595),chs),new cljs.core.Keyword(null,"reads","reads",1122290959),cljs.core.conj.call(null,(((cljs.core._EQ_.call(null,mode,new cljs.core.Keyword(null,"pause","pause",1120344424))) && (!(cljs.core.empty_QMARK_.call(null,solos))))?cljs.core.vec.call(null,solos):cljs.core.vec.call(null,cljs.core.remove.call(null,pauses,cljs.core.keys.call(null,chs)))),change)], null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick))
;var m = (function (){if(typeof cljs.core.async.t11848 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t11848 = (function (pick,out,attrs,cs,calc_state,solo_modes,mix,changed,change,solo_mode,meta11849){
this.pick = pick;
this.out = out;
this.attrs = attrs;
this.cs = cs;
this.calc_state = calc_state;
this.solo_modes = solo_modes;
this.mix = mix;
this.changed = changed;
this.change = change;
this.solo_mode = solo_mode;
this.meta11849 = meta11849;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t11848.cljs$lang$type = true;
cljs.core.async.t11848.cljs$lang$ctorStr = "cljs.core.async/t11848";
cljs.core.async.t11848.cljs$lang$ctorPrWriter = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (this__4010__auto__,writer__4011__auto__,opt__4012__auto__){return cljs.core._write.call(null,writer__4011__auto__,"cljs.core.async/t11848");
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t11848.prototype.cljs$core$async$Mix$ = true;
cljs.core.async.t11848.prototype.cljs$core$async$Mix$admix_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,ch){var self__ = this;
var ___$1 = this;cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.assoc,ch,cljs.core.PersistentArrayMap.EMPTY);
return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t11848.prototype.cljs$core$async$Mix$unmix_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,ch){var self__ = this;
var ___$1 = this;cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.dissoc,ch);
return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t11848.prototype.cljs$core$async$Mix$unmix_all_STAR_$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_){var self__ = this;
var ___$1 = this;cljs.core.reset_BANG_.call(null,self__.cs,cljs.core.PersistentArrayMap.EMPTY);
return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t11848.prototype.cljs$core$async$Mix$toggle_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,state_map){var self__ = this;
var ___$1 = this;cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.partial.call(null,cljs.core.merge_with,cljs.core.merge),state_map);
return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t11848.prototype.cljs$core$async$Mix$solo_mode_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,mode){var self__ = this;
var ___$1 = this;if(cljs.core.truth_(self__.solo_modes.call(null,mode)))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str([cljs.core.str("mode must be one of: "),cljs.core.str(self__.solo_modes)].join('')),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol(null,"solo-modes","solo-modes",-1162732933,null),new cljs.core.Symbol(null,"mode","mode",-1637174436,null))))].join('')));
}
cljs.core.reset_BANG_.call(null,self__.solo_mode,mode);
return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t11848.prototype.cljs$core$async$Mux$ = true;
cljs.core.async.t11848.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_){var self__ = this;
var ___$1 = this;return self__.out;
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t11848.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_11850){var self__ = this;
var _11850__$1 = this;return self__.meta11849;
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t11848.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_11850,meta11849__$1){var self__ = this;
var _11850__$1 = this;return (new cljs.core.async.t11848(self__.pick,self__.out,self__.attrs,self__.cs,self__.calc_state,self__.solo_modes,self__.mix,self__.changed,self__.change,self__.solo_mode,meta11849__$1));
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.__GT_t11848 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function __GT_t11848(pick__$1,out__$1,attrs__$1,cs__$1,calc_state__$1,solo_modes__$1,mix__$1,changed__$1,change__$1,solo_mode__$1,meta11849){return (new cljs.core.async.t11848(pick__$1,out__$1,attrs__$1,cs__$1,calc_state__$1,solo_modes__$1,mix__$1,changed__$1,change__$1,solo_mode__$1,meta11849));
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
}
return (new cljs.core.async.t11848(pick,out,attrs,cs,calc_state,solo_modes,mix,changed,change,solo_mode,null));
})();var c__6192__auto___11957 = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__6193__auto__ = (function (){var switch__6177__auto__ = (function (state_11915){var state_val_11916 = (state_11915[1]);if((state_val_11916 === 1))
{var inst_11854 = (state_11915[7]);var inst_11854__$1 = calc_state.call(null);var inst_11855 = cljs.core.seq_QMARK_.call(null,inst_11854__$1);var state_11915__$1 = (function (){var statearr_11917 = state_11915;(statearr_11917[7] = inst_11854__$1);
return statearr_11917;
})();if(inst_11855)
{var statearr_11918_11958 = state_11915__$1;(statearr_11918_11958[1] = 2);
} else
{var statearr_11919_11959 = state_11915__$1;(statearr_11919_11959[1] = 3);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11916 === 2))
{var inst_11854 = (state_11915[7]);var inst_11857 = cljs.core.apply.call(null,cljs.core.hash_map,inst_11854);var state_11915__$1 = state_11915;var statearr_11920_11960 = state_11915__$1;(statearr_11920_11960[2] = inst_11857);
(statearr_11920_11960[1] = 4);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11916 === 3))
{var inst_11854 = (state_11915[7]);var state_11915__$1 = state_11915;var statearr_11921_11961 = state_11915__$1;(statearr_11921_11961[2] = inst_11854);
(statearr_11921_11961[1] = 4);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11916 === 4))
{var inst_11854 = (state_11915[7]);var inst_11860 = (state_11915[2]);var inst_11861 = cljs.core.get.call(null,inst_11860,new cljs.core.Keyword(null,"reads","reads",1122290959));var inst_11862 = cljs.core.get.call(null,inst_11860,new cljs.core.Keyword(null,"mutes","mutes",1118168300));var inst_11863 = cljs.core.get.call(null,inst_11860,new cljs.core.Keyword(null,"solos","solos",1123523302));var inst_11864 = inst_11854;var state_11915__$1 = (function (){var statearr_11922 = state_11915;(statearr_11922[8] = inst_11862);
(statearr_11922[9] = inst_11861);
(statearr_11922[10] = inst_11863);
(statearr_11922[11] = inst_11864);
return statearr_11922;
})();var statearr_11923_11962 = state_11915__$1;(statearr_11923_11962[2] = null);
(statearr_11923_11962[1] = 5);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11916 === 5))
{var inst_11864 = (state_11915[11]);var inst_11867 = cljs.core.seq_QMARK_.call(null,inst_11864);var state_11915__$1 = state_11915;if(inst_11867)
{var statearr_11924_11963 = state_11915__$1;(statearr_11924_11963[1] = 7);
} else
{var statearr_11925_11964 = state_11915__$1;(statearr_11925_11964[1] = 8);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11916 === 6))
{var inst_11913 = (state_11915[2]);var state_11915__$1 = state_11915;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_11915__$1,inst_11913);
} else
{if((state_val_11916 === 7))
{var inst_11864 = (state_11915[11]);var inst_11869 = cljs.core.apply.call(null,cljs.core.hash_map,inst_11864);var state_11915__$1 = state_11915;var statearr_11926_11965 = state_11915__$1;(statearr_11926_11965[2] = inst_11869);
(statearr_11926_11965[1] = 9);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11916 === 8))
{var inst_11864 = (state_11915[11]);var state_11915__$1 = state_11915;var statearr_11927_11966 = state_11915__$1;(statearr_11927_11966[2] = inst_11864);
(statearr_11927_11966[1] = 9);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11916 === 9))
{var inst_11872 = (state_11915[12]);var inst_11872__$1 = (state_11915[2]);var inst_11873 = cljs.core.get.call(null,inst_11872__$1,new cljs.core.Keyword(null,"reads","reads",1122290959));var inst_11874 = cljs.core.get.call(null,inst_11872__$1,new cljs.core.Keyword(null,"mutes","mutes",1118168300));var inst_11875 = cljs.core.get.call(null,inst_11872__$1,new cljs.core.Keyword(null,"solos","solos",1123523302));var state_11915__$1 = (function (){var statearr_11928 = state_11915;(statearr_11928[13] = inst_11874);
(statearr_11928[14] = inst_11875);
(statearr_11928[12] = inst_11872__$1);
return statearr_11928;
})();return cljs.core.async.impl.ioc_helpers.ioc_alts_BANG_.call(null,state_11915__$1,10,inst_11873);
} else
{if((state_val_11916 === 10))
{var inst_11879 = (state_11915[15]);var inst_11880 = (state_11915[16]);var inst_11878 = (state_11915[2]);var inst_11879__$1 = cljs.core.nth.call(null,inst_11878,0,null);var inst_11880__$1 = cljs.core.nth.call(null,inst_11878,1,null);var inst_11881 = (inst_11879__$1 == null);var inst_11882 = cljs.core._EQ_.call(null,inst_11880__$1,change);var inst_11883 = (inst_11881) || (inst_11882);var state_11915__$1 = (function (){var statearr_11929 = state_11915;(statearr_11929[15] = inst_11879__$1);
(statearr_11929[16] = inst_11880__$1);
return statearr_11929;
})();if(cljs.core.truth_(inst_11883))
{var statearr_11930_11967 = state_11915__$1;(statearr_11930_11967[1] = 11);
} else
{var statearr_11931_11968 = state_11915__$1;(statearr_11931_11968[1] = 12);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11916 === 11))
{var inst_11879 = (state_11915[15]);var inst_11885 = (inst_11879 == null);var state_11915__$1 = state_11915;if(cljs.core.truth_(inst_11885))
{var statearr_11932_11969 = state_11915__$1;(statearr_11932_11969[1] = 14);
} else
{var statearr_11933_11970 = state_11915__$1;(statearr_11933_11970[1] = 15);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11916 === 12))
{var inst_11894 = (state_11915[17]);var inst_11875 = (state_11915[14]);var inst_11880 = (state_11915[16]);var inst_11894__$1 = inst_11875.call(null,inst_11880);var state_11915__$1 = (function (){var statearr_11934 = state_11915;(statearr_11934[17] = inst_11894__$1);
return statearr_11934;
})();if(cljs.core.truth_(inst_11894__$1))
{var statearr_11935_11971 = state_11915__$1;(statearr_11935_11971[1] = 17);
} else
{var statearr_11936_11972 = state_11915__$1;(statearr_11936_11972[1] = 18);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11916 === 13))
{var inst_11911 = (state_11915[2]);var state_11915__$1 = state_11915;var statearr_11937_11973 = state_11915__$1;(statearr_11937_11973[2] = inst_11911);
(statearr_11937_11973[1] = 6);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11916 === 14))
{var inst_11880 = (state_11915[16]);var inst_11887 = cljs.core.swap_BANG_.call(null,cs,cljs.core.dissoc,inst_11880);var state_11915__$1 = state_11915;var statearr_11938_11974 = state_11915__$1;(statearr_11938_11974[2] = inst_11887);
(statearr_11938_11974[1] = 16);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11916 === 15))
{var state_11915__$1 = state_11915;var statearr_11939_11975 = state_11915__$1;(statearr_11939_11975[2] = null);
(statearr_11939_11975[1] = 16);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11916 === 16))
{var inst_11890 = (state_11915[2]);var inst_11891 = calc_state.call(null);var inst_11864 = inst_11891;var state_11915__$1 = (function (){var statearr_11940 = state_11915;(statearr_11940[18] = inst_11890);
(statearr_11940[11] = inst_11864);
return statearr_11940;
})();var statearr_11941_11976 = state_11915__$1;(statearr_11941_11976[2] = null);
(statearr_11941_11976[1] = 5);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11916 === 17))
{var inst_11894 = (state_11915[17]);var state_11915__$1 = state_11915;var statearr_11942_11977 = state_11915__$1;(statearr_11942_11977[2] = inst_11894);
(statearr_11942_11977[1] = 19);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11916 === 18))
{var inst_11874 = (state_11915[13]);var inst_11875 = (state_11915[14]);var inst_11880 = (state_11915[16]);var inst_11897 = cljs.core.empty_QMARK_.call(null,inst_11875);var inst_11898 = inst_11874.call(null,inst_11880);var inst_11899 = cljs.core.not.call(null,inst_11898);var inst_11900 = (inst_11897) && (inst_11899);var state_11915__$1 = state_11915;var statearr_11943_11978 = state_11915__$1;(statearr_11943_11978[2] = inst_11900);
(statearr_11943_11978[1] = 19);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11916 === 19))
{var inst_11902 = (state_11915[2]);var state_11915__$1 = state_11915;if(cljs.core.truth_(inst_11902))
{var statearr_11944_11979 = state_11915__$1;(statearr_11944_11979[1] = 20);
} else
{var statearr_11945_11980 = state_11915__$1;(statearr_11945_11980[1] = 21);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11916 === 20))
{var inst_11879 = (state_11915[15]);var state_11915__$1 = state_11915;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_11915__$1,23,out,inst_11879);
} else
{if((state_val_11916 === 21))
{var state_11915__$1 = state_11915;var statearr_11946_11981 = state_11915__$1;(statearr_11946_11981[2] = null);
(statearr_11946_11981[1] = 22);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11916 === 22))
{var inst_11872 = (state_11915[12]);var inst_11908 = (state_11915[2]);var inst_11864 = inst_11872;var state_11915__$1 = (function (){var statearr_11947 = state_11915;(statearr_11947[19] = inst_11908);
(statearr_11947[11] = inst_11864);
return statearr_11947;
})();var statearr_11948_11982 = state_11915__$1;(statearr_11948_11982[2] = null);
(statearr_11948_11982[1] = 5);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11916 === 23))
{var inst_11905 = (state_11915[2]);var state_11915__$1 = state_11915;var statearr_11949_11983 = state_11915__$1;(statearr_11949_11983[2] = inst_11905);
(statearr_11949_11983[1] = 22);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});return ((function (switch__6177__auto__){
return (function() {
var state_machine__6178__auto__ = null;
var state_machine__6178__auto____0 = (function (){var statearr_11953 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];(statearr_11953[0] = state_machine__6178__auto__);
(statearr_11953[1] = 1);
return statearr_11953;
});
var state_machine__6178__auto____1 = (function (state_11915){while(true){
var ret_value__6179__auto__ = (function (){try{while(true){
var result__6180__auto__ = switch__6177__auto__.call(null,state_11915);if(cljs.core.keyword_identical_QMARK_.call(null,result__6180__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__6180__auto__;
}
break;
}
}catch (e11954){if((e11954 instanceof Object))
{var ex__6181__auto__ = e11954;var statearr_11955_11984 = state_11915;(statearr_11955_11984[5] = ex__6181__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_11915);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e11954;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6179__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__11985 = state_11915;
state_11915 = G__11985;
continue;
}
} else
{return ret_value__6179__auto__;
}
break;
}
});
state_machine__6178__auto__ = function(state_11915){
switch(arguments.length){
case 0:
return state_machine__6178__auto____0.call(this);
case 1:
return state_machine__6178__auto____1.call(this,state_11915);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__6178__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__6178__auto____0;
state_machine__6178__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__6178__auto____1;
return state_machine__6178__auto__;
})()
;})(switch__6177__auto__))
})();var state__6194__auto__ = (function (){var statearr_11956 = f__6193__auto__.call(null);(statearr_11956[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6192__auto___11957);
return statearr_11956;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6194__auto__);
}));
return m;
});
/**
* Adds ch as an input to the mix
*/
cljs.core.async.admix = (function admix(mix,ch){return cljs.core.async.admix_STAR_.call(null,mix,ch);
});
/**
* Removes ch as an input to the mix
*/
cljs.core.async.unmix = (function unmix(mix,ch){return cljs.core.async.unmix_STAR_.call(null,mix,ch);
});
/**
* removes all inputs from the mix
*/
cljs.core.async.unmix_all = (function unmix_all(mix){return cljs.core.async.unmix_all_STAR_.call(null,mix);
});
/**
* Atomically sets the state(s) of one or more channels in a mix. The
* state map is a map of channels -> channel-state-map. A
* channel-state-map is a map of attrs -> boolean, where attr is one or
* more of :mute, :pause or :solo. Any states supplied are merged with
* the current state.
* 
* Note that channels can be added to a mix via toggle, which can be
* used to add channels in a particular (e.g. paused) state.
*/
cljs.core.async.toggle = (function toggle(mix,state_map){return cljs.core.async.toggle_STAR_.call(null,mix,state_map);
});
/**
* Sets the solo mode of the mix. mode must be one of :mute or :pause
*/
cljs.core.async.solo_mode = (function solo_mode(mix,mode){return cljs.core.async.solo_mode_STAR_.call(null,mix,mode);
});
cljs.core.async.Pub = (function (){var obj11987 = {};return obj11987;
})();
cljs.core.async.sub_STAR_ = (function sub_STAR_(p,v,ch,close_QMARK_){if((function (){var and__3431__auto__ = p;if(and__3431__auto__)
{return p.cljs$core$async$Pub$sub_STAR_$arity$4;
} else
{return and__3431__auto__;
}
})())
{return p.cljs$core$async$Pub$sub_STAR_$arity$4(p,v,ch,close_QMARK_);
} else
{var x__4070__auto__ = (((p == null))?null:p);return (function (){var or__3443__auto__ = (cljs.core.async.sub_STAR_[goog.typeOf(x__4070__auto__)]);if(or__3443__auto__)
{return or__3443__auto__;
} else
{var or__3443__auto____$1 = (cljs.core.async.sub_STAR_["_"]);if(or__3443__auto____$1)
{return or__3443__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Pub.sub*",p);
}
}
})().call(null,p,v,ch,close_QMARK_);
}
});
cljs.core.async.unsub_STAR_ = (function unsub_STAR_(p,v,ch){if((function (){var and__3431__auto__ = p;if(and__3431__auto__)
{return p.cljs$core$async$Pub$unsub_STAR_$arity$3;
} else
{return and__3431__auto__;
}
})())
{return p.cljs$core$async$Pub$unsub_STAR_$arity$3(p,v,ch);
} else
{var x__4070__auto__ = (((p == null))?null:p);return (function (){var or__3443__auto__ = (cljs.core.async.unsub_STAR_[goog.typeOf(x__4070__auto__)]);if(or__3443__auto__)
{return or__3443__auto__;
} else
{var or__3443__auto____$1 = (cljs.core.async.unsub_STAR_["_"]);if(or__3443__auto____$1)
{return or__3443__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Pub.unsub*",p);
}
}
})().call(null,p,v,ch);
}
});
cljs.core.async.unsub_all_STAR_ = (function() {
var unsub_all_STAR_ = null;
var unsub_all_STAR___1 = (function (p){if((function (){var and__3431__auto__ = p;if(and__3431__auto__)
{return p.cljs$core$async$Pub$unsub_all_STAR_$arity$1;
} else
{return and__3431__auto__;
}
})())
{return p.cljs$core$async$Pub$unsub_all_STAR_$arity$1(p);
} else
{var x__4070__auto__ = (((p == null))?null:p);return (function (){var or__3443__auto__ = (cljs.core.async.unsub_all_STAR_[goog.typeOf(x__4070__auto__)]);if(or__3443__auto__)
{return or__3443__auto__;
} else
{var or__3443__auto____$1 = (cljs.core.async.unsub_all_STAR_["_"]);if(or__3443__auto____$1)
{return or__3443__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Pub.unsub-all*",p);
}
}
})().call(null,p);
}
});
var unsub_all_STAR___2 = (function (p,v){if((function (){var and__3431__auto__ = p;if(and__3431__auto__)
{return p.cljs$core$async$Pub$unsub_all_STAR_$arity$2;
} else
{return and__3431__auto__;
}
})())
{return p.cljs$core$async$Pub$unsub_all_STAR_$arity$2(p,v);
} else
{var x__4070__auto__ = (((p == null))?null:p);return (function (){var or__3443__auto__ = (cljs.core.async.unsub_all_STAR_[goog.typeOf(x__4070__auto__)]);if(or__3443__auto__)
{return or__3443__auto__;
} else
{var or__3443__auto____$1 = (cljs.core.async.unsub_all_STAR_["_"]);if(or__3443__auto____$1)
{return or__3443__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Pub.unsub-all*",p);
}
}
})().call(null,p,v);
}
});
unsub_all_STAR_ = function(p,v){
switch(arguments.length){
case 1:
return unsub_all_STAR___1.call(this,p);
case 2:
return unsub_all_STAR___2.call(this,p,v);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
unsub_all_STAR_.cljs$core$IFn$_invoke$arity$1 = unsub_all_STAR___1;
unsub_all_STAR_.cljs$core$IFn$_invoke$arity$2 = unsub_all_STAR___2;
return unsub_all_STAR_;
})()
;
/**
* Creates and returns a pub(lication) of the supplied channel,
* partitioned into topics by the topic-fn. topic-fn will be applied to
* each value on the channel and the result will determine the 'topic'
* on which that value will be put. Channels can be subscribed to
* receive copies of topics using 'sub', and unsubscribed using
* 'unsub'. Each topic will be handled by an internal mult on a
* dedicated channel. By default these internal channels are
* unbuffered, but a buf-fn can be supplied which, given a topic,
* creates a buffer with desired properties.
* 
* Each item is distributed to all subs in parallel and synchronously,
* i.e. each sub must accept before the next item is distributed. Use
* buffering/windowing to prevent slow subs from holding up the pub.
* 
* Items received when there are no matching subs get dropped.
* 
* Note that if buf-fns are used then each topic is handled
* asynchronously, i.e. if a channel is subscribed to more than one
* topic it should not expect them to be interleaved identically with
* the source.
*/
cljs.core.async.pub = (function() {
var pub = null;
var pub__2 = (function (ch,topic_fn){return pub.call(null,ch,topic_fn,cljs.core.constantly.call(null,null));
});
var pub__3 = (function (ch,topic_fn,buf_fn){var mults = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var ensure_mult = ((function (mults){
return (function (topic){var or__3443__auto__ = cljs.core.get.call(null,cljs.core.deref.call(null,mults),topic);if(cljs.core.truth_(or__3443__auto__))
{return or__3443__auto__;
} else
{return cljs.core.get.call(null,cljs.core.swap_BANG_.call(null,mults,((function (or__3443__auto__,mults){
return (function (p1__11988_SHARP_){if(cljs.core.truth_(p1__11988_SHARP_.call(null,topic)))
{return p1__11988_SHARP_;
} else
{return cljs.core.assoc.call(null,p1__11988_SHARP_,topic,cljs.core.async.mult.call(null,cljs.core.async.chan.call(null,buf_fn.call(null,topic))));
}
});})(or__3443__auto__,mults))
),topic);
}
});})(mults))
;var p = (function (){if(typeof cljs.core.async.t12113 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t12113 = (function (ensure_mult,mults,buf_fn,topic_fn,ch,pub,meta12114){
this.ensure_mult = ensure_mult;
this.mults = mults;
this.buf_fn = buf_fn;
this.topic_fn = topic_fn;
this.ch = ch;
this.pub = pub;
this.meta12114 = meta12114;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t12113.cljs$lang$type = true;
cljs.core.async.t12113.cljs$lang$ctorStr = "cljs.core.async/t12113";
cljs.core.async.t12113.cljs$lang$ctorPrWriter = ((function (mults,ensure_mult){
return (function (this__4010__auto__,writer__4011__auto__,opt__4012__auto__){return cljs.core._write.call(null,writer__4011__auto__,"cljs.core.async/t12113");
});})(mults,ensure_mult))
;
cljs.core.async.t12113.prototype.cljs$core$async$Pub$ = true;
cljs.core.async.t12113.prototype.cljs$core$async$Pub$sub_STAR_$arity$4 = ((function (mults,ensure_mult){
return (function (p,topic,ch__$2,close_QMARK_){var self__ = this;
var p__$1 = this;var m = self__.ensure_mult.call(null,topic);return cljs.core.async.tap.call(null,m,ch__$2,close_QMARK_);
});})(mults,ensure_mult))
;
cljs.core.async.t12113.prototype.cljs$core$async$Pub$unsub_STAR_$arity$3 = ((function (mults,ensure_mult){
return (function (p,topic,ch__$2){var self__ = this;
var p__$1 = this;var temp__4092__auto__ = cljs.core.get.call(null,cljs.core.deref.call(null,self__.mults),topic);if(cljs.core.truth_(temp__4092__auto__))
{var m = temp__4092__auto__;return cljs.core.async.untap.call(null,m,ch__$2);
} else
{return null;
}
});})(mults,ensure_mult))
;
cljs.core.async.t12113.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$1 = ((function (mults,ensure_mult){
return (function (_){var self__ = this;
var ___$1 = this;return cljs.core.reset_BANG_.call(null,self__.mults,cljs.core.PersistentArrayMap.EMPTY);
});})(mults,ensure_mult))
;
cljs.core.async.t12113.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$2 = ((function (mults,ensure_mult){
return (function (_,topic){var self__ = this;
var ___$1 = this;return cljs.core.swap_BANG_.call(null,self__.mults,cljs.core.dissoc,topic);
});})(mults,ensure_mult))
;
cljs.core.async.t12113.prototype.cljs$core$async$Mux$ = true;
cljs.core.async.t12113.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (mults,ensure_mult){
return (function (_){var self__ = this;
var ___$1 = this;return self__.ch;
});})(mults,ensure_mult))
;
cljs.core.async.t12113.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (mults,ensure_mult){
return (function (_12115){var self__ = this;
var _12115__$1 = this;return self__.meta12114;
});})(mults,ensure_mult))
;
cljs.core.async.t12113.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (mults,ensure_mult){
return (function (_12115,meta12114__$1){var self__ = this;
var _12115__$1 = this;return (new cljs.core.async.t12113(self__.ensure_mult,self__.mults,self__.buf_fn,self__.topic_fn,self__.ch,self__.pub,meta12114__$1));
});})(mults,ensure_mult))
;
cljs.core.async.__GT_t12113 = ((function (mults,ensure_mult){
return (function __GT_t12113(ensure_mult__$1,mults__$1,buf_fn__$1,topic_fn__$1,ch__$1,pub__$1,meta12114){return (new cljs.core.async.t12113(ensure_mult__$1,mults__$1,buf_fn__$1,topic_fn__$1,ch__$1,pub__$1,meta12114));
});})(mults,ensure_mult))
;
}
return (new cljs.core.async.t12113(ensure_mult,mults,buf_fn,topic_fn,ch,pub,null));
})();var c__6192__auto___12237 = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__6193__auto__ = (function (){var switch__6177__auto__ = (function (state_12189){var state_val_12190 = (state_12189[1]);if((state_val_12190 === 1))
{var state_12189__$1 = state_12189;var statearr_12191_12238 = state_12189__$1;(statearr_12191_12238[2] = null);
(statearr_12191_12238[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12190 === 2))
{var state_12189__$1 = state_12189;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_12189__$1,4,ch);
} else
{if((state_val_12190 === 3))
{var inst_12187 = (state_12189[2]);var state_12189__$1 = state_12189;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_12189__$1,inst_12187);
} else
{if((state_val_12190 === 4))
{var inst_12118 = (state_12189[7]);var inst_12118__$1 = (state_12189[2]);var inst_12119 = (inst_12118__$1 == null);var state_12189__$1 = (function (){var statearr_12192 = state_12189;(statearr_12192[7] = inst_12118__$1);
return statearr_12192;
})();if(cljs.core.truth_(inst_12119))
{var statearr_12193_12239 = state_12189__$1;(statearr_12193_12239[1] = 5);
} else
{var statearr_12194_12240 = state_12189__$1;(statearr_12194_12240[1] = 6);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12190 === 5))
{var inst_12125 = cljs.core.deref.call(null,mults);var inst_12126 = cljs.core.vals.call(null,inst_12125);var inst_12127 = cljs.core.seq.call(null,inst_12126);var inst_12128 = inst_12127;var inst_12129 = null;var inst_12130 = 0;var inst_12131 = 0;var state_12189__$1 = (function (){var statearr_12195 = state_12189;(statearr_12195[8] = inst_12128);
(statearr_12195[9] = inst_12129);
(statearr_12195[10] = inst_12130);
(statearr_12195[11] = inst_12131);
return statearr_12195;
})();var statearr_12196_12241 = state_12189__$1;(statearr_12196_12241[2] = null);
(statearr_12196_12241[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12190 === 6))
{var inst_12166 = (state_12189[12]);var inst_12168 = (state_12189[13]);var inst_12118 = (state_12189[7]);var inst_12166__$1 = topic_fn.call(null,inst_12118);var inst_12167 = cljs.core.deref.call(null,mults);var inst_12168__$1 = cljs.core.get.call(null,inst_12167,inst_12166__$1);var state_12189__$1 = (function (){var statearr_12197 = state_12189;(statearr_12197[12] = inst_12166__$1);
(statearr_12197[13] = inst_12168__$1);
return statearr_12197;
})();if(cljs.core.truth_(inst_12168__$1))
{var statearr_12198_12242 = state_12189__$1;(statearr_12198_12242[1] = 19);
} else
{var statearr_12199_12243 = state_12189__$1;(statearr_12199_12243[1] = 20);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12190 === 7))
{var inst_12185 = (state_12189[2]);var state_12189__$1 = state_12189;var statearr_12200_12244 = state_12189__$1;(statearr_12200_12244[2] = inst_12185);
(statearr_12200_12244[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12190 === 8))
{var inst_12130 = (state_12189[10]);var inst_12131 = (state_12189[11]);var inst_12133 = (inst_12131 < inst_12130);var inst_12134 = inst_12133;var state_12189__$1 = state_12189;if(cljs.core.truth_(inst_12134))
{var statearr_12204_12245 = state_12189__$1;(statearr_12204_12245[1] = 10);
} else
{var statearr_12205_12246 = state_12189__$1;(statearr_12205_12246[1] = 11);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12190 === 9))
{var inst_12164 = (state_12189[2]);var state_12189__$1 = state_12189;var statearr_12206_12247 = state_12189__$1;(statearr_12206_12247[2] = inst_12164);
(statearr_12206_12247[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12190 === 10))
{var inst_12128 = (state_12189[8]);var inst_12129 = (state_12189[9]);var inst_12130 = (state_12189[10]);var inst_12131 = (state_12189[11]);var inst_12136 = cljs.core._nth.call(null,inst_12129,inst_12131);var inst_12137 = cljs.core.async.muxch_STAR_.call(null,inst_12136);var inst_12138 = cljs.core.async.close_BANG_.call(null,inst_12137);var inst_12139 = (inst_12131 + 1);var tmp12201 = inst_12128;var tmp12202 = inst_12129;var tmp12203 = inst_12130;var inst_12128__$1 = tmp12201;var inst_12129__$1 = tmp12202;var inst_12130__$1 = tmp12203;var inst_12131__$1 = inst_12139;var state_12189__$1 = (function (){var statearr_12207 = state_12189;(statearr_12207[14] = inst_12138);
(statearr_12207[8] = inst_12128__$1);
(statearr_12207[9] = inst_12129__$1);
(statearr_12207[10] = inst_12130__$1);
(statearr_12207[11] = inst_12131__$1);
return statearr_12207;
})();var statearr_12208_12248 = state_12189__$1;(statearr_12208_12248[2] = null);
(statearr_12208_12248[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12190 === 11))
{var inst_12142 = (state_12189[15]);var inst_12128 = (state_12189[8]);var inst_12142__$1 = cljs.core.seq.call(null,inst_12128);var state_12189__$1 = (function (){var statearr_12209 = state_12189;(statearr_12209[15] = inst_12142__$1);
return statearr_12209;
})();if(inst_12142__$1)
{var statearr_12210_12249 = state_12189__$1;(statearr_12210_12249[1] = 13);
} else
{var statearr_12211_12250 = state_12189__$1;(statearr_12211_12250[1] = 14);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12190 === 12))
{var inst_12162 = (state_12189[2]);var state_12189__$1 = state_12189;var statearr_12212_12251 = state_12189__$1;(statearr_12212_12251[2] = inst_12162);
(statearr_12212_12251[1] = 9);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12190 === 13))
{var inst_12142 = (state_12189[15]);var inst_12144 = cljs.core.chunked_seq_QMARK_.call(null,inst_12142);var state_12189__$1 = state_12189;if(inst_12144)
{var statearr_12213_12252 = state_12189__$1;(statearr_12213_12252[1] = 16);
} else
{var statearr_12214_12253 = state_12189__$1;(statearr_12214_12253[1] = 17);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12190 === 14))
{var state_12189__$1 = state_12189;var statearr_12215_12254 = state_12189__$1;(statearr_12215_12254[2] = null);
(statearr_12215_12254[1] = 15);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12190 === 15))
{var inst_12160 = (state_12189[2]);var state_12189__$1 = state_12189;var statearr_12216_12255 = state_12189__$1;(statearr_12216_12255[2] = inst_12160);
(statearr_12216_12255[1] = 12);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12190 === 16))
{var inst_12142 = (state_12189[15]);var inst_12146 = cljs.core.chunk_first.call(null,inst_12142);var inst_12147 = cljs.core.chunk_rest.call(null,inst_12142);var inst_12148 = cljs.core.count.call(null,inst_12146);var inst_12128 = inst_12147;var inst_12129 = inst_12146;var inst_12130 = inst_12148;var inst_12131 = 0;var state_12189__$1 = (function (){var statearr_12217 = state_12189;(statearr_12217[8] = inst_12128);
(statearr_12217[9] = inst_12129);
(statearr_12217[10] = inst_12130);
(statearr_12217[11] = inst_12131);
return statearr_12217;
})();var statearr_12218_12256 = state_12189__$1;(statearr_12218_12256[2] = null);
(statearr_12218_12256[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12190 === 17))
{var inst_12142 = (state_12189[15]);var inst_12151 = cljs.core.first.call(null,inst_12142);var inst_12152 = cljs.core.async.muxch_STAR_.call(null,inst_12151);var inst_12153 = cljs.core.async.close_BANG_.call(null,inst_12152);var inst_12154 = cljs.core.next.call(null,inst_12142);var inst_12128 = inst_12154;var inst_12129 = null;var inst_12130 = 0;var inst_12131 = 0;var state_12189__$1 = (function (){var statearr_12219 = state_12189;(statearr_12219[16] = inst_12153);
(statearr_12219[8] = inst_12128);
(statearr_12219[9] = inst_12129);
(statearr_12219[10] = inst_12130);
(statearr_12219[11] = inst_12131);
return statearr_12219;
})();var statearr_12220_12257 = state_12189__$1;(statearr_12220_12257[2] = null);
(statearr_12220_12257[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12190 === 18))
{var inst_12157 = (state_12189[2]);var state_12189__$1 = state_12189;var statearr_12221_12258 = state_12189__$1;(statearr_12221_12258[2] = inst_12157);
(statearr_12221_12258[1] = 15);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12190 === 19))
{var state_12189__$1 = state_12189;var statearr_12222_12259 = state_12189__$1;(statearr_12222_12259[2] = null);
(statearr_12222_12259[1] = 24);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12190 === 20))
{var state_12189__$1 = state_12189;var statearr_12223_12260 = state_12189__$1;(statearr_12223_12260[2] = null);
(statearr_12223_12260[1] = 21);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12190 === 21))
{var inst_12182 = (state_12189[2]);var state_12189__$1 = (function (){var statearr_12224 = state_12189;(statearr_12224[17] = inst_12182);
return statearr_12224;
})();var statearr_12225_12261 = state_12189__$1;(statearr_12225_12261[2] = null);
(statearr_12225_12261[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12190 === 22))
{var inst_12179 = (state_12189[2]);var state_12189__$1 = state_12189;var statearr_12226_12262 = state_12189__$1;(statearr_12226_12262[2] = inst_12179);
(statearr_12226_12262[1] = 21);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12190 === 23))
{var inst_12166 = (state_12189[12]);var inst_12170 = (state_12189[2]);var inst_12171 = cljs.core.swap_BANG_.call(null,mults,cljs.core.dissoc,inst_12166);var state_12189__$1 = (function (){var statearr_12227 = state_12189;(statearr_12227[18] = inst_12170);
return statearr_12227;
})();var statearr_12228_12263 = state_12189__$1;(statearr_12228_12263[2] = inst_12171);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_12189__$1);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12190 === 24))
{var inst_12168 = (state_12189[13]);var inst_12118 = (state_12189[7]);var _ = cljs.core.async.impl.ioc_helpers.add_exception_frame.call(null,state_12189,23,Object,null,22);var inst_12175 = cljs.core.async.muxch_STAR_.call(null,inst_12168);var state_12189__$1 = state_12189;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_12189__$1,25,inst_12175,inst_12118);
} else
{if((state_val_12190 === 25))
{var inst_12177 = (state_12189[2]);var state_12189__$1 = state_12189;var statearr_12229_12264 = state_12189__$1;(statearr_12229_12264[2] = inst_12177);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_12189__$1);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});return ((function (switch__6177__auto__){
return (function() {
var state_machine__6178__auto__ = null;
var state_machine__6178__auto____0 = (function (){var statearr_12233 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];(statearr_12233[0] = state_machine__6178__auto__);
(statearr_12233[1] = 1);
return statearr_12233;
});
var state_machine__6178__auto____1 = (function (state_12189){while(true){
var ret_value__6179__auto__ = (function (){try{while(true){
var result__6180__auto__ = switch__6177__auto__.call(null,state_12189);if(cljs.core.keyword_identical_QMARK_.call(null,result__6180__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__6180__auto__;
}
break;
}
}catch (e12234){if((e12234 instanceof Object))
{var ex__6181__auto__ = e12234;var statearr_12235_12265 = state_12189;(statearr_12235_12265[5] = ex__6181__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_12189);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e12234;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6179__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__12266 = state_12189;
state_12189 = G__12266;
continue;
}
} else
{return ret_value__6179__auto__;
}
break;
}
});
state_machine__6178__auto__ = function(state_12189){
switch(arguments.length){
case 0:
return state_machine__6178__auto____0.call(this);
case 1:
return state_machine__6178__auto____1.call(this,state_12189);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__6178__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__6178__auto____0;
state_machine__6178__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__6178__auto____1;
return state_machine__6178__auto__;
})()
;})(switch__6177__auto__))
})();var state__6194__auto__ = (function (){var statearr_12236 = f__6193__auto__.call(null);(statearr_12236[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6192__auto___12237);
return statearr_12236;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6194__auto__);
}));
return p;
});
pub = function(ch,topic_fn,buf_fn){
switch(arguments.length){
case 2:
return pub__2.call(this,ch,topic_fn);
case 3:
return pub__3.call(this,ch,topic_fn,buf_fn);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
pub.cljs$core$IFn$_invoke$arity$2 = pub__2;
pub.cljs$core$IFn$_invoke$arity$3 = pub__3;
return pub;
})()
;
/**
* Subscribes a channel to a topic of a pub.
* 
* By default the channel will be closed when the source closes,
* but can be determined by the close? parameter.
*/
cljs.core.async.sub = (function() {
var sub = null;
var sub__3 = (function (p,topic,ch){return sub.call(null,p,topic,ch,true);
});
var sub__4 = (function (p,topic,ch,close_QMARK_){return cljs.core.async.sub_STAR_.call(null,p,topic,ch,close_QMARK_);
});
sub = function(p,topic,ch,close_QMARK_){
switch(arguments.length){
case 3:
return sub__3.call(this,p,topic,ch);
case 4:
return sub__4.call(this,p,topic,ch,close_QMARK_);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
sub.cljs$core$IFn$_invoke$arity$3 = sub__3;
sub.cljs$core$IFn$_invoke$arity$4 = sub__4;
return sub;
})()
;
/**
* Unsubscribes a channel from a topic of a pub
*/
cljs.core.async.unsub = (function unsub(p,topic,ch){return cljs.core.async.unsub_STAR_.call(null,p,topic,ch);
});
/**
* Unsubscribes all channels from a pub, or a topic of a pub
*/
cljs.core.async.unsub_all = (function() {
var unsub_all = null;
var unsub_all__1 = (function (p){return cljs.core.async.unsub_all_STAR_.call(null,p);
});
var unsub_all__2 = (function (p,topic){return cljs.core.async.unsub_all_STAR_.call(null,p,topic);
});
unsub_all = function(p,topic){
switch(arguments.length){
case 1:
return unsub_all__1.call(this,p);
case 2:
return unsub_all__2.call(this,p,topic);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
unsub_all.cljs$core$IFn$_invoke$arity$1 = unsub_all__1;
unsub_all.cljs$core$IFn$_invoke$arity$2 = unsub_all__2;
return unsub_all;
})()
;
/**
* Takes a function and a collection of source channels, and returns a
* channel which contains the values produced by applying f to the set
* of first items taken from each source channel, followed by applying
* f to the set of second items from each channel, until any one of the
* channels is closed, at which point the output channel will be
* closed. The returned channel will be unbuffered by default, or a
* buf-or-n can be supplied
*/
cljs.core.async.map = (function() {
var map = null;
var map__2 = (function (f,chs){return map.call(null,f,chs,null);
});
var map__3 = (function (f,chs,buf_or_n){var chs__$1 = cljs.core.vec.call(null,chs);var out = cljs.core.async.chan.call(null,buf_or_n);var cnt = cljs.core.count.call(null,chs__$1);var rets = cljs.core.object_array.call(null,cnt);var dchan = cljs.core.async.chan.call(null,1);var dctr = cljs.core.atom.call(null,null);var done = cljs.core.mapv.call(null,((function (chs__$1,out,cnt,rets,dchan,dctr){
return (function (i){return ((function (chs__$1,out,cnt,rets,dchan,dctr){
return (function (ret){(rets[i] = ret);
if((cljs.core.swap_BANG_.call(null,dctr,cljs.core.dec) === 0))
{return cljs.core.async.put_BANG_.call(null,dchan,rets.slice(0));
} else
{return null;
}
});
;})(chs__$1,out,cnt,rets,dchan,dctr))
});})(chs__$1,out,cnt,rets,dchan,dctr))
,cljs.core.range.call(null,cnt));var c__6192__auto___12403 = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__6193__auto__ = (function (){var switch__6177__auto__ = (function (state_12373){var state_val_12374 = (state_12373[1]);if((state_val_12374 === 1))
{var state_12373__$1 = state_12373;var statearr_12375_12404 = state_12373__$1;(statearr_12375_12404[2] = null);
(statearr_12375_12404[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12374 === 2))
{var inst_12336 = cljs.core.reset_BANG_.call(null,dctr,cnt);var inst_12337 = 0;var state_12373__$1 = (function (){var statearr_12376 = state_12373;(statearr_12376[7] = inst_12336);
(statearr_12376[8] = inst_12337);
return statearr_12376;
})();var statearr_12377_12405 = state_12373__$1;(statearr_12377_12405[2] = null);
(statearr_12377_12405[1] = 4);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12374 === 3))
{var inst_12371 = (state_12373[2]);var state_12373__$1 = state_12373;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_12373__$1,inst_12371);
} else
{if((state_val_12374 === 4))
{var inst_12337 = (state_12373[8]);var inst_12339 = (inst_12337 < cnt);var state_12373__$1 = state_12373;if(cljs.core.truth_(inst_12339))
{var statearr_12378_12406 = state_12373__$1;(statearr_12378_12406[1] = 6);
} else
{var statearr_12379_12407 = state_12373__$1;(statearr_12379_12407[1] = 7);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12374 === 5))
{var inst_12357 = (state_12373[2]);var state_12373__$1 = (function (){var statearr_12380 = state_12373;(statearr_12380[9] = inst_12357);
return statearr_12380;
})();return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_12373__$1,12,dchan);
} else
{if((state_val_12374 === 6))
{var state_12373__$1 = state_12373;var statearr_12381_12408 = state_12373__$1;(statearr_12381_12408[2] = null);
(statearr_12381_12408[1] = 11);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12374 === 7))
{var state_12373__$1 = state_12373;var statearr_12382_12409 = state_12373__$1;(statearr_12382_12409[2] = null);
(statearr_12382_12409[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12374 === 8))
{var inst_12355 = (state_12373[2]);var state_12373__$1 = state_12373;var statearr_12383_12410 = state_12373__$1;(statearr_12383_12410[2] = inst_12355);
(statearr_12383_12410[1] = 5);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12374 === 9))
{var inst_12337 = (state_12373[8]);var inst_12350 = (state_12373[2]);var inst_12351 = (inst_12337 + 1);var inst_12337__$1 = inst_12351;var state_12373__$1 = (function (){var statearr_12384 = state_12373;(statearr_12384[10] = inst_12350);
(statearr_12384[8] = inst_12337__$1);
return statearr_12384;
})();var statearr_12385_12411 = state_12373__$1;(statearr_12385_12411[2] = null);
(statearr_12385_12411[1] = 4);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12374 === 10))
{var inst_12341 = (state_12373[2]);var inst_12342 = cljs.core.swap_BANG_.call(null,dctr,cljs.core.dec);var state_12373__$1 = (function (){var statearr_12386 = state_12373;(statearr_12386[11] = inst_12341);
return statearr_12386;
})();var statearr_12387_12412 = state_12373__$1;(statearr_12387_12412[2] = inst_12342);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_12373__$1);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12374 === 11))
{var inst_12337 = (state_12373[8]);var _ = cljs.core.async.impl.ioc_helpers.add_exception_frame.call(null,state_12373,10,Object,null,9);var inst_12346 = chs__$1.call(null,inst_12337);var inst_12347 = done.call(null,inst_12337);var inst_12348 = cljs.core.async.take_BANG_.call(null,inst_12346,inst_12347);var state_12373__$1 = state_12373;var statearr_12388_12413 = state_12373__$1;(statearr_12388_12413[2] = inst_12348);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_12373__$1);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12374 === 12))
{var inst_12359 = (state_12373[12]);var inst_12359__$1 = (state_12373[2]);var inst_12360 = cljs.core.some.call(null,cljs.core.nil_QMARK_,inst_12359__$1);var state_12373__$1 = (function (){var statearr_12389 = state_12373;(statearr_12389[12] = inst_12359__$1);
return statearr_12389;
})();if(cljs.core.truth_(inst_12360))
{var statearr_12390_12414 = state_12373__$1;(statearr_12390_12414[1] = 13);
} else
{var statearr_12391_12415 = state_12373__$1;(statearr_12391_12415[1] = 14);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12374 === 13))
{var inst_12362 = cljs.core.async.close_BANG_.call(null,out);var state_12373__$1 = state_12373;var statearr_12392_12416 = state_12373__$1;(statearr_12392_12416[2] = inst_12362);
(statearr_12392_12416[1] = 15);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12374 === 14))
{var inst_12359 = (state_12373[12]);var inst_12364 = cljs.core.apply.call(null,f,inst_12359);var state_12373__$1 = state_12373;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_12373__$1,16,out,inst_12364);
} else
{if((state_val_12374 === 15))
{var inst_12369 = (state_12373[2]);var state_12373__$1 = state_12373;var statearr_12393_12417 = state_12373__$1;(statearr_12393_12417[2] = inst_12369);
(statearr_12393_12417[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12374 === 16))
{var inst_12366 = (state_12373[2]);var state_12373__$1 = (function (){var statearr_12394 = state_12373;(statearr_12394[13] = inst_12366);
return statearr_12394;
})();var statearr_12395_12418 = state_12373__$1;(statearr_12395_12418[2] = null);
(statearr_12395_12418[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});return ((function (switch__6177__auto__){
return (function() {
var state_machine__6178__auto__ = null;
var state_machine__6178__auto____0 = (function (){var statearr_12399 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];(statearr_12399[0] = state_machine__6178__auto__);
(statearr_12399[1] = 1);
return statearr_12399;
});
var state_machine__6178__auto____1 = (function (state_12373){while(true){
var ret_value__6179__auto__ = (function (){try{while(true){
var result__6180__auto__ = switch__6177__auto__.call(null,state_12373);if(cljs.core.keyword_identical_QMARK_.call(null,result__6180__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__6180__auto__;
}
break;
}
}catch (e12400){if((e12400 instanceof Object))
{var ex__6181__auto__ = e12400;var statearr_12401_12419 = state_12373;(statearr_12401_12419[5] = ex__6181__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_12373);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e12400;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6179__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__12420 = state_12373;
state_12373 = G__12420;
continue;
}
} else
{return ret_value__6179__auto__;
}
break;
}
});
state_machine__6178__auto__ = function(state_12373){
switch(arguments.length){
case 0:
return state_machine__6178__auto____0.call(this);
case 1:
return state_machine__6178__auto____1.call(this,state_12373);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__6178__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__6178__auto____0;
state_machine__6178__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__6178__auto____1;
return state_machine__6178__auto__;
})()
;})(switch__6177__auto__))
})();var state__6194__auto__ = (function (){var statearr_12402 = f__6193__auto__.call(null);(statearr_12402[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6192__auto___12403);
return statearr_12402;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6194__auto__);
}));
return out;
});
map = function(f,chs,buf_or_n){
switch(arguments.length){
case 2:
return map__2.call(this,f,chs);
case 3:
return map__3.call(this,f,chs,buf_or_n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
map.cljs$core$IFn$_invoke$arity$2 = map__2;
map.cljs$core$IFn$_invoke$arity$3 = map__3;
return map;
})()
;
/**
* Takes a collection of source channels and returns a channel which
* contains all values taken from them. The returned channel will be
* unbuffered by default, or a buf-or-n can be supplied. The channel
* will close after all the source channels have closed.
*/
cljs.core.async.merge = (function() {
var merge = null;
var merge__1 = (function (chs){return merge.call(null,chs,null);
});
var merge__2 = (function (chs,buf_or_n){var out = cljs.core.async.chan.call(null,buf_or_n);var c__6192__auto___12528 = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__6193__auto__ = (function (){var switch__6177__auto__ = (function (state_12504){var state_val_12505 = (state_12504[1]);if((state_val_12505 === 1))
{var inst_12475 = cljs.core.vec.call(null,chs);var inst_12476 = inst_12475;var state_12504__$1 = (function (){var statearr_12506 = state_12504;(statearr_12506[7] = inst_12476);
return statearr_12506;
})();var statearr_12507_12529 = state_12504__$1;(statearr_12507_12529[2] = null);
(statearr_12507_12529[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12505 === 2))
{var inst_12476 = (state_12504[7]);var inst_12478 = cljs.core.count.call(null,inst_12476);var inst_12479 = (inst_12478 > 0);var state_12504__$1 = state_12504;if(cljs.core.truth_(inst_12479))
{var statearr_12508_12530 = state_12504__$1;(statearr_12508_12530[1] = 4);
} else
{var statearr_12509_12531 = state_12504__$1;(statearr_12509_12531[1] = 5);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12505 === 3))
{var inst_12502 = (state_12504[2]);var state_12504__$1 = state_12504;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_12504__$1,inst_12502);
} else
{if((state_val_12505 === 4))
{var inst_12476 = (state_12504[7]);var state_12504__$1 = state_12504;return cljs.core.async.impl.ioc_helpers.ioc_alts_BANG_.call(null,state_12504__$1,7,inst_12476);
} else
{if((state_val_12505 === 5))
{var inst_12498 = cljs.core.async.close_BANG_.call(null,out);var state_12504__$1 = state_12504;var statearr_12510_12532 = state_12504__$1;(statearr_12510_12532[2] = inst_12498);
(statearr_12510_12532[1] = 6);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12505 === 6))
{var inst_12500 = (state_12504[2]);var state_12504__$1 = state_12504;var statearr_12511_12533 = state_12504__$1;(statearr_12511_12533[2] = inst_12500);
(statearr_12511_12533[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12505 === 7))
{var inst_12484 = (state_12504[8]);var inst_12483 = (state_12504[9]);var inst_12483__$1 = (state_12504[2]);var inst_12484__$1 = cljs.core.nth.call(null,inst_12483__$1,0,null);var inst_12485 = cljs.core.nth.call(null,inst_12483__$1,1,null);var inst_12486 = (inst_12484__$1 == null);var state_12504__$1 = (function (){var statearr_12512 = state_12504;(statearr_12512[8] = inst_12484__$1);
(statearr_12512[10] = inst_12485);
(statearr_12512[9] = inst_12483__$1);
return statearr_12512;
})();if(cljs.core.truth_(inst_12486))
{var statearr_12513_12534 = state_12504__$1;(statearr_12513_12534[1] = 8);
} else
{var statearr_12514_12535 = state_12504__$1;(statearr_12514_12535[1] = 9);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12505 === 8))
{var inst_12476 = (state_12504[7]);var inst_12484 = (state_12504[8]);var inst_12485 = (state_12504[10]);var inst_12483 = (state_12504[9]);var inst_12488 = (function (){var c = inst_12485;var v = inst_12484;var vec__12481 = inst_12483;var cs = inst_12476;return ((function (c,v,vec__12481,cs,inst_12476,inst_12484,inst_12485,inst_12483,state_val_12505){
return (function (p1__12421_SHARP_){return cljs.core.not_EQ_.call(null,c,p1__12421_SHARP_);
});
;})(c,v,vec__12481,cs,inst_12476,inst_12484,inst_12485,inst_12483,state_val_12505))
})();var inst_12489 = cljs.core.filterv.call(null,inst_12488,inst_12476);var inst_12476__$1 = inst_12489;var state_12504__$1 = (function (){var statearr_12515 = state_12504;(statearr_12515[7] = inst_12476__$1);
return statearr_12515;
})();var statearr_12516_12536 = state_12504__$1;(statearr_12516_12536[2] = null);
(statearr_12516_12536[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12505 === 9))
{var inst_12484 = (state_12504[8]);var state_12504__$1 = state_12504;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_12504__$1,11,out,inst_12484);
} else
{if((state_val_12505 === 10))
{var inst_12496 = (state_12504[2]);var state_12504__$1 = state_12504;var statearr_12518_12537 = state_12504__$1;(statearr_12518_12537[2] = inst_12496);
(statearr_12518_12537[1] = 6);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12505 === 11))
{var inst_12476 = (state_12504[7]);var inst_12493 = (state_12504[2]);var tmp12517 = inst_12476;var inst_12476__$1 = tmp12517;var state_12504__$1 = (function (){var statearr_12519 = state_12504;(statearr_12519[7] = inst_12476__$1);
(statearr_12519[11] = inst_12493);
return statearr_12519;
})();var statearr_12520_12538 = state_12504__$1;(statearr_12520_12538[2] = null);
(statearr_12520_12538[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{return null;
}
}
}
}
}
}
}
}
}
}
}
});return ((function (switch__6177__auto__){
return (function() {
var state_machine__6178__auto__ = null;
var state_machine__6178__auto____0 = (function (){var statearr_12524 = [null,null,null,null,null,null,null,null,null,null,null,null];(statearr_12524[0] = state_machine__6178__auto__);
(statearr_12524[1] = 1);
return statearr_12524;
});
var state_machine__6178__auto____1 = (function (state_12504){while(true){
var ret_value__6179__auto__ = (function (){try{while(true){
var result__6180__auto__ = switch__6177__auto__.call(null,state_12504);if(cljs.core.keyword_identical_QMARK_.call(null,result__6180__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__6180__auto__;
}
break;
}
}catch (e12525){if((e12525 instanceof Object))
{var ex__6181__auto__ = e12525;var statearr_12526_12539 = state_12504;(statearr_12526_12539[5] = ex__6181__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_12504);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e12525;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6179__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__12540 = state_12504;
state_12504 = G__12540;
continue;
}
} else
{return ret_value__6179__auto__;
}
break;
}
});
state_machine__6178__auto__ = function(state_12504){
switch(arguments.length){
case 0:
return state_machine__6178__auto____0.call(this);
case 1:
return state_machine__6178__auto____1.call(this,state_12504);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__6178__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__6178__auto____0;
state_machine__6178__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__6178__auto____1;
return state_machine__6178__auto__;
})()
;})(switch__6177__auto__))
})();var state__6194__auto__ = (function (){var statearr_12527 = f__6193__auto__.call(null);(statearr_12527[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6192__auto___12528);
return statearr_12527;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6194__auto__);
}));
return out;
});
merge = function(chs,buf_or_n){
switch(arguments.length){
case 1:
return merge__1.call(this,chs);
case 2:
return merge__2.call(this,chs,buf_or_n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
merge.cljs$core$IFn$_invoke$arity$1 = merge__1;
merge.cljs$core$IFn$_invoke$arity$2 = merge__2;
return merge;
})()
;
/**
* Returns a channel containing the single (collection) result of the
* items taken from the channel conjoined to the supplied
* collection. ch must close before into produces a result.
*/
cljs.core.async.into = (function into(coll,ch){return cljs.core.async.reduce.call(null,cljs.core.conj,coll,ch);
});
/**
* Returns a channel that will return, at most, n items from ch. After n items
* have been returned, or ch has been closed, the return chanel will close.
* 
* The output channel is unbuffered by default, unless buf-or-n is given.
*/
cljs.core.async.take = (function() {
var take = null;
var take__2 = (function (n,ch){return take.call(null,n,ch,null);
});
var take__3 = (function (n,ch,buf_or_n){var out = cljs.core.async.chan.call(null,buf_or_n);var c__6192__auto___12633 = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__6193__auto__ = (function (){var switch__6177__auto__ = (function (state_12610){var state_val_12611 = (state_12610[1]);if((state_val_12611 === 1))
{var inst_12587 = 0;var state_12610__$1 = (function (){var statearr_12612 = state_12610;(statearr_12612[7] = inst_12587);
return statearr_12612;
})();var statearr_12613_12634 = state_12610__$1;(statearr_12613_12634[2] = null);
(statearr_12613_12634[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12611 === 2))
{var inst_12587 = (state_12610[7]);var inst_12589 = (inst_12587 < n);var state_12610__$1 = state_12610;if(cljs.core.truth_(inst_12589))
{var statearr_12614_12635 = state_12610__$1;(statearr_12614_12635[1] = 4);
} else
{var statearr_12615_12636 = state_12610__$1;(statearr_12615_12636[1] = 5);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12611 === 3))
{var inst_12607 = (state_12610[2]);var inst_12608 = cljs.core.async.close_BANG_.call(null,out);var state_12610__$1 = (function (){var statearr_12616 = state_12610;(statearr_12616[8] = inst_12607);
return statearr_12616;
})();return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_12610__$1,inst_12608);
} else
{if((state_val_12611 === 4))
{var state_12610__$1 = state_12610;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_12610__$1,7,ch);
} else
{if((state_val_12611 === 5))
{var state_12610__$1 = state_12610;var statearr_12617_12637 = state_12610__$1;(statearr_12617_12637[2] = null);
(statearr_12617_12637[1] = 6);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12611 === 6))
{var inst_12605 = (state_12610[2]);var state_12610__$1 = state_12610;var statearr_12618_12638 = state_12610__$1;(statearr_12618_12638[2] = inst_12605);
(statearr_12618_12638[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12611 === 7))
{var inst_12592 = (state_12610[9]);var inst_12592__$1 = (state_12610[2]);var inst_12593 = (inst_12592__$1 == null);var inst_12594 = cljs.core.not.call(null,inst_12593);var state_12610__$1 = (function (){var statearr_12619 = state_12610;(statearr_12619[9] = inst_12592__$1);
return statearr_12619;
})();if(inst_12594)
{var statearr_12620_12639 = state_12610__$1;(statearr_12620_12639[1] = 8);
} else
{var statearr_12621_12640 = state_12610__$1;(statearr_12621_12640[1] = 9);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12611 === 8))
{var inst_12592 = (state_12610[9]);var state_12610__$1 = state_12610;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_12610__$1,11,out,inst_12592);
} else
{if((state_val_12611 === 9))
{var state_12610__$1 = state_12610;var statearr_12622_12641 = state_12610__$1;(statearr_12622_12641[2] = null);
(statearr_12622_12641[1] = 10);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12611 === 10))
{var inst_12602 = (state_12610[2]);var state_12610__$1 = state_12610;var statearr_12623_12642 = state_12610__$1;(statearr_12623_12642[2] = inst_12602);
(statearr_12623_12642[1] = 6);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12611 === 11))
{var inst_12587 = (state_12610[7]);var inst_12597 = (state_12610[2]);var inst_12598 = (inst_12587 + 1);var inst_12587__$1 = inst_12598;var state_12610__$1 = (function (){var statearr_12624 = state_12610;(statearr_12624[10] = inst_12597);
(statearr_12624[7] = inst_12587__$1);
return statearr_12624;
})();var statearr_12625_12643 = state_12610__$1;(statearr_12625_12643[2] = null);
(statearr_12625_12643[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{return null;
}
}
}
}
}
}
}
}
}
}
}
});return ((function (switch__6177__auto__){
return (function() {
var state_machine__6178__auto__ = null;
var state_machine__6178__auto____0 = (function (){var statearr_12629 = [null,null,null,null,null,null,null,null,null,null,null];(statearr_12629[0] = state_machine__6178__auto__);
(statearr_12629[1] = 1);
return statearr_12629;
});
var state_machine__6178__auto____1 = (function (state_12610){while(true){
var ret_value__6179__auto__ = (function (){try{while(true){
var result__6180__auto__ = switch__6177__auto__.call(null,state_12610);if(cljs.core.keyword_identical_QMARK_.call(null,result__6180__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__6180__auto__;
}
break;
}
}catch (e12630){if((e12630 instanceof Object))
{var ex__6181__auto__ = e12630;var statearr_12631_12644 = state_12610;(statearr_12631_12644[5] = ex__6181__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_12610);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e12630;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6179__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__12645 = state_12610;
state_12610 = G__12645;
continue;
}
} else
{return ret_value__6179__auto__;
}
break;
}
});
state_machine__6178__auto__ = function(state_12610){
switch(arguments.length){
case 0:
return state_machine__6178__auto____0.call(this);
case 1:
return state_machine__6178__auto____1.call(this,state_12610);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__6178__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__6178__auto____0;
state_machine__6178__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__6178__auto____1;
return state_machine__6178__auto__;
})()
;})(switch__6177__auto__))
})();var state__6194__auto__ = (function (){var statearr_12632 = f__6193__auto__.call(null);(statearr_12632[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6192__auto___12633);
return statearr_12632;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6194__auto__);
}));
return out;
});
take = function(n,ch,buf_or_n){
switch(arguments.length){
case 2:
return take__2.call(this,n,ch);
case 3:
return take__3.call(this,n,ch,buf_or_n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
take.cljs$core$IFn$_invoke$arity$2 = take__2;
take.cljs$core$IFn$_invoke$arity$3 = take__3;
return take;
})()
;
/**
* Returns a channel that will contain values from ch. Consecutive duplicate
* values will be dropped.
* 
* The output channel is unbuffered by default, unless buf-or-n is given.
*/
cljs.core.async.unique = (function() {
var unique = null;
var unique__1 = (function (ch){return unique.call(null,ch,null);
});
var unique__2 = (function (ch,buf_or_n){var out = cljs.core.async.chan.call(null,buf_or_n);var c__6192__auto___12742 = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__6193__auto__ = (function (){var switch__6177__auto__ = (function (state_12717){var state_val_12718 = (state_12717[1]);if((state_val_12718 === 1))
{var inst_12694 = null;var state_12717__$1 = (function (){var statearr_12719 = state_12717;(statearr_12719[7] = inst_12694);
return statearr_12719;
})();var statearr_12720_12743 = state_12717__$1;(statearr_12720_12743[2] = null);
(statearr_12720_12743[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12718 === 2))
{var state_12717__$1 = state_12717;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_12717__$1,4,ch);
} else
{if((state_val_12718 === 3))
{var inst_12714 = (state_12717[2]);var inst_12715 = cljs.core.async.close_BANG_.call(null,out);var state_12717__$1 = (function (){var statearr_12721 = state_12717;(statearr_12721[8] = inst_12714);
return statearr_12721;
})();return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_12717__$1,inst_12715);
} else
{if((state_val_12718 === 4))
{var inst_12697 = (state_12717[9]);var inst_12697__$1 = (state_12717[2]);var inst_12698 = (inst_12697__$1 == null);var inst_12699 = cljs.core.not.call(null,inst_12698);var state_12717__$1 = (function (){var statearr_12722 = state_12717;(statearr_12722[9] = inst_12697__$1);
return statearr_12722;
})();if(inst_12699)
{var statearr_12723_12744 = state_12717__$1;(statearr_12723_12744[1] = 5);
} else
{var statearr_12724_12745 = state_12717__$1;(statearr_12724_12745[1] = 6);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12718 === 5))
{var inst_12697 = (state_12717[9]);var inst_12694 = (state_12717[7]);var inst_12701 = cljs.core._EQ_.call(null,inst_12697,inst_12694);var state_12717__$1 = state_12717;if(inst_12701)
{var statearr_12725_12746 = state_12717__$1;(statearr_12725_12746[1] = 8);
} else
{var statearr_12726_12747 = state_12717__$1;(statearr_12726_12747[1] = 9);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12718 === 6))
{var state_12717__$1 = state_12717;var statearr_12728_12748 = state_12717__$1;(statearr_12728_12748[2] = null);
(statearr_12728_12748[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12718 === 7))
{var inst_12712 = (state_12717[2]);var state_12717__$1 = state_12717;var statearr_12729_12749 = state_12717__$1;(statearr_12729_12749[2] = inst_12712);
(statearr_12729_12749[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12718 === 8))
{var inst_12694 = (state_12717[7]);var tmp12727 = inst_12694;var inst_12694__$1 = tmp12727;var state_12717__$1 = (function (){var statearr_12730 = state_12717;(statearr_12730[7] = inst_12694__$1);
return statearr_12730;
})();var statearr_12731_12750 = state_12717__$1;(statearr_12731_12750[2] = null);
(statearr_12731_12750[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12718 === 9))
{var inst_12697 = (state_12717[9]);var state_12717__$1 = state_12717;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_12717__$1,11,out,inst_12697);
} else
{if((state_val_12718 === 10))
{var inst_12709 = (state_12717[2]);var state_12717__$1 = state_12717;var statearr_12732_12751 = state_12717__$1;(statearr_12732_12751[2] = inst_12709);
(statearr_12732_12751[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12718 === 11))
{var inst_12697 = (state_12717[9]);var inst_12706 = (state_12717[2]);var inst_12694 = inst_12697;var state_12717__$1 = (function (){var statearr_12733 = state_12717;(statearr_12733[7] = inst_12694);
(statearr_12733[10] = inst_12706);
return statearr_12733;
})();var statearr_12734_12752 = state_12717__$1;(statearr_12734_12752[2] = null);
(statearr_12734_12752[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{return null;
}
}
}
}
}
}
}
}
}
}
}
});return ((function (switch__6177__auto__){
return (function() {
var state_machine__6178__auto__ = null;
var state_machine__6178__auto____0 = (function (){var statearr_12738 = [null,null,null,null,null,null,null,null,null,null,null];(statearr_12738[0] = state_machine__6178__auto__);
(statearr_12738[1] = 1);
return statearr_12738;
});
var state_machine__6178__auto____1 = (function (state_12717){while(true){
var ret_value__6179__auto__ = (function (){try{while(true){
var result__6180__auto__ = switch__6177__auto__.call(null,state_12717);if(cljs.core.keyword_identical_QMARK_.call(null,result__6180__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__6180__auto__;
}
break;
}
}catch (e12739){if((e12739 instanceof Object))
{var ex__6181__auto__ = e12739;var statearr_12740_12753 = state_12717;(statearr_12740_12753[5] = ex__6181__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_12717);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e12739;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6179__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__12754 = state_12717;
state_12717 = G__12754;
continue;
}
} else
{return ret_value__6179__auto__;
}
break;
}
});
state_machine__6178__auto__ = function(state_12717){
switch(arguments.length){
case 0:
return state_machine__6178__auto____0.call(this);
case 1:
return state_machine__6178__auto____1.call(this,state_12717);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__6178__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__6178__auto____0;
state_machine__6178__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__6178__auto____1;
return state_machine__6178__auto__;
})()
;})(switch__6177__auto__))
})();var state__6194__auto__ = (function (){var statearr_12741 = f__6193__auto__.call(null);(statearr_12741[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6192__auto___12742);
return statearr_12741;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6194__auto__);
}));
return out;
});
unique = function(ch,buf_or_n){
switch(arguments.length){
case 1:
return unique__1.call(this,ch);
case 2:
return unique__2.call(this,ch,buf_or_n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
unique.cljs$core$IFn$_invoke$arity$1 = unique__1;
unique.cljs$core$IFn$_invoke$arity$2 = unique__2;
return unique;
})()
;
/**
* Returns a channel that will contain vectors of n items taken from ch. The
* final vector in the return channel may be smaller than n if ch closed before
* the vector could be completely filled.
* 
* The output channel is unbuffered by default, unless buf-or-n is given
*/
cljs.core.async.partition = (function() {
var partition = null;
var partition__2 = (function (n,ch){return partition.call(null,n,ch,null);
});
var partition__3 = (function (n,ch,buf_or_n){var out = cljs.core.async.chan.call(null,buf_or_n);var c__6192__auto___12889 = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__6193__auto__ = (function (){var switch__6177__auto__ = (function (state_12859){var state_val_12860 = (state_12859[1]);if((state_val_12860 === 1))
{var inst_12822 = (new Array(n));var inst_12823 = inst_12822;var inst_12824 = 0;var state_12859__$1 = (function (){var statearr_12861 = state_12859;(statearr_12861[7] = inst_12823);
(statearr_12861[8] = inst_12824);
return statearr_12861;
})();var statearr_12862_12890 = state_12859__$1;(statearr_12862_12890[2] = null);
(statearr_12862_12890[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12860 === 2))
{var state_12859__$1 = state_12859;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_12859__$1,4,ch);
} else
{if((state_val_12860 === 3))
{var inst_12857 = (state_12859[2]);var state_12859__$1 = state_12859;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_12859__$1,inst_12857);
} else
{if((state_val_12860 === 4))
{var inst_12827 = (state_12859[9]);var inst_12827__$1 = (state_12859[2]);var inst_12828 = (inst_12827__$1 == null);var inst_12829 = cljs.core.not.call(null,inst_12828);var state_12859__$1 = (function (){var statearr_12863 = state_12859;(statearr_12863[9] = inst_12827__$1);
return statearr_12863;
})();if(inst_12829)
{var statearr_12864_12891 = state_12859__$1;(statearr_12864_12891[1] = 5);
} else
{var statearr_12865_12892 = state_12859__$1;(statearr_12865_12892[1] = 6);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12860 === 5))
{var inst_12823 = (state_12859[7]);var inst_12824 = (state_12859[8]);var inst_12827 = (state_12859[9]);var inst_12832 = (state_12859[10]);var inst_12831 = (inst_12823[inst_12824] = inst_12827);var inst_12832__$1 = (inst_12824 + 1);var inst_12833 = (inst_12832__$1 < n);var state_12859__$1 = (function (){var statearr_12866 = state_12859;(statearr_12866[11] = inst_12831);
(statearr_12866[10] = inst_12832__$1);
return statearr_12866;
})();if(cljs.core.truth_(inst_12833))
{var statearr_12867_12893 = state_12859__$1;(statearr_12867_12893[1] = 8);
} else
{var statearr_12868_12894 = state_12859__$1;(statearr_12868_12894[1] = 9);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12860 === 6))
{var inst_12824 = (state_12859[8]);var inst_12845 = (inst_12824 > 0);var state_12859__$1 = state_12859;if(cljs.core.truth_(inst_12845))
{var statearr_12870_12895 = state_12859__$1;(statearr_12870_12895[1] = 12);
} else
{var statearr_12871_12896 = state_12859__$1;(statearr_12871_12896[1] = 13);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12860 === 7))
{var inst_12855 = (state_12859[2]);var state_12859__$1 = state_12859;var statearr_12872_12897 = state_12859__$1;(statearr_12872_12897[2] = inst_12855);
(statearr_12872_12897[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12860 === 8))
{var inst_12823 = (state_12859[7]);var inst_12832 = (state_12859[10]);var tmp12869 = inst_12823;var inst_12823__$1 = tmp12869;var inst_12824 = inst_12832;var state_12859__$1 = (function (){var statearr_12873 = state_12859;(statearr_12873[7] = inst_12823__$1);
(statearr_12873[8] = inst_12824);
return statearr_12873;
})();var statearr_12874_12898 = state_12859__$1;(statearr_12874_12898[2] = null);
(statearr_12874_12898[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12860 === 9))
{var inst_12823 = (state_12859[7]);var inst_12837 = cljs.core.vec.call(null,inst_12823);var state_12859__$1 = state_12859;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_12859__$1,11,out,inst_12837);
} else
{if((state_val_12860 === 10))
{var inst_12843 = (state_12859[2]);var state_12859__$1 = state_12859;var statearr_12875_12899 = state_12859__$1;(statearr_12875_12899[2] = inst_12843);
(statearr_12875_12899[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12860 === 11))
{var inst_12839 = (state_12859[2]);var inst_12840 = (new Array(n));var inst_12823 = inst_12840;var inst_12824 = 0;var state_12859__$1 = (function (){var statearr_12876 = state_12859;(statearr_12876[12] = inst_12839);
(statearr_12876[7] = inst_12823);
(statearr_12876[8] = inst_12824);
return statearr_12876;
})();var statearr_12877_12900 = state_12859__$1;(statearr_12877_12900[2] = null);
(statearr_12877_12900[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12860 === 12))
{var inst_12823 = (state_12859[7]);var inst_12847 = cljs.core.vec.call(null,inst_12823);var state_12859__$1 = state_12859;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_12859__$1,15,out,inst_12847);
} else
{if((state_val_12860 === 13))
{var state_12859__$1 = state_12859;var statearr_12878_12901 = state_12859__$1;(statearr_12878_12901[2] = null);
(statearr_12878_12901[1] = 14);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12860 === 14))
{var inst_12852 = (state_12859[2]);var inst_12853 = cljs.core.async.close_BANG_.call(null,out);var state_12859__$1 = (function (){var statearr_12879 = state_12859;(statearr_12879[13] = inst_12852);
return statearr_12879;
})();var statearr_12880_12902 = state_12859__$1;(statearr_12880_12902[2] = inst_12853);
(statearr_12880_12902[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12860 === 15))
{var inst_12849 = (state_12859[2]);var state_12859__$1 = state_12859;var statearr_12881_12903 = state_12859__$1;(statearr_12881_12903[2] = inst_12849);
(statearr_12881_12903[1] = 14);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});return ((function (switch__6177__auto__){
return (function() {
var state_machine__6178__auto__ = null;
var state_machine__6178__auto____0 = (function (){var statearr_12885 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];(statearr_12885[0] = state_machine__6178__auto__);
(statearr_12885[1] = 1);
return statearr_12885;
});
var state_machine__6178__auto____1 = (function (state_12859){while(true){
var ret_value__6179__auto__ = (function (){try{while(true){
var result__6180__auto__ = switch__6177__auto__.call(null,state_12859);if(cljs.core.keyword_identical_QMARK_.call(null,result__6180__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__6180__auto__;
}
break;
}
}catch (e12886){if((e12886 instanceof Object))
{var ex__6181__auto__ = e12886;var statearr_12887_12904 = state_12859;(statearr_12887_12904[5] = ex__6181__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_12859);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e12886;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6179__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__12905 = state_12859;
state_12859 = G__12905;
continue;
}
} else
{return ret_value__6179__auto__;
}
break;
}
});
state_machine__6178__auto__ = function(state_12859){
switch(arguments.length){
case 0:
return state_machine__6178__auto____0.call(this);
case 1:
return state_machine__6178__auto____1.call(this,state_12859);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__6178__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__6178__auto____0;
state_machine__6178__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__6178__auto____1;
return state_machine__6178__auto__;
})()
;})(switch__6177__auto__))
})();var state__6194__auto__ = (function (){var statearr_12888 = f__6193__auto__.call(null);(statearr_12888[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6192__auto___12889);
return statearr_12888;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6194__auto__);
}));
return out;
});
partition = function(n,ch,buf_or_n){
switch(arguments.length){
case 2:
return partition__2.call(this,n,ch);
case 3:
return partition__3.call(this,n,ch,buf_or_n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
partition.cljs$core$IFn$_invoke$arity$2 = partition__2;
partition.cljs$core$IFn$_invoke$arity$3 = partition__3;
return partition;
})()
;
/**
* Returns a channel that will contain vectors of items taken from ch. New
* vectors will be created whenever (f itm) returns a value that differs from
* the previous item's (f itm).
* 
* The output channel is unbuffered, unless buf-or-n is given
*/
cljs.core.async.partition_by = (function() {
var partition_by = null;
var partition_by__2 = (function (f,ch){return partition_by.call(null,f,ch,null);
});
var partition_by__3 = (function (f,ch,buf_or_n){var out = cljs.core.async.chan.call(null,buf_or_n);var c__6192__auto___13048 = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__6193__auto__ = (function (){var switch__6177__auto__ = (function (state_13018){var state_val_13019 = (state_13018[1]);if((state_val_13019 === 1))
{var inst_12977 = [];var inst_12978 = inst_12977;var inst_12979 = new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",4382193538);var state_13018__$1 = (function (){var statearr_13020 = state_13018;(statearr_13020[7] = inst_12979);
(statearr_13020[8] = inst_12978);
return statearr_13020;
})();var statearr_13021_13049 = state_13018__$1;(statearr_13021_13049[2] = null);
(statearr_13021_13049[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_13019 === 2))
{var state_13018__$1 = state_13018;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_13018__$1,4,ch);
} else
{if((state_val_13019 === 3))
{var inst_13016 = (state_13018[2]);var state_13018__$1 = state_13018;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_13018__$1,inst_13016);
} else
{if((state_val_13019 === 4))
{var inst_12982 = (state_13018[9]);var inst_12982__$1 = (state_13018[2]);var inst_12983 = (inst_12982__$1 == null);var inst_12984 = cljs.core.not.call(null,inst_12983);var state_13018__$1 = (function (){var statearr_13022 = state_13018;(statearr_13022[9] = inst_12982__$1);
return statearr_13022;
})();if(inst_12984)
{var statearr_13023_13050 = state_13018__$1;(statearr_13023_13050[1] = 5);
} else
{var statearr_13024_13051 = state_13018__$1;(statearr_13024_13051[1] = 6);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_13019 === 5))
{var inst_12986 = (state_13018[10]);var inst_12982 = (state_13018[9]);var inst_12979 = (state_13018[7]);var inst_12986__$1 = f.call(null,inst_12982);var inst_12987 = cljs.core._EQ_.call(null,inst_12986__$1,inst_12979);var inst_12988 = cljs.core.keyword_identical_QMARK_.call(null,inst_12979,new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",4382193538));var inst_12989 = (inst_12987) || (inst_12988);var state_13018__$1 = (function (){var statearr_13025 = state_13018;(statearr_13025[10] = inst_12986__$1);
return statearr_13025;
})();if(cljs.core.truth_(inst_12989))
{var statearr_13026_13052 = state_13018__$1;(statearr_13026_13052[1] = 8);
} else
{var statearr_13027_13053 = state_13018__$1;(statearr_13027_13053[1] = 9);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_13019 === 6))
{var inst_12978 = (state_13018[8]);var inst_13003 = inst_12978.length;var inst_13004 = (inst_13003 > 0);var state_13018__$1 = state_13018;if(cljs.core.truth_(inst_13004))
{var statearr_13029_13054 = state_13018__$1;(statearr_13029_13054[1] = 12);
} else
{var statearr_13030_13055 = state_13018__$1;(statearr_13030_13055[1] = 13);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_13019 === 7))
{var inst_13014 = (state_13018[2]);var state_13018__$1 = state_13018;var statearr_13031_13056 = state_13018__$1;(statearr_13031_13056[2] = inst_13014);
(statearr_13031_13056[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_13019 === 8))
{var inst_12986 = (state_13018[10]);var inst_12982 = (state_13018[9]);var inst_12978 = (state_13018[8]);var inst_12991 = inst_12978.push(inst_12982);var tmp13028 = inst_12978;var inst_12978__$1 = tmp13028;var inst_12979 = inst_12986;var state_13018__$1 = (function (){var statearr_13032 = state_13018;(statearr_13032[11] = inst_12991);
(statearr_13032[7] = inst_12979);
(statearr_13032[8] = inst_12978__$1);
return statearr_13032;
})();var statearr_13033_13057 = state_13018__$1;(statearr_13033_13057[2] = null);
(statearr_13033_13057[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_13019 === 9))
{var inst_12978 = (state_13018[8]);var inst_12994 = cljs.core.vec.call(null,inst_12978);var state_13018__$1 = state_13018;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_13018__$1,11,out,inst_12994);
} else
{if((state_val_13019 === 10))
{var inst_13001 = (state_13018[2]);var state_13018__$1 = state_13018;var statearr_13034_13058 = state_13018__$1;(statearr_13034_13058[2] = inst_13001);
(statearr_13034_13058[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_13019 === 11))
{var inst_12986 = (state_13018[10]);var inst_12982 = (state_13018[9]);var inst_12996 = (state_13018[2]);var inst_12997 = [];var inst_12998 = inst_12997.push(inst_12982);var inst_12978 = inst_12997;var inst_12979 = inst_12986;var state_13018__$1 = (function (){var statearr_13035 = state_13018;(statearr_13035[7] = inst_12979);
(statearr_13035[8] = inst_12978);
(statearr_13035[12] = inst_12996);
(statearr_13035[13] = inst_12998);
return statearr_13035;
})();var statearr_13036_13059 = state_13018__$1;(statearr_13036_13059[2] = null);
(statearr_13036_13059[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_13019 === 12))
{var inst_12978 = (state_13018[8]);var inst_13006 = cljs.core.vec.call(null,inst_12978);var state_13018__$1 = state_13018;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_13018__$1,15,out,inst_13006);
} else
{if((state_val_13019 === 13))
{var state_13018__$1 = state_13018;var statearr_13037_13060 = state_13018__$1;(statearr_13037_13060[2] = null);
(statearr_13037_13060[1] = 14);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_13019 === 14))
{var inst_13011 = (state_13018[2]);var inst_13012 = cljs.core.async.close_BANG_.call(null,out);var state_13018__$1 = (function (){var statearr_13038 = state_13018;(statearr_13038[14] = inst_13011);
return statearr_13038;
})();var statearr_13039_13061 = state_13018__$1;(statearr_13039_13061[2] = inst_13012);
(statearr_13039_13061[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_13019 === 15))
{var inst_13008 = (state_13018[2]);var state_13018__$1 = state_13018;var statearr_13040_13062 = state_13018__$1;(statearr_13040_13062[2] = inst_13008);
(statearr_13040_13062[1] = 14);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});return ((function (switch__6177__auto__){
return (function() {
var state_machine__6178__auto__ = null;
var state_machine__6178__auto____0 = (function (){var statearr_13044 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];(statearr_13044[0] = state_machine__6178__auto__);
(statearr_13044[1] = 1);
return statearr_13044;
});
var state_machine__6178__auto____1 = (function (state_13018){while(true){
var ret_value__6179__auto__ = (function (){try{while(true){
var result__6180__auto__ = switch__6177__auto__.call(null,state_13018);if(cljs.core.keyword_identical_QMARK_.call(null,result__6180__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__6180__auto__;
}
break;
}
}catch (e13045){if((e13045 instanceof Object))
{var ex__6181__auto__ = e13045;var statearr_13046_13063 = state_13018;(statearr_13046_13063[5] = ex__6181__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_13018);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e13045;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6179__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__13064 = state_13018;
state_13018 = G__13064;
continue;
}
} else
{return ret_value__6179__auto__;
}
break;
}
});
state_machine__6178__auto__ = function(state_13018){
switch(arguments.length){
case 0:
return state_machine__6178__auto____0.call(this);
case 1:
return state_machine__6178__auto____1.call(this,state_13018);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__6178__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__6178__auto____0;
state_machine__6178__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__6178__auto____1;
return state_machine__6178__auto__;
})()
;})(switch__6177__auto__))
})();var state__6194__auto__ = (function (){var statearr_13047 = f__6193__auto__.call(null);(statearr_13047[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6192__auto___13048);
return statearr_13047;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6194__auto__);
}));
return out;
});
partition_by = function(f,ch,buf_or_n){
switch(arguments.length){
case 2:
return partition_by__2.call(this,f,ch);
case 3:
return partition_by__3.call(this,f,ch,buf_or_n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
partition_by.cljs$core$IFn$_invoke$arity$2 = partition_by__2;
partition_by.cljs$core$IFn$_invoke$arity$3 = partition_by__3;
return partition_by;
})()
;

//# sourceMappingURL=async.js.map