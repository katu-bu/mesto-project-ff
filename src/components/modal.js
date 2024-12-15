// открытие и закрытие попапов

export function openModal(popup) {
  popup.classList.toggle("popup_is-opened");
  popup.classList.toggle("popup_is-animated");
  document.addEventListener("keydown", handleEsc);
}

export function closeModal(popup) {
  popup.classList.toggle("popup_is-opened");
  popup.classList.toggle("popup_is-animated");
  document.removeEventListener("keydown", handleEsc);
}

function handleEsc(evt) {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".popup_is-opened");
    closeModal(popup);
  }
}