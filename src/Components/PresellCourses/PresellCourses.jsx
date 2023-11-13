import React, { useEffect, useState } from "react";
import SectionHeader from "../SectionHeader/SectionHeader";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import CourseBox from "../CourseBox/CourseBox";

import "swiper/css";
import "swiper/css/pagination";
import "./PresellCourses.css";

export default function PresellCourses() {
  const [presellCourses, setPresellCourses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/v1/courses/presell")
      .then((res) => res.json())
      .then((result) => setPresellCourses(result));
  }, []);

  return (
    <div className="popular">
      <div className="container">
        <SectionHeader
          title="دوره های در حال پیش فروش"
          desc="متن تستی برای توضیحات دوره های پیش فروش"
        />
        <div className="courses-content">
          <div className="container">
            <div className="row">
              <Swiper
                slidesPerView={3}
                spaceBetween={30}
                loop={true}
                pagination={{
                  clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
              >
                {presellCourses.length &&
                  presellCourses.map((presell) => (
                    <SwiperSlide key={presell._id}>
                      <CourseBox {...presell} nocoll={true} />
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
