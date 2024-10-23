// Темплейт карточки
const cardTmp = document.querySelector('#card-template').content;

// DOM узлы
const cardsContainer = document.querySelector('.places__list');
const addButton = document.querySelector('.profile__add-button');
const popupNew = document.querySelector('.popup_type_new-card');
const popupNewForm = popupNew.querySelector('.popup__form');
const title = popupNew.querySelector('.popup__input_type_card-name');
const link = popupNew.querySelector('.popup__input_type_url');
const closeButtonPopupNew = popupNew.querySelector('.popup__close');
const popupImage = document.querySelector('.popup_type_image');
const closeButtonPopupImage = popupImage.querySelector('.popup__close');
const imgPopupImage = popupImage.querySelector('.popup__image');
const captionPopupImage = popupImage.querySelector('.popup__caption');

// Функция создания карточки
function addCard(title, link) {
  const card = cardTmp.querySelector('.card').cloneNode(true);
  const titleElement = card.querySelector('.card__title');
  const imgElement = card.querySelector('.card__image');
  const likeButton = card.querySelector('.card__like-button');
  const deleteButton = card.querySelector('.card__delete-button');
  
  titleElement.textContent = title; 
  imgElement.src = link;
  
  // Порядок добавления карточек (альтернатива: cardsContainer.insertAdjacentElement('beforebegin', card);)
  cardsContainer.append(card);
  
  // Обработчик события: нажатие на кнопку "лайк"
  likeButton.addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__like-button_is-active');
  });

  // Обработчик события: нажатие на кнопку "удалить"
  deleteButton.addEventListener('click', function () {
    deleteCard(card);
  });

  // Обработчик события: нажатие на картинку для вызова всплывающего окна с увеличенной картинкой
  imgElement.addEventListener('click', function () {
    popupImage.classList.toggle('popup_is-opened');
    imgPopupImage.src = link;
    captionPopupImage.textContent = title;
  });
};

// Функция удаления карточки
function deleteCard(card) {
  card.remove();
}

// Обработчик события: нажатие на кнопку "создать новое место"
addButton.addEventListener('click', function () {
  popupNew.classList.toggle('popup_is-opened');
});

// Обработчик события: нажатие на кнопку "закрыть всплывающее окно создания нового места"
closeButtonPopupNew.addEventListener('click', function () {
  popupNew.classList.toggle('popup_is-opened');
});

// Обработчик события: нажатие на кнопку "сохранить новое место"
popupNewForm.addEventListener('submit', function (evt) {
  evt.preventDefault()
  addCard(title.value, link.value);
  popupNew.classList.toggle('popup_is-opened');
  title.value = '';
  link.value = '';
});

 // Обработчик события: нажатие на кнопку "закрыть всплывающее окно с увеличенной картинкой"
 closeButtonPopupImage.addEventListener('click', function (evt) {
  popupImage.classList.toggle('popup_is-opened');
});

// Вывод всех карточек из массива на страницу
initialCards.forEach(function(item){
  addCard(item.name, item.link)
});