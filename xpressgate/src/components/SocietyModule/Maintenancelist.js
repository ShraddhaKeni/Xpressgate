import React from "react";
import "../SocietyModule/Maintenancelist.css";
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

const Maintenancelist = () => {
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentpage] = useState(1)
  const [postPerPage, setPostPerPage] = useState(12)
  const [currentPosts, setCurrentPosts] = useState([])
  const [maintenance, setMaintenance] = useState([])
  
  useEffect(() => {
    getMaintenance()
  }, [])

  const getMaintenance = async () => {
    try {
      const { data } = await axios.get(`${window.env_var}api/checklist/getall/${localStorage.getItem("community_id")}`)
      setMaintenance(data.data.Checklist_Details)
      const indexoflast = currentPage * postPerPage  //endoffset
      const indexoffirst = indexoflast - postPerPage //startoffset
      setCurrentPosts(data.data.Checklist_Details.slice(indexoffirst, indexoflast))
      setLoading(false);
    } catch (error) {
      console.log(error)
      setLoading(false);
    }
  }

  async function paginate(event) {
    setCurrentpage(event.selected + 1)
    const indexoflast = (event.selected + 1) * postPerPage  //endoffset
    const indexoffirst = (indexoflast - postPerPage) //startoffset
    setCurrentPosts(maintenance.slice(indexoffirst, indexoflast))
  }

    const dateTimeFormat = (date) => {
    var d = new Date(date)
    return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()

  }

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
          <a href="/maintenancelist" class="MSLList"><b>Maintenance Schedule List</b></a><br /><br />
          <a href="/addmaintenanceschedule" class="Addmaintenancelink">Add Maintenance Schedule</a>
        </div>
        <div className="EN_sideimg">
          <img src="/images/societysideimg.svg" alt="dashboard sideimage" />
        </div>
      </div>
      <div className="addguestbackgroundimg">

        <div className="EN_display">
          <label>Maintenance List</label>
        </div>
        <br/>
        <Loader loading={loading}>
        <div className='vendorpayment_search'>
                <span><img src="/images/vendorlistsearch.svg" alt='search icon'></img>
                  <input placeholder='Search'></input></span>
            </div>
          <div className="AddSDBlock">
            <button type="button" className="SDAddBTN" onClick={() => {
              window.location.href = "/addmaintenanceschedule";
            }}>&#10011;  Add Maintenance</button>
          </div>
          <table
            id="maintenancetable"
            class="table table-striped table-bordered table-sm "
            cellspacing="0"
          // style={{ border: '2px solid #14335D;;'}}
          >
            <thead>
              <tr>
                <th class="th-sm">Item</th>
                <th class="th-sm">Last Maintenance Date</th>
                <th class="th-sm">Interval</th>
                <th class="th-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentPosts.map(item => {
                return (
                  <tr>
                    <td>{item.item}</td>
                    <td >{dateTimeFormat(item.time)}</td>
                    <td>{item.frequency}</td>
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
                )
              })}
            </tbody>
          </table>
          <PaginationCalculate totalPages={maintenance.length} postperPage={postPerPage} currentPage={currentPage} paginate={paginate} />
        </Loader>
      </div>
    </div>



  );
};

export default Maintenancelist;
