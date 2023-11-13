import React, { useState, useEffect } from "react";
import SectionHeader from "../SectionHeader/SectionHeader";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import CourseBox from "../CourseBox/CourseBox";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./PopularCourses.css";

export default function PopularCourses() {
  const [popularCourses, setPopularCourses] = useState([]);
  
  useEffect(() => {
    fetch("http://localhost:4000/v1/courses/popular")
      .then((res) => res.json())
      .then((result) => setPopularCourses(result));
  }, []);
  

  return (
    <div className="popular">
      <div className="container">
        <SectionHeader
          title="محبوب ترین دوره ها"
          desc="دوره های محبوب بر اساس امتیاز دانشجوها"
        />

        <div className="courses-content">
          <div className="container">
            <div className="row">
              <Swiper
                slidesPerView={3}
                spaceBetween={30}
                pagination={{
                  clickable: true,
                }}
                loop={true}
                
                modules={[Pagination]}
                className="mySwiper"
              >
                {popularCourses.length &&
                  popularCourses.map((presell) => (
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
