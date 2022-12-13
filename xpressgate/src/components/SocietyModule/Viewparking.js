import React, { useEffect, useState } from 'react';
import axios from "axios";
import "../SocietyModule/Viewparking.css";
import LogOut from './Utils/LogOut';
import { useNavigate } from "react-router-dom";
import PaginationCalculate from "../GuardModule/Utils/paginationCalculate";
import Societyheader from './Utils/Societyheader';

const Viewparking = () => {
  const [parkingSection,setParkingSections] = useState([])
  const [currentPage, setCurrentpage] = useState(1)
  const [postPerPage, setPostPerPage] = useState(12)
  const [currentPosts,setCurrentPosts] = useState([])
  const navigate= useNavigate()

  useEffect(()=>{
    getParkingSections()
  },[])

  const getParkingSections=async()=>{
    let community_id = localStorage.getItem('community_id');
    try {
      const {data}=await axios.get(`${window.env_var}api/parkingsectionbyid/getAll/`+community_id);
      setParkingSections(data.data.block_list);
      console.log(data.data.block_list);
      const indexoflast = currentPage*postPerPage  //endoffset
      const indexoffirst = indexoflast - postPerPage //startoffset
      setCurrentPosts(data.data.block_list.slice(indexoffirst,indexoflast))
    } catch (error) {
      console.log(error)
    }
  }

  async function  paginate(event)
  {
    let community_id = localStorage.getItem('community_id');
    const {data}=await axios.get(`${window.env_var}api/parkingsectionbyid/getAll/`+community_id);
    setCurrentpage(event.selected+1)
    const indexoflast = (event.selected+1)*postPerPage  //endoffset
    const indexoffirst = (indexoflast - postPerPage) //startoffset
    setCurrentPosts(data.data.block_list.slice(indexoffirst,indexoflast))
  }

  function parkingSectionDetails(id)
  {
    navigate('/addparking',{state:{id:id,type:'edit'}})
  }

  return (
    <div className="addguestcontainer4">
      <div id="addflatsection">
        <Societyheader/>
      </div>
      <div id="societynamesection">
        <div className="AP_societyname">
          <img src="/images/profileicon.svg" alt="Society image" />
          <label>Society Name</label>
        </div>
        <br/>
        <div className='vmsidelinks'>
          <label>Vehicle List</label><br></br>
          <a href='/viewparking'><b>View Parking Section</b></a><br/><br/>
          <a href='/addparking'>Add Parking Section</a>
        </div>
        <div className="viewparking_sideimg">
          <img src="/images/communitysideimg.svg" alt="dashboard sideimage" />
        </div>
      </div>
      <div className="addguestbackgroundimg">
        <div className='VPdisplay'>
          <label>View Parking Section</label>
        </div>
        <div className='row'>
          <div className='search3'>
            <span><img src="/images/vendorlistsearch.svg" alt='search icon' className="SearchIconImg"></img></span>
            <span><input className='GL_search_input' id="search_input" placeholder="Search" onKeyPress={(e) => {
                  document.getElementById('search_input').style.border = "none";
                }}></input></span>
          </div>
        </div>
        <br/>
        <table id="viewparkingtable" class="table table-striped table-bordered table-sm " cellspacing="0" style={{ border: '2px solid black' }}>
          <thead>
            <tr>
              <th class="th-sm">Sr</th>
              <th class="th-sm">Parking Section</th>
              <th class="th-sm">Block</th>
              <th class="th-sm">Status</th>
            </tr>
          </thead>
          <tbody>
            {currentPosts.map((item,index)=>{
              return(
                <tr onClick={()=>parkingSectionDetails(item._id)}>
                  <td>{currentPage<=2?(currentPage-1)*12+(index+1):(currentPage-1+1)+(index+1)}</td>
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
      </div>
    </div>     
  );
}
export default Viewparking;
