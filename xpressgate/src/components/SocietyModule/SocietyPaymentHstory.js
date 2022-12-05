import React from "react";
import "../SocietyModule/SocietyPaymentHistory.css";
import LogOut from "./Utils/LogOut";
// import PaginationCalculate from "../GuardModule/Utils/paginationCalculate";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useLocation } from "react-router-dom";

const SocietyPaymentHistory = () => {
 
  // const [vendors,setVendors]= useState([])
  // const [currentPage, setCurrentpage] = useState(1)
  // const [postPerPage, setPostPerPage] = useState(12)
  // const [currentPosts,setCurrentPosts] = useState([])
  // const location = useLocation()
  // useEffect(()=>{
  //   if(location.state)
  //   {
  //     getVendors()
  //   }
  //   else
  //   {
  //     window.location.href='/servicevendors'
  //   }
  // },[])

  // const getVendors=async()=>{
  //   try {
  //     const {data} = await axios.get(`${window.env_var}api/vendor/byType/${location.state.id}`)
  //     setVendors(data.data.list)
  //     const indexoflast = currentPage*postPerPage  //endoffset
  //     const indexoffirst = indexoflast - postPerPage //startoffset
  //     setCurrentPosts(data.data.list.slice(indexoffirst,indexoflast))
  //   } catch (error) {
  //     window.location.href='/servicevendors'
  //   }
  // }
    
  // async function  paginate(event)
  // {
  //   const {data} = await axios.get(`${window.env_var}api/vendor/byType/${location.state.id}`)
  //   setCurrentpage(event.selected+1)
  //   const indexoflast = (event.selected+1)*postPerPage  //endoffset
  //   const indexoffirst = (indexoflast - postPerPage) //startoffset
  //   setCurrentPosts(data.data.list.slice(indexoffirst,indexoflast))
  // }

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
          <input list="bills" className="Bills" placeholder="Electricity Bill"></input>
          <datalist id="bills" >
            <option value="Electricity Bill" selected></option>
            <option value=" "></option>
            <option value=" " ></option>
          </datalist>
        </div>
        <div>
          <input list="Blocks" className="blocks"  placeholder="Block A" ></input>
          <datalist id="Blocks">
            <option value="Block A" selected></option>
            <option value=" "></option>
            <option value=" " ></option>
          </datalist>
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
