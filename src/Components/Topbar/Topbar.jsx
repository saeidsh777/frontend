import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { Link } from "react-router-dom";

import "./Topbar.css";

export default function Topbar() {
  const authContext = useContext(AuthContext);
  const [menuTopbar, setMenuTopbar] = useState([]);

  useEffect(() => {
    fetch(`${authContext.baseURL}menus/topbar`)
      .then((res) => res.json())
      .then((result) => setMenuTopbar(result));
  }, []);

  const getRandomItem = (arry, countIndex) => {
    const shuffle = [...arry]
      .sort(() => 0.5 - Math.random())
      .slice(0, countIndex);
    return shuffle;
  };

  return (
    <div className="top-bar">
      <div className="container-fluid">
        <div className="top-bar__content">
          <div className="top-bar__right">
            <ul className="top-bar__menu">
              {getRandomItem(menuTopbar, 5).map((item) => (
                <li key={item._id} className="top-bar__item">
                  <Link to={item.link} className="top-bar__link">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="top-bar__left">
            <div className="top-bar__email">
              <a href="#" className="top-bar__email-text top-bar__link">
                sabzlearn@gmail.com
              </a>
              <i className="fas fa-envelope top-bar__email-icon"></i>
            </div>
            <div className="top-bar__phone">
              <a href="#" className="top-bar__phone-text top-bar__link">
                09921558293
              </a>
              <i className="fas fa-phone top-bar__phone-icon"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
