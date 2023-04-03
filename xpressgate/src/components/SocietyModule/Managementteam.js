import React from "react";
import "../SocietyModule/Managementteam.css";
// import { Button } from 'react-bootstrap';
import PaginationCalculate from '../GuardModule/Utils/paginationCalculate';
import { useState, useEffect } from "react";
import axios from "axios";
import Societyheader from "./Utils/Societyheader";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import { ToastMessage } from "../ToastMessage";
import { Loader } from "../Loader";
import Pagination from "../../common/Pagination";
import ErrorScreen from "../../common/ErrorScreen";

const Managementteam = () => {


  const [toast, setToast] = useState({ show: false })
  const [management, setmanagement] = useState([])
  const [currentPage, setCurrentPage] = useState(0)
  const [postPerPage, setPostPerPage] = useState(12)
  const [currentPosts, setCurrentPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const [filterArr, setFilter] = useState([])
  const [isError, setError] = useState(false)

  useEffect(() => {
    getDetails()
  }, [])

  const getDetails = async () => {
    //console.log(localStorage.getItem('community_id'));
    try {
      const { data } = await axios.get(`${window.env_var}api/management/getAll/${localStorage.getItem('community_id')}`)
      setmanagement(data.data.managementteam)
      const indexoflast = (currentPage + 1) * postPerPage  //endoffset
      const indexoffirst = indexoflast - postPerPage //startoffset
      setCurrentPosts(data.data.managementteam.slice(indexoffirst, indexoflast))
      setLoading(false);
      setError(false)
    } catch (error) {
      setLoading(false);
      setError(true)
    }
  }

  const handleDelete = async (id) => {

    try {
      await axios.get(`${window.env_var}api/management/remove/${id}`)
      setToast({ show: true, message: "Team Member Deleted Successfully", type: "success" })
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    } catch (error) {
      console.log(error)
    }
  }

  async function paginate(event) {
    setCurrentPage(event.selected)
    const indexoflast = (event.selected + 1) * postPerPage  //endoffset
    const indexoffirst = indexoflast - postPerPage //startoffset
    setCurrentPosts(management.slice(indexoffirst, indexoflast))
  }

  function managementDetails(mainid, id, title) {
    navigate('/addManagement', { state: { id: id, type: 'edit', title, mainid } })
  }

  
  async function findText(e) {
    console.log(management)
    let text = management.filter(x => {
          if (x.resident.firstname?.toLowerCase().includes(e.target.value.toLowerCase())) {
            return true
          }
          else if (x.resident.lastname?.toLowerCase().includes(e.target.value.toLowerCase())) {
            return true
          }
        })
    if (text) {
        setCurrentPosts(text)
    }
    else {
        await paginate(0)
    }

}
  const settingCurrent = value => setCurrentPosts(value)

  if (isError)
    return <ErrorScreen />
  return (
    <div className="addguestcontainer4">
      <ToastMessage show={toast.show} message={toast.message} type={toast.type} handleClose={() => { setToast({ show: false }) }} />
      <div id="addflatsection">
        <Societyheader />
      </div>
      <div id="societynamesection">
        <div className="MM_societyname">
          <img src="/images/societyicon.svg" alt="Society image" />
          <label>Society Name</label>
        </div>
        <div class="MM_notice">
          <a href="/management" class="MT_link"><b>Management Team</b></a><br></br><br />
          <a href="/addManagement" class="AMM_link">Add Management Member</a>
        </div>
        <div className="MM_sideimage">
          <img src="/images/societysideimg.svg" alt="dashboard sideimage" />
        </div>
      </div>
      <div className="addguestbackgroundimg">
        <div className="MM_display">
          <label>Management Team</label>
        </div>
        <Loader loading={loading}>
          <div className='row'>
            <div className='mtsearchbox'>
              <span><img src="/images/vendorlistsearch.svg" alt='search icon'></img>
                <input className='vlsearch_input' placeholder='Search' onChange={(e) => findText(e)}></input></span>
            </div>
          </div>

          <table id="managementtable" class="table table-striped table-bordered table-sm " cellspacing="0" style={{ border: '2px solid black' }}>
            <thead>
              <tr>
                <th class="th-sm">Sr No</th>
                <th class="th-sm">Resident Name</th>
                <th class="th-sm">Designation</th>
                <th class="th-sm">Status</th>
                <th class="th-sm">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentPosts.map((items, index) => {
                return (
                  <tr id={items._id}>
                    <td>{index + 1 + (currentPage * postPerPage)}</td>
                    <td onClick={() => managementDetails(items._id, items.resident._id, items.managementTitle)}>{items.resident.firstname} {items.resident.lastname}</td>
                    <td>{items.managementTitle}</td>
                    <td>{items.status == true ? 'Active' : 'Inactive'}</td>
                    <td>
                      <IconButton onClick={(e) => { e.preventDefault(); handleDelete(items._id) }}>
                        <img src="/images/icon_delete.svg" />
                      </IconButton>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <PaginationCalculate totalPages={management.length} postperPage={postPerPage} currentPage={currentPage} paginate={paginate} />
        </Loader>
      </div>
    </div>
  );
};
export default Managementteam;