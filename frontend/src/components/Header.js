import React from "react";
import logo from "../image/logo.svg";
import { Route, Link, Switch } from "react-router-dom";

export default function Header({ email, onSignOut }) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="лого" />
      <Switch>
        <Route exact path="/">
          <div className="header__container">
            <p className="header__email">{email}</p>
            <Link className="header__link" to="/signin" onClick={onSignOut}>
              Выйти
            </Link>
          </div>
        </Route>
        <Route exact path="/sign-up">
          <Link className="header__link" to="/signin">
            Войти
          </Link>
        </Route>
        <Route exact path="/sign-in">
          <Link className="header__link" to="/signup">
            Регистрация
          </Link>
        </Route>
      </Switch>
    </header>
  );
}
