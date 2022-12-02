import React from "react";
import "../SocietyModule/Plumber.css";
import LogOut from "./Utils/LogOut";
import PaginationCalculate from "../GuardModule/Utils/paginationCalculate";
import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Societyheader from "./Utils/Societyheader";

const Plumber = () => {
 
  const [vendors,setVendors]= useState([])
  const [currentPage, setCurrentpage] = useState(1)
  const [postPerPage, setPostPerPage] = useState(12)
  const [currentPosts,setCurrentPosts] = useState([])
  const location = useLocation()
  useEffect(()=>{
    if(location.state)
    {
      getVendors()
    }
    else
    {
      window.location.href='/localservices'
    }
  },[])

  const getVendors=async()=>{
    try {
      const {data} = await axios.get(`${window.env_var}api/vendor/byType/${location.state.id}`)
      setVendors(data.data.list)
      const indexoflast = currentPage*postPerPage  //endoffset
      const indexoffirst = indexoflast - postPerPage //startoffset
      setCurrentPosts(data.data.list.slice(indexoffirst,indexoflast))
    } catch (error) {
      window.location.href='/localservices'
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
        <div class="noticelist">
          <h4><b>Notice List</b></h4>
          <a href="abcd" class="Notice">Plumber</a><br/>
          <a href="abcd" class="Notice">Electrician</a>
          </div>
        <div className="sideimage5">
          <img src="/images/communitysideimg.svg" alt="dashboard sideimage" />
        </div>
      </div>
      <div className="addguestbackgroundimg">
        <div className="Addguestdisplay3">
          <label>{location.state.serviceName}</label>
        </div>

        <input
          type=" search"
          className="search"
          name="Search"
          placeholder="&#128269; Search"
        ></input>

        <table
          id="plumbertable"
          class="table table-striped table-bordered table-sm "
          cellspacing="0"
          // style={{ border: '2px solid #14335D;;'}}
        >
          <thead>
            <tr>
              <th class="th-sm">Name</th>
              <th class="th-sm">Added by</th>
              <th class="th-sm">Status</th>
            </tr>
          </thead>
          <tbody>

            {vendors.map(item=>{

              return(
                <tr key={item._id}>
                  <td>{item.vendor_name}</td>
                  <td>{item.vendorBy.firstname} {item.vendorBy.lastname}</td>
                  <td>{item.status==true?'Active':'Inactive'} </td>
            </tr>
              )
              
            })}
            
          

            
          </tbody>
        </table>
        <PaginationCalculate totalPages={vendors.length} postperPage={postPerPage} currentPage={currentPage} paginate={paginate}/>

      </div>
    </div>
  );
};

export default Plumber;
