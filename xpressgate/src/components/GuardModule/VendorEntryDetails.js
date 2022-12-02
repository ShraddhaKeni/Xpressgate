import axios from 'axios';
import React,{useEffect, useState} from 'react'
import { Button } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import GuardHeader from './Utils/GuardHeader';
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
            const {data} = await axios.get(`${window.env_var}api/vendorlist/getOne/${location.state.id}`)
            setVendorData(data.data.list[0])
            setFlats(data.data.list)
            setBookings(data.data.list)
            console.log(data)
        } catch (error) {
            
        }
    } 

    const submitData=async()=>{
        
        try {
          console.log(bookings)
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
                status:1,
                allowed_by:localStorage.getItem('guard_id')
            }
            

               const {data} = await axios.post(`${window.env_var}api/inout/add`,submitData)
              console.log(data)
              const bookingUpdate = await axios.get(`${window.env_var}api/bookvendor/removeBooking/${items.booking_id}`)
             navigate('/vendorlist')
            } catch (error) {
              console.log(error)
            }
            
          })
            
            
            
        } catch (error) {
            console.log(error)
        }
    }
   
      return (
      
        <div className="frequentvisitorcontainer">
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
          <div className='fvbackgroundimg'>
            <div className='frequentvisitordisplay'>
              <label>{location.state.code?location.state.code:'Details'}</label>
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
                <div><label className='allowedclass' style={{color:'#14335D', fontSize:'24px'}}>Allowed by</label></div>
    
                <div className='detailsclass'>
                  <div><label className='date text-right'>Date:{date}</label></div>
                  <div><label className='intime'>In-Time: </label></div>
                  <div><label className='outtime'>Out-Time: </label></div>
                  <div><label className='noofpeople'>No of People: 1</label></div>
                  <div><label className='vehicleno'>Vehicle No: <input type='text' placeholder='Vehicle Number'></input></label></div>
                </div>
                <br></br>
                <Button type="button" onClick={()=>{submitData()}} className="btnApprove">APPROVE</Button>
                <Button type="submit" className="btnDeny" onClick={()=>window.location.href="/dashboard"}>DENY</Button>
                <br></br>
                
              </div>
             
            </div>
          
            {/* </div> */}
          </div>
        </div>
      )
       
}

export default VendorEntryDetails