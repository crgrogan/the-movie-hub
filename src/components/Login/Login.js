import { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import "./Login.scss";
import logo from "../../images/main-logo-purple.png";
import { getToken } from "../../actions/authActions";

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(getToken());
  };

  const goBack = () => {
    history.goBack();
  };

  return (
    <div className="login-container">
      <section className="login-modal">
        <form onSubmit={submitHandler} className="login-form">
          {/*  <h1>
            Welcome Back To <br /> The Movie Hub
          </h1> */}
          <img src={logo} alt="The Movie Hub logo" />
          <button type="submit" className="submit-login-form-btn">
            Login
          </button>
        </form>
      </section>
      <button onClick={goBack} className="back-btn">
        <i className="fa fa-arrow-left"></i>
      </button>
    </div>
  );
  {
    /* <div className="login-container">
      <section className="login-modal">
        <div className="modal-image">
          <h1>
            Welcome Back To <br /> The Movie Hub
          </h1>
        </div>
        <form onSubmit={submitHandler} className="login-form">
          <img src={logo} alt="The Movie Hub logo" />
          <button type="submit" className="submit-login-form-btn">
            Login
          </button>
        </form>
      </section>
      <button onClick={goBack} className="back-btn">
        <i className="fa fa-arrow-left"></i>
      </button>
    </div> */
  }
};

export default Login;
