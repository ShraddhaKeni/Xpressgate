import React, { useEffect,useState } from 'react';
import './Vendorlist.css';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import PaginationCalculate from './Utils/paginationCalculate';
import LogOut from './Utils/LogOut';
import { Link, Navigate } from 'react-router-dom';

const Vendorlist = () => {

  const [vendorData,setData]= useState([])
  const [vendorBooking,setBookingData] = useState()

  //pagination states 

  const [currentPage, setCurrentpage] = useState(1)
  const [postPerPage, setPostPerPage] = useState(12)
  const [currentPosts,setCurrentPosts] = useState([])
  const [pageCount,setpageCount] = useState(0)

  useEffect(()=>{
    getAllVendorData()
   
  },[currentPage])

  const getAllVendorData=async()=>{
    try
    {
      const {data} = await axios.get(`/api/vendor/list`)
      
      setData(data.data.list)
      const indexoflast = currentPage*postPerPage  //endoffset
      const indexoffirst = indexoflast - postPerPage //startoffset
      setCurrentPosts(data.data.list.slice(indexoffirst,indexoflast))
    }
    catch(err)
    {
      console.log(err)
    }
  }



  const  dateTimeFormat=(date)=>
  {
    var d = new Date(date)
    return d.getFullYear()+'-'+d.getMonth()+'-'+d.getDate()
    
  }

  async function  paginate(event)
  {
    const {data} = await axios.get(`/api/vendor/list`)
    setCurrentpage(event.selected+1)
    const indexoflast = (event.selected+1)*postPerPage  //endoffset
    const indexoffirst = (indexoflast - postPerPage) //startoffset
    setCurrentPosts(data.data.list.slice(indexoffirst,indexoflast))
  }
  async function findText(e)
  {
    let text = vendorData.filter(x=>x.vendor_name.toLowerCase().includes(e.target.value.toLowerCase()))
    if(text)
    {
      setCurrentPosts(text)
    }
    else
    {
      paginate(0)
    }
    
  }
 
  var srno = 1 
  return (
    <div className="vendorlistcontainer">
      <div id="headersection">
        <div class="firstheadersection">
          <div id="dashboardlogo"><img src="/images/loginlogo.svg" alt="header logo" /></div>
          <div id="dashboardguard"><label>Guard</label></div>
          <div id="dashboardspace"></div>
          <div id="dashboardnotification"><a href="abc"><img src="/images/notification.svg" className='bellicon' alt="notificationicon" /></a></div>
          <div id="dashboardsetting"><a href="abc"><img src="/images/setting.svg" className='cogwheel' alt="settingicon" /></a></div>
          <div id="dashboardlogoutbutton"> <LogOut/> </div>
        </div>
      </div>
      <div id="guardnamesection">
        <div className='guardname'>
          <img src="/images/guardnameicon.svg" alt="guard name" />
          <label>Guard Name</label>
        </div>
        <div className='sideimage'><img src="/images/sideimage.svg" alt="dashboard sideimage" /></div>
      </div>
      <div className='vlbackgroundimg'>
        <div className='vendorlistdisplay'>
          <label>Vendor List</label>
        </div>
        <div className='row'>
          <div className='searchbox'>
            <span><img src="/images/vendorlistsearch.svg" alt='search icon'></img></span>
            <span><label className='searchlabel'>Search</label><input className='search_input' onChange={(e)=>{findText(e)}}></input></span>
          </div>
          <div className='addvendor'>
            <span><img src="/images/addvendor.svg" alt='addvendor icon'></img></span>
            <span><label className='addvendorlabel'>Add Vendor</label></span>
          </div>
        </div>
        {/* <div class="table-responsive"> */}
        <table id="inoutbooktable" class="table vendorList table-striped table-bordered table-sm " cellspacing="0" style={{ border: '2px solid black' }}>
          <thead>
            <tr>
              <th class="th-sm"></th>
              <th class="th-sm">Name</th>
              <th class="th-sm">Vendor type</th>
              <th class="th-sm">Block</th>
              <th class="th-sm">Flat No.</th>
              <th class="th-sm">Date</th>
              <th class="th-sm">In time</th>
              <th class="th-sm">Status</th>
            </tr>
          </thead>
          <tbody>
            {currentPosts.map((item,index)=>{
              return(
                
                <tr key={item.booking_id} id={item._id}  >
                <td>{currentPage<=2?(currentPage-1)*12+(index+1):(currentPage-1+1)+(index+1)}</td>
                <td><Link className='linkToPage' to='/vendorentry' state={{id:item.booking_id}}>{item.vendor_name}</Link></td>
                <td>{item.service}</td>
                <td>{item.block}</td>
                <td>{item.flats}</td>
                <td>{dateTimeFormat(item.date)}</td>
                <td>-</td>
                <td>-</td>
               
              </tr>
             
              )
            })}
           
          </tbody>
        </table>
        <PaginationCalculate totalPages={vendorData.length} postperPage={postPerPage} currentPage={currentPage} paginate={paginate}/>
      </div>
    </div>
  )
}

export default Vendorlist

