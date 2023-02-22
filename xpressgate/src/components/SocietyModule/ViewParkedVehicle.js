import React from 'react';

import "../SocietyModule/Viewparking.css";

import PaginationCalculate from "../GuardModule/Utils/paginationCalculate";
import Societyheader from './Utils/Societyheader';
// import { Loader } from "../Loader";
// import ErrorScreen from '../../common/ErrorScreen';

const ViewParkedVehicle = () => {

  return (
    <div className="addguestcontainer4">
      <div id="addflatsection">
        <Societyheader/>
      </div>
      <div id="societynamesection">
        <div className="VP_societyname">
          <img src="/images/societyicon.svg" alt="Society image" />
          <label>Society Name</label>
        </div>
        {/* <div className='vgpsidelinks'>
         
          <a href='/viewguestparkingsection' className='VpSec'><b>View Guest Parking Section</b></a><br/><br/>
          <a href='/addguestparkingsection' className='ApSec'>Add Guest Parking Section</a><br/><br/>
         
        </div> */}
        <div className="viewparkedVehicle_sideimg">
          <img src="/images/societysideimg.svg" alt="dashboard sideimage" />
        </div>
      </div>
      <div className="addguestbackgroundimg">
        <div className='VPdisplay'>
          <label>View Parked Vehicle</label>
        </div>
        {/* <Loader loading={loading}> */}
          <div className='row'>
            <div className='VP_searchbox'>
              <span>
                <img src="/images/vendorlistsearch.svg" alt='search icon'></img>
                <input placeholder='Search' id="search_input" ></input>
              </span>
            </div>
          </div>
          <br/>
          <table id="viewparkingtable" class="table table-striped table-bordered table-sm " cellspacing="0" style={{ border: '2px solid black' }}>
            <thead>
              <tr>
                <th class="th-sm">Sr No.</th>
                <th class="th-sm">Block</th>
                <th class="th-sm">Name</th>
                <th class="th-sm">Guest Name</th>
                <th class="th-sm">Vehicle Number</th>
                <th class="th-sm">Status</th>
                
              </tr>
            </thead>
            <tbody>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
       
            </tbody>
          </table>
          <br/><br/>
          <PaginationCalculate totalPages={" "} postperPage={" "} currentPage={" "} paginate={" "}/>
        {/* </Loader> */}
      </div>
    </div>     
  );
}
export default ViewParkedVehicle;
