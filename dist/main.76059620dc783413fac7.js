(this.webpackJsonp=this.webpackJsonp||[]).push([[1],{11:function(e,t,n){var r=n(12);"string"==typeof r&&(r=[[e.i,r,""]]);var a={hmr:!0,transform:void 0,insertInto:void 0};n(3)(r,a);r.locals&&(e.exports=r.locals)},12:function(e,t,n){(e.exports=n(2)(!1)).push([e.i,'body {\n  margin: 0;\n  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",\n    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",\n    sans-serif;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\ncode {\n  font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",\n    monospace;\n}\n',""])},14:function(e,t,n){var r=n(15);"string"==typeof r&&(r=[[e.i,r,""]]);var a={hmr:!0,transform:void 0,insertInto:void 0};n(3)(r,a);r.locals&&(e.exports=r.locals)},15:function(e,t,n){(e.exports=n(2)(!1)).push([e.i,".App {\n  text-align: center;\n}\n\n.App-header {\n  background-color: #282c34;\n  min-height: 10vh;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  font-size: calc(10px + 2vmin);\n  color: white;\n}\n\n.App-link {\n  color: #61dafb;\n}\n\n@keyframes App-logo-spin {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\n",""])},20:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),o=n(4),i=n.n(o);n(11),n(14),n(16);function c(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=[],r=!0,a=!1,o=void 0;try{for(var i,c=e[Symbol.iterator]();!(r=(i=c.next()).done)&&(n.push(i.value),!t||n.length!==t);r=!0);}catch(e){a=!0,o=e}finally{try{r||null==c.return||c.return()}finally{if(a)throw o}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),r.forEach(function(t){u(e,t,n[t])})}return e}function u(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e){return function(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var f=20;function m(e){var t=e.i,n=(e.sep,e.char),r=e.reverse,o=void 0!==r&&r,i=Array(t).fill(a.a.createElement("span",null," "));return o?[n].concat(s(i)):[].concat(s(i),[n])}function p(e){var t=e.i;return a.a.createElement(m,{i:t,char:"ᕕ( ᐛ )ᕗ"})}function v(e){var t=e.i;return a.a.createElement(m,{i:t,reverse:!0,char:"¯_(ツ)_/¯"})}function d(e){var t=e.i;return a.a.createElement(m,{i:t,char:"¯_(☯෴☯)_/¯"})}function y(e){var t=e.i;return a.a.createElement(m,{i:t,reverse:!0,char:"(✖╭╮✖)"})}var g=Object(r.memo)(function(e){var t=e.l,n=e.i,r=e.value,o=e.onChange,i=r.length;return a.a.createElement("div",{style:{padding:"1em 0"}},"Letter ".concat(n+1,": "),a.a.createElement("input",{style:{width:"40%"},id:t,className:"input-letter",value:r,onChange:o}),a.a.createElement("span",{style:{float:"right",width:"50%"}},i<f/4?a.a.createElement(p,{i:i}):i<f/2?a.a.createElement(v,{i:i}):i<3*f/4?a.a.createElement(d,{i:i}):a.a.createElement(y,{i:i})))},function(e,t){return e.value===t.value}),h=Array.from("abcdefghijklmnopqrstuvwxyz").reduce(function(e,t){return l({},e,u({},t,t))},{}),b=!1;setTimeout(function(){b=!0},2e4);var E=function(e,t,n,r,a,o,i){console.log({actualDuration:n,baseDuration:r,interactions:i})};var O=function(e){return Object(r.useEffect)(function(){b||setTimeout(function(){document.getElementById("toggle".concat(+e.itMatters)).click()},300)},[e])},w=function(e,t){return Object(r.useEffect)(function(){var e=document.getElementsByClassName("input-letter");Array.from(e).forEach(function(e,n){var r=setInterval(function(){var n=e.id;t(function(e){return l({},e,u({},n,e[n].length<f?e[n]+e[n].slice(0,1):e[n].slice(0,1)))})},20*(1+n));setTimeout(function(){clearInterval(r)},2e4)})},[])};function j(e){var t=e.state,n=e.setState;O(t),w(t,n);var o=t.itMatters,i=function(){n(l({},t,{itMatters:!o}))},c=function(e){return Object(r.useCallback)(function(r){return n(l({},t,u({},e,r.target.value)))})};return a.a.createElement("form",{name:"f"},a.a.createElement("h2",null,"Does unnecessary re-rendering matter?"),a.a.createElement("div",null,a.a.createElement("input",{type:"radio",name:"t",value:!o,id:"toggle0",onChange:i}),"Nope"),a.a.createElement("div",null,a.a.createElement("input",{type:"radio",name:"t",value:o,id:"toggle1",onChange:i}),"Of course!"),Object.keys(h).map(function(e,n){return a.a.createElement(g,{key:e,l:e,i:n,value:t[e],onChange:c(e)})}))}var A=function(){var e=c(Object(r.useState)(l({itMatters:!1},h)),2),t=e[0],n=e[1];return a.a.createElement("div",{className:"App"},a.a.createElement("header",{className:"App-header"},"Unnecessary re-renders"),a.a.createElement(r.unstable_Profiler,{id:"Form",onRender:E},a.a.createElement(j,{state:t,setState:n})))},k=n(5);Object(k.registerObserver)(),i.a.render(a.a.createElement(A,null),document.getElementById("root"))}},[[20,0,2,4]]]);
//# sourceMappingURL=main.76059620dc783413fac7.js.map