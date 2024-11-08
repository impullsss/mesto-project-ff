import "../pages/index.css";
import { initialCards } from "./cards.js";
import { openModal, closeModal } from "./components/modal.js";
import { createCard, deleteHandler, likeCard } from "./components/card.js";
import { enableValidation, clearValidation } from "./validation.js";
import {
  updateUserData,
  getUserData,
  getCards,
  addCard,
  updateAvatar,
} from "./api.js";

const profileAvatar = document.querySelector(".profile__image");
const avatarInput = document.querySelector(".popup__input_type_url");
const avatarForm = document.querySelector(".popup_edit_avatar");

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
const popupImage = popupImageElement.querySelector(".popup__image");

function addPopupClass() {
  popupImageElement.classList.add("popup_is-animated");
  popupNewCardElement.classList.add("popup_is-animated");
  popupTypeEditElement.classList.add("popup_is-animated");
}
let userId;

function openPopupImage(caption, image, altText) {
  openModal(popupImageElement);

  captionElement.innerHTML = caption;
  popupImage.src = image;
  popupImage.alt = altText;
}

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

  renderLoading({
    buttonElement: formEditProfileElement.querySelector(".popup__button"),
    isLoading: true,
  });

  updateUserData(nameInput.value, jobInput.value)
    .then((userData) => {
      profileFirstNameElement.textContent = userData.name;
      profileDescriptionElement.textContent = userData.about;
      closePopup(profilePopup);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      renderLoading({
        buttonElement: formEditProfileElement.querySelector(".popup__button"),
        isLoading: false,
      });
    });

  closeModal(popupTypeEditElement);
}

formEditProfileElement.addEventListener("submit", profileHandleFormSubmit);

function handleFormAddNewCardSubmit(evt) {
  evt.preventDefault();

  renderLoading({
    buttonElement: formAddNewCardElement.querySelector(".popup__button"),
    isLoading: true,
  });

  addCard(nameNameNewCardInput.value, urlNewCard.value)
    .then((cardData) => {
      const newCard = createCard(
        cardData,
        deleteHandler,
        likeCard,
        openPopupImage,
        userId
      );

      cardListElement.insertBefore(newCard, cardListElement.firstElementChild);

      nameNameNewCardInput.value = "";
      urlNewCard.value = "";
      closeModal(popupNewCardElement);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      renderLoading({
        buttonElement: formAddNewCardElement.querySelector(".popup__button"),
        isLoading: false,
      });
    });
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

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});

Promise.all([getUserData(), getCards()])
  .then(([userData, cardsData]) => {
    profileFirstNameElement.textContent = userData.name;
    profileDescriptionElement.textContent = userData.about;
    profileAvatar.style.backgroundImage = `url(${userData.avatar})`;
    userId = userData._id;

    const cardsElement = cardsData.map((card) =>
      createCard(card, deleteHandler, likeCard, openPopupImage, userId)
    );
    cardListElement.append(...cardsElement);
  })
  .catch((err) => {
    console.error(err);
  });

profileAvatar.addEventListener("click", () => {
  openModal(avatarForm);
});

avatarForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const avatarUrl = avatarInput.value;

  if (!avatarUrl) {
    console.error("Avatar URL is required");
    return;
  }

  renderLoading({
    buttonElement: avatarForm.querySelector(".popup__button"),
    isLoading: true,
  });

  updateAvatar(avatarUrl)
    .then((data) => {
      profileAvatar.style.backgroundImage = `url(${data.avatar})`;
      closeModal(avatarForm);
      avatarInput.value = "";
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      renderLoading({
        buttonElement: avatarForm.querySelector(".popup__button"),
        isLoading: false,
      });
    });
});

avatarForm
  .querySelector(".popup__close")
  .addEventListener("click", () => closeModal(avatarForm));

avatarForm.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("popup")) closeModal(avatarForm);
});

const renderLoading = ({ buttonElement, isLoading }) => {
  buttonElement.textContent = isLoading ? "Сохранение..." : "Сохранить";
};
