// Темплейт карточки
const cardTmp = document.querySelector('#card-template').content;

// DOM узлы
const cardsContainer = document.querySelector('.places__list');
const addButton = document.querySelector('.profile__add-button');

// Функция создания карточки
function createCard(name, link, deleteCard) {
  const card = cardTmp.querySelector('.card').cloneNode(true);
  const titleElement = card.querySelector('.card__title');
  const imgElement = card.querySelector('.card__image');
  const deleteButton = card.querySelector('.card__delete-button');
  
  titleElement.textContent = name; 
  imgElement.src = link;
  imgElement.alt = name;

  // Обработчик события: нажатие на кнопку "удалить"
  deleteButton.addEventListener('click', deleteCard);
  
  return card;
};

// Функция удаления карточки
function deleteCard(evt) {
  const card = evt.target.closest('.card');
  card.remove();
};

// Вывод всех карточек из массива на страницу
initialCards.forEach(function(item){
  const card = createCard(item.name, item.link, deleteCard);
  cardsContainer.append(card);
});