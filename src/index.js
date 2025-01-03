// импорт главного файла стилей
import "./pages/index.css";

// импорт переменных / функций, подключённых из созданных модулей
import { createCard, deleteCard, likeCard } from "./components/card.js";
import { openModal, closeModal } from "./components/modal.js";
import { initialCards } from "./components/cards.js";
import { hideInputError, enableValidation, clearValidation} from "./components/validation.js";

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
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

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
  clearValidation(popupEditForm, selectors);
  openModal(popupEdit);
});

// открытие попапа по нажатию на кнопку "создать новое место"
addButton.addEventListener("click", function () {
  clearValidation(popupNewForm, selectors);
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
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(popupEdit);
}

// событие: нажатие на кнопку "сохранить изменения"
popupEditForm.addEventListener("submit", handleEditFormSubmit);

// функция сохраняет новое место в начало контейнера, очищает поля формы, закрывает попап
function handleNewPlaceAdd(evt) {
  evt.preventDefault();
  const card = createCard(
    title.value,
    link.value,
    cardTmp,
    deleteCard,
    likeCard,
    openPopupImage
  );
  cardsContainer.insertAdjacentElement("afterbegin", card);
  closeModal(popupNew);
  popupNewForm.reset();
  clearValidation(popupNewForm, selectors);
}

// событие: нажатие на кнопку "сохранить новое место"
popupNewForm.addEventListener("submit", handleNewPlaceAdd);

// вывод всех карточек из массива на страницу
initialCards.forEach(function (item) {
  const card = createCard(
    item.name,
    item.link,
    cardTmp,
    deleteCard,
    likeCard,
    openPopupImage
  );
  cardsContainer.append(card);
});

// вызов функции валидации полей форм
enableValidation(selectors);