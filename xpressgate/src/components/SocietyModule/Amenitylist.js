import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PaginationCalculate from '../GuardModule/Utils/paginationCalculate';
import './Amenitylist.css';
import { getAmenitiesBooked } from './common/common';
import LogOut from './Utils/LogOut';

const Amenitylist = () => {

  const [bookedAmenities,setBookedAmenities] = useState([])
  const [currentPage, setCurrentpage] = useState(1)
  const [postPerPage, setPostPerPage] = useState(12)
  const [currentPosts,setCurrentPosts] = useState([])
  const location = useLocation()
  useEffect(()=>{
    if(location.state)
    {
      getData()
    }
    else
    {
      window.location.href='/amenities'
    }
    
  },[])

  const getData=async()=>{
    setBookedAmenities(await getAmenitiesBooked(location.state.id))
    setPaginate(await getAmenitiesBooked(location.state.id))
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
    setCurrentPosts(bookedAmenities.sort().reverse().slice(indexoffirst,indexoflast))
  }

  const  dateTimeFormat=(date)=>
  {
    var d = new Date(date)
    return d.getFullYear()+'-'+d.getMonth()+'-'+d.getDate()
    
  }

  const getTime=(date)=>{
    var d = new Date(date)
    return d.getHours()+':'+d.getMinutes()
    
  }
  return (
    <div className="alcontainer">
      <div id="alheadersection">
        <div class="alfirstheadersection">
          <div id="aldashboardlogo"><img src="/images/loginlogo.svg" alt="header logo" /></div>
          <div id="alsociety"><label>Society</label></div>
          <div id="aldashboardspace"></div>
          <div id="alnotification"><a href="abc"><img src="/images/notification.svg" alt="notificationicon" /></a></div>
          <div id="alsetting"><a href="abc"><img src="/images/setting.svg" alt="settingicon" /></a></div>
          <div id="allogoutbutton"><LogOut /></div>
        </div>
      </div>
      <div id="alsection">
        <div className='alname'>
        <img src="/images/societyicon.svg" alt="society name" />
          <label>Society Name</label>
        </div>
        <div className='alsideimage'><img src="/images/societysideimg.svg" alt="dashboard sideimage" /></div>
      </div>
      <div className='albackgroundimg'>
        <div className='aldisplay'>
          <label>{location.state.type}</label>
        </div>
        <div className='row'>
          <div className='alsearchbox'>
            <span><img src="/images/vendorlistsearch.svg" alt='search icon'></img></span>
            <span><label className='alsearchlabel'>Search</label><input className='search_input'></input></span>
          </div>
        </div>
        <table id="altable" class="table table-striped table-bordered table-sm " cellspacing="0" style={{ border: '2px solid black' }}>
          <thead>
            <tr>
              <th class="th-sm">Sr No</th>
              <th class="th-sm">Owner Name</th>
              <th class="th-sm">Amenity</th>
              <th class="th-sm">Date</th>
              <th class="th-sm">Time</th>
              <th class="th-sm">Action</th>
            </tr>
          </thead>
          <tbody>

            {currentPosts.map((item,index)=>{
              return(
                <tr>
                  <td>{currentPage<=2?(currentPage-1)*12+(index+1):(currentPage-1)*12+(index+1)}</td>
                  <td>{item.firstname} {item.lastname}</td>
                  <td>{item.aminety}</td>
                  <td>{dateTimeFormat(item.date)}</td>
                  <td>{getTime(item.date)}</td>
                  <td>{item.status==true?'Approved':'Unapproved'}</td>
              </tr>
              )
            })}
            
          </tbody>
        </table>
        <PaginationCalculate totalPages={bookedAmenities.length} postperPage={postPerPage} currentPage={currentPage} paginate={paginate}/>
      </div>
    </div>
  )
}

export default Amenitylist

