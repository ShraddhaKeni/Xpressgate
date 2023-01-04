import React from "react";
import "../SocietyModule/Emergency.css";
import LogOut from "./Utils/LogOut";
// import { Button } from 'react-bootstrap';
import ReactPaginate from "react-paginate";
import { useState, useEffect } from "react";
import axios from "axios";
import PaginationCalculate from "../GuardModule/Utils/paginationCalculate";
import Societyheader from "./Utils/Societyheader";
import { useNavigate } from "react-router-dom";

const Emergency = () => {

  const [contacts, setContacts] = useState([])
  const [currentPage, setCurrentpage] = useState(1)
  const [postPerPage, setPostPerPage] = useState(12)
  const [currentPosts, setCurrentPosts] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    getContacts()
  }, [])

  const getContacts = async () => {
    try {
      const { data } = await axios.get(`${window.env_var}api/emergencycontacts/getAll`)
      setContacts(data.data.contacts)
      const indexoflast = currentPage * postPerPage  //endoffset
      const indexoffirst = indexoflast - postPerPage //startoffset
      setCurrentPosts(data.data.contacts.slice(indexoffirst, indexoflast))
    } catch (error) {

    }
  }

  const paginate =  (event) => {

    setCurrentpage(event.selected + 1)
    const indexoflast = (event.selected + 1) * postPerPage  //endoffset
    const indexoffirst = indexoflast - postPerPage //startoffset
    setCurrentPosts(contacts.slice(indexoffirst, indexoflast))
  }

  function findText(e) {
    let search = e.target.value.toLowerCase()
    let arr = contacts.filter(x => {
      if (x.type.toLowerCase().includes(search)) {
        return true
      }
      else if (x.name.toLowerCase().includes(search)) {
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

  function emargencyDetails(id,ename,etype,econtact) {
    navigate('/addemergency', { state: { id: id, type: 'edit', ename,etype,econtact,update:'update' } })
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
        
        <div class="EN_noticelist">
        <a href="/emergencyList" class="ENLNotice"><b>Emergency Number List</b></a><br/><br/>
          <a href="/addemergency" class="AENNotice">Add Emergency Number</a>
        </div>
        <div className="EN_sideimg">
          <img src="/images/communitysideimg.svg" alt="dashboard sideimage" />
        </div>
      </div>
      <div className="addguestbackgroundimg">
        <div className="EN_display">
          <label>Emergency Numbers</label>
        </div>
        <div >
        <button type="button" className="EN_Add" onClick={() => {
                window.location.href = "/addemergency";
              }}>&#10011; Add Emergency Number</button>

        </div>
        <div className="row">
        <div className='EMMsearchbox'>
            <span><img src="/images/vendorlistsearch.svg" alt='search icon'></img>
              <input placeholder='Search' onChange={(e) => { findText(e) }}></input></span>
          </div>
        </div>
        <table
          id="inoutbooktable"
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

            {currentPosts.map(item => {
              return (
                <tr id={item._id} onClick={() => emargencyDetails(item._id, item.name, item.type,item.contact)}>
                  <td>{item.type}</td>
                  <td>{item.name}</td>
                  {console.log(item)}
                  <td>{item.contact} </td>
                </tr>
              )
            })}


          </tbody>
        </table>
        {/* <div className="App">
      {data} */}
        <PaginationCalculate totalPages={contacts.length} postperPage={postPerPage} currentPage={currentPage} paginate={paginate} />

      </div>
    </div>



  );
};

export default Emergency;
