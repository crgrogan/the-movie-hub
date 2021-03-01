import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import "./Register.scss";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const history = useHistory();

  const submitHandler = (e) => {
    e.preventDefault();
  };

  const goBack = () => {
    history.goBack();
  };

  return (
    <div className="register-container">
      <section className="register-modal">
        <form onSubmit={submitHandler} className="register-form">
          <ul>
            <li>
              <h1>Register</h1>
            </li>
            {/* <li>
            {isLoading && <div>Loading...</div>}
            {error && <div>{error}</div>}
          </li> */}
            <li>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button type="submit" className="submit-register-form-btn">
                Register
              </button>
            </li>
          </ul>
        </form>
        <div className="modal-image"></div>
      </section>
      <button onClick={goBack} className="back-btn">
        <i className="fa fa-arrow-left"></i>
      </button>
    </div>
  );
};

export default Register;
