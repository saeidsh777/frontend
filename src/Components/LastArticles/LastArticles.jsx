import React, { useContext, useState, useEffect } from "react";
import ArticleBox from "../ArticleBox/ArticleBox";
import SectionHeader from "../SectionHeader/SectionHeader";
import AuthContext from "../../context/AuthContext";
import "./LastArticles.css";

export default function LastArticles() {
  const authContext = useContext(AuthContext);
  const [lastCourses, setLastCourses] = useState([]);

  useEffect(() => {
    fetch(`${authContext.baseURL}articles`)
      .then((res) => res.json())
      .then((result) => setLastCourses(result));
  }, []);
  return (
    <section className="articles">
      <div className="container">
        <SectionHeader
          title="جدیدترین مقاله ها"
          desc="پیش به سوی ارتقای دانش"
          btnTitle="تمامی مقاله ها"
          btnHref="/articles"
        />

        <div className="articles__content">
          <div className="row">
            {console.log(lastCourses)}
            {lastCourses.slice(0, 3).map((course) => (
              <ArticleBox
                key={course._id}
                title={course.title}
                cover="images/blog/3.jpg"
                desc={course.description}
                shortName={course.shortName}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
