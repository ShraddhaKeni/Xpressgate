import React from "react";
import "../SocietyModule/Emergency.css";
import LogOut from "./Utils/LogOut";
// import { Button } from 'react-bootstrap';
import ReactPaginate from "react-paginate";
import { useState, useEffect } from "react";
import axios from "axios";
import PaginationCalculate from "../GuardModule/Utils/paginationCalculate";


const Emergency = () => {
 
const [contacts, setContacts] = useState([])
const [currentPage, setCurrentpage] = useState(1)
const [postPerPage, setPostPerPage] = useState(12)
const [currentPosts,setCurrentPosts] = useState([])

useEffect(()=>{
  getContacts()
},[])

  const getContacts=async()=>{
    try {
      const {data} = await axios.get(`${window.env_var}api/emergencycontacts/getAll`)
      setContacts(data.data.contacts)
      const indexoflast = currentPage*postPerPage  //endoffset
      const indexoffirst = indexoflast - postPerPage //startoffset
      setCurrentPosts(data.data.contacts.slice(indexoffirst,indexoflast))
    } catch (error) {
      
    }
  }

  const paginate = async(event)=>{
    const {data} = await axios.get(`${window.env_var}api/emergencycontacts/getAll`)
    setCurrentpage(event.selected+1)
    const indexoflast = currentPage*postPerPage  //endoffset
    const indexoffirst = indexoflast - postPerPage //startoffset
    setCurrentPosts(data.data.contacts.slice(indexoffirst,indexoflast))
  }

  return (
    <div className="addguestcontainer4">
    <div id="addflatsection">
        <div className="addflatheadersection">
          <div id="aflogo"><img src="/images/loginlogo.svg" alt="header logo" /></div>
          <div id="afsociety"><label>Society</label></div>
          <div id="afspace"></div>
          <div id="afnotification"><a href="abc"><img src="/images/notification.svg" alt="notificationicon" /></a></div>
          <div id="afsetting"><a href="abc"><img src="/images/setting.svg" alt="settingicon" /></a></div>
          <div id="aflogoutbutton"><LogOut/></div>
        </div>
    
    </div>
      <div id="societynamesection">
        <div className="societyname">
          <img src="/images/profileicon.svg" alt="Society image" />
          <label>Society Name</label>
        </div>
        <br/>
        <div class="noticelist">
          <h4>Emergency Number list</h4>
          <a href="/addemergency" class="Notice">Add Emergency Number</a>
          </div>
        <div className="sideimage2">
          <img src="/images/communitysideimg.svg" alt="dashboard sideimage" />
        </div>
      </div>
      <div className="addguestbackgroundimg">
        <div className="Addguestdisplay5">
          <label>Emergency Numbers</label>
        </div>
        <div >
        <button type="button" className="AddNN" onClick={() => {
                window.location.href = "/addemergency";
              }}>&#10011; Add New Number</button>
        <input
          type=" search"
          className="search1"
          name="Search"
          placeholder="&#128269; Search"
          
        ></input>
        </div>

        <table
          id="inoutbooktable1"
          class="table table-striped table-bordered table-sm "
          cellspacing="0"
          // style={{ border: '2px solid #14335D;;'}}
        >
          <thead>
            <tr>
              <th class="th-sm">Type</th>
              <th class="th-sm">Name</th>
              <th class="th-sm">Phone No</th>
            </tr>
          </thead>
          <tbody>

          {contacts.map(item=>{
            return(
              <tr id={item._id}>
                <td>{item.type}</td>
                <td>{item.name}</td>
                <td>{item.contact} </td>
            </tr>
            )
          })}
            
          
          </tbody>
        </table>
        {/* <div className="App">
      {data} */}
              <PaginationCalculate totalPages={contacts.length} postperPage={postPerPage} currentPage={currentPage} paginate={paginate}/>

      </div>
    </div>
       
       
    
  );
};

export default Emergency;
