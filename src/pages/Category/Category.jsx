import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
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
  const [filterCategory, setFilterCategory] = useState([]);
  const [coursePage, setCoursePage] = useState([]);
  const [searchCourses, setSearchCourses] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setFilterCategory(category);
  }, [category]);

  useEffect(() => {
    fetch(`${authContext.baseURL}courses/category/${categoryName}`)
      .then((res) => res.json())
      .then((result) => setCategory(result));
  }, [categoryName]);

  const onChangeSelection = (e) => {
    let selectBoxValue = e.target.value;
    let filteredCategory = null;
    let newUrl = location.pathname.replace(/\/\w+$/g, "/1");
    navigate(newUrl);

    switch (selectBoxValue) {
      case "default": {
        setFilterCategory(category);
        break;
      }
      case "free": {
        filteredCategory = category.filter((item) => item.price == 0);
        setFilterCategory(filteredCategory);
        break;
      }
      case "frist": {
        filteredCategory = [...category].reverse();
        setFilterCategory(filteredCategory);
        break;
      }
      case "mony": {
        filteredCategory = category.filter((item) => item.price > 0);
        setFilterCategory(filteredCategory);
        break;
      }
      default: {
        setFilterCategory(category);
      }
    }
  };

  const onChangeSearchInput = (e) => {
    setSearchCourses(e.target.value);
    let allSearchCourses = category.filter(
      (item) => item.name.includes(e.target.value)
    );
    setFilterCategory(allSearchCourses);
  };

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
                  onChange={(e) => onChangeSelection(e)}
                >
                  <option value={"default"}>مرتب سازی پیش فرض</option>
                  <option value={"free"}>مرتب سازی رایگان </option>
                  <option value={"frist"}>مربت سازی بر اساس اولین</option>
                  <option value={"mony"}>مربت سازی بر اساس پولی</option>
                </select>
              </div>
            </div>

            <div className="courses-top-bar__left">
              <form action="#" className="courses-top-bar__form">
                <input
                  type="text"
                  className="courses-top-bar__input"
                  placeholder="جستجوی دوره ..."
                  value={searchCourses}
                  onChange={(e) => onChangeSearchInput(e)}
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
                  <div className="alert alert-danger text-center mt-5">دروه با این عنوان وجود ندارد</div>
                )}
              </div>
            </div>
          </div>

          <Pagination
            allCourses={filterCategory}
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
