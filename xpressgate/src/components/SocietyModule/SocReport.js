import React,{useState,useEffect,useRef} from "react";
import "../SocietyModule/SocReport.css";
import LogOut from "../SocietyModule/Utils/LogOut";
import { getBlocks } from "./common/common";
import axios from "axios";
import Societyheader from "./Utils/Societyheader";

const SocReport = () => {


  return (
    <div className="addguestcontainer4">
    <div id="addflatsection">
        <Societyheader/>
    
    </div>
      <div id="societynamesection">
        <div className="SD_societyname">
          <img src="/images/societyicon.svg" alt="Society image" />
          <label>Society Name</label>
        </div>
        <br/>
        <div className="SOC_report_sidelink">
            <a href="/socreports" className="Reportsidelink">Reports</a>
        </div>
        <div className="SOC_Report_sideImg">
          <img src="/images/communitysideimg.svg" alt="dashboard sideimage" />
        </div>
      </div>
      <div className="addguestbackgroundimg">
        <div className="SD_display">
          <label>Reports</label>
        </div>
        
        <div className="row row-cols-1 row-cols-md-2 g-4 REPfullcardscss">
          <div className="col">
            <div className="REPdashboardcard">
            <span><img src="/images/report.svg" className="REP_img"></img></span>
            <span><label className="ActReport">Activity Reports</label></span>
            <span><button type="button" className="VReportBtn">View Report</button></span>

            </div>
          </div>
          <div className="col">
            <div className="REPdashboardcard">
            <span><img src="/images/report.svg" className="REP_img"></img></span>
            <span><label className="ActReport">In out Reports</label></span>
            <span><button type="button" className="VReportBtn">View Report</button></span>
            </div>
          </div>
          <div className="col">
            <div className="REPdashboardcard">
            <span><img src="/images/report.svg" className="REP_img"></img></span>
            <span><label className="ActReport">Payment Reports</label></span>
            <span><button type="button" className="VReportBtn">View Report</button></span>
            </div>
          </div>
          <div className="col">
            <div className="REPdashboardcard">
            <span><img src="/images/report.svg" className="REP_img"></img></span>
            <span><label className="ActSRUPReport">Security Round up <br/>Reports</label></span>
            <span><button type="button" className="VReportBtn">View Report</button></span>
            </div>
          </div>
          <div className="col">
            <div className="REPdashboardcard">
            <span><img src="/images/report.svg" className="REP_img"></img></span>
            <span><label className="ActReport">Complaints Reports</label></span>
            <span><button type="button" className="VReportBtn">View Report</button></span>
            </div>
          </div>
          </div>
          
      </div>
    </div>
       
       
    
  );
};

export default SocReport;
