import React, { useEffect, useState } from "react";
import DataTable from "../../../Components/AdminPanel/DataTable/DataTable";
import swal from "sweetalert";
import { useForm } from "../../../hooks/useForm";

import "./Courses.css";
import Input from "../../../Components/Input/Input";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [courseCategory, setCourseCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [formState, onValidHandled] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      shortName: {
        value: "",
        isValid: false,
      },
      Price: {
        value: "",
        isValid: false,
      },
      support: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  const [courseStatus, setCourseStatus] = useState("");
  const [courseCover, setCourseCover] = useState({});

  useEffect(() => {
    getAllCourses();
    fetch(`http://localhost:4000/v1/category`)
      .then((res) => res.json())
      .then((allCategories) => {
        setCategories(allCategories);
      });
  }, []);

  const getAllCourses = () => {
    const localStorageData = JSON.parse(localStorage.getItem("user"));
    fetch("http://localhost:4000/v1/courses", {
      headers: {
        Authorization: `Bearer ${localStorageData.token}`,
      },
    })
      .then((res) => res.json())
      .then((allCourses) => {
        setCourses(allCourses);
      });
  };

  function removeCourses(courseID) {
    const localStorageData = JSON.parse(localStorage.getItem("user"));
    swal({
      title: "آیا از حذف مطمئن هستید؟",
      icon: "warning",
      buttons: ["خیر", "بلی"],
    }).then(
      (result) =>
        result &&
        fetch(`http://localhost:4000/v1/courses/${courseID}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorageData.token}`,
          },
        }).then((res) => {
          res.ok
            ? swal({
                title: "حذف شد.",
                icon: "success",
                buttons: "اکی",
              }).then(getAllCourses())
            : swal({
                title: "حذف با مشکل مواجه شد.",
                icon: "error",
                buttons: "اکی",
              });
        })
    );
  }

  const selectCategory = (event) => {
    setCourseCategory(event.target.value);
  };

  const addNewCours = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("name", formState.inputs.name.value);
    formData.append("description", formState.inputs.description.value);
    formData.append("shortName", formState.inputs.shortName.value);
    formData.append("categoryID", courseCategory);
    formData.append("Price", formState.inputs.Price.value);
    formData.append("support", formState.inputs.support.value);
    formData.append("status", courseStatus);
    formData.append("categoryID", courseCover);

    const localStorageData = JSON.parse(localStorage.getItem("user"));
    fetch("http://localhost:4000/v1/courses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorageData.token}`,
      },
      body: formData,
    }).then(
      (res) =>
        res.ok &&
        swal({
          title: "دوره با موفقیت اضافه شد",
          icon: "success",
          buttons: "اکی",
        }).then(() => getAllCourses())
    );
  };

  return (
    <>
      <div className="container-fluid" id="home-content">
        <div className="container">
          <div className="home-title">
            <span>افزودن دوره جدید</span>
          </div>
          <form className="form">
            <div className="col-6">
              <div className="name input">
                <label className="input-title">نام دوره</label>
                <Input
                  typeName="input-no-valid"
                  onValidHandled={onValidHandled}
                  id="name"
                  type="text"
                  placeholder="لطفا نام دوره را وارد کنید..."
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="price input">
                <label className="input-title">توضیحات دوره</label>
                <Input
                  typeName="input-no-valid"
                  onValidHandled={onValidHandled}
                  id="description"
                  type="text"
                  placeholder="لطفا توضیحات دوره را وارد کنید..."
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="number input">
                <label className="input-title">تعداد دوره</label>
                <Input
                  typeName="input-no-valid"
                  onValidHandled={onValidHandled}
                  id="shortName"
                  type="text"
                  placeholder="لطفا تعداد دوره را وارد کنید..."
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="price input">
                <label className="input-title">قیمت دوره</label>
                <Input
                  typeName="input-no-valid"
                  onValidHandled={onValidHandled}
                  id="Price"
                  type="text"
                  placeholder="لطفا قیمت دوره را وارد کنید..."
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="price input">
                <label className="input-title">نحوه پشتیبانی دوره</label>
                <Input
                  typeName="input-no-valid"
                  onValidHandled={onValidHandled}
                  id="support"
                  type="text"
                  placeholder="لطفا نحوه پشتیبانی دوره را وارد کنید..."
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="number input">
                <label className="input-title">دسته‌بندی دوره</label>
                <select onChange={selectCategory}>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.title}
                    </option>
                  ))}
                </select>
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-4">
              <div className="file">
                <label className="input-title">عکس دوره</label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setCourseCover(e.target.files[0])}
                />
              </div>
            </div>
            <div className="col-4">
              <div className="presell">
                <label className="input-title">وضعیت دوره</label>
                <div className="radios">
                  <div className="presell-true">
                    <label>
                      <span>در حال برگزاری</span>
                      <input
                        type="radio"
                        value="start"
                        name="presell"
                        onInput={(e) => setCourseStatus(e.target.value)}
                      />
                    </label>
                  </div>
                  <div className="presell-false">
                    <label>
                      <span>پیش فروش</span>
                      <input
                        type="radio"
                        value="presell"
                        name="presell"
                        onInput={(e) => setCourseStatus(e.target.value)}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="bottom-form">
                <div className="submit-btn">
                  <input
                    type="submit"
                    value="افزودن"
                    onClick={(e) => addNewCours(e)}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <DataTable title="دوره‌ها">
        <table className="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>عنوان</th>
              <th>مبلغ</th>
              <th>وضعیت</th>
              <th>لینک</th>
              <th>مدرس</th>
              <th>دسته بندی</th>
              <th>ویرایش</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr key={course._id}>
                <td>{index + 1}</td>
                <td>{course.name}</td>
                <td>
                  {course.price === 0
                    ? "رایگان"
                    : course.price.toLocaleString()}
                </td>
                <td>
                  {course.isComplete === 0 ? "در حال برگزاری" : "تکمیل شده"}
                </td>
                <td>{course.shortName}</td>
                <td>{course.creator}</td>
                <td>{course.categoryID.title}</td>
                <td>
                  <button type="button" className="btn btn-primary edit-btn">
                    ویرایش
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger delete-btn"
                    onClick={() => removeCourses(course._id)}
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataTable>
    </>
  );
}
