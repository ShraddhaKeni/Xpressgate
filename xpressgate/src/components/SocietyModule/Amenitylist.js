import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useLocation,useNavigate } from 'react-router-dom';
import PaginationCalculate from '../GuardModule/Utils/paginationCalculate';
import './Amenitylist.css';
import { getAmenitiesBooked } from './common/common';
import LogOut from './Utils/LogOut';
import Societyheader from './Utils/Societyheader';
import { Loader } from "../Loader";
import Pagination from '../../common/Pagination';
import ErrorScreen from '../../common/ErrorScreen'

const Amenitylist = () => {
  const [loading, setLoading] = useState(true)
  const [bookedAmenities,setBookedAmenities] = useState([])
  const [currentPage, setCurrentpage] = useState(1)
  const [postPerPage, setPostPerPage] = useState(12)
  const [currentPosts,setCurrentPosts] = useState([])
  const location = useLocation()
  const navigate = useNavigate()
  const [filterArr,setFilter] = useState([])


  const [isError,setError] = useState(false)
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
    try{
    setBookedAmenities(await getAmenitiesBooked(location.state.id))
    setPaginate(await getAmenitiesBooked(location.state.id))
    setLoading(false);
    setError(false)
    }
    catch (error) {
      setError(true)
    }
  }
 const setPaginate= async(list)=>{
    const indexoflast = currentPage*postPerPage  //endoffset
    const indexoffirst = indexoflast - postPerPage //startoffset
    setCurrentPosts(list.sort().reverse().slice(indexoffirst,indexoflast))
  }

  // function  paginate(event)
  // {
  //   setCurrentpage(event.selected+1)
  //   const indexoflast = (event.selected+1)*postPerPage  //endoffset
  //   const indexoffirst = (indexoflast - postPerPage) //startoffset
  //   setCurrentPosts(bookedAmenities.sort().reverse().slice(indexoffirst,indexoflast))
  // }

  const  dateTimeFormat=(date)=>
  {
    var d = new Date(date)
    return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()
  }

  const getTime=(time)=>{
 
     let ntime = time.split('T');
     let titime = ntime[1].split('.');
     return titime[0]
  }
  const navigateToApprove=(id,time)=>{
    navigate('/approvallistamenity',{state:{id:id,time}})
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
    const indexoflast = currentPage * postPerPage 
    const indexoffirst = (indexoflast - postPerPage)
    if(arr.length>0)
    {
      setFilter(arr)
      setCurrentPosts(arr.slice(indexoffirst,indexoflast))
    }
    else
    {
      setFilter([])
      setCurrentPosts(bookedAmenities.slice(indexoffirst,indexoflast))
    }
  }

  function settingCurrent(value)
  {
    setCurrentPosts(value)
  }

  if(isError)
    return <ErrorScreen/>
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
        <div className='amen_sidelinks'>
          <a className='AnoticeSL'  onClick={()=>{navigate('/addeditamenity',{state:{id:location.state.id,type:'edit'}})}}>Update Amenity</a>
        </div>
        {/* <Button onClick={()=>{navigate('/addeditamenity',{state:{id:location.state.id,type:'edit'}})}} className='btnAdd' style={{marginLeft:'65px'}}>Edit Amenity</Button> */}
        <div className='alsideimage'><img src="/images/societysideimg.svg" alt="dashboard sideimage" /></div>
      </div>
      <div className='albackgroundimg'>
      <Loader loading={loading}>
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
                <tr style={item.status == false ? { backgroundColor: '#AED8DC' } : { backgroundColor: 'white' }} onClick={()=>{ item.status == false ? navigateToApprove(item._id,item.time) : getData() } }>
                                                                                                               
                  <td>{(currentPage-1)*12+(index+1)}</td>
                  <td>{item.firstname} {item.lastname}</td>
                  <td>{item.aminety}</td>
                  <td>{dateTimeFormat(item.date)}</td>
                  <td>{getTime(item.time)}</td>
                  <td>{item.status==true?'Approved':'Unapproved'}</td>
              </tr>
              )
            })}
          </tbody>
        </table>
        {/* <PaginationCalculate totalPages={bookedAmenities.length} postperPage={postPerPage} currentPage={currentPage} paginate={paginate}/> */}
        <Pagination totalPages={filterArr.length>0?filterArr.length:bookedAmenities.length} data ={filterArr.length>0?filterArr:bookedAmenities} settingCurrent={settingCurrent}/>

        </Loader>
      </div>
    </div>
  )
}

export default Amenitylist

