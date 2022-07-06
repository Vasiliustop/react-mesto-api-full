export default class Api {
  constructor({ baseUrl, headers }) {
    this._headers = headers;
    this._baseUrl = baseUrl;
  }

  _getHeaders() {
    const token = localStorage.getItem('jwt');
    return {
      'Authorization': `Bearer ${token}`,
      ...this._headers,
    };
  }

  _checkRequest(response) {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(`Ошибка: ${response.status}`);
    }
  }

  getProfile() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._getHeaders(),
      }).then(this._checkRequest);
  }

  editProfile(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(this._checkRequest);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._getHeaders(),
     }).then(this._checkRequest);
  }

  addLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._getHeaders(),
     }).then(this._checkRequest);
  }

  unlike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._getHeaders(),
    }).then(this._checkRequest);
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._getHeaders(),
     }).then(this._checkRequest);
  }

  addCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._getHeaders(),
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(this._checkRequest);
  }

  changeAvatar(avatar) {
    //редактирование аватара
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify(avatar),
    }).then(this._checkRequest);
  }
}

export const api = new Api({ 
  baseUrl: "https://api.vasilius.students.nomoreparties.sbs",
  headers: {
    'Content-Type': 'application/json'
  },
});
