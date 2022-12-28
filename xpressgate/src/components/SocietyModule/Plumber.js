import React from "react";
import "../SocietyModule/Plumber.css";
import LogOut from "./Utils/LogOut";
import PaginationCalculate from "../GuardModule/Utils/paginationCalculate";
import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Societyheader from "./Utils/Societyheader";

const Plumber = () => {
 
  const [vendors,setVendors]= useState([])
  const [services,setServices] = useState([])
  const [currentPage, setCurrentpage] = useState(1)
  const [postPerPage, setPostPerPage] = useState(12)
  const [currentPosts,setCurrentPosts] = useState([])
  const location = useLocation()
  const navigate = useNavigate()
  const [flag,setFlag] = useState(true)

  useEffect(()=>{
    if(location.state.id)
    {
      getVendors()
      getServices()
    }
    else
    {
      window.location.href='/localservices'
    }
  },[flag])

  const getServices=async()=>{
    try {
      const {data} = await axios.get(`${window.env_var}api/admin/localservices/getAll`)
      setServices(data.data.localservices)
    } catch (error) {
      console.log(error)
    }
  }

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

  function findText(e)
  {
    let search = e.target.value.toLowerCase()
    let arr = vendors.filter(x=>{
      if(x.vendor_name.toLowerCase().includes(search))
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

const autoSelect = ()=>{
  var tags = document.getElementsByClassName('sidebar_h6')
  var arr = Array.from(tags).forEach(item=>{
    document.getElementById(item.id).classList.remove('selected')
  })
  document.getElementById(location.state.id).classList.add('selected')
  setFlag(!flag)
}


const navigateTo =e=>{
  var tags = document.getElementsByClassName('sidebar_h6')
  var arr = Array.from(tags).forEach(item=>{
    document.getElementById(item.id).classList.remove('selected')
  })
  document.getElementById(e.target.id).classList.add('selected')
  setFlag(!flag)
  navigate('/servicevendors',{state:{id:e.target.id,serviceName: document.getElementById(e.target.id).innerHTML}})
}

function navigatetoEdit(id)
{
  navigate('/addlocalservice',{state:{type:'edit',id:id}})
}

  return (
    <div className="addguestcontainer4" onLoad={()=>autoSelect()}>
      <div id="addflatsection">
          <Societyheader/>
      </div>
      <div id="societynamesection">
        <div className="Plum_societyname">
          <img src="/images/societyicon.svg" alt="Society image" />
          <label>Society Name</label>
        </div><br></br>
        <div>
          <a href="/localservices" className="LOcalSLINK">Local Services</a>
        </div>
        <div class="lnoticelist">
          <div className="sidebar_classes">
            {services.map(item=>{
              if(item.serviceName===location.state.serviceName)
              {
                return <h5 id={item.id} onClick={(e)=>{navigateTo(e)}} className="sidebar_h6 fontstyle">{item.serviceName}</h5>
              }
              else
              {
                return <h5 id={item.id} onClick={(e)=>{navigateTo(e)}} className="sidebar_h6 fontstyle">{item.serviceName}</h5>
              }
              }
            )}
          </div>
          {/* <a href="abcd" class="Notice">Electrician</a> */}
        </div>
        <div className="P_sideimage">
          <img src="/images/communitysideimg.svg" alt="dashboard sideimage" />
        </div>
      </div>
      <div className="addguestbackgroundimg">
        <div className="P_display">
          <label>{location.state.serviceName}</label>
        </div>
        <div className="row">
          <div className='vmsearchbox'>
            <span><img src="/images/vendorlistsearch.svg" alt='search icon'></img>
              <input placeholder='Search' onChange={(e) => { findText(e) }}></input></span>
          </div>
        </div>

        <table id="plumbertable" class="table table-striped table-bordered table-sm" cellspacing="0">
          <thead>
            <tr>
              <th class="th-sm">Name</th>
              <th class="th-sm">Added by</th>
              <th class="th-sm">Status</th>
            </tr>
          </thead>
          <tbody>
            {currentPosts.map(item=>{
              return(
                <tr onClick={() => navigatetoEdit(item._id)}>
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