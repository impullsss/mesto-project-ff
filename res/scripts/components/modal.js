export function handleKeydown(evt) {
  if (evt.key === "Escape") {
    closeModal(document.querySelector(".popup_is-opened"));
  }
}

export function closeModal(modal) {
  document.removeEventListener("keydown", handleKeydown);
  modal.classList.remove("popup_is-opened");
}

export function openModal(modal) {
  modal.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleKeydown);
}
