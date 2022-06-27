import React from "react";

export default function InfoTooltip({ isOpen, onClose, isRegisterCompleted }) {
  const Icon = isRegisterCompleted
    ? "popup__icon-successfully"
    : "popup__icon-unsuccessfully";
  const Text = isRegisterCompleted
    ? "Вы успешно зарегистрировались!"
    : "Что-то пошло не так! Попробуйте ещё раз.";

  return (
    <div>
      <article className={`popup ${isOpen && "popup_active"}`}>
        <div className="popup__container">
          <div className={`popup__icon ${Icon}`}> </div>
          <button
            className="popup__close-button"
            type="button"
            onClick={onClose}
          ></button>
          <h2 className="popup__description-tooltip">{Text}</h2>
        </div>
      </article>
    </div>
  );
}
