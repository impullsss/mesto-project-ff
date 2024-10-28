import("./cards.js");
const cardListElement = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;

function createCard(card, deleteEl) {
  const clonedCardTemplate = cardTemplate.cloneNode(true);
  const cardElement = clonedCardTemplate.querySelector(".card");
  const cardImage = clonedCardTemplate.querySelector(".card__image");
  const titleCard = clonedCardTemplate.querySelector(".card__title");
  const deleteButton = clonedCardTemplate.querySelector(".card__delete-button");

  titleCard.textContent = card.name;
  cardImage.src = card.link;
  cardImage.alt = card.name;

  deleteButton.addEventListener("click", () => {
    deleteEl(cardElement);
  });

  return clonedCardTemplate;
}

function initCards() {
  const cardsElement = initialCards.map((card) => createCard(card, deleteCard));
  cardsElement.forEach((cardElement) => {
    cardListElement.appendChild(cardElement);
  });
}
initCards();

function deleteCard(card) {
  card.remove();
}
