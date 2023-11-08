import Pagination from "react-bootstrap/Pagination";
import Topbar from "../../Components/Topbar/Topbar";
import Navbar from "../../Components/Navbar/Navbar";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import Footer from "../../Components/Footer/Footer";
import CourseBox from "../../Components/CourseBox/CourseBox";
import AuthContext from "../../context/AuthContext";
import { useContext, useEffect, useState } from "react";

import "./Courses.css";

export default function Courses() {
  const authContext = useContext(AuthContext);
  const [allCourses, setAllCourses] = useState([]);

  useEffect(() => {
    fetch(`${authContext.baseURL}courses`)
      .then((res) => res.json())
      .then((result) => setAllCourses(result));
  }, []);

  const links = [
    { id: 1, title: "خانه", to: "/" },
    {
      id: 2,
      title: "آموزش برنامه نویسی فرانت‌اند",
      to: "/category-info/frontend",
    },
    {
      id: 3,
      title: "دوره متخصص جاوا اسکریپت",
      to: "/course-info/js-expert",
    },
  ];

  return (
    <div>
      <Topbar />
      <Navbar />
      <Breadcrumb links={links} />
      <section className="courses">
        <div className="container">
          <div className="courses-content">
            <div className="container">
              <div className="row">
                {allCourses.map((course) => (
                  <CourseBox key={course._id} {...course} />
                ))}
              </div>
            </div>
          </div>
          {allCourses.length && <PaginationBasic className="pagination" />}
        </div>
      </section>

      <Footer />
    </div>
  );
}

const PaginationBasic = () => {
  let active = 1;
  let items = [];
  for (let number = 1; number <= 5; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active}>
        {number}
      </Pagination.Item>
    );
  }
  return (
    <div>
      <Pagination size="lg">{items}</Pagination>
    </div>
  );
};
