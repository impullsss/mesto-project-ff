import { createCard } from "./components/card.js";
import { closeModal } from "./components/modal.js";

const cohortId = "wff-cohort-25";
const apiUrl = `https://nomoreparties.co/v1/${cohortId}`;
const token = "544bee1c-d2e4-4019-9e40-5133d33728ef";

const config = {
  baseUrl: "https://nomoreparties.co/v1/cohort-42",
  headers: {
    authorization: "544bee1c-d2e4-4019-9e40-5133d33728ef",
    "Content-Type": "application/json",
  },
};

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

export const getUserData = () => {
  return fetch(`${apiUrl}/users/me`, {
    headers: {
      authorization: token,
    },
  }).then(checkResponse);
};

export function updateUserData(name, about) {
  return fetch(`${apiUrl}/users/me`, {
    method: "PATCH",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then(checkResponse);
}

export const getCards = () => {
  return fetch(`${apiUrl}/cards`, {
    headers: {
      authorization: token,
    },
  }).then(checkResponse);
};

export function addCard(name, link) {
  if (!name || !link) {
    console.error("Name and link cannot be empty");
    return Promise.reject("Name and link cannot be empty");
  }

  console.log("Adding card:", { name, link });

  return fetch(`${apiUrl}/cards`, {
    method: "POST",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then(checkResponse);
}

export function updateAvatar(url) {
  return fetch(`${apiUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ avatar: url }),
  }).then(checkResponse);
}

export function likeCardReq(cardId) {
  return fetch(`${apiUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: { authorization: token },
  }).then((res) => res.json());
}

export function unlikeCard(cardId) {
  return fetch(`${apiUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: { authorization: token },
  }).then((res) => res.json());
}

export function deleteCard(cardId) {
  return fetch(`${apiUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: token,
    },
  }).then(checkResponse);
}
