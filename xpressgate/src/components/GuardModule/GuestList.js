import React from 'react'
import LogOut from './Utils/LogOut';
import './Inoutbook.css';
import { Button } from 'react-bootstrap';
import { useState, useEffect } from 'react'
import axios from 'axios'
import PaginationCalculate from './Utils/paginationCalculate';
import { useNavigate } from 'react-router-dom';

const GuestList = () => {

    const [guests,setGuests] = useState([])
    const [currentPage, setCurrentpage] = useState(1)
    const [postPerPage, setPostPerPage] = useState(12)
    const [currentPosts,setCurrentPosts] = useState([])
    const [pageCount,setpageCount] = useState(0)
    const navigate = useNavigate()
    useEffect(()=>{
        getData()
    },[])

    const getData=async()=>{
        try {
            const {data}= await axios.post(`${window.env_var}api/guard/getallguest`,{community_id:localStorage.getItem('community_id')})
            setGuests(data.data.guests_list)
            const indexoflast = currentPage*postPerPage  //endoffset
            const indexoffirst = indexoflast - postPerPage //startoffset
            setCurrentPosts(data.data.guests_list.filter(x=>x.status==true).slice(indexoffirst,indexoflast))
            
        } catch (error) {
            console.log(error)
        }
    }
    const  dateTimeFormat=(date)=>
    {
      var d = new Date(date)
      return d.getHours()+':'+d.getMinutes()
      
    }
async function  paginate(event)
  {
    const {data}= await axios.post(`${window.env_var}api/guard/getallguest`,{community_id:localStorage.getItem('community_id')})
    setCurrentpage(event.selected+1)
    const indexoflast = (event.selected+1)*postPerPage  //endoffset
    const indexoffirst = (indexoflast - postPerPage) //startoffset
    setCurrentPosts(data.data.guests_list.filter(x=>x.status==true).slice(indexoffirst,indexoflast))
}
const guestEntry=async(id)=>{
    navigate('/guestentry',{state:{id:id}})
}
  
  return (
    <div className="inoutbookcontainer">
      <div id="headersection">
        <div class="firstheadersection">
          <div id="dashboardlogo"><img src="/images/loginlogo.svg" alt="header logo" /></div>
          <div id="dashboardguard"><label>Guard</label></div>
          <div id="dashboardspace"></div>
          <div id="dashboardnotification"><a href="abc"><img src="/images/notification.svg" alt="notificationicon" /></a></div>
          <div id="dashboardsetting"><a href="abc"><img src="/images/setting.svg" alt="settingicon" /></a></div>
          <div id="dashboardlogoutbutton"> <LogOut/></div>
        </div>
      </div>
      <div id="guardnamesection">
        <div className='guardname'>
          <img src="/images/guardnameicon.svg" alt="guard name" />
          <label>Guard Name</label>
        </div>
        <div className='sideimage'><img src="/images/sideimage.svg" alt="dashboard sideimage" /></div>
      </div>
      <div className='iobbackgroundimg'>
        <div className='inoutbookdisplay'>
          <label>In-out Book</label>
        </div>
        {/* <div class="table-responsive"> */}
        <table id="inoutbooktable" class="table table-striped table-bordered table-sm " cellspacing="0" style={{ border: '2px solid black' }}>
          <thead>
            <tr>
              <th class="th-sm"></th>
              <th class="th-sm">Name</th>
              <th class="th-sm">Visitor type</th>
              <th class="th-sm">Block</th>
              <th class="th-sm">Flat No.</th>
              <th class="th-sm">Date</th>
              <th class="th-sm">In time</th>
              <th class="th-sm">Status</th>
            </tr>
          </thead>
          <tbody>
            {currentPosts.map((items,index)=>{
           return( <tr key={items._id}>
                <td>{currentPage<=2?(currentPage-1)*12+(index+1):(currentPage-1+1)+(index+1)}</td>
                <td onClick={()=>{guestEntry(items.Guest_id)}}>{items.guestFirstName} {items.guestLastName}</td>
                <td>Guest</td>
                <td>{items.block_name}</td>
                <td>{items.flat_number}</td>
                <td>Today</td>
                <td>{dateTimeFormat(items.time)}</td>
                <td>-</td>
            </tr>)
            })}
            
          </tbody>
        </table>
        {/* <div className="App">
      {data} */}
             <PaginationCalculate totalPages={guests.length} postperPage={postPerPage} currentPage={currentPage} paginate={paginate}/>

        {/* </div> */}
      </div>
    </div>
  )
}

export default GuestList