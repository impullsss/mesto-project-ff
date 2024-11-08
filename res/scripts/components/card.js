import likeActiveSvg from "../../images/like-active.svg";
import likeInActiveSvg from "../../images/like-inactive.svg";
import { closeModal } from "./modal.js";
import { likeCardReq, unlikeCard, deleteCard } from "../api.js";

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

const cohortId = "wff-cohort-25";
const apiUrl = `https://nomoreparties.co/v1/${cohortId}`;
const token = "544bee1c-d2e4-4019-9e40-5133d33728ef";

const cardTemplate = document.querySelector("#card-template").content;

export function createCard(card, deleteEl, likeEl, openPopupEl, userId) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const titleCard = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardLikeCount = cardElement.querySelector(".card__like-count");

  titleCard.textContent = card.name;
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardLikeCount.textContent = card.likes.length;

  const likesUserIds = card.likes.map((like) => like._id);
  const userLiked = likesUserIds.includes(userId);
  if (userLiked) {
    const likeButtonElement = cardElement.querySelector(".card__like-button");
    likeButtonElement.classList.add("card__like-button_is-active");
  }

  if (card.owner._id == userId) {
    deleteButton.addEventListener("click", () => {
      deleteHandler(card._id, cardElement);
    });
  } else {
    deleteButton.remove();
  }

  likeButton.addEventListener("click", () => {
    likeEl(card._id, likeButton, cardLikeCount);
  });

  cardImage.addEventListener("click", () => {
    openPopupEl(card.name, card.link, card.name);
  });

  return cardElement;
}

export function deleteHandler(cardId, cardElement) {
  deleteCard(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch((err) => {
      console.error("Ошибка при удалении карточки:", err);
    });
}

export function likeCard(cardId, likeButton, likeCounter) {
  const isLiked = likeButton.classList.contains("card__like-button_is-active");
  const likeMethod = isLiked ? unlikeCard : likeCardReq;

  likeMethod(cardId)
    .then((updatedCard) => {
      updateLikeCount(likeButton, likeCounter, updatedCard.likes.length);
    })
    .catch((err) => {
      console.error("Ошибка при обновлении лайков:", err);
    });
}

function updateLikeCount(likeButton, likeCounter, newCount) {
  likeCounter.textContent = newCount;
  likeButton.classList.toggle("card__like-button_is-active");
}
