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
import Loader from '../../common/Loader';
import ErrorScreen from '../../common/ErrorScreen'
import Pagination from '../../common/Pagination';
import Table from 'react-bootstrap/Table';

const NewVendorList = () => {
    
  const [vendorData,setData]= useState([])
  const [vendorBooking,setBookingData] = useState()
  const [inout,setInOut] = useState([])
  const location = useLocation()
  const navigate = useNavigate()
  const [stat,setStat] = useState(false)
  const [isLoading,setLoading] = useState(true)
  const [isError,setError] = useState(false)
  //pagination states 

  const [currentPage, setCurrentpage] = useState(1)
  const [postPerPage, setPostPerPage] = useState(12)
  const [currentPosts,setCurrentPosts] = useState([])
  const [pageCount,setpageCount] = useState(0)
  const [filterArr,setFilter] = useState([])

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
      setError(false)
      setTimeout(()=>{
        setLoading(false)
      },2000)
      const indexoflast = currentPage*postPerPage  //endoffset
      const indexoffirst = indexoflast - postPerPage //startoffset
      setCurrentPosts(data.data.list.slice(indexoffirst,indexoflast))
    }
    catch(err)
    {
      setLoading(false)
      setError(true)
    }
  }
 


  const  dateTimeFormat=(date)=>
  {
    var d = new Date(date)
    return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()
    
  }

  const getTime=(date)=>{
   
    // var d = new Date(date)
    // return d.getHours()+':'+d.getMinutes()
    let ntime = date.split('T');
    let titime = ntime[1].split('.');
    //console.log(titime[0])
    return titime[0]
    
  }

  // async function  paginate(event)
  // {
  //   const {data} = await axios.get(`${window.env_var}api/vendor/list`)
  //   setCurrentpage(event.selected+1)
  //   const indexoflast = (event.selected+1)*postPerPage  //endoffset
  //   const indexoffirst = (indexoflast - postPerPage) //startoffset
  //   setCurrentPosts(data.data.list.slice(indexoffirst,indexoflast))
  // }
  async function findText(e)
  {
    let text = vendorData.filter(x=>x.vendor_name.toLowerCase().includes(e.target.value.toLowerCase()))
    const indexoflast = currentPage * postPerPage 
    const indexoffirst = (indexoflast - postPerPage)
    if(text.length>0)
    {
      setFilter(text)
      setCurrentPosts(text.slice(indexoffirst,indexoflast))
    }
    else
    {

      setFilter([])
      setCurrentPosts(vendorData.slice(indexoffirst,indexoflast))
    }
    
  }
  function settingCurrent(value)
  {
    setCurrentPosts(value)
  }


 function checkNavigate()
 {
    try {
     
    } catch (error) {
      
    }
 }

  var srno = 1 

  if(isLoading)
    return <Loader/>

  if(isError)
    return <ErrorScreen/>

  return (
    <>
     <div className='flex flex-col'>

     <div id="headersection">
        <GuardHeader />
      </div>
<div className='flex'>

<div id="guardnamesection">
        <div className='GuestLName'>
          <img src="/images/guardnameicon.svg" alt="guard name" />
          <label>{localStorage.getItem('name')}</label>
        </div>
        <div className='GuestLsideimage'><img src="/images/sideimage.svg" alt="dashboard sideimage" /></div>
      </div> 

    <div className='flex-1 d-flex' style={{ width: "100%", height: '100%' }}>
        <div className='new-main-container'>
            <main>
            <div className='GuestL_display'>
          <label>Vendor List</label>
        </div>
            <div>
       <Table id="InoutBooktable" class="table table-striped table-bordered table-sm " cellspacing="0" style={{ border: '2px solid black' }} size='sm' responsive>
       <thead>
            <tr>
              <th class="th-sm">Sr No.</th>
              <th class="th-sm">Name</th>
              <th class="th-sm">Vendor Type</th>
              <th class="th-sm">Block</th>
              <th class="th-sm">Flat No.</th>
              <th class="th-sm">Date</th>
              <th class="th-sm">In Time</th>
              <th class="th-sm">Status</th>
            </tr>
          </thead>
          <tbody>
            {currentPosts.map((item,index)=>{
              
              return(
                
                <tr key={item.booking_id} id={item.booking_id}  >
                <td>{currentPage<=2?(currentPage-1)*12+(index+1):(currentPage-1)*12+(index+1)}</td>
                <td id={'td-'+item._id} >
                  {item.bookingstatus==true?<Link className='linkToPage' to='/vendorentry' state={{id:item._id,bookingid:item.booking_id,code:item.code}}>{item.vendor_name}</Link>:item.vendor_name}
                  
                  
                  </td>
                <td>{item.service}</td>
                <td>{item.block}</td>
                <td>{item.flats}</td>
                <td>{dateTimeFormat(item.date)}</td>
                <td>{getTime(item.date)}</td>
                <td>{item.bookingstatus==true?'Unapproved':'Approved'}</td>
               
              </tr>
             
              )
            })}
           
          </tbody>
    </Table>
    </div>
    <Pagination totalPages={filterArr.length>0?filterArr.length:vendorData.length} data ={filterArr.length>0?filterArr:vendorData} settingCurrent={settingCurrent}/>  
            </main>
        </div>

    </div>
</div>




</div >
   
    </>
  )
}

export default NewVendorList
