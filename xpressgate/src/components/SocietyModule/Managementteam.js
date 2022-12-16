import React from "react";
import "../SocietyModule/Managementteam.css";
import LogOut from "./Utils/LogOut";
// import { Button } from 'react-bootstrap';
import PaginationCalculate from "../GuardModule/Utils/paginationCalculate";
import { useState, useEffect } from "react";
import axios from "axios";
import Societyheader from "./Utils/Societyheader";
import { useNavigate } from "react-router-dom";

const Managementteam = () => {
    
  const [management,setmanagement] = useState([])

  const [currentPage, setCurrentpage] = useState(1)
  const [postPerPage, setPostPerPage] = useState(12)
  const [currentPosts,setCurrentPosts] = useState([])
  const navigate= useNavigate()


  useEffect(()=>{
    getDetails()
  },[])
   
  const getDetails=async()=>{
    console.log(localStorage.getItem('community_id'));
    try {
      const {data} = await axios.get(`${window.env_var}api/management/getAll/${localStorage.getItem('community_id')}`)
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
    const indexoflast =(event.selected+1)*postPerPage  //endoffset
    const indexoffirst = indexoflast - postPerPage //startoffset
    setCurrentPosts(management.slice(indexoffirst,indexoflast))
  }

  function managementDetails(mainid,id,title)
  {
    navigate('/addManagement',{state:{id:id,type:'edit',title, mainid}})
  }

  function findText(e)
  {
    console.log(currentPosts)
    let search = e.target.value.toLowerCase()
    let arr = management.filter(x=>{
      if(x.resident.firstname.toLowerCase().includes(search))
      {
        return true
      }
      else if(x.resident.lastname.toLowerCase().includes(search))
      {
        return true
      }
    })
    if(arr)
    {
      const indexoflast =currentPage*postPerPage  //endoffset
      const indexoffirst = (indexoflast - postPerPage)
      setCurrentPosts(arr.slice(indexoffirst,indexoflast))
    }
    else
    {
      paginate(0)
    }
  
}

  return (
    <div className="addguestcontainer4">
    <div id="addflatsection">
       <Societyheader/>
    
    </div>
      <div id="societynamesection">
        <div className="MM_societyname">
          <img src="/images/societyicon.svg" alt="Society image" />
          <label>Society Name</label>
        </div>
        
        <br/>
        <div class="MM_notice">
          <h4>Management Team list</h4>
          <a href="/addManagement" class="Notice">Add Management Member</a>
          </div>
        <div className="MM_sideimage">
          <img src="/images/communitysideimg.svg" alt="dashboard sideimage" />
        </div>
      </div>
      <div className="addguestbackgroundimg">
        <div className="MM_display">
          <label>Management Team</label>
        </div>
        <div>
      
        <input
          type=" search"
          className="search2"
          name="Search"
          placeholder="&#128269; Search"
          onChange={(e)=>{findText(e)}}
        ></input>
        </div>

        <table id="managementtable" class="table table-striped table-bordered table-sm " cellspacing="0" style={{ border: '2px solid black' }}>
          <thead>
            <tr>
              <th class="th-sm">Sr No</th>
              <th class="th-sm">Resident Name</th>
              <th class="th-sm">Designation</th>
              <th class="th-sm">Status</th>
            </tr>
          </thead>
          <tbody>
            {currentPosts.map((items,index)=>{
              return(
                <tr id={items._id} onClick={()=>managementDetails(items._id,items.resident._id,items.managementTitle)}>
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
