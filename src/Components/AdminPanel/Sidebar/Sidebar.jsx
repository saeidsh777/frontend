import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function Sidebar() {
  const { "*": param } = useParams();

  return (
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
          <li >
            <a href="#">
              <span>دسته‌بندی‌ها</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
