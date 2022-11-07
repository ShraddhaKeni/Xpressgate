import axios from 'axios';
import React,{useEffect, useState} from 'react'
import { Button } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import HeaderSection from './Utils/HeaderSection';
import LogOut from './Utils/LogOut';
const VendorEntryDetails = () => {
    const current = new Date();
    const [date, setDate] = useState(`${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`);
    const [vendorData, setVendorData] = useState({})
    const [flats,setFlats] = useState([])
    const [bookings,setBookings] = useState([])
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(()=>{
        getData()
    },[])

    const getData =async()=>{
     
        try {
            const {data} = await axios.get(`/api/vendorlist/getOne/${location.state.id}`)
            setVendorData(data.data.list[0])
            setFlats(data.data.list)
            setBookings(data.data.list)
            
        } catch (error) {
            
        }
    } 

    const submitData=async()=>{
        
        try {
          bookings.map(async(items)=>{
            try {
              let submitData = {
                firstname:items.vendor_name,
                lastname:'',
                mobileno:items.contact,
                intime:Date.now(),
                outtime:"",
                community_id:localStorage.getItem('community_id'),
                flat_id:items.flat_id,
                type:2,
                bookedID:location.state.id,
                status:2,
                allowed_by:localStorage.getItem('guard_id')
            }
              const {data} = await axios.post(`/api/inout/add`,submitData)
              console.log(data)
              const bookingUpdate = await axios.get(`/api/bookvendor/removeBooking/${items.booking_id}`)

            } catch (error) {
              console.log(error)
            }
            
          })
            
            navigate('/vendorlist')
            
        } catch (error) {
            console.log(error)
        }
    }
   
      return (
      
        <div className="frequentvisitorcontainer">
          <div id="headersection">
            <div class="firstheadersection">
             {console.log()}
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
          <div className='fvbackgroundimg'>
            <div className='frequentvisitordisplay'>
              <label>Details</label>
            </div>
            {/* <div className="row row-cols-1 row-cols-md-1 g-4 fullcardscss"> */}
            <div className="col">
              <div className="frequentvisitorcard">
                <br></br>
                <label className="namelabel">{vendorData.vendor_name}</label>
                <div className='profclass'>{vendorData.service}</div>
                <br></br>
                <div className='flatclass'>
                  <label>Flat No</label>
                  {flats.map((items)=>{
                    return <div className='flatnodisplay'>{items.flats}, {items.block}</div>
                  })}
                  
                </div>
                <br></br>
                <div><label className='allowedclass'>Allowed by</label></div>
    
                <div className='detailsclass'>
                  <div><label className='date text-right'>Date:{date}</label></div>
                  <div><label className='intime'>In-Time: </label></div>
                  <div><label className='outtime'>Out-Time: </label></div>
                  <div><label className='noofpeople'>No of People: 1</label></div>
                  <div><label className='vehicleno'>Vehicle No: <input type='text' placeholder='Vehical Number'></input></label></div>
                </div>
                <br></br>
                <Button type="button" onClick={()=>{submitData()}} className="btnApprove">APPROVE</Button>
                <Button type="submit" className="btnDeny">DENY</Button>
                <br></br>
                
              </div>
             
            </div>
          
            {/* </div> */}
          </div>
        </div>
      )
       
}

export default VendorEntryDetails