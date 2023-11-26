import React, { useEffect, useState } from "react";

export default function Topbar() {
  const [adminInfo, setAdminInfo] = useState({});
  const [adminNotifications, setAdminNotifications] = useState([]);
  const [isShowNotificationsBox, setIsShowNotificationsBox] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      const localStorageData = JSON.parse(localStorage.getItem("user"));
      fetch(`http://localhost:4000/v1/auth/me`, {
        headers: {
          Authorization: `Bearer ${localStorageData.token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setAdminInfo(data);
          setAdminNotifications(data.notifications);
        });
    }
  }, []);

  function seeNotification(notficationID) {
    const localStorageData = JSON.parse(localStorage.getItem("user"));
    fetch(`http://localhost:4000/v1/notifications/see/${notficationID}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorageData.token}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        fetch(`http://localhost:4000/v1/auth/me`, {
          headers: {
            Authorization: `Bearer ${localStorageData.token}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            setAdminInfo(data);
            setAdminNotifications(data.notifications);
          });
      });
  }

  return (
    <div className="container-fluid">
      <div className="container">
        <div
          className={`home-header ${
            isShowNotificationsBox && "active-modal-notfication"
          }`}
        >
          <div className="home-right">
            <div className="home-searchbar">
              <input
                type="text"
                className="search-bar"
                placeholder="جستجو..."
              />
            </div>
            <div className="home-notification">
              <button
                type="button"
                onMouseEnter={() => setIsShowNotificationsBox(true)}
              >
                <i className="far fa-bell"></i>
              </button>
            </div>
            <div
              className="home-notification-modal"
              onMouseLeave={() => setIsShowNotificationsBox(false)}
            >
              <ul className="home-notification-modal-list">
                {adminNotifications.length > 0 ? (
                  adminNotifications.map((notification) => (
                    <li
                      key={notification._id}
                      className="home-notification-modal-item"
                    >
                      <span className="home-notification-modal-text">
                        {notification}
                      </span>
                      <label className="switch">
                        <a
                          href="javascript:void(0)"
                          onClick={() => seeNotification(notification._id)}
                        >
                          دیدم
                        </a>
                      </label>
                    </li>
                  ))
                ) : (
                  <li className="home-notification-modal-item">
                    <span className="home-notification-modal-text">
                      پیغامی وجود ندارد
                    </span>
                  </li>
                )}
              </ul>
            </div>
          </div>
          <div className="home-left">
            <div className="home-profile">
              <div className="home-profile-image">
                <a href="#">
                  <img src="/images/logo/Logo.png" alt="" />
                </a>
              </div>
              <div className="home-profile-name">
                <a href="#">{adminInfo.name}</a>
              </div>
              <div className="home-profile-icon">
                <i className="fas fa-angle-down"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
