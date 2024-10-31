import { openModal } from "./modal";
import likeActiveSvg from "../../images/like-active.svg";

const cardTemplate = document.querySelector("#card-template").content;
const popupImageElement = document.querySelector(".popup_type_image");

function createCard(card, deleteEl, likeEl, openPopupEl) {
  const clonedCardTemplate = cardTemplate.cloneNode(true);
  const cardElement = clonedCardTemplate.querySelector(".card");
  const cardImage = clonedCardTemplate.querySelector(".card__image");
  const titleCard = clonedCardTemplate.querySelector(".card__title");
  const deleteButton = clonedCardTemplate.querySelector(".card__delete-button");
  const likeButton = clonedCardTemplate.querySelector(".card__like-button");

  titleCard.textContent = card.name;
  cardImage.src = card.link;
  cardImage.alt = card.name;

  deleteButton.addEventListener("click", () => {
    deleteEl(cardElement);
  });

  likeButton.addEventListener("click", () => {
    likeEl(cardElement);
  });

  cardImage.addEventListener("click", () => {
    openPopupEl(cardElement);
  });

  return clonedCardTemplate;
}

function deleteCard(card) {
  card.remove();
}

function likeCard(card) {
  const likeButtonElement = card.querySelector(".card__like-button");
  likeButtonElement.style.background = `transparent url(${likeActiveSvg}) no-repeat`;
}

function openPopupImage(card) {
  openModal(popupImageElement);
  const imageElement = popupImageElement.querySelector(".popup__image");
  const captionElement = popupImageElement.querySelector(".popup__caption");
  captionElement.innerHTML = card.querySelector(".card__title").innerHTML;
  imageElement.src = card.querySelector(".card__image").src;
}

export { createCard, deleteCard, likeCard, openPopupImage };
