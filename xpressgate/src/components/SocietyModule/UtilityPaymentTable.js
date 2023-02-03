import React,{useState,useEffect,useRef} from "react";
import "../SocietyModule/UtilityPaymentTable.css";
import Societyheader from "./Utils/Societyheader";
import PaginationCalculate from "../GuardModule/Utils/paginationCalculate";
import { Loader } from "../Loader";

const UtilityPaymentTable = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(false);
  }, [])

  return (
    <div className="addguestcontainer4">
    <div id="addflatsection">
        <Societyheader/>
    </div>
      <div id="societynamesection">
        <div className="UPT_societyname">
          <img src="/images/societyicon.svg" alt="Society image" />
          <label>Society Name</label>
        </div>
        <br/>
        <div className="UPT_sideimage">
          <img src="/images/societysideimg.svg" alt="dashboard sideimage" />
        </div>
      </div>
      <div className="addguestbackgroundimg">
        <div className="UPT_display">
          <label>Utility Payment</label>
        </div>
        <br/>
        <Loader loading={loading}>
        <div className='vendorpayment_search'>
                <span><img src="/images/vendorlistsearch.svg" alt='search icon'></img>
                  <input placeholder='Search'></input></span>
            </div>
          <div className="AddVPBlock">
              <button type="button" className="UPAddBTN"  onClick={() => {
                  window.location.href = "/utilitypayment";
                }}>&#10011; Add Utility Payment</button>
          </div>
          <table id="viewparkingtable" class="table table-striped table-bordered table-sm " cellspacing="0" style={{ border: '2px solid black' }}>
            <thead>
              <tr>
                <th class="th-sm">Utility Type</th>
                <th class="th-sm">Block </th>
                <th class="th-sm">Flat  No.</th>
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
        </Loader>
      </div>
    </div>
  );
};
export default UtilityPaymentTable;