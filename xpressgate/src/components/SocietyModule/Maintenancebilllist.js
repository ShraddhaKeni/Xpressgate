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

const Maintenancebilllist = () => {
  const [loading, setLoading] = useState(false)
  const [maintenance, setMaintenance] = useState([])
  const [currentPage, setCurrentpage] = useState(0)
  const [postPerPage, setPostPerPage] = useState(10)
  const [currentPosts, setCurrentPosts] = useState([])
  const [toast, setToast] = useState({ show: false })
  const location = useLocation()
  const navigate = useNavigate();

  useEffect(() => {
    getMaintenance()
  }, [])

  const getMaintenance = async () => {
    try {
      const { data } = await axios.get(`${window.env_var}api/maintenance/getall/${localStorage.getItem("community_id")}`)
      setMaintenance(data.data.maintenance)
      const indexoflast =  (currentPage + 1) * postPerPage   //endoffset
      const indexoffirst = indexoflast - postPerPage //startoffset
      setCurrentPosts(data.data.maintenance.slice(indexoffirst, indexoflast))
      setLoading(false);
    } catch (error) {
      console.log(error)
      setLoading(false);
    }
  }
  async function findText(e) {
    console.log(maintenance)
    let text = maintenance.filter(x => x.block_name?.toLowerCase().includes(e.target.value.toLowerCase()))
    if (text) {
        setCurrentPosts(text)
    }
    else {
        await paginate(0)
    }

}
  async function paginate(event) {
    setCurrentpage(event.selected + 1)
    const indexoflast = (event.selected + 1) * postPerPage  //endoffset
    const indexoffirst = (indexoflast - postPerPage) //startoffset
    setCurrentPosts(maintenance.slice(indexoffirst, indexoflast))
  }

  const handleEditLink = (item) => {
    navigate('/addmaintenancebill', { state: { id: item._id, type: 'edit' } })
  }

  const handleDeleteLink = async (item) => {
    try {
      const { data } = await axios.get(`${window.env_var}api/maintenance/remove/${item._id}`)
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

        <div class="maintenancelist">
          <a href="/maintenancebilllist" class="MSLList"><b>Maintenance Bill List</b></a><br /><br />
          <a href="/addmaintenancebill" class="Addmaintenancelink">Add Maintenance Bill</a>
        </div>
        <div className="EN_sideimg">
          <img src="/images/societysideimg.svg" alt="dashboard sideimage" />
        </div>
      </div>
      <div className="addguestbackgroundimg">
      <ToastMessage show={toast.show} message={toast.message} type={toast.type} handleClose={() => { setToast({ show: false }) }} />
        <div className="EN_display">
          <label>Maintenance Bill List</label>
        </div>
        <br />
        <Loader loading={loading}>
          <div className='vendorpayment_search'>
            <span><img src="/images/vendorlistsearch.svg" alt='search icon'></img>
              <input placeholder='Search' onChange={(e) => { findText(e) }}></input></span>
          </div>
          <div className="AddSDBlock">
            <button type="button" className="SDAddBTN" onClick={() => {
              window.location.href = "/addmaintenancebill";
            }}>&#10011;  Add Maintenance Bill</button>
          </div>
          {/* <div >
            <button type="button" className="EN_Add" onClick={() => {
              window.location.href = "/addmaintenancebill";
            }}>&#10011; Add Maintenance Bill</button>

          </div> */}
          {/* <div className="row">
            <div className='EMMsearchbox'>
              <span><img src="/images/vendorlistsearch.svg" alt='search icon'></img>
                <input placeholder='Search' ></input></span>
            </div>
          </div> */}
          <table
            id="inoutbooktable"
            class="table table-striped table-bordered table-sm "
            cellspacing="0"
          // style={{ border: '2px solid #14335D;;'}}
          >
            <thead>
              <tr>
                <th class="th-sm">Sr. No.</th>
                <th class="th-sm">Block</th>
                <th class="th-sm">Flat</th>
                <th class="th-sm">Amount</th>
                <th class="th-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentPosts.map((item, index)=> {
                return (
                  <tr>
                    <td>{index + 1 + (currentPage * postPerPage)}</td>
                    <td>{item.block_name}</td>
                    <td >{item.flat_name}</td>
                    <td>{item.amount}</td>
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
          <PaginationCalculate totalPages={maintenance.length} postperPage={postPerPage} currentPage={currentPage} paginate={paginate} />
        </Loader>
      </div>
    </div>



  );
};

export default Maintenancebilllist;
