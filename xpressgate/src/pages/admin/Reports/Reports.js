import React from "react";
import "../../../styles/Reports.css";

import PaginationCalculate from '../../../components/GuardModule/Utils/paginationCalculate';

const Reports = () => {

  return (
    <>
     <img src='/images/side_bar_img.svg' className='Premise_side_Img' />
      <div>
        <div className='page-label'>
          <label>Reports</label>
        </div>
        <div>

        <div className="row row-cols-1 row-cols-md-2 g-4 REPfullcardscss">
          <div className="col">
            <div className="REPdashboardcard">
            <span><img src="/images/report.svg" alt="report logo" className="REP_img"></img></span>
            <span><label className="ActReport">Activity Reports</label></span>
            <span><button type="button" className="VReportBtn">View Report</button></span>

            </div>
          </div>
          <div className="col">
            <div className="REPdashboardcard">
            <span><img src="/images/report.svg" alt="report logo" className="REP_img"></img></span>
            <span><label className="ActReport">In out Reports</label></span>
            <span><button type="button" className="VReportBtn">View Report</button></span>
            </div>
          </div>
          <div className="col">
            <div className="REPdashboardcard">
            <span><img src="/images/report.svg" alt="report logo" className="REP_img"></img></span>
            <span><label className="ActReport">Payment Reports</label></span>
            <span><button type="button" className="VReportBtn">View Report</button></span>
            </div>
          </div>
          <div className="col">
            <div className="REPdashboardcard">
            <span><img src="/images/report.svg" alt="report logo" className="REP_img"></img></span>
            <span><label className="ActSRUPReport">Security Round up <br/>Reports</label></span>
            <span><button type="button" className="VReportBtn">View Report</button></span>
            </div>
          </div>
          <div className="col">
            <div className="REPdashboardcard">
            <span><img src="/images/report.svg" alt="report logo" className="REP_img"></img></span>
            <span><label className="ActReport">Complaints Reports</label></span>
            <span><button type="button" className="VReportBtn">View Report</button></span>
            </div>
          </div>
          </div>
          
      </div>
    </div>

       
    


    </>

  );
};


export default Reports;
