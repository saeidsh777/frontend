import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../Components/AdminPanel/Sidebar/Sidebar";
import Topbar from "../../Components/AdminPanel/Topbar/Topbar";

import "./AdminPanel.css";

export default function AdminPanel() {
  return (
    <>
      <div id="content">
        <Sidebar />
        <div id="home" className="col-10">
          <Topbar />
          <div className="container-fluid" id="home-content">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
