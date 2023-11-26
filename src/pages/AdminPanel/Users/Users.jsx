import React, { useEffect, useState } from "react";
import DataTable from "../../../Components/AdminPanel/DataTable/DataTable";
import swal from 'sweetalert'

export default function Users() {
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    getAllUsers();
  }, []);

  function getAllUsers() {
    let localStorageToken = JSON.parse(localStorage.getItem("user"));
    fetch("http://localhost:4000/v1/users", {
      headers: {
        Authorization: `Bearer ${localStorageToken.token}`,
      },
    })
      .then((res) => res.json())
      .then((result) => setAllUsers(result));
  }

  function deletHandler(userId) {
    let localStorageToken = JSON.parse(localStorage.getItem("user"));
    swal({
      title: "آیا از حذف مطمئن هستید ؟",
      icon: "warning",
      buttons: ["نه", "بلی"],
    }).then(
      (result) =>
        result &&
        fetch(`http://localhost:4000/v1/users/${userId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorageToken.token}`,
          },
        }).then((res) => {
          res.ok &&
            swal({
              title: "کاربر با موفقیت حذف شد",
              icon: "success",
              buttons: "متوجه شدم",
            }).then((res) => getAllUsers());
        })
    );
    
  }

  return (
    <DataTable title="کاربران">
      <table className="table">
        <thead>
          <tr>
            <th>شناسه</th>
            <th>نام خانوادگی</th>
            <th>ایمیل</th>
            <th>ویرایش</th>
            <th>حذف</th>
            <th>بن</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button type="button" className="btn btn-primary edit-btn">
                  ویرایش
                </button>
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-danger delete-btn"
                  onClick={() => deletHandler(user._id)}
                >
                  حذف
                </button>
              </td>
              <td>
                <button type="button" className="btn btn-danger delete-btn">
                  بن
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </DataTable>
  );
}
