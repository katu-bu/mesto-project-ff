// импорт главного файла стилей
import "./pages/index.css";

// импорт переменных / функций, подключённых из созданных модулей
import { createCard, deleteCard, likeCard } from "./components/card.js";
import { openModal, closeModal } from "./components/modal.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import {
  getAllCards,
  getCurrentUser,
  postNewCard,
  updateProfile,
  updateAvatar,
} from "./components/api.js";

// темплейт карточки
const cardTmp = document.querySelector("#card-template").content;

// DOM узлы
const cardsContainer = document.querySelector(".places__list");
const addButton = document.querySelector(".profile__add-button");
const popupNew = document.querySelector(".popup_type_new-card");
const popupNewForm = document.forms["new-place"];
const title = popupNew.querySelector(".popup__input_type_card-name");
const link = popupNew.querySelector(".popup__input_type_url");
const popupImage = document.querySelector(".popup_type_image");
const imgPopupImage = popupImage.querySelector(".popup__image");
const captionPopupImage = popupImage.querySelector(".popup__caption");
const editButton = document.querySelector(".profile__edit-button");
const popupEdit = document.querySelector(".popup_type_edit");
const popupEditForm = document.forms["edit-profile"];
const profileTitleInput = popupEditForm.elements.name;
const profileDescriptionInput = popupEditForm.elements.description;
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const popups = document.querySelectorAll(".popup");
const selectors = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
const currentUser = getCurrentUser();
const initialCards = getAllCards();
const avatarImage = document.querySelector(".profile__image");
const popupAvatar = document.querySelector(".popup_type_change_avatar");
const popupAvatarForm = document.forms["change-avatar"];
const AvatarLinkInput = popupAvatarForm.elements["avatar-link"];

// открытие попапа с увеличенной картинкой
function openPopupImage(link, name) {
  imgPopupImage.src = link;
  imgPopupImage.alt = name;
  captionPopupImage.textContent = name;
  openModal(popupImage);
}

// открытие попапа по нажатию на кнопку "редактировать"
editButton.addEventListener("click", function () {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  clearValidation(popupEditForm, selectors, false);
  openModal(popupEdit);
});

// открытие попапа по нажатию на аватар
avatarImage.addEventListener("click", function () {
  clearValidation(popupAvatarForm, selectors, true);
  openModal(popupAvatar);
});

// открытие попапа по нажатию на кнопку "создать новое место"
addButton.addEventListener("click", function () {
  clearValidation(popupNewForm, selectors, true);
  openModal(popupNew);
});

// закрытие через нажатие на оверлей попапа или через кнопку закрытия попапа
popups.forEach(function (popup) {
  popup.addEventListener("click", function (evt) {
    if (
      evt.currentTarget === evt.target ||
      evt.target.classList.contains("popup__close")
    ) {
      closeModal(popup);
    }
  });
});

// функция сохраняет новые данные пользователя в профиль, закрывает попап
function handleEditFormSubmit(evt) {
  evt.preventDefault();
  const saveButton = popupEditForm.querySelector(
    selectors.submitButtonSelector
  );
  renderLoading(saveButton, false);
  updateProfile(profileTitleInput.value, profileDescriptionInput.value)
    .then((res) => {
      profileTitle.textContent = profileTitleInput.value;
      profileDescription.textContent = profileDescriptionInput.value;
      closeModal(popupEdit);
    })
    .catch((error) => {
      console.log("Невозможно сохранить изменения данных пользователя", error);
    })
    .finally(() => renderLoading(saveButton, false));
}

// в зависимости от значения(true/false) изменяется состояние кнопки сохранить
function renderLoading(saveButton, isLoading) {
  if (isLoading) {
    saveButton.textContent = "Сохранение...";
  } else {
    saveButton.textContent = "Сохранить";
  }
}

// событие: нажатие на кнопку "сохранить изменения"
popupEditForm.addEventListener("submit", handleEditFormSubmit);

// функция сохраняет новый аватар, закрывает попап
function handleChangeAvatarSubmit(evt) {
  evt.preventDefault();
  const saveButton = popupAvatarForm.querySelector(
    selectors.submitButtonSelector
  );
  renderLoading(saveButton, true);
  updateAvatar(AvatarLinkInput.value)
    .then((res) => {
      avatarImage.style["background-image"] =
        "url(" + AvatarLinkInput.value + ")";
      closeModal(popupAvatar);
    })
    .catch((error) => {
      console.log("Невозможно обновить аватар", error);
    })
    .finally(() => renderLoading(saveButton, false));
}

// событие: нажатие на кнопку "сохранить новый аватар"
popupAvatarForm.addEventListener("submit", handleChangeAvatarSubmit);

// функция сохраняет новое место в начало контейнера и на сервер, очищает поля формы, закрывает попап
function handleNewPlaceAdd(evt) {
  evt.preventDefault();
  const saveButton = popupNewForm.querySelector(selectors.submitButtonSelector);
  renderLoading(saveButton, true);
  postNewCard(title.value, link.value)
    .then((res) => {
      const card = createCard(
        title.value,
        link.value,
        0,
        res._id,
        false,
        cardTmp,
        deleteCard,
        likeCard,
        openPopupImage
      );
      cardsContainer.insertAdjacentElement("afterbegin", card);
      closeModal(popupNew);
      popupNewForm.reset();
    })
    .catch((error) => {
      console.log("Невозможно сохранить карточку", error);
    })
    .finally(() => renderLoading(saveButton, false));
}

// событие: нажатие на кнопку "сохранить новое место"
popupNewForm.addEventListener("submit", handleNewPlaceAdd);

// вызов функции валидации полей форм
enableValidation(selectors);

// вывод всех карточек на страницу
Promise.all([currentUser, initialCards])
  .then(([user, cards]) => {
    cards.forEach(function (item) {
      const createdByOtherUser = item.owner._id !== user._id;
      const isLiked = item.likes.some((anyuser) => anyuser._id === user._id);
      const card = createCard(
        item.name,
        item.link,
        item.likes.length,
        item._id,
        isLiked,
        cardTmp,
        deleteCard,
        likeCard,
        openPopupImage,
        createdByOtherUser
      );
      cardsContainer.append(card);
    });
  })
  .catch((error) => {
    console.log("Невозможно загрузить карточки с сервера", error);
  });

// при загрузке текущего пользователя отобразить его данные
currentUser
  .then((user) => {
    profileTitle.textContent = user.name;
    profileDescription.textContent = user.about;
    avatarImage.style["background-image"] = "url(" + user.avatar + ")";
  })
  .catch((error) => {
    console.log("Невозможно загрузить данные пользователя", error);
  });
