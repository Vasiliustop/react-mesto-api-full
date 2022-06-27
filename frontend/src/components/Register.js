import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register({ onRegister }) {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const { email, password } = state;
    if (onRegister && email && password) {
      onRegister(email, password);
    }
  };

  return (
    <div>
      <article className="auth">
        <div className="auth__container">
          <form className="popup__form" onSubmit={handleSubmit}>
            <h3 className="auth__title">Регистрация</h3>
            <input
              required
              className="auth__input"
              placeholder="Email"
              type="email"
              value={state.email ?? ""}
              onChange={handleChange}
              name="email"
            />
            <input
              required
              className="auth__input"
              placeholder="Пароль"
              type="password"
              onChange={handleChange}
              name="password"
              value={state.password ?? ""}
            />
            <button className="auth__save-button" type="submit">
              Зарегистрироваться
            </button>
            <p className="auth__description-text">
              Уже зарегестрированны?{" "}
              <Link type="button" className="auth__link" to="/sign-in">
                Войти
              </Link>
            </p>
          </form>
        </div>
      </article>
    </div>
  );
}

export default Register;
