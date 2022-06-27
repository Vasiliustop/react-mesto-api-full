import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  // Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name || "");
    setDescription(currentUser.about || "");
  }, [currentUser]);

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser(name, description);
  }

  const handleNameChange = (evt) => {
    setName(evt.target.value);
  };
  const handleDescriptionChange = (evt) => {
    setDescription(evt.target.value);
  };

  return (
    <PopupWithForm
      name="form-profile"
      title="Редактировать профиль"
      buttonTitle="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        placeholder="Имя"
        required
        className="popup__input popup__input_type_name"
        name="name"
        type="text"
        minLength="2"
        maxLength="40"
        id="name-profile"
        onChange={handleNameChange}
        value={name}
      />
      <span id="name-profile-error" className="error"></span>

      <input
        placeholder="Деятельность"
        required
        className="popup__input popup__input_type_job"
        name="job"
        type="text"
        minLength="2"
        maxLength="200"
        id="name-work"
        onChange={handleDescriptionChange}
        value={description}
      />

      <span id="name-work-error" className="error"></span>
    </PopupWithForm>
  );
}
