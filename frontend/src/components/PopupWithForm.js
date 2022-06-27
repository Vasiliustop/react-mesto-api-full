import React from "react";

export default function PopupWithForm({
  name,
  title,
  buttonTitle,
  children,
  isOpen,
  onClose,
  onSubmit,
}) {
  return (
    <div>
      <article
        className={`popup popup_type_${name} ${isOpen && "popup_active"}`}
      >
        <div className="popup__container">
          <form
            className="popup__form"
            name={name}
            onSubmit={onSubmit}
          >
            <h3 className="popup__title">{title}</h3>
            {children}
            <button className="popup__save-button" type="submit">
              {buttonTitle}
            </button>
          </form>
          <button
            className="popup__close-button"
            type="button"
            onClick={onClose}
          >
            {" "}
          </button>
        </div>
      </article>
    </div>
  );
}
