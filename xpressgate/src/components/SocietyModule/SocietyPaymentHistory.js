import React from "react";
import "../SocietyModule/SocietyPaymentHistory.css";
import LogOut from "./Utils/LogOut";
import PaginationCalculate from "../GuardModule/Utils/paginationCalculate";
import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Societyheader from "./Utils/Societyheader";
import { getBlocks } from "./common/common";
const SocietyPaymentHistory = () => {
 
  const [utilities,setUtility]= useState([])
  const [block,setBlock] = useState([])
  const [currentPage, setCurrentpage] = useState(1)
  const [postPerPage, setPostPerPage] = useState(12)
  const [currentPosts,setCurrentPosts] = useState([])
  const location = useLocation()
  useEffect(()=>{
      getUtilities()
  },[])

  const getUtilities=async()=>{
    try {
        const {data} = await axios.get(`${window.env_var}api/admin/utilities/getAll`)
        setUtility(data.data.utilitieslist)
        setBlock(await getBlocks())
    } catch (error) {
      console.log(error)
    }

  }
  
    
  async function  paginate(event)
  {
    const {data} = await axios.get(`${window.env_var}api/vendor/byType/${location.state.id}`)
    setCurrentpage(event.selected+1)
    const indexoflast = (event.selected+1)*postPerPage  //endoffset
    const indexoffirst = (indexoflast - postPerPage) //startoffset
    setCurrentPosts(data.data.list.slice(indexoffirst,indexoflast))
  }

  return (
    <div className="addguestcontainer4">
    <div id="addflatsection">
      <Societyheader/>
    </div>
      <div id="societynamesection">
        <div className="societyname">
          <img src="/images/profileicon.svg" alt="Society image" />
          <label>Society Name</label>
        </div>
        
        <div className="societysideimg1">
          <img src="/images/communitysideimg.svg" alt="dashboard sideimage" />
        </div>
      </div>
      <div className="addguestbackgroundimg">
        <div className="paymentlabel">
          <label> Payment History</label>
        </div>
       <div className="dropboxes">
        <div>
          <select id="bills" className="form-control input-lg ">
            <option value={null} disabled selected>Select Type</option>
            {utilities.map(item=>{
                        return <option value={item._id}>{item.utilityType}</option>
            })}
          </select>
        </div>
        <div>
          <select id="Blocks" className="form-control input-lg">
            <option value={null} disabled selected>Select Block</option>
            {block.map(item=>{
                  return <option value={item.id}>{item.name}</option>
            })}
          </select>
        </div>
       </div>
        <input
          type=" search"
          className="paymentsearch"
          name="Search"
          placeholder="&#128269; Search"
        ></input>

        <table
          id="inoutbooktable4"
          class="table table-striped table-bordered table-sm  "
          cellspacing="0"
          // style={{ border: '2px solid #14335D;;'}}
        >
          <thead>
            <tr>
              <th class="th-sm">Bill NO</th>
              <th class="th-sm">Flat No</th>
              <th class="th-sm">Resident Name</th>
              <th class="th-sm">Payment Date</th>
              <th class="th-sm">Due Date</th>
              <th class="th-sm">Status</th>
              <th class="th-sm">        </th>
            </tr>
          </thead>
          <tbody>
{/* 
            {vendors.map(item=>{

              return(
                <tr key={item._id}>
                  <td>{item.vendor_name}</td>
                  <td>{item.vendorBy.firstname} {item.vendorBy.lastname}</td>
                  <td>{item.status==true?'Active':'Inactive'} </td>
            </tr>
              )
              
            })} */}
            
          

            
          </tbody>
        </table>
        {/* <PaginationCalculate totalPages={vendors.length} postperPage={postPerPage} currentPage={currentPage} paginate={paginate}/> */}

      </div>
    </div>
  );
};

export default SocietyPaymentHistory;