import React,{useState,useEffect,useRef} from "react";
import "../SocietyModule/VendorPaymentTable.css";
import Societyheader from "./Utils/Societyheader";
import PaginationCalculate from "../GuardModule/Utils/paginationCalculate";

const VendorPaymentTable = () => {


  return (
    <div className="addguestcontainer4">
    <div id="addflatsection">
        <Societyheader/>
    
    </div>
      <div id="societynamesection">
        <div className="VPT_societyname">
          <img src="/images/societyicon.svg" alt="Society image" />
          <label>Society Name</label>
        </div>
        <br/>
        
        <div className="VPT_sideimage">
          <img src="/images/communitysideimg.svg" alt="dashboard sideimage" />
        </div>
      </div>
      <div className="addguestbackgroundimg">
        <div className="VPT_display">
          <label>Vendor</label>
        </div>
        <br/>
        <div className="AddVPBlock">
            <button type="button" className="VPAddBTN"  onClick={() => {
                window.location.href = "/vendorpayment";
              }}>&#10011; Add Vendor Payment</button>
        </div>
        <table id="viewparkingtable" class="table table-striped table-bordered table-sm " cellspacing="0" style={{ border: '2px solid black' }}>
          <thead>
            <tr>
              <th class="th-sm">Vendor</th>
              <th class="th-sm">Block </th>
              <th class="th-sm">Flat  No.</th>
              <th class="th-sm">Resident Name</th>
              <th class="th-sm">Amount</th>
              <th class="th-sm">Status</th>
            </tr>
          </thead>
          <tbody>
              {/* {currentPosts.map((item,index)=>{
               
                return(
                 
                  <tr onClick={()=>guardDetails(item.id)}>
                   <td>{currentPage<=2?(currentPage-1)*12+(index+1):(currentPage-1+1)+(index+1)}</td>
                    <td >{item.firstname} {item.lastname}</td>
                    <td>{item.mobileno}</td>
                    <td>{item.email}</td>
                    <td>{item.status==false?'Inactive':'Active'}</td>
                </tr>
                )
              })} */}
          </tbody>
        </table>
        <br/><br/>
        <PaginationCalculate totalPages={" "} postperPage={" "} currentPage={" "} paginate={" "}/>


      </div>
    </div>
       
       
    
  );
};

export default VendorPaymentTable;
