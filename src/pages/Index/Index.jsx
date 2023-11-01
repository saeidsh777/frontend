import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import AboutUs from "../../Components/AboutUs/AboutUs";
import Header from "../../Components/Header/Header";
import LastArticles from "../../Components/LastArticles/LastArticles";
import LastCourses from "../../Components/LastCourses/LastCourses";
import PopularCourses from "../../Components/PopularCourses/PopularCourses";
import PresellCourses from "../../Components/PresellCourses/PresellCourses";
import Footer from "../../Components/Footer/Footer";
import LoginAlert from "../../Components/LoginAlert/LoginAlert";

import "./Index.css";

export default function Index() {
  const authContext = useContext(AuthContext);

  return (
    <>
      {authContext.clickBe && <LoginAlert />}
      <Header />
      <LastCourses />
      <AboutUs />
      <PopularCourses />
      <PresellCourses />
      <LastArticles />
      <Footer />
    </>
  );
}
