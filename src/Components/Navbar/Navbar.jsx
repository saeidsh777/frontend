import AuthContext from "../../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faSearch,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  const authContext = useContext(AuthContext);
  const [allMenu, setAllMenu] = useState([]);

  useEffect(() => {
    fetch(`${authContext.baseURL}menus`)
      .then((res) => res.json())
      .then((result) => setAllMenu(result));
  }, []);

  return (
    <div className="main-header">
      <div className="container-fluid">
        <div className="main-header__content">
          <div className="main-header__right">
            <img
              src="/images/logo/Logo.png"
              className="main-header__logo"
              alt="لوگوی سبزلرن"
            />
            <ul className="main-header__menu">
              <li className="main-header__item">
                <Link to="/" className="main-header__link">
                  صفحه اصلی
                </Link>
              </li>

              {allMenu.map((item) => (
                <li key={item._id} className="main-header__item">
                  <Link
                    to={`/category-info/${item.href}/1`}
                    className="main-header__link"
                  >
                    {item.title}
                    {item.submenus.length > 0 && (
                      <>
                        <FontAwesomeIcon
                          icon={faAngleDown}
                          className="main-header__link-icon"
                        />
                        <ul className="main-header__dropdown">
                          {item.submenus.map((submenuItem) => (
                            <li
                              key={submenuItem._id}
                              className="main-header__dropdown-item"
                            >
                              <Link
                                to={submenuItem.href}
                                className="main-header__dropdown-link"
                              >
                                {submenuItem.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="main-header__left">
            <a href="#" className="main-header__search-btn">
              <FontAwesomeIcon
                icon={faSearch}
                className="main-header__search-icon"
              />
            </a>
            <a href="#" className="main-header__cart-btn">
              <FontAwesomeIcon
                icon={faShoppingCart}
                className="main-header__cart-icon"
              />
            </a>
            {authContext.isLoggedIn ? (
              <Link to="/" className="main-header__profile">
                <span className="main-header__profile-text">
                  {authContext.userInfos.name}
                </span>
              </Link>
            ) : (
              <Link to="/login" className="main-header__profile">
                <span className="main-header__profile-text">
                  ثبت نام | ورود
                </span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
