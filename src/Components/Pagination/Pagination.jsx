import { useEffect, useState } from "react";
import "./Pagination.css";
import { Link } from "react-router-dom";

export default function Pagination({
  page,
  allCourses,
  setCoursePage,
  count,
  src,
}) {
  const [pageCount, setPageCount] = useState(null);

  useEffect(() => {
    setPageCount(Math.ceil(allCourses.length / count));
    let endIndex = page * count;
    let startIndex = endIndex - count;
    setCoursePage(allCourses.slice(startIndex, endIndex));
  }, [page, allCourses]);

  return (
    <div className="courses-pagination">
      <ul className="courses__pagination-list">
        <li className="courses__pagination-item">
          <Link
            to={`${Number(page) === 1 ? src + "1" : src + (Number(page) - 1)}`}
            className="courses__pagination-link"
          >
            <i className="fas fa-long-arrow-alt-right courses__pagination-icon"></i>
          </Link>
        </li>

        {Array(pageCount)
          .fill(0)
          .map((pagee, index) => (
            <li key={index} className="courses__pagination-item">
              <Link
                to={`${src + (index + 1)}`}
                className={`${
                  index + 1 === Number(page)
                    ? "courses__pagination-link--active courses__pagination-link"
                    : "courses__pagination-link"
                }`}
              >
                {index + 1}
              </Link>
            </li>
          ))}

        <li className="courses__pagination-item">
          <Link
            to={`${
              Number(page) === count ? src + count : src + (Number(page) + 1)
            }`}
            className="courses__pagination-link"
          >
            <i className="fas fa-long-arrow-alt-left courses__pagination-icon"></i>
          </Link>
        </li>
      </ul>
    </div>
  );
}
