import React, { useEffect, useState } from 'react';
import './GuestManagement.css';
import LogOut from '../../components/SocietyModule/Utils/LogOut';
import { getGuestList } from './common/common';
import PaginationCalculate from '../GuardModule/Utils/paginationCalculate';
import Societyheader from './Utils/Societyheader';
import { Loader } from "../Loader";
import Pagination from '../../common/Pagination';
import ErrorScreen from '../../common/ErrorScreen';
import { useNavigate } from "react-router-dom";


const GuestManagement = () => {

  const [guests, setGuest] = useState([])
  const [currentPage, setCurrentpage] = useState(1)
  const [postPerPage, setPostPerPage] = useState(12)
  const [currentPosts,setCurrentPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [filterArr,setFilter] = useState([])
  const [isError,setError] = useState(false)
  const [listData, setInOutData] = useState({})
  const navigate = useNavigate()
  useEffect(()=>{
      getData()
  },[])

  const getData = async()=>{
    setGuest(await getGuestList())
    setPaginate(await getGuestList())
    setLoading(false);
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


  const  dateTimeFormat=(date)=>
  {
    var d = new Date(date)
    return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()
  }

  function findText(e)
  {
    let search = e.target.value.toLowerCase()
    let arr = guests.filter(x=>{
      if(x.guestFirstName?.toLowerCase().includes(search))
      {
        return true
      }
      else if(x.guestLastName?.toLowerCase().includes(search))
      {
        return true
      }
    })
    const indexoflast =currentPage*postPerPage  //endoffset
    const indexoffirst = (indexoflast - postPerPage)
    if(arr.length>0)
    {
      setFilter(arr)
      setCurrentPosts(arr.slice(indexoffirst,indexoflast))
    }
    else
    {
      setFilter([])
      setCurrentPosts(guests.slice(indexoffirst, indexoflast))
    }
  
}

function guestDetails(id) {
  navigate('/guestmanagementcard',{state :{id:id}})
}

function settingCurrent(value)
{
  setCurrentPosts(value)
}

if(isError)
return <ErrorScreen/>
  return (
    <div className="gmcontainer">
      <div id="gmheadersection">
        <Societyheader/>
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
        <Loader loading={loading}>
          <div className='row'>
            <div className='vmsearchbox'>
              <span><img src="/images/vendorlistsearch.svg" alt='search icon'></img>
              <input placeholder='Search' onChange={(e) => { findText(e) }}></input></span>
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
                  <tr onClick={() => guestDetails(item.Guest_id)}>
                    <td>{item.guestFirstName} {item.guestLastName}</td>
                    <td >{item.flat_number}</td>
                    <td>{dateTimeFormat(item.time)}</td>
                    <td>{item.vehicle_no}</td>
                </tr>
                )
              })}
              
            </tbody>
          </table>
          {/* <PaginationCalculate totalPages={guests.length} postperPage={postPerPage} currentPage={currentPage} paginate={paginate}/> */}
          <Pagination totalPages={filterArr.length>0?filterArr.length:guests.length} data ={filterArr.length>0?filterArr:guests} settingCurrent={settingCurrent}/>
        </Loader>
      </div>
    </div>
  )
}
export default GuestManagement;