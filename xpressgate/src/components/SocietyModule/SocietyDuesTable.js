import React, { useState, useEffect, useRef } from "react";
import "../SocietyModule/SocietyDuesTable.css";
import Societyheader from "./Utils/Societyheader";
import PaginationCalculate from "../GuardModule/Utils/paginationCalculate";
import axios from "axios";

const SocietyDuesTable = () => {
  const [societydues,setsocietydues] = useState()
  const [currentsociety, setcurrentsociety] = useState([])

  const [currentPage, setCurrentpage] = useState(1)
  const [postPerPage, setPostPerPage] = useState(12)
  const [currentPosts,setCurrentPosts] = useState([])

  useEffect(() => {
    getSocietyDetails()
  }, [])

  function getDate(value) {
    // console.log(value)
    let date = new Date(value)
    return  date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear()
  }
  
  const getSocietyDetails = async () => {
    try {
      const { data } = await axios.get(`${window.env_var}api/maintenancepayment/getsocietydues/${localStorage.getItem('community_id')}`)
      console.log(data)
      setcurrentsociety(data.data.society_dues)
      const indexoflast = currentPage*postPerPage  //endoffset
      const indexoffirst = indexoflast - postPerPage //startoffset
      setCurrentPosts(data.data.society_dues.slice(indexoffirst,indexoflast))
      //console.log(data.data.society_dues)
    } catch (error) {
      console.log(error)
    }
  }

   function  paginate(event)
  {
    setCurrentpage(event.selected+1)
    const indexoflast =(event.selected+1)*postPerPage  //endoffset
    const indexoffirst = indexoflast - postPerPage //startoffset
    setCurrentPosts(currentsociety.slice(indexoffirst,indexoflast))
  }

  return (
    <div className="addguestcontainer4">
      <div id="addflatsection">
        <Societyheader />

      </div>
      <div id="societynamesection">
        <div className="SDT_societyname">
          <img src="/images/societyicon.svg" alt="Society image" />
          <label>Society Name</label>
        </div>
        <br />

        <div className="SDT_sideimage">
          <img src="/images/communitysideimg.svg" alt="dashboard sideimage" />
        </div>
      </div>
      <div className="addguestbackgroundimg">
        <div className="SDT_display">
          <label>Society Dues</label>
        </div>
        <br />
        <div className="AddSDBlock">
          <button type="button" className="SDAddBTN" onClick={() => {
            window.location.href = "/societydues";
          }}>&#10011; Add Society Payment</button>
        </div>
        <table id="viewparkingtable" class="table table-striped table-bordered table-sm " cellspacing="0" style={{ border: '2px solid black' }}>
          <thead>
            <tr>
              <th class="th-sm">Type</th>
              <th class="th-sm">Block </th>
              <th class="th-sm">Flat  No</th>
              <th class="th-sm">Resident Name</th>
              <th class="th-sm">Amount</th>
              <th class="th-sm">Payment date</th>
              <th class="th-sm">Due date</th>
              <th class="th-sm">Status</th>
            </tr>
          </thead>
          <tbody>
             {currentPosts.map(item => {
                return(
                  <tr>
                   <td>{item.paymentType_name}</td>
                    <td >{item.block.block_no}</td>
                    <td>{item.flat.flat_no}</td>
                    <td>{item.resident.firstname} {item.resident.lastname}</td>
                    <td>{item.paymentAmount}</td>
                    <td >{getDate(item.paymentDue)}</td>
                    <td>{getDate(item.dueDate)}</td>
                    <td>{item.paid? 'PAID':'NOT PAID'}</td>
                </tr>
                )
              })}
          </tbody>
        </table>
        <br /><br />
        <PaginationCalculate totalPages={currentsociety.length} postperPage={postPerPage} currentPage={currentPage} paginate={paginate}/>


      </div>
    </div>



  );
};

export default SocietyDuesTable;
