import React, { useState } from "react";
import ShimmerImg from "../ShimmerImg/ShimmerImg";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChalkboardTeacher,
  faUsers,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

import "./CourseBox.css";

export default function CourseBox(props) {
  const [isShowImg, setIsShowImg] = useState(false);

  return (
    <Link
      to={`/course-info/${props.shortName}`}
      className={`${props.nocoll ? "" : "col-4"}`}
    >
      <div className="course-box">
        <Link to={`/course-info/${props.shortName}`}>
          <img
            src="/images/courses/fareelancer.png"
            alt="Course img"
            className="course-box__img"
            onLoad={() => setIsShowImg(true)}
          />
          {!isShowImg && <ShimmerImg />}
        </Link>
        <div className="course-box__main">
          <Link
            to={`/course-info/${props.shortName}`}
            className="course-box__title"
          >
            {props.name}
          </Link>

          <div className="course-box__rating-teacher">
            <div className="course-box__teacher">
              <FontAwesomeIcon
                icon={faChalkboardTeacher}
                className="course-box__teacher-icon"
              />
              <Link to="/" className="course-box__teacher-link">
                {props.creator}
              </Link>
            </div>
            <div className="course-box__rating">
              <img
                src="/images/svgs/star.svg"
                alt="rating"
                className="course-box__star"
              />
              <img
                src="/images/svgs/star_fill.svg"
                alt="rating"
                className="course-box__star"
              />
              <img
                src="/images/svgs/star_fill.svg"
                alt="rating"
                className="course-box__star"
              />
              <img
                src="/images/svgs/star_fill.svg"
                alt="rating"
                className="course-box__star"
              />
              <img
                src="/images/svgs/star_fill.svg"
                alt="rating"
                className="course-box__star"
              />
            </div>
          </div>

          <div className="course-box__status">
            <div className="course-box__users">
              <FontAwesomeIcon
                icon={faUsers}
                className="course-box__users-icon"
              />
              <span className="course-box__users-text">500</span>
            </div>
            <span className="course-box__price">
              {props.price == 0 ? "رایگان" : props.price.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="course-box__footer">
          <Link
            to={`/course-info/${props.shortName}`}
            className="course-box__footer-link"
          >
            مشاهده اطلاعات
            <FontAwesomeIcon
              icon={faArrowLeft}
              className="course-box__footer-icon"
            />
          </Link>
        </div>
      </div>
    </Link>
  );
}
