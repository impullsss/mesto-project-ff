(()=>{"use strict";function e(e){"Escape"===e.key&&t(document.querySelector(".popup_is-opened"))}function t(t){document.removeEventListener("keydown",e),t.classList.remove("popup_is-opened")}function n(t){t.classList.add("popup_is-opened"),document.addEventListener("keydown",e)}var r=document.querySelector("#card-template").content;function o(e,t,n,o){var c=r.querySelector(".card").cloneNode(!0),i=c.querySelector(".card__image"),u=c.querySelector(".card__title"),p=c.querySelector(".card__delete-button"),a=c.querySelector(".card__like-button");return u.textContent=e.name,i.src=e.link,i.alt=e.name,p.addEventListener("click",(function(){t(c)})),a.addEventListener("click",(function(){n(c)})),i.addEventListener("click",(function(){o(e.name,e.link,e.name)})),c}function c(e){e.remove()}function i(e){e.querySelector(".card__like-button").classList.toggle("card__like-button_is-active")}function u(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var p,a,l=document.querySelector(".places__list"),s=document.querySelector(".profile__add-button"),d=document.querySelector(".popup_type_new-card"),_=document.querySelector(".popup_type_edit"),y=document.querySelector(".profile__edit-button"),m=document.querySelector(".popup_type_image"),f=d.querySelector(".popup__form"),v=d.querySelector(".popup__input_type_card-name"),k=d.querySelector(".popup__input_type_url"),S=_.querySelector(".popup__form"),q=_.querySelector(".popup__input_type_name"),L=_.querySelector(".popup__input_type_description"),g=document.querySelector(".profile__title"),b=document.querySelector(".profile__description"),E=m.querySelector(".popup__caption"),h=m.querySelector(".popup__image");function j(e,t,r){n(m),E.innerHTML=e,h.src=t,h.alt=r}p=[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].map((function(e){return o(e,c,i,j)})),l.append.apply(l,function(e){if(Array.isArray(e))return u(e)}(a=p)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(a)||function(e,t){if(e){if("string"==typeof e)return u(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?u(e,t):void 0}}(a)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),s.addEventListener("click",(function(){n(d)})),d.querySelector(".popup__close").addEventListener("click",(function(){return t(d)})),d.addEventListener("click",(function(e){e.target.classList.contains("popup")&&t(d)})),y.addEventListener("click",(function(){n(_),q.value=g.innerHTML,L.value=b.innerHTML})),_.querySelector(".popup__close").addEventListener("click",(function(){return t(_)})),_.addEventListener("click",(function(e){e.target.classList.contains("popup")&&t(_)})),S.addEventListener("submit",(function(e){e.preventDefault(),g.innerHTML=q.value,b.innerHTML=L.value,t(_)})),f.addEventListener("submit",(function(e){e.preventDefault();var n=o({name:v.value,link:k.value},c,i,j);l.insertBefore(n,l.firstElementChild),v.value="",k.value="",t(d)})),m.querySelector(".popup__close").addEventListener("click",(function(){return t(m)})),m.addEventListener("click",(function(e){e.target.classList.contains("popup")&&t(m)}))})();