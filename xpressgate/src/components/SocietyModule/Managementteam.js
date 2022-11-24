import React from "react";
import "../SocietyModule/Managementteam.css";
import LogOut from "./Utils/LogOut";
// import { Button } from 'react-bootstrap';
import PaginationCalculate from "../GuardModule/Utils/paginationCalculate";
import { useState, useEffect } from "react";
import axios from "axios";

const Managementteam = () => {
    
  const [management,setmanagement] = useState([])

  const [currentPage, setCurrentpage] = useState(1)
  const [postPerPage, setPostPerPage] = useState(12)
  const [currentPosts,setCurrentPosts] = useState([])

  useEffect(()=>{
    getDetails()
  },[])
   
  const getDetails=async()=>{
    try {
      const {data} = await axios.get(`${window.env_var}api/management/getAll`)
      setmanagement(data.data.managementteam)
      const indexoflast = currentPage*postPerPage  //endoffset
      const indexoffirst = indexoflast - postPerPage //startoffset
      setCurrentPosts(data.data.managementteam.slice(indexoffirst,indexoflast))
    } catch (error) {
      console.log(error)
    }
  }

  async function  paginate(event)
  {
    setCurrentpage(event.selected+1)
    const {data} = await axios.get(`${window.env_var}api/management/getAll`)
    const indexoflast = currentPage*postPerPage  //endoffset
    const indexoffirst = indexoflast - postPerPage //startoffset
    setCurrentPosts(data.data.managementteam.slice(indexoffirst,indexoflast))
  }

  return (
    <div className="addguestcontainer1">
      <div id="headersection1">
        <div id="addflatsection">
          <div className="addflatheadersection">
            <div id="aflogo"><img src="/images/loginlogo.svg" alt="header logo" /></div>
            <div id="afsociety"><label>Society</label></div>
            <div id="afspace"></div>
            <div id="afnotification"><a href="abc"><img src="/images/notification.svg" alt="notificationicon" /></a></div>
            <div id="afsetting"><a href="abc"><img src="/images/setting.svg" alt="settingicon" /></a></div>
            <div id="aflogoutbutton"><LogOut /></div>
          </div>
        </div>
      </div>
      <div id="societynamesection">
        <div className="societyname">
          <img src="/images/profileicon.svg" alt="Society image" />
          <label>Society Name</label>
        </div>
        <br/>
        <div class="noticelist">
          <h4>Management Team list</h4>
          <a href="/addManagement" class="Notice">Add Management Member</a>
          </div>
        <div className="sideimage2">
          <img src="/images/communitysideimg.svg" alt="dashboard sideimage" />
        </div>
      </div>
      <div className="addguestbackgroundimg">
        <div className="Addguestdisplay3">
          <label>Management Team</label>
        </div>
        <div >
      
        <input
          type=" search"
          className="search2"
          name="Search"
          placeholder="&#128269; Search"
        ></input>
        </div>

        <table id="inoutbooktable" class="table table-striped table-bordered table-sm " cellspacing="0" style={{ border: '2px solid black' }}>
          <thead>
            <tr>
              <th class="th-sm">Sr No</th>
              <th class="th-sm">Resident Name</th>
              <th class="th-sm">Designation</th>
              <th class="th-sm">Status</th>
            </tr>
          </thead>
          <tbody>
            {management.map((items,index)=>{
              return(
                <tr id={items._id}>
                  <td>{currentPage<=2?(currentPage-1)*12+(index+1):(currentPage-1+1)+(index+1)}</td>
                  <td>{items.resident.firstname} {items.resident.lastname}</td>
                  <td>{items.managementTitle}</td>
                  <td>{items.status==true?'Active':'Inactive'}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <PaginationCalculate totalPages={management.length} postperPage={postPerPage} currentPage={currentPage} paginate={paginate}/>
      </div>
    </div>
       
       
    
  );
};

export default Managementteam;
