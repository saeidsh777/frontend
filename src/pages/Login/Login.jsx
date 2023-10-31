import React, { useContext, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import Topbar from "../../Components/Topbar/Topbar";
import Input from "../../Components/Input/Input";
import Button from "../../Components/Button/Button";
import { useForm } from "../../hooks/useForm";
import AuthContext from "../../context/AuthContext";
import "./Login.css";

export default function Login() {
  const authContext = useContext(AuthContext);
  console.log(authContext);

  const [formState, onValidHandled] = useForm(
    {
      username: {
        value: "",
        isValidInput: false,
      },
      password: {
        value: "",
        isValidInput: false,
      },
    },
    false
  );
  console.log(formState);

  const onLogin = (e) => {
    e.preventDefault();

    let userPass = {
      identifier: formState.inputs.username.value,
      password: formState.inputs.password.value,
    };

    localStorage.setItem("isLoggedIn", true);

    fetch(`${authContext.baseURL}auth/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(userPass),
    })
      .then((res) => res.json())
      .then((result) => {
        localStorage.setItem(
          "user",
          JSON.stringify({ token: result.accessToken })
        );
        authContext.autoLogin();
      });
  };

  return (
    <>
      <Topbar />
      <Navbar />
      {authContext.isLoggedIn ? (
        <Navigate to="/" />
      ) : (
        <section className="login-register">
          <div className="login">
            <span className="login__title">ورود به حساب کاربری</span>
            <span className="login__subtitle">
              خوشحالیم دوباره میبینیمت دوست عزیز :)
            </span>
            <div className="login__new-member">
              <span className="login__new-member-text">کاربر جدید هستید؟</span>
              <Link className="login__new-member-link" to="/register">
                ثبت نام
              </Link>
            </div>
            <form action="#" className="login-form">
              <div className="login-form__username">
                <Input
                  id="username"
                  className="login-form__username-input"
                  type="text"
                  placeholder="نام کاربری یا آدرس ایمیل"
                  typeName="input"
                  onValidHandled={onValidHandled}
                />
                <i className="login-form__username-icon fa fa-user"></i>
              </div>
              <div className="login-form__password">
                <Input
                  id="password"
                  className="login-form__password-input"
                  type="password"
                  placeholder="رمز عبور"
                  typeName="input"
                  onValidHandled={onValidHandled}
                />
                <i className="login-form__password-icon fa fa-lock-open"></i>
              </div>
              <Button
                className={`login-form__btn ${
                  formState.isValidForm
                    ? "login-form__btn-success"
                    : "login-form__btn-error"
                }`}
                type="submit"
                disabled={!formState.isValidForm}
                onClick={(e) => onLogin(e)}
              >
                <i className="login-form__btn-icon fas fa-sign-out-alt"></i>
                <span className="login-form__btn-text">ورود</span>
              </Button>
              <div className="login-form__password-setting">
                <label className="login-form__password-remember">
                  <input
                    className="login-form__password-checkbox"
                    type="checkbox"
                  />
                  <span className="login-form__password-text">
                    مرا به خاطر داشته باش
                  </span>
                </label>
                <label className="login-form__password-forget">
                  <a className="login-form__password-forget-link" href="#">
                    رمز عبور را فراموش کرده اید؟
                  </a>
                </label>
              </div>
            </form>
            <div className="login__des">
              <span className="login__des-title">سلام کاربر محترم:</span>
              <ul className="login__des-list">
                <li className="login__des-item">
                  لطفا از مرورگر های مطمئن و بروز مانند گوگل کروم و فایرفاکس
                  استفاده کنید.
                </li>
                <li className="login__des-item">
                  ما هرگز اطلاعات محرمانه شمارا از طریق ایمیل درخواست نمیکنیم.
                </li>
                <li className="login__des-item">
                  لطفا کلمه عبور خود را در فواصل زمانی کوتاه تغییر دهید.
                </li>
              </ul>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </>
  );
}
