import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import "./SectionHeader.css";

export default function SectionHeader({ title, desc, btnTitle, btnHref }) {
  return (
    <div className="courses-header">
      <div className="courses-header__right">
        <span className="courses-header__title title">{title}</span>
        <span className="courses-header__text">{desc}</span>
      </div>
      {btnTitle ? (
        <div className="courses-header__left">
          <Link to={btnHref} className="courses-header__link">
            {btnTitle}
            <FontAwesomeIcon
              icon={faArrowLeft}
              className="courses-header__icon"
            />
          </Link>
        </div>
      ) : null}
    </div>
  );
}
