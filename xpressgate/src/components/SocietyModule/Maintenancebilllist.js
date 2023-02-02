import React from "react";
import "../SocietyModule/Maintenancebilllist.css";
import LogOut from "./Utils/LogOut";
// import { Button } from 'react-bootstrap';
import ReactPaginate from "react-paginate";
import { useState, useEffect } from "react";
import axios from "axios";
import PaginationCalculate from "../GuardModule/Utils/paginationCalculate";
import Societyheader from "./Utils/Societyheader";
import { useNavigate } from "react-router-dom";
import { Loader } from "../Loader";
import { ButtonBase, Icon, IconButton } from '@mui/material';

const Maintenancebilllist = () => {
  const [loading, setLoading] = useState(false)
  return (
    <div className="addguestcontainer4">
      <div id="addflatsection">
        <Societyheader />
      </div>
      <div id="societynamesection">
        <div className="EN_societyname">
          <img src="/images/societyicon.svg" alt="Society image" />
          <label>Society Name</label>
        </div>

        <div class="maintenancelist">
          <a href="/maintenancebilllist" class="MSLList">Maintenance Bill List</a><br /><br />
          <a href="/addmaintenancebill" class="Addmaintenancelink"><b>Add Maintenance Bill</b></a>
        </div>
        <div className="EN_sideimg">
          <img src="/images/communitysideimg.svg" alt="dashboard sideimage" />
        </div>
      </div>
      <div className="addguestbackgroundimg">

        <div className="EN_display">
          <label>Maintenance Bill List</label>
        </div>
        <Loader loading={loading}>
          <div >
            <button type="button" className="EN_Add" onClick={() => {
              window.location.href = "/addmaintenancebill";
            }}>&#10011; Add Maintenance Bill</button>

          </div>
          <div className="row">
            <div className='EMMsearchbox'>
              <span><img src="/images/vendorlistsearch.svg" alt='search icon'></img>
                <input placeholder='Search' ></input></span>
            </div>
          </div>
          <table
            id="inoutbooktable"
            class="table table-striped table-bordered table-sm "
            cellspacing="0"
          // style={{ border: '2px solid #14335D;;'}}
          >
            <thead>
              <tr>
                <th class="th-sm">Block</th>
                <th class="th-sm">Flat</th>
                <th class="th-sm">Amount</th>
                <th class="th-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>A</td>
                <td >101</td>
                <td>1000</td>
                <td>
                  <div>
                    <IconButton>
                      <img src="/images/icon_edit.svg" />
                    </IconButton>

                    <IconButton>
                      <img src="/images/icon_delete.svg" />
                    </IconButton>

                  </div>
                </td>
              </tr>




            </tbody>
          </table>
          {/* <div className="App">
      {data} */}
        </Loader>
      </div>
    </div>



  );
};

export default Maintenancebilllist;
