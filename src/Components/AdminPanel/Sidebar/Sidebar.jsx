import React, { useContext, useEffect } from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";

export default function Sidebar() {
  const { "*": param } = useParams();
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  useEffect(() => {
    localStorage.getItem("isLoggedIn") === "false" && navigate("/");
  }, []);

  const logOutHandler = (e) => {
    e.preventDefault();
    authContext.logout();
    navigate("/");
  };

  return (
    <>
      {localStorage.getItem("isLoggedIn") === "false" ? (
        <Navigate />
      ) : (
        <div id="sidebar" className="col-2">
          <div className="sidebar-header">
            <div className="sidebar-logo">
              <a href="#">
                <img src="/images/logo/Logo.png" alt="Logo" />
              </a>
            </div>

            <div className="sidebar-menu-btn">
              <i className="fas fa-bars"></i>
            </div>
          </div>
          <div className="sidebar-menu">
            <ul>
              <li className={`${param === "" ? "active-menu" : ""}`}>
                <Link to="/p-admin">
                  <span>صفحه اصلی</span>
                </Link>
              </li>
              <li className={`${param === "courses" ? "active-menu" : ""}`}>
                <Link to="courses">
                  <span>دوره ها</span>
                </Link>
              </li>
              <li className={`${param === "menus" ? "active-menu" : ""}`}>
                <Link to="menus">
                  <span>منو ها</span>
                </Link>
              </li>
              <li className={`${param === "articles" ? "active-menu" : ""}`}>
                <Link to="articles">
                  <span>مقاله ها</span>
                </Link>
              </li>
              <li className={`${param === "users" ? "active-menu" : ""}`}>
                <Link to="users">
                  <span>کاربران</span>
                </Link>
              </li>
              <li>
                <a href="#">
                  <span>کدهای تخفیف</span>
                </a>
              </li>
              <li className={`${param === "category" ? "active-menu" : ""}`}>
                <Link to="category">
                  <span>دسته‌بندی‌ها</span>
                </Link>
              </li>
              <li onClick={(e) => logOutHandler(e)}>
                <a href="#">
                  <span>خروج</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
