import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopyright } from "@fortawesome/free-solid-svg-icons";
import "./AboutUsBox.css";

export default function AboutUsBox({ title, desc, icon }) {
  return (
    <div className="col-6">
      <div className="about-us__box">
        <div className="about-us__box-right">
          <FontAwesomeIcon icon={faCopyright} className="about-us__icon" />
        </div>
        <div className="about-us__box-left">
          <span className="about-us__box-title">{title}</span>
          <span className="about-us__box-text">{desc}</span>
        </div>
      </div>
    </div>
  );
}
