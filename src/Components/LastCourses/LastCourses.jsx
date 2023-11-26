import CourseBox from "../CourseBox/CourseBox";
import SectionHeader from "../SectionHeader/SectionHeader";
import AuthContext from "../../context/AuthContext";
import { useContext, useEffect, useState } from "react";

import "./LastCourses.css";

export default function LastCourses() {
  const authContext = useContext(AuthContext);
  const [getLastCourses, setGetLastCourses] = useState([]);

  useEffect(() => {
    fetch(`${authContext.baseURL}courses`)
      .then((res) => res.json())
      .then((result) => setGetLastCourses(result));
  }, []);

  return (
    <>
      <div className="courses">
        <div className="container">
          <SectionHeader
            title="جدیدترین دوره ها"
            desc="سکوی پرتاپ شما به سمت موفقیت"
            btnTitle="تمامی دوره ها"
            btnHref="/courses/1"
          />

          <div className="courses-content">
            <div className="container">
              <div className="row">
                {getLastCourses.slice(0, 6).map((course) => (
                  <CourseBox key={course._id} {...course} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
