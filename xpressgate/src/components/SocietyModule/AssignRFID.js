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
import { useLocation } from "react-router-dom";
import { ToastMessage } from "../ToastMessage";
import id from "date-fns/esm/locale/id/index.js";

const AssignRFID = () => {
  const [loading, setLoading] = useState(false)
  const [rfid, setRfid] = useState([])
  const [currentPage, setCurrentpage] = useState(0)
  const [postPerPage, setPostPerPage] = useState(10)
  const [currentPosts, setCurrentPosts] = useState([])
  const [toast, setToast] = useState({ show: false })
  const location = useLocation()
  const navigate = useNavigate();

  useEffect(() => {
    getRfid();
  }, [])

  const getRfid = async () => {
    try {
      const { data } = await axios.get(`${window.env_var}api/resident/rfidlist/${localStorage.getItem("community_id")}`)
      // console.log(location.state.id);
      console.log(data.data);
      setRfid(data.data)
      const indexoflast =  (currentPage + 1) * postPerPage   //endoffset
      const indexoffirst = indexoflast - postPerPage //startoffset
      setCurrentPosts(data.data.slice(indexoffirst, indexoflast))
      setLoading(false);
    } catch (error) {
      console.log(error)
      setLoading(false);
    }
  }
function findText(e) {
  let search = e.target.value.toLowerCase()
  let arr = rfid.filter(x => {
    if (x.firstname?.toLowerCase().includes(search)) {
      return true
    }
    else if (x.lastname?.toLowerCase().includes(search)) {
      return true
    }
  })

  if (arr) {
    const indexoflast = (currentPage + 1) * postPerPage    //endoffset
    const indexoffirst = (indexoflast - postPerPage)
    setCurrentPosts(arr.slice(indexoffirst, indexoflast))
  }
  else {
    paginate(0)
  }
} 
  async function paginate(event) {
    setCurrentpage(event.selected + 1)
    const indexoflast = (event.selected + 1) * postPerPage  //endoffset
    const indexoffirst = (indexoflast - postPerPage) //startoffset
    setCurrentPosts(rfid.slice(indexoffirst, indexoflast))
  }

  const handleEditLink = (item) => {
    navigate('/addrfid', { state: { id: item , type: 'edit' } })
  }

  const handleDeleteLink = async (item) => {
    try {
      const { data } = await axios.get(`${window.env_var}api/maintenance/remove/${location.state.id}`)
      setToast({ show: true, message: "Deleted Successfully", type: "error" })
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    } catch (error) {
      console.log(error)
    }
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

        <div class="AssignSideLink">
          <a href="/AssignRfid" class="BListsidelink"><b>Assign RFID List</b></a><br /><br />
          <a href="/addrfid" class="ARfidlink">Add RFID</a>
        </div>
        <div className="EN_sideimg">
          <img src="/images/societysideimg.svg" alt="dashboard sideimage" />
        </div>
      </div>
      <div className="addguestbackgroundimg">
      <ToastMessage show={toast.show} message={toast.message} type={toast.type} handleClose={() => { setToast({ show: false }) }} />
        <div className="EN_display">
          <label>Assign RFID List</label>
        </div>
        <br />
        <Loader loading={loading}>
          <div className='vendorpayment_search'>
            <span><img src="/images/vendorlistsearch.svg" alt='search icon'></img>
              <input placeholder='Search' onChange={(e) => { findText(e) }} ></input></span>
          </div>
          <div className="AddSDBlock">
            <button type="button" className="SDAddBTN" onClick={() => {
              window.location.href = "/addrfid";
            }}>&#10011;  Add RFID</button>
          </div>
        
          <table
            id="inoutbooktable"
            class="table table-striped table-bordered table-sm "
            cellspacing="0"
        
          >
            <thead>
              <tr>
                <th class="th-sm">Sr. No.</th>
                <th class="th-sm">Resident Name</th>
                <th class="th-sm">Block</th>
                <th class="th-sm">Flat</th>
                <th class="th-sm">RFID</th>
                <th class="th-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentPosts.map((item, index)=> {
                return (
                  <tr>
                    <td>{index + 1 + (currentPage * postPerPage)}</td>
                    <td >{item.firstname} {item.lastname}</td>
                    <td >{item.block_name}</td>
                    <td >{item.flat_no}</td>
                    <td>{item.rfid}</td>
                    <td>
                      <div>
                        <IconButton onClick={() => { handleEditLink(item) }}>
                          <img src="/images/icon_edit.svg" />
                        </IconButton>

                        <IconButton onClick={() => handleDeleteLink(item)}>
                          <img src="/images/icon_delete.svg" />
                        </IconButton>

                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <PaginationCalculate totalPages={rfid.length} postperPage={postPerPage} currentPage={currentPage} paginate={paginate} />
        </Loader>
      </div>
    </div>



  );
};

export default AssignRFID;
