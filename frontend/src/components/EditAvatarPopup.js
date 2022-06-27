import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const currentUser = React.useContext(CurrentUserContext);
  const avatarRef = React.useRef("");

  React.useEffect(() => {
    avatarRef.current.value = "";
  }, [currentUser]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name="add-avatar-form"
      title="Обновить аватар"
      buttonTitle="Сохранить"
      onSubmit={handleSubmit}
    >
      <input
        id="avatar"
        type="url"
        name="avatar"
        placeholder="Ссылка на картинку"
        className="popup__input popup__input_avatar-link"
        required
        ref={avatarRef}
      />
      <span id="avatar-error" className="error"></span>
    </PopupWithForm>
  );
}
