import { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import Topbar from "../../Components/Topbar/Topbar";
import Input from "../../Components/Input/Input";
import { useForm } from "../../hooks/useForm";
import Button from "../../Components/Button/Button";
import AuthContext from "../../context/AuthContext";

import "./Register.css";

export default function Register() {
  const authContext = useContext(AuthContext);

  const [formState, onValidHandled] = useForm(
    {
      name: {
        value: "",
        isValidInput: false,
      },
      username: {
        value: "",
        isValidInput: false,
      },
      email: {
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

  const postForm = (e) => {
    e.preventDefault();
    console.log(formState);
    let newUser = {
      name: formState.inputs.name.value,
      username: formState.inputs.username.value,
      password: formState.inputs.password.value,
      email: formState.inputs.email.value,
      confirmPassword: formState.inputs.password.value,
    };

    fetch(`${authContext.baseURL}auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((result) => {
        authContext.login(result.user, result.accessToken);
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
          <div className="login register-form">
            <span className="login__title">ساخت حساب کاربری</span>
            <span className="login__subtitle">
              خوشحالیم قراره به جمع ما بپیوندی
            </span>
            <div className="login__new-member">
              <span className="login__new-member-text">
                قبلا ثبت‌نام کرده‌اید؟{" "}
              </span>
              <Link className="login__new-member-link" to="/login">
                وارد شوید
              </Link>
            </div>
            <form action="#" className="login-form">
              <div className="login-form__username">
                <Input
                  id="name"
                  className="login-form__username-input"
                  type="text"
                  placeholder="نام و نام خوانوادگی"
                  typeName="input"
                  onValidHandled={onValidHandled}
                />
                <i className="login-form__username-icon fa fa-user"></i>
              </div>

              <div className="login-form__username">
                <Input
                  id="username"
                  className="login-form__username-input"
                  type="text"
                  placeholder="نام کاربری"
                  typeName="input"
                  onValidHandled={onValidHandled}
                />
                <i className="login-form__username-icon fa fa-user"></i>
              </div>
              <div className="login-form__password">
                <Input
                  id="email"
                  className="login-form__password-input"
                  type="email"
                  placeholder="آدرس ایمیل"
                  typeName="input"
                  onValidHandled={onValidHandled}
                />
                <i className="login-form__password-icon fa fa-envelope"></i>
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
                onClick={(e) => postForm(e)}
              >
                <i className="login-form__btn-icon fa fa-user-plus"></i>
                <span className="login-form__btn-text">عضویت</span>
              </Button>
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
