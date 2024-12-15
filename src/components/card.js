// функция создания карточки
export function createCard(
  name,
  link,
  cardTmp,
  deleteCard,
  likeCard,
  openPopupImage
) {
  const card = cardTmp.querySelector(".card").cloneNode(true);
  const titleElement = card.querySelector(".card__title");
  const imgElement = card.querySelector(".card__image");
  const deleteButton = card.querySelector(".card__delete-button");
  const likeButton = card.querySelector(".card__like-button");

  titleElement.textContent = name;
  imgElement.src = link;
  imgElement.alt = name;

  // событие: нажатие на кнопку "удалить"
  deleteButton.addEventListener("click", deleteCard);

  // событие: нажатие на кнопку "лайк"
  likeButton.addEventListener("click", likeCard);

  // событиe: нажатие на картинку
  imgElement.addEventListener("click", () => openPopupImage(link, name));

  return card;
}

// функция удаления карточки
export function deleteCard(evt) {
  const card = evt.target.closest(".card");
  card.remove();
}

// функция лайка карточки
export function likeCard(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}
