import React, { useState, useEffect, useRef } from "react";
import "../SocietyModule/VendorPaymentTable.css";
import Societyheader from "./Utils/Societyheader";
import PaginationCalculate from "../GuardModule/Utils/paginationCalculate";
import axios from "axios";
import { Loader } from "../Loader";
import Pagination from "../../common/Pagination";
import ErrorScreen from "../../common/ErrorScreen";

const VendorPaymentTable = () => {

  const [vendor, setVendor] = useState()
  const [currentvendor, setCurrentvendor] = useState([])
  const [currentPage, setCurrentpage] = useState(1)
  const [postPerPage, setPostPerPage] = useState(12)
  const [currentPosts, setCurrentPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [filterArr,setFilter] = useState([])

  const [isError,setError] = useState(false)
  useEffect(() => {
    getVendorDetails()
  }, [])

  function getDate(value) {
    let date = new Date(value)
    return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
  }

  const getVendorDetails = async () => {
    try {
      const { data } = await axios.get(`${window.env_var}api/vendorpayment/getbycommunity/${localStorage.getItem('community_id')}`)
      setCurrentvendor(data.data.vendor_bills)
      const indexoflast = currentPage * postPerPage  //endoffset
      const indexoffirst = indexoflast - postPerPage //startoffset
      setCurrentPosts(data.data.vendor_bills.slice(indexoffirst, indexoflast))
      setLoading(false);
      setError(false)
    } catch (error) {
      setError(true)
      setLoading(false);
    }
  }

  // function paginate(event) {
  //   setCurrentpage(event.selected + 1)
  //   const indexoflast = (event.selected + 1) * postPerPage  //endoffset
  //   const indexoffirst = indexoflast - postPerPage //startoffset
  //   if(filterArr.length>0)
  //   {
  //     setCurrentPosts(filterArr.slice(indexoffirst, indexoflast))
  //   }
  //   else
  //   {
  //     setFilter([])
  //     setCurrentPosts(currentvendor.slice(indexoffirst, indexoflast))
  //   }

  // }

  function findText(e)
  {

    let text  = e.target.value.toLowerCase()
   
    let arr = currentvendor.filter(x=>x.vendorName.toLowerCase().includes(text))
    const indexoflast = currentPage *postPerPage
    const indexoffirst = (indexoflast - postPerPage)
    if(arr.length>0)
    {
      setFilter(arr)
      setCurrentPosts(arr.slice(indexoffirst,indexoflast))
    }
    else{
      setFilter([])
      setCurrentPosts(currentvendor.slice(indexoffirst,indexoflast))
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
      {console.log(currentPosts)}
      <div id="societynamesection">
        <div className="VPT_societyname">
          <img src="/images/societyicon.svg" alt="Society image" />
          <label>Society Name</label>
        </div>
        <br />

        <div className="VPT_sideimage">
          <img src="/images/communitysideimg.svg" alt="dashboard sideimage" />
        </div>
      </div>
      <div className="addguestbackgroundimg">
        <div className="VPT_display">
          <label>Vendor</label>
        </div>
        <br />
        <Loader loading={loading}>
          <div className='vendorpayment_search'>
                <span><img src="/images/vendorlistsearch.svg" alt='search icon'></img>
                  <input placeholder='Search' onChange={(e) => { findText(e) }}></input></span>
            </div>
          <div className="AddVPBlock">
            <button type="button" className="VPAddBTN" onClick={() => {
              window.location.href = "/vendorpayment";
            }}>&#10011; Add Vendor Payment</button>
          </div>
          <table id="viewparkingtable" class="table table-striped table-bordered table-sm " cellspacing="0" style={{ border: '2px solid black' }}>
            <thead>
              <tr>
                <th class="th-sm">Vendor</th>
                <th class="th-sm">Block </th>
                <th class="th-sm">Flat  No.</th>
                <th class="th-sm">Resident Name</th>
                <th class="th-sm">Amount</th>
                <th class="th-sm">Status</th>
              </tr>
            </thead>
            <tbody>
              {currentPosts.map(item => {
                return (
                  <tr>
                    <td>{item.vendorName}</td>
                    <td >{item.block.block_no}</td>
                    <td>{item.flat.flat_no}</td>
                    <td>{item.resident.firstname}{item.resident.lastname}</td>
                    <td>{item.paymentAmount}</td>
                    <td>{item.paid ? 'PAID' : 'NOT PAID'}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <br /><br />
          <Pagination totalPages={filterArr.length>0?filterArr.length:currentvendor.length} data ={filterArr.length>0?filterArr:currentvendor} settingCurrent={settingCurrent}/>
        </Loader>
      </div>
    </div>
  );
};

export default VendorPaymentTable;
