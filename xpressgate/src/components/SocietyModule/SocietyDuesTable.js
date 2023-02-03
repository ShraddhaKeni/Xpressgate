import React, { useState, useEffect, useRef } from "react";
import "../SocietyModule/SocietyDuesTable.css";
import Societyheader from "./Utils/Societyheader";
import PaginationCalculate from "../GuardModule/Utils/paginationCalculate";
import axios from "axios";
import { Loader } from "../Loader";
import Pagination from "../../common/Pagination";
import ErrorScreen from "../../common/ErrorScreen";

const SocietyDuesTable = () => {
  const [societydues,setsocietydues] = useState()
  const [currentsociety, setcurrentsociety] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentpage] = useState(1)
  const [postPerPage, setPostPerPage] = useState(12)
  const [currentPosts,setCurrentPosts] = useState([])
  const [filterArr,setFilter] = useState([])

  const [isError,setError] = useState(false)
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
      setcurrentsociety(data.data.society_dues)
      const indexoflast = currentPage*postPerPage  //endoffset
      const indexoffirst = indexoflast - postPerPage //startoffset
      setCurrentPosts(data.data.society_dues.slice(indexoffirst,indexoflast))
      setLoading(false);
      setError(false);
    } catch (error) {
      setLoading(false);
      setError(true)
    }
  }

   function  paginate(event)
  {
    setCurrentpage(event.selected+1)
    const indexoflast =(event.selected+1)*postPerPage  //endoffset
    const indexoffirst = indexoflast - postPerPage //startoffset
    setCurrentPosts(currentsociety.slice(indexoffirst,indexoflast))
  }

  function findText(e) {
    let search = e.target.value.toLowerCase()
    let arr = currentsociety.filter(x => {
      if (x.resident.firstname.toLowerCase().includes(search)) {
        return true
      }
      else if (x.resident.lastname.toLowerCase().includes(search)) {
        return true
      }
    })
    const indexoflast = currentPage * postPerPage 
    const indexoffirst = (indexoflast - postPerPage)
    if (arr.length>0) {
      setFilter(arr)
     
      setCurrentPosts(arr.slice(indexoffirst, indexoflast))
    }
    else {
      setFilter([])
      setCurrentPosts(currentsociety.slice(indexoffirst, indexoflast))
    }

  }


  function settingCurrent(value)
  {
    setCurrentPosts(value)
  }



  if(isError)
    return <ErrorScreen/>
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
          <img src="/images/societysideimg.svg" alt="dashboard sideimage" />
        </div>
      </div>
      <div className="addguestbackgroundimg">
        <div className="SDT_display">
          <label>Society Dues</label>
        </div>
        <br />
        <Loader loading={loading}>
        <div className='vendorpayment_search'>
                <span><img src="/images/vendorlistsearch.svg" alt='search icon'></img>
                  <input placeholder='Search' onChange={(e) => { findText(e) }}></input></span>
            </div>
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
                <th class="th-sm">Payment Date</th>
                <th class="th-sm">Due Date</th>
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
          {/* <PaginationCalculate totalPages={currentsociety.length} postperPage={postPerPage} currentPage={currentPage} paginate={paginate}/> */}
          <Pagination totalPages={filterArr.length>0?filterArr.length:currentsociety.length} data ={filterArr.length>0?filterArr:currentsociety} settingCurrent={settingCurrent}/>
        </Loader>
      </div>
    </div>
  );
};
export default SocietyDuesTable;