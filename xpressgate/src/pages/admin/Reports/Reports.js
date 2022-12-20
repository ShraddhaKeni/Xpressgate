import React from "react";
import "../../../styles/Reports.css";

import PaginationCalculate from '../../../components/GuardModule/Utils/paginationCalculate';

const Reports = () => {

  return (
    <>
      <div className="container pb-5">
        <div className='page-label'>
          <label>Subscription Plan</label>
        </div>
        <div className='main-container'>

          <div className='table-top-right-content  mt-5'>
            <div className='table-search pl-2'>
              <span><img src="/images/vendorlistsearch.svg" alt='search icon'></img></span>
              <span><input className='search' placeholder='Search' /></span>
            </div>

          </div>


          <div className="reports row row-cols-2 row-cols-md-3 g-3 p-5">
            <div className="reportfirst p-5">
              <div className="reportimage">
                <img src="/images/report.svg"></img>
              </div>
              <label className="ActivityReports">Activity Reports</label>
              <div className="ViewreportBtn">
                <button type="button" className="Viewbtn" >View Report</button>
              </div>

            </div>
            <div className="reportfirst  p-5">
              <div className="reportimage">
                <img src="/images/report.svg"></img>
              </div>
              <label className="ActivityReports">In out reports</label>
              <div className="ViewreportBtn">
                <button type="button" className="Viewbtn" >View Report</button>
              </div>

            </div>

            <div className="reportfirst p-5">
              <div className="reportimage">
                <img src="/images/report.svg"></img>
              </div>
              <label className="ActivityReports">Payment Reports</label>
              <div className="ViewreportBtn">
                <button type="button" className="Viewbtn" >View Report</button>
              </div>

            </div>
            <div className="reportfirst p-5">
              <div className="reportimage">
                <img src="/images/report.svg"></img>
              </div>
              <label className="ActivityReports">Security Round up <br /> reports</label>
              <div className="ViewreportBtn">
                <button type="button" className="Viewbtn" >View Report</button>
              </div>

            </div>
            <br /><br />
            <div className="reportfirst p-5">
              <div className="reportimage">
                <img src="/images/report.svg"></img>
              </div>
              <label className="ActivityReports">Complaints Reports</label>
              <div className="ViewreportBtn">
                <button type="button" className="Viewbtn" >View Report</button>
              </div>

            </div>
            <div className="pagination">
              <PaginationCalculate totalPages={10} postperPage={20} currentPage={2} paginate={10} /></div>
          </div>

        </div>
      </div>


    </>

  );
};


export default Reports;
