import React from "react";
import "../../../styles/Reports.css";
import SideLayOut from "../../../components/base/Layout/SideLayOut"; 
const Reports = () => {
  return (
    <>
    <SideLayOut/>
    <div className="AdminSideImg"><img src="./images/AdminSideImage.svg"  alt="Admin side image"></img></div>
    <div className="Reportscontainer">
      <img src="./images/AdminBgImg.svg" className="Reportsbgimg"></img>
      <div className="Reportsdisplay">
        <label>Reports</label>
      </div>
      <div className="AdminSearch">
        <input type="search" className="searchinput" placeholder="&#128269; search"></input>
      </div>
     </div>
  </>
     
  );
};

export default Reports;
