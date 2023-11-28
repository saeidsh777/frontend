import React, { useEffect, useState } from "react";
import DataTable from "../../../Components/AdminPanel/DataTable/DataTable";
import Input from "../../../Components/Input/Input";
import { useForm } from "../../../hooks/useForm";
import swal from "sweetalert";

import "./AdminCategory.css";

export default function AdminCategory() {
  const [category, setCategory] = useState([]);
  const [formState, onValidHandled] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      shortname: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    getAllCategory();
  }, []);

  const createNewCategory = (event) => {
    event.preventDefault();
    const localStorageData = JSON.parse(localStorage.getItem("user"));

    const newCategoryInfo = {
      title: formState.inputs.title.value,
      name: formState.inputs.shortname.value,
    };

    fetch("http://localhost:4000/v1/category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorageData.token}`,
      },
      body: JSON.stringify(newCategoryInfo),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        swal({
          title: "دسته بندی مورد نظر با موفقیت اضافه شد",
          icon: "success",
          buttons: "اوکی",
        }).then(() => {
          getAllCategory();
        });
      });
  };

  function getAllCategory() {
    fetch("http://localhost:4000/v1/category")
      .then((res) => res.json())
      .then((redult) => {
        setCategory(redult);
      });
  }

  const removeCategory = (categoryID) => {
    let localData = JSON.parse(localStorage.getItem("user"));
    swal({
      title: "آیا از حذف مطمئن هستید",
      icon: "warning",
      buttons: ["نه", "بلی"],
    }).then(
      (result) =>
        result &&
        fetch(`http://localhost:4000/v1/category/${categoryID}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localData.token}`,
          },
        })
          .then((res) => res.json())
          .then((result) => getAllCategory())
    );
  };

  return (
    <>
      <div className="home-content-latset-users">
        <div className="container-fluid" id="home-content">
          <div className="container">
            <div className="home-title">
              <span>افزودن دسته‌بندی جدید</span>
            </div>
            <form className="form">
              <div className="col-6">
                <div className="name input">
                  <label className="input-title">عنوان</label>
                  <Input
                    element="input"
                    onValidHandled={onValidHandled}
                    type="text"
                    typeName="input-no-valid"
                    id="title"
                    placeholder="لطفا عنوان را وارد کنید..."
                  />
                  <span className="error-message text-danger"></span>
                </div>
              </div>
              <div className="col-6">
                <div className="name input">
                  <label className="input-title">اسم کوتاه</label>
                  <Input
                    element="input"
                    onValidHandled={onValidHandled}
                    type="text"
                    typeName="input-no-valid"
                    id="shortname"
                    placeholder="لطفا اسم کوتاه را وارد کنید..."
                  />
                  <span className="error-message text-danger"></span>
                </div>
              </div>
              <div className="col-12">
                <div className="bottom-form">
                  <div className="submit-btn">
                    <input
                      type="submit"
                      value="افزودن"
                      onClick={createNewCategory}
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <DataTable title="دوره‌ها">
        <table className="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>عنوان</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {category.map((categor, index) => (
              <tr key={categor._id}>
                <td>{index + 1}</td>
                <td>{categor.title}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger delete-btn"
                    onClick={() => removeCategory(categor._id)}
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
