import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({ isOpen, onClose, onUpdateCard }) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  React.useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  const handleNameCardChange = (evt) => {
    setName(evt.target.value);
  };

  const handleLinkCardChange = (evt) => {
    setLink(evt.target.value);
  };

  function handleSubmitCard(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateCard(name, link);
  }
  return (
    <PopupWithForm
      name="form-element"
      title="Новое место"
      buttonTitle="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmitCard}
    >
      <input
        required
        className="popup__input popup__input_type_namecards"
        placeholder="Название"
        type="text"
        minLength="2"
        maxLength="30"
        id="name-place"
        name="namecard"
        onChange={handleNameCardChange}
        value={name}
      />
      <span id="name-place-error" className="error"></span>
      <input
        required
        className="popup__input popup__input_type_link"
        placeholder="Ссылка на картинку"
        type="url"
        id="link"
        name="linkcard"
        onChange={handleLinkCardChange}
        value={link}
      />
      <span id="link-error" className="error"></span>
    </PopupWithForm>
  );
}
