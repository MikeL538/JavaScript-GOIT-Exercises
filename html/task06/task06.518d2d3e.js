!function(){document.querySelector(".task06-01__button").addEventListener("click",(function(){!function(){var e=document.querySelector("#categories"),t=e.querySelectorAll("h2"),n=e.querySelectorAll(".item");console.log("Number of categories: ".concat(t.length));for(var o=0;o<n.length;o++){var r=n[o],a=r.querySelector("h2").textContent,l=r.querySelectorAll("ul li").length;console.log("Category: ".concat(a)),console.log("Elements: ".concat(l))}}()}));for(var e=["Potatoes","Mushrooms","Garlic","Tomatos","Herbs","Condiments"],t=document.querySelector("#ingredients"),n=0;n<e.length;n++){var o=document.createElement("li");o.textContent=e[n],t.appendChild(o)}var r=document.querySelector(".task06-03__gallery"),a=[{url:"https://images.pexels.com/photos/140134/pexels-photo-140134.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",alt:"White and Black Long Fur Cat"},{url:"https://images.pexels.com/photos/213399/pexels-photo-213399.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",alt:"Orange and White Koi Fish Near Yellow Koi Fish"},{url:"https://images.pexels.com/photos/219943/pexels-photo-219943.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",alt:"Group of Horses Running"}].map((function(e){return'\n    <li>\n      <img src="'.concat(e.url,'" alt="').concat(e.alt,' width="140" height="70">\n    </li>\n  ')})).join("");r.insertAdjacentHTML("afterbegin",a);var l=document.querySelector("#value"),c=document.querySelector('[data-action="increment"]'),u=document.querySelector('[data-action="decrement"]');c.addEventListener("click",(function(){l.innerHTML=+l.innerHTML+1})),u.addEventListener("click",(function(){l.innerHTML=+l.innerHTML-1}));var i=document.querySelector("#name-input"),s=document.querySelector("#name-output");i.addEventListener("input",(function(e){""===e.currentTarget.value?s.textContent="Anonymous":s.textContent=e.currentTarget.value}));var d=document.querySelector(".task06-06__validation-input");d.addEventListener("blur",(function(){d.classList.remove("valid","invalid"),0!==d.value.length&&(6===d.value.length?d.classList.toggle("valid"):d.classList.toggle("invalid"))}));var m=document.querySelector("#font-size-control"),v=document.querySelector("#text");m.value=15,v.style.fontSize=m.value+"px",m.addEventListener("input",(function(){v.style.fontSize=m.value+"px"})),document.querySelector(".task06-08__login-form").addEventListener("submit",(function(e){e.preventDefault();var t=e.currentTarget.elements,n=t.email,o=t.password;if(""===n.value||""===o.value)alert("All fields must be filled");else{n.value,o.value;console.log("Data: Email=".concat(n.value,"; Password=").concat(o.value)),e.currentTarget.reset()}}));var g=document.querySelector(".task06-09__button"),p=document.querySelector(".task06-09__reset-button"),y=document.querySelector(".task06-09__container--color"),h=document.querySelector(".task06-09");g.addEventListener("click",(function(){h.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0)),y.innerHTML="".concat(h.style.backgroundColor)})),p.addEventListener("click",(function(){h.style.backgroundColor=null,y.innerHTML="RGB#Code"}));var S=document.querySelector("#boxes"),f=document.querySelector("[data-create]"),q=document.querySelector("[data-destroy]"),L=document.querySelector("#controls input"),k=30;f.addEventListener("click",(function(){for(var e=0;e<L.value;e++){var t=document.createElement("div");t.style.width=k+"px",t.style.height=k+"px",t.style.margin="2px auto",t.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0)),S.appendChild(t),k+=10}})),q.addEventListener("click",(function(){S.innerHTML="",k=30}))}();
//# sourceMappingURL=task06.518d2d3e.js.map