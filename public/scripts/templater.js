(function(global) {

'use strict';

// -- libs
var Mustache = (function(){function t(t,e){return k.call(t,e)}function e(e){return!t(v,e)}function n(t){return t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}function r(t){return String(t).replace(/[&<>"'\/]/g,function(t){return _[t]})}function i(t){this.string=t,this.tail=t,this.pos=0}function a(t,e){this.view=t||{},this.parent=e,this._cache={}}function o(){this.clearCache()}function s(t,e,n,r){for(var i,a,o,c="",l=0,u=t.length;u>l;++l)switch(i=t[l],a=i[1],i[0]){case"#":if(o=n.lookup(a),"object"==typeof o)if(b(o))for(var p=0,f=o.length;f>p;++p)c+=s(i[4],e,n.push(o[p]),r);else o&&(c+=s(i[4],e,n.push(o),r));else if("function"==typeof o){var g=null==r?null:r.slice(i[3],i[5]);o=o.call(n.view,g,function(t){return e.render(t,n)}),null!=o&&(c+=o)}else o&&(c+=s(i[4],e,n,r));break;case"^":o=n.lookup(a),(!o||b(o)&&o.length===0)&&(c+=s(i[4],e,n,r));break;case">":o=e.getPartial(a),"function"==typeof o&&(c+=o(n));break;case"&":o=n.lookup(a),null!=o&&(c+=o);break;case"name":o=n.lookup(a),null!=o&&(c+=h.escape(o));break;case"text":c+=a}return c}function c(t){for(var e,n=[],r=n,i=[],a=0,o=t.length;o>a;++a)switch(e=t[a],e[0]){case"#":case"^":i.push(e),r.push(e),r=e[4]=[];break;case"/":var s=i.pop();s[5]=e[2],r=i.length>0?i[i.length-1][4]:n;break;default:r.push(e)}return n}function l(t){for(var e,n,r=[],i=0,a=t.length;a>i;++i)e=t[i],e&&(e[0]==="text"&&n&&n[0]==="text"?(n[1]+=e[1],n[3]=e[3]):(n=e,r.push(e)));return r}function u(t){return[new RegExp(n(t[0])+"\\s*"),new RegExp("\\s*"+n(t[1]))]}function p(t,r){function a(){if(E&&!P)for(;U.length;)delete x[U.pop()];else U=[];E=!1,P=!1}if(t=t||"",r=r||h.tags,"string"==typeof r&&(r=r.split(g)),r.length!==2)throw new Error("Invalid tags: "+r.join(", "));for(var o,s,p,v,k,d=u(r),b=new i(t),_=[],x=[],U=[],E=!1,P=!1;!b.eos();){if(o=b.pos,p=b.scanUntil(d[0]))for(var C=0,j=p.length;j>C;++C)v=p.charAt(C),e(v)?U.push(x.length):P=!0,x.push(["text",v,o,o+1]),o+=1,"\n"==v&&a();if(!b.scan(d[0]))break;if(E=!0,s=b.scan(y)||"name",b.scan(f),"="===s?(p=b.scanUntil(w),b.scan(w),b.scanUntil(d[1])):"{"===s?(p=b.scanUntil(new RegExp("\\s*"+n("}"+r[1]))),b.scan(m),b.scanUntil(d[1]),s="&"):p=b.scanUntil(d[1]),!b.scan(d[1]))throw new Error("Unclosed tag at "+b.pos);if(k=[s,p,o,b.pos],x.push(k),"#"===s||"^"===s)_.push(k);else if("/"===s){if(_.length===0)throw new Error('Unopened section "'+p+'" at '+o);var A=_.pop();if(A[1]!==p)throw new Error('Unclosed section "'+A[1]+'" at '+o)}else if("name"===s||"{"===s||"&"===s)P=!0;else if("="===s){if(r=p.split(g),r.length!==2)throw new Error("Invalid tags at "+o+": "+r.join(", "));d=u(r)}}var A=_.pop();if(A)throw new Error('Unclosed section "'+A[1]+'" at '+b.pos);return x=l(x),c(x)}var h={},f=/\s*/,g=/\s+/,v=/\S/,w=/\s*=/,m=/\s*\}/,y=/#|\^|\/|>|\{|&|=|!/,k=RegExp.prototype.test,d=Object.prototype.toString,b=Array.isArray||function(t){return d.call(t)==="[object Array]"},_={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;"};i.prototype.eos=function(){return this.tail===""},i.prototype.scan=function(t){var e=this.tail.match(t);return e&&e.index===0?(this.tail=this.tail.substring(e[0].length),this.pos+=e[0].length,e[0]):""},i.prototype.scanUntil=function(t){var e,n=this.tail.search(t);switch(n){case-1:e=this.tail,this.pos+=this.tail.length,this.tail="";break;case 0:e="";break;default:e=this.tail.substring(0,n),this.tail=this.tail.substring(n),this.pos+=n}return e},a.make=function(t){return t instanceof a?t:new a(t)},a.prototype.push=function(t){return new a(t,this)},a.prototype.lookup=function(t){var e=this._cache[t];if(!e){if("."==t)e=this.view;else for(var n=this;n;){if(t.indexOf(".")>0){e=n.view;for(var r=t.split("."),i=0;e&&i<r.length;)e=e[r[i++]]}else e=n.view[t];if(null!=e)break;n=n.parent}this._cache[t]=e}return"function"==typeof e&&(e=e.call(this.view)),e},o.prototype.clearCache=function(){this._cache={},this._partialCache={}},o.prototype.compile=function(t,e){var n=this._cache[t];if(!n){var r=h.parse(t,e);n=this._cache[t]=this.compileTokens(r,t)}return n},o.prototype.compilePartial=function(t,e,n){var r=this.compile(e,n);return this._partialCache[t]=r,r},o.prototype.getPartial=function(t){return t in this._partialCache||!this._loadPartial||this.compilePartial(t,this._loadPartial(t)),this._partialCache[t]},o.prototype.compileTokens=function(t,e){var n=this;return function(r,i){if(i)if("function"==typeof i)n._loadPartial=i;else for(var o in i)n.compilePartial(o,i[o]);return s(t,n,a.make(r),e)}},o.prototype.render=function(t,e,n){return this.compile(t)(e,n)},h.name="mustache.js",h.version="0.7.2",h.tags=["{{","}}"],h.Scanner=i,h.Context=a,h.Writer=o,h.parse=p,h.escape=r;var x=new o;return h.clearCache=function(){return x.clearCache()},h.compile=function(t,e){return x.compile(t,e)},h.compilePartial=function(t,e,n){return x.compilePartial(t,e,n)},h.compileTokens=function(t,e){return x.compileTokens(t,e)},h.render=function(t,e,n){return x.render(t,e,n)},h.to_html=function(t,e,n,r){var i=h.render(t,e,n);return"function"!=typeof r?i:(r(i),void 0)},h})();

// -- invariants
var XMLHttpRequest = global.XMLHttpRequest;
if (!XMLHttpRequest) {
  console.error('XMLHttpRequest is a requirements');
  return;
}

// -- globals
var cache = {};

// -- helpers
function fetch(endpoint, callback) {
  var req = new XMLHttpRequest();
  req.addEventListener('load', function(ev) {
    callback(req.responseText);
  });
  req.addEventListener('error', function(ev) {
    console.error('Unsuccessful fetch for ' + endpoint);
    callback(null);
  });
  req.open('GET', endpoint, true);
  req.send();
}

// -- Templater
global.Templater = {

  render: function(location, context, callback) {
    if (!callback) {
      return console.error('Surely you want an outlet for render(..)');
    }
    if (cache[location]) {
      return callback(cache[location]);
    }
    fetch(location, function(template) {
      var rendered = Mustache.render(template, context);
      return callback(cache[location] = rendered);
    })
  }

};

}(window));