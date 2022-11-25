import React, { useEffect, useState } from 'react';
import './GuestManagement.css';
import LogOut from '../../components/SocietyModule/Utils/LogOut';
import { getGuestList } from './common/common';
import PaginationCalculate from '../GuardModule/Utils/paginationCalculate';

const GuestManagement = () => {

  const [guests, setGuest] = useState([])
  const [currentPage, setCurrentpage] = useState(1)
  const [postPerPage, setPostPerPage] = useState(12)
  const [currentPosts,setCurrentPosts] = useState([])
  useEffect(()=>{
      getData()
      
  },[])

  const getData = async()=>{
    setGuest(await getGuestList())
    setPaginate(await getGuestList())
  }

  const setPaginate= async(list)=>{
    const indexoflast = currentPage*postPerPage  //endoffset
    const indexoffirst = indexoflast - postPerPage //startoffset
    setCurrentPosts(list.sort().reverse().slice(indexoffirst,indexoflast))
  }

  async function  paginate(event)
  {
    setCurrentpage(event.selected+1)
    const indexoflast = (event.selected+1)*postPerPage  //endoffset
    const indexoffirst = (indexoflast - postPerPage) //startoffset
    setCurrentPosts(guests.slice(indexoffirst,indexoflast))
  }

  return (
    <div className="gmcontainer">
      <div id="gmheadersection">

        <div class="gmfirstheadersection">
          <div id="gmdashboardlogo"><img src="/images/loginlogo.svg" alt="header logo" /></div>
          <div id="gmsociety"><label>Society</label></div>
          <div id="gmdashboardspace"></div>
          <div id="gmdashboardnotification"><a href="abc"><img src="/images/notification.svg" alt="notificationicon" /></a></div>
          <div id="gmdashboardsetting"><a href="abc"><img src="/images/setting.svg" alt="settingicon" /></a></div>
          <div id="gmlogoutbutton"> <LogOut /></div>
        </div>
      </div>
      <div id="gmsection">
        <div className='gmname'>
        <img src="/images/societyicon.svg" alt="society name" />
          <label>Society Name</label>
        </div>
        <div className='gmsideimage'><img src="/images/societysideimg.svg" alt="dashboard sideimage" /></div>
      </div>
      <div className='gmbackgroundimg'>
        <div className='gmdisplay'>
          <label>Guest Management</label>
        </div>
        <div className='row'>
          <div className='gmsearchbox'>
            <span><img src="/images/vendorlistsearch.svg" alt='search icon'></img></span>
            <span><label className='gmsearchlabel'>Search</label><input className='search_input'></input></span>
          </div>
        </div>
        <table id="gmtable" class="table table-striped table-bordered table-sm " cellspacing="0" style={{ border: '2px solid black' }}>
          <thead>
            <tr>
              <th class="th-sm">Guest Name</th>
              <th class="th-sm">Flat No.</th>
              <th class="th-sm">Date</th>
              <th class="th-sm">Vehicle No.</th>
            </tr>
          </thead>
          <tbody>
            {currentPosts.map(item=>{
              
              return(
                <tr>
                  <td>{item.guestFirstName} {item.guestLastName}</td>
                  <td >{item.flat_number}</td>
                  <td>09-9-2022</td>
                  <td>2232</td>
              </tr>
              )
            })}
            
          </tbody>
        </table>
        <PaginationCalculate totalPages={guests.length} postperPage={postPerPage} currentPage={currentPage} paginate={paginate}/>
      </div>
    </div>
  )
}

export default GuestManagement

