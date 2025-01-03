const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-29',
  headers: {
    authorization: 'fa948bb7-46b9-43a6-974b-da6e88a3cc75',
    'Content-Type': 'application/json'
  }
};

const get = (endpoint) => {
  return fetch(`${config.baseUrl}/${endpoint}`, {
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
} 

export const getAllCards = () => get("cards");
export const getCurrentUser = () => get("users/me");

const post = (endpoint, body) => {
  return fetch(`${config.baseUrl}/${endpoint}`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
} 

export const postNewCard = (card) => post("cards", card);