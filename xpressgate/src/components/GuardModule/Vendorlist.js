import React, { useEffect,useState } from 'react';
import './Vendorlist.css';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import PaginationCalculate from './Utils/paginationCalculate';
import LogOut from './Utils/LogOut';
import { Link, Navigate, useLocation,useNavigate } from 'react-router-dom';
import HeaderSection from './Utils/HeaderSection';
import { checkGuard } from '../auth/Auth';
import GuardHeader from './Utils/GuardHeader';

const Vendorlist = () => {

  const [vendorData,setData]= useState([])
  const [vendorBooking,setBookingData] = useState()
  const [inout,setInOut] = useState([])
  const location = useLocation()
  const navigate = useNavigate()
  const [stat,setStat] = useState(false)
  //pagination states 

  const [currentPage, setCurrentpage] = useState(1)
  const [postPerPage, setPostPerPage] = useState(12)
  const [currentPosts,setCurrentPosts] = useState([])
  const [pageCount,setpageCount] = useState(0)


  useEffect(()=>{
    if(checkGuard())
    {
      const config = {
        headers:{
          'x-access-token':localStorage.getItem('accesstoken')
        }
      }
     axios.get(`${window.env_var}api/guard/checkLogin`,config)
            .then(({data})=>{  
              getAllVendorData()   
            })
            .catch(err=>{
              localStorage.clear();
              window.location.href='/guardLogin'
            })
           
    }
    else
    {
      window.location.href='/'
    }




    
    
  },[])

  const getAllVendorData=async()=>{
    try
    {
      const {data} = await axios.get(`${window.env_var}api/vendor/list`)
      const response = await axios.get(`${window.env_var}api/inout/getall/${'632970d054edb049bcd0f0b4'}`)
      setInOut(response.data.data.list)
      setData(data.data.list.filter(x=>x.bookingstatus==true))
      checkNavigate()
      const indexoflast = currentPage*postPerPage  //endoffset
      const indexoffirst = indexoflast - postPerPage //startoffset
      setCurrentPosts(data.data.list.filter(x=>x.bookingstatus==true).slice(indexoffirst,indexoflast))
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

  const getTime=(date)=>{
    var d = new Date(date)
    return d.getHours()+':'+d.getMinutes()
    
  }

  async function  paginate(event)
  {
    const {data} = await axios.get(`${window.env_var}api/vendor/list`)
    setCurrentpage(event.selected+1)
    const indexoflast = (event.selected+1)*postPerPage  //endoffset
    const indexoffirst = (indexoflast - postPerPage) //startoffset
    setCurrentPosts(data.data.list.filter(x=>x.bookingstatus==true).slice(indexoffirst,indexoflast))
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
 function checkNavigate()
 {
    try {
     
    } catch (error) {
      
    }
 }

  var srno = 1 
  return (
    
    <div className="vendorlistcontainer">
      <div id="headersection">
        <GuardHeader/>
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
            <span><img src="/images/vendorlistsearch.svg" alt='search icon'></img>
          {/* <label className='searchlabel'>Search</label> */}
          <input className='vlsearch_input' placeholder='Search' onChange={(e)=>{findText(e)}}></input></span>
          </div>
          {/* <div className='addvendor'>
            <span><img src="/images/addvendor.svg" alt='addvendor icon'></img></span>
            <span><label className='addvendorlabel'>Add Vendor</label></span>
          </div> */}
        </div>
        {/* <div class="table-responsive"> */}
        <table id="inoutbooktable" class="table vendorList table-striped table-bordered table-sm " cellspacing="0" style={{ border: '2px solid black' }}>
          <thead>
            <tr>
              <th class="th-sm">Sr no</th>
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
                
                <tr key={item.booking_id} id={item.booking_id}  >
                <td>{currentPage<=2?(currentPage-1)*12+(index+1):(currentPage-1)*12+(index+1)}</td>
                <td id={'td-'+item._id} ><Link className='linkToPage' to='/vendorentry' state={{id:item._id,bookingid:item.booking_id}}>{item.vendor_name}</Link></td>
                <td>{item.service}</td>
                <td>{item.block}</td>
                <td>{item.flats}</td>
                <td>{dateTimeFormat(item.date)}</td>
                <td>{getTime(item.date)}</td>
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

