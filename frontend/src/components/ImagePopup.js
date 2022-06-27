import React from "react";

export default function ImagePopup({ data, isOpen, onClose }) {
  return (
    <article className={`popup popup_type_picture ${isOpen && "popup_active"}`}>
      <div className="popup__picture-container">
        <button
          className="popup__close-button"
          type="button"
          onClick={onClose}
        ></button>
        <img className="popup__picture" src={data.link} alt={data.name} />
        <p className="popup__picture-description">{data.name}</p>
      </div>
    </article>
  );
}
