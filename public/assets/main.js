(function(g,M){typeof exports=="object"&&typeof module<"u"?M(require("react"),require("react-dom")):typeof define=="function"&&define.amd?define(["react","react-dom"],M):(g=typeof globalThis<"u"?globalThis:g||self,M(g.React,g.ReactDOM))})(this,function(g,M){"use strict";var K={exports:{}},I={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ae;function Fe(){if(ae)return I;ae=1;var _=g,y=Symbol.for("react.element"),k=Symbol.for("react.fragment"),x=Object.prototype.hasOwnProperty,T=_.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,P={key:!0,ref:!0,__self:!0,__source:!0};function j(E,d,S){var i,R={},C=null,B=null;S!==void 0&&(C=""+S),d.key!==void 0&&(C=""+d.key),d.ref!==void 0&&(B=d.ref);for(i in d)x.call(d,i)&&!P.hasOwnProperty(i)&&(R[i]=d[i]);if(E&&E.defaultProps)for(i in d=E.defaultProps,d)R[i]===void 0&&(R[i]=d[i]);return{$$typeof:y,type:E,key:C,ref:B,props:R,_owner:T.current}}return I.Fragment=k,I.jsx=j,I.jsxs=j,I}var Y={};/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var oe;function De(){return oe||(oe=1,process.env.NODE_ENV!=="production"&&function(){var _=g,y=Symbol.for("react.element"),k=Symbol.for("react.portal"),x=Symbol.for("react.fragment"),T=Symbol.for("react.strict_mode"),P=Symbol.for("react.profiler"),j=Symbol.for("react.provider"),E=Symbol.for("react.context"),d=Symbol.for("react.forward_ref"),S=Symbol.for("react.suspense"),i=Symbol.for("react.suspense_list"),R=Symbol.for("react.memo"),C=Symbol.for("react.lazy"),B=Symbol.for("react.offscreen"),ue=Symbol.iterator,We="@@iterator";function Le(e){if(e===null||typeof e!="object")return null;var r=ue&&e[ue]||e[We];return typeof r=="function"?r:null}var F=_.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;function v(e){{for(var r=arguments.length,t=new Array(r>1?r-1:0),n=1;n<r;n++)t[n-1]=arguments[n];Ve("error",e,t)}}function Ve(e,r,t){{var n=F.ReactDebugCurrentFrame,u=n.getStackAddendum();u!==""&&(r+="%s",t=t.concat([u]));var s=t.map(function(o){return String(o)});s.unshift("Warning: "+r),Function.prototype.apply.call(console[e],console,s)}}var Ne=!1,Be=!1,Ue=!1,$e=!1,ze=!1,se;se=Symbol.for("react.module.reference");function Je(e){return!!(typeof e=="string"||typeof e=="function"||e===x||e===P||ze||e===T||e===S||e===i||$e||e===B||Ne||Be||Ue||typeof e=="object"&&e!==null&&(e.$$typeof===C||e.$$typeof===R||e.$$typeof===j||e.$$typeof===E||e.$$typeof===d||e.$$typeof===se||e.getModuleId!==void 0))}function Ke(e,r,t){var n=e.displayName;if(n)return n;var u=r.displayName||r.name||"";return u!==""?t+"("+u+")":t}function le(e){return e.displayName||"Context"}function b(e){if(e==null)return null;if(typeof e.tag=="number"&&v("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."),typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case x:return"Fragment";case k:return"Portal";case P:return"Profiler";case T:return"StrictMode";case S:return"Suspense";case i:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case E:var r=e;return le(r)+".Consumer";case j:var t=e;return le(t._context)+".Provider";case d:return Ke(e,e.render,"ForwardRef");case R:var n=e.displayName||null;return n!==null?n:b(e.type)||"Memo";case C:{var u=e,s=u._payload,o=u._init;try{return b(o(s))}catch{return null}}}return null}var w=Object.assign,W=0,ce,fe,de,ve,pe,he,ge;function me(){}me.__reactDisabledLog=!0;function Ge(){{if(W===0){ce=console.log,fe=console.info,de=console.warn,ve=console.error,pe=console.group,he=console.groupCollapsed,ge=console.groupEnd;var e={configurable:!0,enumerable:!0,value:me,writable:!0};Object.defineProperties(console,{info:e,log:e,warn:e,error:e,group:e,groupCollapsed:e,groupEnd:e})}W++}}function qe(){{if(W--,W===0){var e={configurable:!0,enumerable:!0,writable:!0};Object.defineProperties(console,{log:w({},e,{value:ce}),info:w({},e,{value:fe}),warn:w({},e,{value:de}),error:w({},e,{value:ve}),group:w({},e,{value:pe}),groupCollapsed:w({},e,{value:he}),groupEnd:w({},e,{value:ge})})}W<0&&v("disabledDepth fell below zero. This is a bug in React. Please file an issue.")}}var q=F.ReactCurrentDispatcher,H;function U(e,r,t){{if(H===void 0)try{throw Error()}catch(u){var n=u.stack.trim().match(/\n( *(at )?)/);H=n&&n[1]||""}return`
`+H+e}}var X=!1,$;{var He=typeof WeakMap=="function"?WeakMap:Map;$=new He}function be(e,r){if(!e||X)return"";{var t=$.get(e);if(t!==void 0)return t}var n;X=!0;var u=Error.prepareStackTrace;Error.prepareStackTrace=void 0;var s;s=q.current,q.current=null,Ge();try{if(r){var o=function(){throw Error()};if(Object.defineProperty(o.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(o,[])}catch(h){n=h}Reflect.construct(e,[],o)}else{try{o.call()}catch(h){n=h}e.call(o.prototype)}}else{try{throw Error()}catch(h){n=h}e()}}catch(h){if(h&&n&&typeof h.stack=="string"){for(var a=h.stack.split(`
`),p=n.stack.split(`
`),c=a.length-1,f=p.length-1;c>=1&&f>=0&&a[c]!==p[f];)f--;for(;c>=1&&f>=0;c--,f--)if(a[c]!==p[f]){if(c!==1||f!==1)do if(c--,f--,f<0||a[c]!==p[f]){var m=`
`+a[c].replace(" at new "," at ");return e.displayName&&m.includes("<anonymous>")&&(m=m.replace("<anonymous>",e.displayName)),typeof e=="function"&&$.set(e,m),m}while(c>=1&&f>=0);break}}}finally{X=!1,q.current=s,qe(),Error.prepareStackTrace=u}var A=e?e.displayName||e.name:"",O=A?U(A):"";return typeof e=="function"&&$.set(e,O),O}function Xe(e,r,t){return be(e,!1)}function Ze(e){var r=e.prototype;return!!(r&&r.isReactComponent)}function z(e,r,t){if(e==null)return"";if(typeof e=="function")return be(e,Ze(e));if(typeof e=="string")return U(e);switch(e){case S:return U("Suspense");case i:return U("SuspenseList")}if(typeof e=="object")switch(e.$$typeof){case d:return Xe(e.render);case R:return z(e.type,r,t);case C:{var n=e,u=n._payload,s=n._init;try{return z(s(u),r,t)}catch{}}}return""}var L=Object.prototype.hasOwnProperty,ye={},Ee=F.ReactDebugCurrentFrame;function J(e){if(e){var r=e._owner,t=z(e.type,e._source,r?r.type:null);Ee.setExtraStackFrame(t)}else Ee.setExtraStackFrame(null)}function Qe(e,r,t,n,u){{var s=Function.call.bind(L);for(var o in e)if(s(e,o)){var a=void 0;try{if(typeof e[o]!="function"){var p=Error((n||"React class")+": "+t+" type `"+o+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+typeof e[o]+"`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");throw p.name="Invariant Violation",p}a=e[o](r,o,n,t,null,"SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED")}catch(c){a=c}a&&!(a instanceof Error)&&(J(u),v("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).",n||"React class",t,o,typeof a),J(null)),a instanceof Error&&!(a.message in ye)&&(ye[a.message]=!0,J(u),v("Failed %s type: %s",t,a.message),J(null))}}}var er=Array.isArray;function Z(e){return er(e)}function rr(e){{var r=typeof Symbol=="function"&&Symbol.toStringTag,t=r&&e[Symbol.toStringTag]||e.constructor.name||"Object";return t}}function tr(e){try{return Re(e),!1}catch{return!0}}function Re(e){return""+e}function _e(e){if(tr(e))return v("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.",rr(e)),Re(e)}var V=F.ReactCurrentOwner,nr={key:!0,ref:!0,__self:!0,__source:!0},xe,Se,Q;Q={};function ar(e){if(L.call(e,"ref")){var r=Object.getOwnPropertyDescriptor(e,"ref").get;if(r&&r.isReactWarning)return!1}return e.ref!==void 0}function or(e){if(L.call(e,"key")){var r=Object.getOwnPropertyDescriptor(e,"key").get;if(r&&r.isReactWarning)return!1}return e.key!==void 0}function ir(e,r){if(typeof e.ref=="string"&&V.current&&r&&V.current.stateNode!==r){var t=b(V.current.type);Q[t]||(v('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref',b(V.current.type),e.ref),Q[t]=!0)}}function ur(e,r){{var t=function(){xe||(xe=!0,v("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)",r))};t.isReactWarning=!0,Object.defineProperty(e,"key",{get:t,configurable:!0})}}function sr(e,r){{var t=function(){Se||(Se=!0,v("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)",r))};t.isReactWarning=!0,Object.defineProperty(e,"ref",{get:t,configurable:!0})}}var lr=function(e,r,t,n,u,s,o){var a={$$typeof:y,type:e,key:r,ref:t,props:o,_owner:s};return a._store={},Object.defineProperty(a._store,"validated",{configurable:!1,enumerable:!1,writable:!0,value:!1}),Object.defineProperty(a,"_self",{configurable:!1,enumerable:!1,writable:!1,value:n}),Object.defineProperty(a,"_source",{configurable:!1,enumerable:!1,writable:!1,value:u}),Object.freeze&&(Object.freeze(a.props),Object.freeze(a)),a};function cr(e,r,t,n,u){{var s,o={},a=null,p=null;t!==void 0&&(_e(t),a=""+t),or(r)&&(_e(r.key),a=""+r.key),ar(r)&&(p=r.ref,ir(r,u));for(s in r)L.call(r,s)&&!nr.hasOwnProperty(s)&&(o[s]=r[s]);if(e&&e.defaultProps){var c=e.defaultProps;for(s in c)o[s]===void 0&&(o[s]=c[s])}if(a||p){var f=typeof e=="function"?e.displayName||e.name||"Unknown":e;a&&ur(o,f),p&&sr(o,f)}return lr(e,a,p,u,n,V.current,o)}}var ee=F.ReactCurrentOwner,Te=F.ReactDebugCurrentFrame;function D(e){if(e){var r=e._owner,t=z(e.type,e._source,r?r.type:null);Te.setExtraStackFrame(t)}else Te.setExtraStackFrame(null)}var re;re=!1;function te(e){return typeof e=="object"&&e!==null&&e.$$typeof===y}function je(){{if(ee.current){var e=b(ee.current.type);if(e)return`

Check the render method of \``+e+"`."}return""}}function fr(e){return""}var Ce={};function dr(e){{var r=je();if(!r){var t=typeof e=="string"?e:e.displayName||e.name;t&&(r=`

Check the top-level render call using <`+t+">.")}return r}}function we(e,r){{if(!e._store||e._store.validated||e.key!=null)return;e._store.validated=!0;var t=dr(r);if(Ce[t])return;Ce[t]=!0;var n="";e&&e._owner&&e._owner!==ee.current&&(n=" It was passed a child from "+b(e._owner.type)+"."),D(e),v('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.',t,n),D(null)}}function Oe(e,r){{if(typeof e!="object")return;if(Z(e))for(var t=0;t<e.length;t++){var n=e[t];te(n)&&we(n,r)}else if(te(e))e._store&&(e._store.validated=!0);else if(e){var u=Le(e);if(typeof u=="function"&&u!==e.entries)for(var s=u.call(e),o;!(o=s.next()).done;)te(o.value)&&we(o.value,r)}}}function vr(e){{var r=e.type;if(r==null||typeof r=="string")return;var t;if(typeof r=="function")t=r.propTypes;else if(typeof r=="object"&&(r.$$typeof===d||r.$$typeof===R))t=r.propTypes;else return;if(t){var n=b(r);Qe(t,e.props,"prop",n,e)}else if(r.PropTypes!==void 0&&!re){re=!0;var u=b(r);v("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?",u||"Unknown")}typeof r.getDefaultProps=="function"&&!r.getDefaultProps.isReactClassApproved&&v("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.")}}function pr(e){{for(var r=Object.keys(e.props),t=0;t<r.length;t++){var n=r[t];if(n!=="children"&&n!=="key"){D(e),v("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.",n),D(null);break}}e.ref!==null&&(D(e),v("Invalid attribute `ref` supplied to `React.Fragment`."),D(null))}}var ke={};function Pe(e,r,t,n,u,s){{var o=Je(e);if(!o){var a="";(e===void 0||typeof e=="object"&&e!==null&&Object.keys(e).length===0)&&(a+=" You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");var p=fr();p?a+=p:a+=je();var c;e===null?c="null":Z(e)?c="array":e!==void 0&&e.$$typeof===y?(c="<"+(b(e.type)||"Unknown")+" />",a=" Did you accidentally export a JSX literal instead of a component?"):c=typeof e,v("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s",c,a)}var f=cr(e,r,t,u,s);if(f==null)return f;if(o){var m=r.children;if(m!==void 0)if(n)if(Z(m)){for(var A=0;A<m.length;A++)Oe(m[A],e);Object.freeze&&Object.freeze(m)}else v("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");else Oe(m,e)}if(L.call(r,"key")){var O=b(e),h=Object.keys(r).filter(function(Er){return Er!=="key"}),ne=h.length>0?"{key: someKey, "+h.join(": ..., ")+": ...}":"{key: someKey}";if(!ke[O+ne]){var yr=h.length>0?"{"+h.join(": ..., ")+": ...}":"{}";v(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,ne,O,yr,O),ke[O+ne]=!0}}return e===x?pr(f):vr(f),f}}function hr(e,r,t){return Pe(e,r,t,!0)}function gr(e,r,t){return Pe(e,r,t,!1)}var mr=gr,br=hr;Y.Fragment=x,Y.jsx=mr,Y.jsxs=br}()),Y}process.env.NODE_ENV==="production"?K.exports=Fe():K.exports=De();var l=K.exports,G,N=M;if(process.env.NODE_ENV==="production")G=N.createRoot,N.hydrateRoot;else{var ie=N.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;G=function(_,y){ie.usingClientEntryPoint=!0;try{return N.createRoot(_,y)}finally{ie.usingClientEntryPoint=!1}}}const Ae=["Acura","Audi","BMW","Buick","Cadillac","Chevrolet","Dodge","Ford","GMC","Honda","Hyundai","Infiniti","Jeep","Kia","Land Rover","Lexus","Lincoln","Mazda","Mercedes-Benz","Mitsubishi","Nissan","Porsche","Ram","Subaru","Toyota","Volkswagen","Volvo"],Me=["Model A","Model B"],Ie=["2020","2021","2022","2023"],Ye=()=>{const[_,y]=g.useState(""),[k,x]=g.useState(""),[T,P]=g.useState(""),j=i=>y(i.target.value),E=i=>x(i.target.value),d=i=>P(i.target.value),S=i=>{i.preventDefault(),console.log(`Make: ${_}, Model: ${k}, Year: ${T}`)};return l.jsxs(g.Fragment,{children:[l.jsx("style",{children:`
                #root {
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 2rem;
                    font-family: "Roboto", sans-serif;
                    background-color: #fff;
                }

                h2 {
                    font-size: 2rem;
                    text-align: center;
                    font-weight: bold;
                    margin-bottom: 1rem;
                }

                p {
                    font-size: 1.2rem;
                    text-align: center;
                    margin-bottom: 2rem;
                }

                form {
                    display: flex;
                    flex-direction: column;
                    max-width: 600px;
                    margin: 0 auto;
                    text-align: left;
                }

                label {
                    font-size: 1rem;
                    margin-bottom: 0.5rem;
                    display: block;
                }

                select {
                    width: 100%;
                    padding: 0.75rem;
                    margin-bottom: 1rem;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    font-size: 1.1rem;
                    background-color: #fff;
                    transition: border-color 0.3s, box-shadow 0.3s;
                }

                select:focus {
                    border-color: #007BFF;
                    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
                    outline: none;
                }

                input[type="checkbox"] {
                    margin-right: 0.5rem;
                }

                button {
                    padding: 1rem;
                    border: none;
                    border-radius: 4px;
                    background-color: #007BFF;
                    color: white;
                    font-size: 1.2rem;
                    cursor: pointer;
                    margin-top: 1rem;
                    width: 100%;
                    transition: background-color 0.3s;
                }

                button:hover {
                    background-color: #0056b3;
                }
            `}),l.jsx("h2",{children:"Vehicle & Bike Fit Calculator"}),l.jsx("p",{children:"Find out if you can haul your bike with your vehicle and which MotoTote carrier works best for you."}),l.jsxs("form",{onSubmit:S,children:[l.jsxs("div",{children:[l.jsx("label",{htmlFor:"make",children:"Make"}),l.jsxs("select",{id:"make",value:_,onChange:j,required:!0,children:[l.jsx("option",{value:"",disabled:!0,children:"Select a make"}),Ae.map(i=>l.jsx("option",{value:i,children:i},i))]})]}),l.jsxs("div",{children:[l.jsx("label",{htmlFor:"model",children:"Model"}),l.jsxs("select",{id:"model",value:k,onChange:E,required:!0,children:[l.jsx("option",{value:"",disabled:!0,children:"Select a model"}),Me.map(i=>l.jsx("option",{value:i,children:i},i))]})]}),l.jsxs("div",{children:[l.jsx("label",{htmlFor:"year",children:"Year"}),l.jsxs("select",{id:"year",value:T,onChange:d,required:!0,children:[l.jsx("option",{value:"",disabled:!0,children:"Select a year"}),Ie.map(i=>l.jsx("option",{value:i,children:i},i))]})]}),l.jsx("button",{type:"submit",children:"Submit"})]})]})};G(document.getElementById("root")).render(l.jsx(g.StrictMode,{children:l.jsx(Ye,{})}))});
