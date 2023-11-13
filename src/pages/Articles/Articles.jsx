import React, { useContext, useEffect, useState } from "react";
import Topbar from "../../Components/Topbar/Topbar";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import AuthContext from "../../context/AuthContext";
import ArticleBox from "../../Components/ArticleBox/ArticleBox";

export default function Articles() {
  const authContext = useContext(AuthContext);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch(`${authContext.baseURL}articles`)
      .then((res) => res.json())
      .then((result) => setCourses(result));
  }, []);

  return (
    <div>
      <Topbar />
      <Navbar />
      <div className="container">
        <div className="articles__content">
          <div className="row">
            {courses.map((course) => (
              <ArticleBox
                key={course._id}
                title={course.title}
                cover="images/blog/3.jpg"
                desc={course.description}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
