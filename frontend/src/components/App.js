import { useEffect, useState } from "react";
import { Route, useHistory, Switch } from "react-router-dom";
import Header from "./Header.js";
import Footer from "./Footer.js";
import Main from "./Main.js";
import ImagePopup from "./ImagePopup.js";
import { api } from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip.js";
import * as auth from "./../utils/Auth";

export default function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isTooltipOpen, setTooltipOpen] = useState(false);
  const [selectedCard, setSelected] = useState(null);
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegisterCompleted, setIsRegisterCompleted] = useState(false);
  const history = useHistory();
  const [email, setEmail] = useState(false);

  const checkToken = () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth.checkToken(jwt).then((res) => {
        setIsLoggedIn(true);
        setEmail(res.email);
        history.push("/");
      });
    }
  };
  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([api.getProfile(), api.getInitialCards()])
        .then(([user, cards]) => {
          setCurrentUser(user);
          setCards(cards);
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
  }, [isLoggedIn]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelected(card);
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    (isLiked ? api.unlike(card._id) : api.addLike(card._id))
      .then((newCard) => {
        // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log("err", err);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((prevState) => prevState.filter((item) => item !== card));
      })
      .catch((err) => {
        console.log("err", err);
      });
  }

  function handleUpdateUser(name, about) {
    api
      .editProfile(name, about)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })

      .catch((err) => {
        console.log("err", err);
      });
  }

  function handleUpdateAvatar(data) {
    api
      .changeAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log("err", err);
      });
  }

  function handleAddPlaceSubmit(name, link) {
    api
      .addCard(name, link)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log("err", err);
      });
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setTooltipOpen(false);
    setSelected(null);
  }

  const handleRegister = (email, password) => {
    auth
      .register(email, password)
      .then((res) => {
        if (res) {
          setIsRegisterCompleted(true);
          setTooltipOpen(true);
          history.push("/signin");
        }
      })
      .catch((err) => {
        setIsRegisterCompleted(false);
        setTooltipOpen(true);
        console.log("err", err);
      });
  };

  const handleLogin = (email, password) => {
    auth.login(email, password)
      .then((res) => {
        if (res) {
          localStorage.setItem("jwt", res.token);
          setIsLoggedIn(true);
          history.replace({ pathname: "/" });
          setEmail(email);
        }
      })
      .catch((err) => {
        setIsRegisterCompleted(false);
        setTooltipOpen(true);
        console.log("err", err);
      });
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    history.push("/signin");
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <Header onSignOut={handleSignOut} email={email} />
        <Switch>
          <Route path="/signup">
            <Register onRegister={handleRegister} />
          </Route>
          <Route path="/signin">
            <Login onLogin={handleLogin} />
          </Route>
          <ProtectedRoute isLoggedIn={isLoggedIn} path="/">
            <Main
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
            <Footer />
          </ProtectedRoute>
        </Switch>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onUpdateCard={handleAddPlaceSubmit}
        ></AddPlacePopup>
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        ></EditAvatarPopup>
        <ImagePopup
          data={selectedCard || {}}
          isOpen={selectedCard}
          onClose={closeAllPopups}
        />
        <InfoTooltip
          isOpen={isTooltipOpen}
          isRegisterCompleted={isRegisterCompleted}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}
