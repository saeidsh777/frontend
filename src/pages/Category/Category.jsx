import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import Topbar from "../../Components/Topbar/Topbar";
import Navbar from "../../Components/Navbar/Navbar";
import CourseBox from "../../Components/CourseBox/CourseBox";
import Pagination from "../../Components/Pagination/Pagination";
import Footer from "../../Components/Footer/Footer";

import "./Category.css";

export default function Category() {
  const authContext = useContext(AuthContext);

  const { categoryName, page } = useParams();
  const [category, setCategory] = useState([]);
  const [coursePage, setCoursePage] = useState([]);

  useEffect(() => {
    fetch(`${authContext.baseURL}courses/category/${categoryName}`)
      .then((res) => res.json())
      .then((result) => setCategory(result));
  }, [categoryName]);

  return (
    <>
      <Topbar />
      <Navbar />

      <section className="courses">
        <div className="container">
          <div className="courses-top-bar">
            <div className="courses-top-bar__right">
              <div className="courses-top-bar__row-btn courses-top-bar__icon--active">
                <i className="fas fa-border-all courses-top-bar__icon"></i>
              </div>
              <div className="courses-top-bar__column-btn">
                <i className="fas fa-align-left courses-top-bar__icon"></i>
              </div>

              <div className="courses-top-bar__selection">
                <select
                  className="selection"
                  defaultValue={"مرتب سازی پیش فرض"}
                >
                  <option>مرتب سازی پیش فرض</option>
                  <option>مربت سازی بر اساس محبوبیت</option>
                  <option>مربت سازی بر اساس امتیاز</option>
                  <option>مربت سازی بر اساس آخرین</option>
                  <option>مربت سازی بر اساس ارزان ترین</option>
                  <option>مربت سازی بر اساس گران ترین</option>
                </select>
              </div>
            </div>

            <div className="courses-top-bar__left">
              <form action="#" className="courses-top-bar__form">
                <input
                  type="text"
                  className="courses-top-bar__input"
                  placeholder="جستجوی دوره ..."
                />
                <i className="fas fa-search courses-top-bar__search-icon"></i>
              </form>
            </div>
          </div>

          <div className="courses-content">
            <div className="container">
              <div className="row">
                {coursePage.length ? (
                  coursePage.map((categor) => (
                    <CourseBox key={categor._id} {...categor} />
                  ))
                ) : (
                  <div>نیست</div>
                )}
              </div>
            </div>
          </div>

          <Pagination
            allCourses={category}
            setCoursePage={setCoursePage}
            page={page}
            count={3}
            className="pagination"
            src={`/category-info/${categoryName}/`}
          />
        </div>
      </section>

      <Footer />
    </>
  );
}
