function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},o={},a={},l=t.parcelRequire9ba7;null==l&&((l=function(e){if(e in o)return o[e].exports;if(e in a){var t=a[e];delete a[e];var l={id:e,exports:{}};return o[e]=l,t.call(l.exports,l,l.exports),l.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,t){a[e]=t},t.parcelRequire9ba7=l);var r=l("9OeKo"),n=l("7Y9D8");const i=document.querySelector(".video_and_form__feedback-form"),s=document.querySelector('input[type="email"]'),u=document.querySelector('textarea[name="message"]'),f=e(r)((()=>{const e={email:s.value,message:u.value};localStorage.setItem("feedback-form-state",JSON.stringify(e))}),500);i.addEventListener("input",f);const d=localStorage.getItem("feedback-form-state");if(d){const e=JSON.parse(d);s.value=e.email,u.value=e.message}i.addEventListener("submit",(t=>{t.preventDefault(),""!==s.value&&""!==u.value?(console.log(`Email: ${s.value}`),console.log(`Message: ${u.value}`),localStorage.removeItem("feedback-form-state"),i.reset()):e(n).Notify.failure("Both fields must be filled!")}));
//# sourceMappingURL=video_and_form.f3875be2.js.map
