const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-29",
  headers: {
    authorization: "fa948bb7-46b9-43a6-974b-da6e88a3cc75",
    "Content-Type": "application/json",
  },
};

const fetchHelper = (endpoint, options) => {
  return fetch(`${config.baseUrl}/${endpoint}`, options).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

const get = (endpoint) =>
  fetchHelper(endpoint, {
    headers: config.headers,
  });

const post = (endpoint, body) =>
  fetchHelper(endpoint, {
    method: "POST",
    body: JSON.stringify(body),
    headers: config.headers,
  });

const patch = (endpoint, body) =>
  fetchHelper(endpoint, {
    method: "PATCH",
    body: JSON.stringify(body),
    headers: config.headers,
  });

const put = (endpoint) =>
  fetchHelper(endpoint, {
    method: "PUT",
    headers: config.headers,
  });

const delete_ = (endpoint) =>
  fetchHelper(endpoint, {
    method: "DELETE",
    headers: config.headers,
  });

export const getAllCards = () => get("cards");
export const getCurrentUser = () => get("users/me");
export const postNewCard = (name, link) =>
  post("cards", { name: name, link: link });
export const updateProfile = (name, about) =>
  patch("users/me", { name: name, about: about });
export const putLike = (_id) => put("cards/likes/" + _id);
export const deleteLike = (_id) => delete_("cards/likes/" + _id);
export const deleteCardFromServer = (_id) => delete_("cards/" + _id);
export const updateAvatar = (link) =>
  patch("users/me/avatar", { avatar: link });
