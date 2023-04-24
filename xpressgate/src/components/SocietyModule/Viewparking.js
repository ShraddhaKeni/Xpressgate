import React, { useEffect, useState } from 'react';
import axios from "axios";
import "../SocietyModule/Viewparking.css";
import LogOut from './Utils/LogOut';
import { useNavigate } from "react-router-dom";
import PaginationCalculate from "../GuardModule/Utils/paginationCalculate";
import Societyheader from './Utils/Societyheader';
import { Loader } from "../Loader";
import ErrorScreen from '../../common/ErrorScreen';

const Viewparking = () => {
  const [parkingSection,setParkingSections] = useState([])
  const [currentPage, setCurrentpage] = useState(0)
  const [postPerPage, setPostPerPage] = useState(12)
  const [currentPosts,setCurrentPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [isError,setError] = useState(false)
  const navigate= useNavigate()

  useEffect(()=>{
    getParkingSections()
  },[])

  const getParkingSections=async()=>{
    let community_id = localStorage.getItem('community_id');
    try {
      const {data}=await axios.get(`${window.env_var}api/parkingsectionbyid/getAll/`+community_id);
      setParkingSections(data.data.block_list);
   
      const indexoflast = (currentPage + 1) * postPerPage  //endoffset
      const indexoffirst = (indexoflast - postPerPage) //startoffset
      setCurrentPosts(data.data.block_list.slice(indexoffirst,indexoflast))
      setLoading(false);
      setError(false)
    } catch (error) {
      setError(true)
    }
  }

  async function  paginate(event)
  {
    let community_id = localStorage.getItem('community_id');
    const {data}=await axios.get(`${window.env_var}api/parkingsectionbyid/getAll/`+community_id);
    setCurrentpage(event.selected)
    const indexoflast = (event.selected + 1) * postPerPage  //endoffset
    const indexoffirst = (indexoflast - postPerPage) //startoffset
    setCurrentPosts(data.data.block_list.slice(indexoffirst,indexoflast))
  }

  function findText(e) {
    let search = e.target.value.toLowerCase()
    let arr = parkingSection.filter(x => {
      if (x.section.toLowerCase().includes(search)) {
        return true
      }
      else if (x.section.toLowerCase().includes(search)) {
        return true
      }
    })

    if (arr) {
      const indexoflast = (currentPage + 1 ) * postPerPage  //endoffset
      const indexoffirst = (indexoflast - postPerPage)
      setCurrentPosts(arr.slice(indexoffirst, indexoflast))
    }
    else {
      paginate(0)
    }
  } 
  
  function parkingSectionDetails(id)
  {
    navigate('/addparking',{state:{id:id,type:'edit'}})
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
        <div className='vpsidelinks'>
          <a href='/vehiclemanagement' className='VLsLink'><b>Vehicle List</b></a><br/><br/>
          <a href='/viewparking' className='VpSec'><b>View Parking Section</b></a><br/><br/>
          <a href='/addparking' className='ApSec'>Add Parking Section</a><br/><br/>
          <a href='/addvehicle' className='apssec'>Assign Parking Section</a>
        </div>
        <div className="viewparking_sideimg">
          <img src="/images/societysideimg.svg" alt="dashboard sideimage" />
        </div>
      </div>
      <div className="addguestbackgroundimg">
        <div className='VPdisplay'>
          <label>View Parking Section</label>
        </div>
        <Loader loading={loading}>
          <div className='row'>
            <div className='VP_searchbox'>
              <span>
                <img src="/images/vendorlistsearch.svg" alt='search icon'></img>
                <input placeholder='Search' id="search_input" onChange={(e) => { findText(e) }}></input>
              </span>
            </div>
          </div>
          <br/>
          <table id="viewparkingtable" class="table table-striped table-bordered table-sm " cellspacing="0" style={{ border: '2px solid black' }}>
            <thead>
              <tr>
                <th class="th-sm">Sr No.</th>
                <th class="th-sm">Parking Section</th>
                <th class="th-sm">Block</th>
                <th class="th-sm">Status</th>
              </tr>
            </thead>
            <tbody>
              {currentPosts.map((item,index)=>{
                return(
                  <tr onClick={()=>parkingSectionDetails(item._id)}>
                    <td>{index + 1 + (currentPage * postPerPage)}</td>
                    <td>{item.section}</td>
                    <td>{item.blocks}</td>
                    <td>{item.status==false?'Inactive':'Active'}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <br/><br/>
          <PaginationCalculate totalPages={parkingSection.length} postperPage={postPerPage} currentPage={currentPage} paginate={paginate}/>
        </Loader>
      </div>
    </div>     
  );
}
export default Viewparking;
