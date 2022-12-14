import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useLocation,useNavigate } from 'react-router-dom';
import PaginationCalculate from '../GuardModule/Utils/paginationCalculate';
import './Amenitylist.css';
import { getAmenitiesBooked } from './common/common';
import LogOut from './Utils/LogOut';
import Societyheader from './Utils/Societyheader';

const Amenitylist = () => {

  const [bookedAmenities,setBookedAmenities] = useState([])
  const [currentPage, setCurrentpage] = useState(1)
  const [postPerPage, setPostPerPage] = useState(12)
  const [currentPosts,setCurrentPosts] = useState([])
  const location = useLocation()
  const navigate = useNavigate()
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

  function  paginate(event)
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
  const navigateToApprove=(id)=>{
      navigate('/approvallistamenity',{state:{id:id}})
  }

  function findText(e)
  {
    let search = e.target.value.toLowerCase()
    
    
    let arr = bookedAmenities.filter(x=>{
      if(x.firstname.toLowerCase().includes(search))
      {
        return true
      }
      else if(x.lastname.toLowerCase().includes(search))
      {
        return true
      }
    })
    if(arr)
    {
      setCurrentPosts(arr)
    }
    else
    {
      paginate(0)
    }
  
}

    
  

  return (
    <div className="alcontainer">
      <div id="alheadersection">
        <Societyheader/>
      </div>
      <div id="alsection">
        <div className='alname'>
        <img src="/images/societyicon.svg" alt="society name" />
          <label>Society Name</label>
        </div>
        <div className='nlsidelinks'>
          <a className='AnoticeSL'  onClick={()=>{navigate('/addeditamenity',{state:{id:location.state.id,type:'edit'}})}}>Edit Amenity</a>
        </div>
        {/* <Button onClick={()=>{navigate('/addeditamenity',{state:{id:location.state.id,type:'edit'}})}} className='btnAdd' style={{marginLeft:'65px'}}>Edit Amenity</Button> */}
        <div className='alsideimage'><img src="/images/societysideimg.svg" alt="dashboard sideimage" /></div>
        
      </div>
      <div className='albackgroundimg'>
        <div className='aldisplay'>
          <label>Amenity Bookings</label>
        </div>
        <div className='row'>
        <div className='vmsearchbox'>
            <span><img src="/images/vendorlistsearch.svg" alt='search icon'></img>
              <input placeholder='Search' onChange={(e) => { findText(e) }}></input></span>
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
                <tr onClick={()=>{navigateToApprove(item._id)}}>
                  <td>{(currentPage-1)*12+(index+1)}</td>
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

