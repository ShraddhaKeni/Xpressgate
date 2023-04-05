import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../SocietyModule/Viewparking.css";
import { ButtonBase, Icon, IconButton } from '@mui/material';
import PaginationCalculate from "../GuardModule/Utils/paginationCalculate";
import Societyheader from './Utils/Societyheader';
// import { Loader } from "../Loader";
import Table from 'react-bootstrap/Table';
import { ToastMessage } from "../ToastMessage";
import ErrorScreen from '../../common/ErrorScreen';
import { deleteCommunity } from '../../common/admin/admin_api';

const SocietyInOutBook = () => {
  
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
        <div className="ParticipantsideImg">
          <img src="/images/societysideimg.svg" alt="dashboard sideimage" />
        </div>
      </div>
      <div className="addguestbackgroundimg">
      {/* <ToastMessage show={toast.show} message={toast.message} type={toast.type} handleClose={() => { setToast({ show: false }) }} /> */}
        <div className='VPdisplay'>
          <label>In-Out Book</label>
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
          <Table id="InoutBooktable" class="table table-striped table-bordered table-sm " cellspacing="0" style={{ border: '2px solid black' }} size='sm' responsive>
                    <thead>
                      <tr>
                        <th class="th-sm">Sr No.</th>
                        <th class="th-sm">Name</th>
                        <th class="th-sm">Visitor Type</th>
                        <th class="th-sm">Block</th>
                        <th class="th-sm">Flat No.</th>
                        <th class="th-sm">Date</th>
                        <th class="th-sm">In Time</th>
                        <th class="th-sm">Out Time</th>
                        <th class="th-sm">Parking Section</th>
                        <th class="th-sm">Parking Time</th>
                        <th class="th-sm">Vehicle Number</th>
                        <th class="th-sm">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* {currentPosts.map((iodata, index) => {
                        return ( */}
                          <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            {/* <td>{(currentPage - 1) * 12 + (index + 1)}</td>
                            <td >{iodata.guestFirstName} {iodata.guestLastName}</td>
                            <td>{iodata.type == '1' ? 'Guest' : iodata.type == '2' ? 'Vendor' : 'Daily Helper'}</td>
                            <td>{iodata.block_name}</td>
                            <td>{iodata.flat_number}</td>
                            <td>{date}</td>
                            <td>{dateTimeFormat(iodata.intime)}</td>
                            <td>{iodata.parking_section_details}</td>
                            <td>{iodata.parking_time}</td>
                            <td>{iodata.vehicle_no}</td>
                            <td>{iodata.status == '1' ? 'In' : 'Out'}</td> */}
                          </tr>
                      
                    </tbody>
                  </Table>
          <br/>
          {/* <PaginationCalculate totalPages={guestparkingSection.length} postperPage={postPerPage} currentPage={currentPage} paginate={paginate}/> */}
        {/* </Loader> */}
      </div>
    </div>     
  );
}
export default SocietyInOutBook;
