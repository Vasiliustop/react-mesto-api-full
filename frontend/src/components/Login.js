import React, { useState } from "react";

function Login({ onLogin }) {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = inputs;
    if (onLogin && email && password) {
      onLogin(email, password);
    }
  };

  return (
    <div>
      <article className="auth">
        <div className="auth__container">
          <form className="popup__form" onSubmit={handleSubmit}>
            <h3 className="auth__title">Вход</h3>
            <input
              required
              className="auth__input"
              placeholder="Email"
              type="email"
              value={inputs.email ?? ""}
              onChange={handleChange}
              name="email"
            />
            <input
              required
              className="auth__input"
              placeholder="Пароль"
              type="password"
              value={inputs.password ?? ""}
              onChange={handleChange}
              name="password"
            />
            <button className="auth__save-button" type="submit">
              Войти
            </button>
          </form>
        </div>
      </article>
    </div>
  );
}

export default Login;
