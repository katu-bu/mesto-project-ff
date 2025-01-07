import { putLike, deleteLike, deleteCardFromServer } from "./api.js";

// функция создания карточки
export function createCard(
  name,
  link,
  likeCount,
  _id,
  isLiked,
  cardTmp,
  deleteCard,
  likeCard,
  openPopupImage,
  createdByOtherUser
) {
  const card = cardTmp.querySelector(".card").cloneNode(true);
  const titleElement = card.querySelector(".card__title");
  const imgElement = card.querySelector(".card__image");
  const deleteButton = card.querySelector(".card__delete-button");
  const likeButton = card.querySelector(".card__like-button");
  const likeCountElement = card.querySelector(".card__like-count");

  titleElement.textContent = name;
  imgElement.src = link;
  imgElement.alt = name;
  likeCountElement.textContent = likeCount;

  if (createdByOtherUser) {
    card.classList.add("card__other-user");
  }

  // событие: нажатие на кнопку "удалить"
  deleteButton.addEventListener("click", () => deleteCard(card, _id));

  // событие: нажатие на кнопку "лайк"
  likeButton.addEventListener("click", () =>
    likeCard(likeButton, likeCountElement, _id)
  );

  if (isLiked) {
    likeButton.classList.add("card__like-button_is-active");
  }

  // событиe: нажатие на картинку
  imgElement.addEventListener("click", () => openPopupImage(link, name));

  return card;
}

// функция удаления карточки
export function deleteCard(card, _id) {
  deleteCardFromServer(_id)
    .then((res) => {
      card.remove();
    })
    .catch((error) => {
      console.log("Невозможно удалить карточку", error);
    });
}

// функция лайка/дизлайка карточки
export function likeCard(likeButton, likeCountElement, _id) {
  if (likeButton.classList.contains("card__like-button_is-active")) {
    deleteLike(_id)
      .then((card) => {
        likeButton.classList.remove("card__like-button_is-active");
        likeCountElement.textContent = card.likes.length;
      })
      .catch((error) => {
        console.log("Невозможно удалить лайк", error);
      });
  } else {
    putLike(_id)
      .then((card) => {
        likeButton.classList.add("card__like-button_is-active");
        likeCountElement.textContent = card.likes.length;
      })
      .catch((error) => {
        console.log("Невозможно добавить лайк", error);
      });
  }
}
