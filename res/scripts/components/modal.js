function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}

function openModal(modal) {
  modal.classList.add("popup_is-opened");
}

export { openModal, closeModal };
