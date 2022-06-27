import React from "react";
import edit_avatar from "../image/edit_avatar.png";
import krest from "../image/krest.svg";

import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__container">
          <img
            src={currentUser.avatar}
            className="profile__image"
            alt="Жак-Ив Кусто"
          />
          <button
            className="profile__edit-avatar"
            type="button"
            onClick={onEditAvatar}
          ></button>
          <div className="profile__info">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button
              className="profile__edit-button"
              type="button"
              onClick={onEditProfile}
            >
              <img
                className="profile__image-button"
                src={edit_avatar}
                alt="карандаш"
              />
            </button>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={onAddPlace}
        >
          <img className="profile__add-image" src={krest} alt="плюс" />
        </button>
      </section>

      <section className="elements">
        {cards.map((item) => (
          <Card
            key={item._id}
            data={item}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}
