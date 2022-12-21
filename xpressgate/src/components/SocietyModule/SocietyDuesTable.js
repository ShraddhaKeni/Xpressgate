import React,{useState,useEffect,useRef} from "react";
import "../SocietyModule/SocietyDuesTable.css";
import Societyheader from "./Utils/Societyheader";
import PaginationCalculate from "../GuardModule/Utils/paginationCalculate";

const SocietyDuesTable = () => {


  return (
    <div className="addguestcontainer4">
    <div id="addflatsection">
        <Societyheader/>
    
    </div>
      <div id="societynamesection">
        <div className="SDT_societyname">
          <img src="/images/societyicon.svg" alt="Society image" />
          <label>Society Name</label>
        </div>
        <br/>
        
        <div className="SDT_sideimage">
          <img src="/images/communitysideimg.svg" alt="dashboard sideimage" />
        </div>
      </div>
      <div className="addguestbackgroundimg">
        <div className="SDT_display">
          <label>Society Dues</label>
        </div>
        <br/>
        <div className="AddSDBlock">
            <button type="button" className="SDAddBTN"  onClick={() => {
                window.location.href = "/societydues";
              }}>&#10011; Add Society Payment</button>
        </div>
        <table id="viewparkingtable" class="table table-striped table-bordered table-sm " cellspacing="0" style={{ border: '2px solid black' }}>
          <thead>
            <tr>
              <th class="th-sm">Type</th>
              <th class="th-sm">Block </th>
              <th class="th-sm">Flat  No</th>
              <th class="th-sm">Resident Name</th>
              <th class="th-sm">Amount</th>
              <th class="th-sm">Payment Date</th>
              <th class="th-sm">Due Date</th>
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

export default SocietyDuesTable;
