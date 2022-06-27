import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card({ data, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = data.owner._id === currentUser._id;

  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = `elements__delete-button ${
    !isOwn ? `elements__delete-button_hidden` : ``
  }`;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = data.likes.some((i) => i._id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `elements__element-button ${
    isLiked ? "elements__element-button_aktive" : ""
  }`;

  function handleLikeClick() {
    onCardLike(data);
  }

  function handleDeleteClick() {
    onCardDelete(data);
  }

  function handleClick() {
    onCardClick(data);
  }

  return (
    <article className="elements__card">
      <button
        className={cardDeleteButtonClassName}
        type="button"
        onClick={handleDeleteClick}
      ></button>
      <img
        className="elements__rectagle"
        src={data.link}
        alt={data.name}
        onClick={handleClick}
      />
      <div className="elements__element-info">
        <h2 className="elements__element-title">{data.name}</h2>
        <div className="elements__like-container">
          <button
            className={cardLikeButtonClassName}
            type="button"
            onClick={handleLikeClick}
          ></button>
          <span className="elements__like-counter">{data.likes.length}</span>
        </div>
      </div>
    </article>
  );
}
