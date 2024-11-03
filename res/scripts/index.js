import { initialCards } from "./cards.js";
import "../images/avatar.jpg";
import("../pages/index.css");
import { openModal, closeModal } from "./components/modal.js";
import {
  createCard,
  deleteCard,
  likeCard
} from "./components/card.js";

const cardListElement = document.querySelector(".places__list");
const addCardButtonElement = document.querySelector(".profile__add-button");
const popupNewCardElement = document.querySelector(".popup_type_new-card");
const popupTypeEditElement = document.querySelector(".popup_type_edit");
const profileEditButtonElement = document.querySelector(
  ".profile__edit-button"
);
const popupImageElement = document.querySelector(".popup_type_image");

const formAddNewCardElement = popupNewCardElement.querySelector(".popup__form"); 
const nameNameNewCardInput = popupNewCardElement.querySelector(
  ".popup__input_type_card-name"
); 
const urlNewCard = popupNewCardElement.querySelector(".popup__input_type_url"); 
const formEditProfileElement =
  popupTypeEditElement.querySelector(".popup__form"); 
const nameInput = popupTypeEditElement.querySelector(".popup__input_type_name"); 
const jobInput = popupTypeEditElement.querySelector(
  ".popup__input_type_description"
); 
const profileFirstNameElement = document.querySelector(".profile__title");
  const profileDescriptionElement = document.querySelector(
    ".profile__description"
  );
const captionElement = popupImageElement.querySelector(".popup__caption");
const popupImage = popupImageElement.querySelector('.popup__image');

function addPopupClass() {
  popupImageElement.classList.add('popup_is-animated');
  popupNewCardElement.classList.add('popup_is-animated');
  popupTypeEditElement.classList.add('popup_is-animated');
}

function initCards() {
  const cardsElement = initialCards.map((card) =>
    createCard(card, deleteCard, likeCard, openPopupImage)
  );
  cardsElement.forEach((cardElement) => {
    cardListElement.appendChild(cardElement);
  });
}

function openPopupImage(caption, image) {
  openModal(popupImageElement);
 
  captionElement.innerHTML = caption;
  popupImage.src = image;
}

initCards();

addCardButtonElement.addEventListener("click", () => {
  openModal(popupNewCardElement);
});

popupNewCardElement
  .querySelector(".popup__close")
  .addEventListener("click", () => closeModal(popupNewCardElement));
popupNewCardElement.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("popup")) {
    closeModal(popupNewCardElement);
  }
});

profileEditButtonElement.addEventListener("click", () => {
  openModal(popupTypeEditElement);
  nameInput.value = profileFirstNameElement.innerHTML;
  jobInput.value = profileDescriptionElement.innerHTML;
});

popupTypeEditElement
  .querySelector(".popup__close")
  .addEventListener("click", () => closeModal(popupTypeEditElement));
popupTypeEditElement.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("popup")) closeModal(popupTypeEditElement);
});



function profileHandleFormSubmit(evt) {
  evt.preventDefault();
  profileFirstNameElement.innerHTML = nameInput.value;
  profileDescriptionElement.innerHTML = jobInput.value;
  closeModal(popupTypeEditElement);
}

formEditProfileElement.addEventListener("submit", profileHandleFormSubmit);



function handleFormAddNewCardSubmit(evt) {
  evt.preventDefault();
  const newCard = createCard(
    {
      name: nameNameNewCardInput.value,
      link: urlNewCard.value,
    },
    deleteCard,
    likeCard,
    openPopupImage
  );
  cardListElement.insertBefore(newCard, cardListElement.firstElementChild);
  nameNameNewCardInput.value = '';
  urlNewCard.value = '';
  closeModal(popupNewCardElement);
}

formAddNewCardElement.addEventListener("submit", handleFormAddNewCardSubmit);


popupImageElement
  .querySelector(".popup__close")
  .addEventListener("click", () => closeModal(popupImageElement));
popupImageElement.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("popup")) {
    closeModal(popupImageElement);
  }
});
document.addEventListener('load',() => {
  addPopupClass();
})