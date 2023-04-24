import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../SocietyModule/Viewparking.css";
import { ButtonBase, Icon, IconButton } from '@mui/material';
import PaginationCalculate from "../GuardModule/Utils/paginationCalculate";
import Societyheader from './Utils/Societyheader';
// import { Loader } from "../Loader";
import { ToastMessage } from "../ToastMessage";
import ErrorScreen from '../../common/ErrorScreen';
import { deleteCommunity } from '../../common/admin/admin_api';

const ViewGuestParkingSec = () => {
  const [guestparkingSection,setGuestParkingSections] = useState([])
  const [currentPage, setCurrentpage] = useState(1)
  const [postPerPage, setPostPerPage] = useState(12)
  const [currentPosts,setCurrentPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [isError,setError] = useState(false)
  const navigate= useNavigate()
  const [toast, setToast] = useState({ show: false })
  useEffect(()=>{
    getGuestParkingSections()
  },[])

  const getGuestParkingSections=async()=>{
    let community_id = localStorage.getItem('community_id');
    try {
      const {data}=await axios.get(`${window.env_var}api/guestparkingsection/getAll/`+community_id);
      setGuestParkingSections(data.data);
  
      const indexoflast = currentPage*postPerPage  //endoffset
      const indexoffirst = indexoflast - postPerPage //startoffset
      setCurrentPosts(data.data.slice(indexoffirst,indexoflast))
      setLoading(false);
      setError(false)
    } catch (error) {
      setError(true)
    }
  }

  
  const handleDelete = async (id) => {
   
    const sendData = {
  
      id: id
    }
    try {
      const {data}=await axios.post(`${window.env_var}api/guestparkingsection/delete`,sendData);
   
      setToast({ show: true, message: "Deleted Successfully", type: "success" })
      
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    } catch (error) {
      console.log(error)
    }
  }

  async function  paginate(event)
  {
    let community_id = localStorage.getItem('community_id');
    const {data}=await axios.get(`${window.env_var}api/guestparkingsection/getAll/`+community_id);
    setCurrentpage(event.selected+1)
    const indexoflast = (event.selected+1)*postPerPage  //endoffset
    const indexoffirst = (indexoflast - postPerPage) //startoffset
    setCurrentPosts(data.data.slice(indexoffirst,indexoflast))
  }

  function findText(e) {
    let search = e.target.value.toLowerCase()
    let arr = guestparkingSection.filter(x => {
      if (x.section.toLowerCase().includes(search)) {
        return true
      }
      else if (x.section.toLowerCase().includes(search)) {
        return true
      }
    })

    if (arr) {
      const indexoflast = currentPage * postPerPage  //endoffset
      const indexoffirst = (indexoflast - postPerPage)
      setCurrentPosts(arr.slice(indexoffirst, indexoflast))
    }
    else {
      paginate(0)
    }
  } 

  function GuestParkingSectionDetails(id)
  {
    navigate('/addguestparkingsection',{state:{id:id,type:'edit'}})
  }
  if(isError)
    return <ErrorScreen/>
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
        <div className='vgpsidelinks'>
         
          <a href='/viewguestparkingsection' className='VpSec'><b>View Guest Parking Section</b></a><br/><br/>
          <a href='/addguestparkingsection' className='ApSec'>Add Guest Parking Section</a><br/><br/>
         
        </div>
        <div className="viewGparking_sideimg">
          <img src="/images/societysideimg.svg" alt="dashboard sideimage" />
        </div>
      </div>
      <div className="addguestbackgroundimg">
      <ToastMessage show={toast.show} message={toast.message} type={toast.type} handleClose={() => { setToast({ show: false }) }} />
        <div className='VPdisplay'>
          <label>View Guest Parking Section</label>
        </div>
        {/* <Loader loading={loading}> */}
          <div className='row'>
            <div className='VP_searchbox'>
              <span>
                <img src="/images/vendorlistsearch.svg" alt='search icon'></img>
                <input placeholder='Search' id="search_input"  onChange={(e) => { findText(e) }} ></input>
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
                <th class="th-sm">Status</th>
                <th class="th-sm">Action</th>
                
              </tr>
            </thead>
            <tbody>
            {currentPosts.map((item,index)=>{
                return(
                  <tr>
                    <td>{currentPage<=2?(currentPage-1)*12+(index+1):(currentPage-1+1)+(index+1)}</td>
                    <td>{item.blocks}</td>
                    <td>{item.section}</td>
                    <td>{item.status==false?'Inactive':'Active'}</td>
                    <td>
                                                <div>
                                                    <IconButton onClick={() => { GuestParkingSectionDetails(item._id) }}>
                                                        <img src="/images/icon_edit.svg" />
                                                    </IconButton>

                                                     <IconButton onClick={(e) => { e.preventDefault(); handleDelete(item._id) }}>
                        <img src="/images/icon_delete.svg" />
                      </IconButton>

                                                </div>
                                            </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <br/>
          <PaginationCalculate totalPages={guestparkingSection.length} postperPage={postPerPage} currentPage={currentPage} paginate={paginate}/>
        {/* </Loader> */}
      </div>
    </div>     
  );
}
export default ViewGuestParkingSec;
