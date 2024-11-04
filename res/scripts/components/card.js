
import likeActiveSvg from "../../images/like-active.svg";
import likeInActiveSvg from "../../images/like-inactive.svg";

const cardTemplate = document.querySelector("#card-template").content;

function createCard(card, deleteEl, likeEl, openPopupEl) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const titleCard = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

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
    openPopupEl(card.name, card.link, card.name);
  });

  return cardElement;
}

function deleteCard(card) {
  card.remove();
}

function likeCard(card) {
  const likeButtonElement = card.querySelector(".card__like-button");
  likeButtonElement.classList.toggle("card__like-button_is-active");
}

export { createCard, deleteCard, likeCard };
