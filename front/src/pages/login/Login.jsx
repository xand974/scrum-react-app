import { useState } from "react";
import { login, register } from "../../context/apiCalls";
import "./login.scss";

export default function Login() {
  const [input, setInput] = useState({});
  const handleChange = (e) => {
    setInput((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const handleLogin = () => {
    login(input.email, input.password);
  };
  // const handleRegister = () => {
  //   register(input.email, input.password);
  // };
  return (
    <section className="login">
      <div className="container">
        <h1 className="container-title">Bonjour la team</h1>
        <form className="form" onSubmit={(e) => e.preventDefault()}>
          <div className="form-item">
            <label htmlFor="email" className="form-item_label">
              Email
            </label>
            <input
              onChange={handleChange}
              name="email"
              type="email"
              className="form-item_input"
              id="email"
              placeholder="prenom@nom.fr"
            />
          </div>
          <div className="form-item">
            <label htmlFor="password" className="form-item_label">
              Password
            </label>
            <input
              onChange={handleChange}
              name="password"
              type="password"
              className="form-item_input"
              id="password"
              placeholder="traduction"
            />
          </div>
          <button onClick={handleLogin} className="form-btn">
            Se connecter
          </button>
          {/* <button onClick={handleRegister} className="form-btn">
            S'enregistrer
          </button> */}
        </form>
      </div>
    </section>
  );
}
