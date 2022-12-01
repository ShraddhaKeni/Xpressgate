import React from "react";
import "../../../styles/Reports.css";
import SideLayOut from "../../../components/base/Layout/SideLayOut"; 
import PaginationCalculate from '../../../components/GuardModule/Utils/paginationCalculate';

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
      <div className="Reports">
        <div className="reportfirst">
          <label className="ActivityReports">Activity Reports</label>
          <div className="ViewreportBtn">
            <button type="button" className="Viewbtn" >View Report</button>
          </div>
          <div className="reportimage">
            <img src="./images/report.svg"></img>
          </div>
        </div>
        <div className="reportsecond">
          <label className="ActivityReports">In out reports</label>
          <div className="ViewreportBtn">
            <button type="button" className="Viewbtn" >View Report</button>
          </div>
          <div className="reportimage">
            <img src="./images/report.svg"></img>
          </div>
          </div>
          <br/><br/>
          <div className="Reports2">
        <div className="reportfirst">
          <label className="ActivityReports">Payment Reports</label>
          <div className="ViewreportBtn">
            <button type="button" className="Viewbtn" >View Report</button>
          </div>
          <div className="reportimage">
            <img src="./images/report.svg"></img>
          </div>
        </div>
        <div className="reportsecond">
          <label className="securityround">Security Round up <br/> reports</label>
          <div className="ViewreportBtn1">
            <button type="button" className="Viewbtn1" >View Report</button>
          </div>
          <div className="reportimage1">
            <img src="./images/report.svg"></img>
          </div>
          </div>
        </div>
        <br/><br/>
        <div className="Reports3">
        <div className="reportfirst1">
          <label className="complaintrec">Complaints Reports</label>
          <div className="ViewreportBtn2">
            <button type="button" className="Viewbtn" >View Report</button>
          </div>
          <div className="reportimage2">
            <img src="./images/report.svg"></img>
          </div>
        </div>
       
        </div>
        <div className="pagination">
        <PaginationCalculate totalPages={10} postperPage={20} currentPage={2} paginate={10} /></div>
     </div>
     </div>
  </>
     
  );
};

export default Reports;
