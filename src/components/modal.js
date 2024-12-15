// открытие и закрытие попапов

export function openModal(popup) {
  popup.classList.add("popup_is-opened");
  popup.classList.add("popup_is-animated");
  document.addEventListener("keydown", handleEsc);
}

export function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  popup.classList.remove("popup_is-animated");
  document.removeEventListener("keydown", handleEsc);
}

function handleEsc(evt) {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".popup_is-opened");
    closeModal(popup);
  }
}
