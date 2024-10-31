import { initialCards } from "./cards.js";
import "../images/avatar.jpg";
import("../pages/index.css");
import { openModal, closeModal } from "./components/modal.js";
import {
  createCard,
  deleteCard,
  likeCard,
  openPopupImage,
} from "./components/card.js";

const cardListElement = document.querySelector(".places__list");

const addCardButtonElement = document.querySelector(".profile__add-button");
const popupNewCardElement = document.querySelector(".popup_type_new-card");
const popupTypeEditElement = document.querySelector(".popup_type_edit");
const profileEditButtonElement = document.querySelector(
  ".profile__edit-button"
);

function initCards() {
  const cardsElement = initialCards.map((card) =>
    createCard(card, deleteCard, likeCard, openPopupImage)
  );
  cardsElement.forEach((cardElement) => {
    cardListElement.appendChild(cardElement);
  });
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

document.addEventListener("keydown", (evt) => {
  if (evt.key === "Escape") {
    closeModal(popupNewCardElement);
    closeModal(popupTypeEditElement);
  }
});

profileEditButtonElement.addEventListener("click", () => {
  openModal(popupTypeEditElement);
});

popupTypeEditElement
  .querySelector(".popup__close")
  .addEventListener("click", () => closeModal(popupTypeEditElement));
popupTypeEditElement.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("popup")) closeModal(popupTypeEditElement);
});

const formEditProfileElement =
  popupTypeEditElement.querySelector(".popup__form"); 
const nameInput = popupTypeEditElement.querySelector(".popup__input_type_name"); 
const jobInput = popupTypeEditElement.querySelector(
  ".popup__input_type_description"
); 

function handleFormSubmit(evt) {
  evt.preventDefault();
  const profileFirstNameElement = document.querySelector(".profile__title");
  const profileDescriptionElement = document.querySelector(
    ".profile__description"
  );

  profileFirstNameElement.innerHTML = nameInput.value;
  profileDescriptionElement.innerHTML = jobInput.value;
  closeModal(popupTypeEditElement);
}

formEditProfileElement.addEventListener("submit", handleFormSubmit);

const formAddNewCardElement = popupNewCardElement.querySelector(".popup__form"); 
const nameNameNewCardInput = popupNewCardElement.querySelector(
  ".popup__input_type_card-name"
); 
const urlNewCard = popupNewCardElement.querySelector(".popup__input_type_url"); 

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
  closeModal(popupNewCardElement);
}

formAddNewCardElement.addEventListener("submit", handleFormAddNewCardSubmit);

const popupImageElement = document.querySelector(".popup_type_image");
popupImageElement
  .querySelector(".popup__close")
  .addEventListener("click", () => closeModal(popupImageElement));
popupImageElement.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("popup")) {
    closeModal(popupImageElement);
  }
});
