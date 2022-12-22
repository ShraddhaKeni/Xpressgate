import React, { useState, useEffect, useRef } from "react";
import "../SocietyModule/VendorPaymentTable.css";
import Societyheader from "./Utils/Societyheader";
import PaginationCalculate from "../GuardModule/Utils/paginationCalculate";
import axios from "axios";

const VendorPaymentTable = () => {
  const [vendor, setVendor] = useState()
  const [currentvendor, setCurrentvendor] = useState([])

  const [currentPage, setCurrentpage] = useState(1)
  const [postPerPage, setPostPerPage] = useState(12)
  const [currentPosts, setCurrentPosts] = useState([])

  useEffect(() => {
    getVendorDetails()
  }, [])

  function getDate(value) {
    // console.log(value)
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
    } catch (error) {
      console.log(error)
    }
  }

  function paginate(event) {
    setCurrentpage(event.selected + 1)
    const indexoflast = (event.selected + 1) * postPerPage  //endoffset
    const indexoffirst = indexoflast - postPerPage //startoffset
    setCurrentPosts(currentvendor.slice(indexoffirst, indexoflast))
  }

  return (
    <div className="addguestcontainer4">
      <div id="addflatsection">
        <Societyheader />

      </div>
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
                  <td >bl</td>
                  <td>fl</td>
                  <td>{item.resident.firstname}{item.resident.lastname}</td>
                  <td>{item.paymentAmount}</td>
                  <td>{item.paid ? 'PAID' : 'NOT PAID'}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <br /><br />
        <PaginationCalculate totalPages={currentvendor.length} postperPage={postPerPage} currentPage={currentPage} paginate={paginate} />


      </div>
    </div>



  );
};

export default VendorPaymentTable;
