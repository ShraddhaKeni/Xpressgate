import axios from 'axios';
import React,{useEffect, useState} from 'react'
import { Button } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import GuardHeader from './Utils/GuardHeader';
import HeaderSection from './Utils/HeaderSection';
import LogOut from './Utils/LogOut';
import { checkGuard } from '../auth/Auth';
const VendorEntryDetails = () => {
    const current = new Date();
    const [date, setDate] = useState(`${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`);
    const [time, setTime] = useState(`${current.getHours()}/${current.getMinutes()}}`)
    const [vendorData, setVendorData] = useState({})
    const [flats,setFlats] = useState([])
    const [bookings,setBookings] = useState([])
    const location = useLocation()
    const [code,setCode] = useState()
    const navigate = useNavigate()

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
                  if(location.state)
                      {
                        getData()
                      }
                      else
                      {
                        navigate('/dashboard')
                      }
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

    const getData =async()=>{
        // console.log(location.state)
        try {
            const {data} = await axios.get(`${window.env_var}api/vendorlist/getOne/${location.state.id}`)
            if(data.data.list[0]==null)
            {
              alert('This is invalid code.')
              navigate('/dashboard')
            }
            setVendorData(data.data.list[0])
            setFlats(data.data.list)
            setBookings(data.data.list)
            setCode(location.state.code)
            // console.log(data)
        } catch (error) {
          navigate('/dashboard')
        }
    } 
   
    const submitData=async()=>{
        
        try {
          const sendRequest = await axios.get(`${window.env_var}api/inoutentires/update/${location.state.code}`)

          console.log(location.state.code)
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
                allowed_by:localStorage.getItem('guard_id'),
                vehicle_no: document.getElementById('vehicle_id').value
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
            <div className='VED_Name'>
              <img src="/images/guardnameicon.svg" alt="guard name" />
              <label>{localStorage.getItem('name')}</label>
            </div>
            <div className='VED_sideimage'><img src="/images/sideimage.svg" alt="dashboard sideimage" /></div>
          </div>
          <div className='fvbackgroundimg'>
            <div className='VED_Display'>
              <label>{code?code:'Details'}</label>
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
                  {/* <div><label className='intime'>Booked time: {getTime(vendorData.bookedDate)} </label></div> */}
                  {/* <div><label className='outtime'>Out-Time: </label></div> */}
                  <div><label className='noofpeople'>No of People: 1</label></div>
                  <div><label className='vehicleno'>Vehicle No: <input type='text' placeholder='Vehicle Number' id="vehicle_id"></input></label></div>
                </div>
                <br></br>
                <button type="button" onClick={()=>{submitData()}} className="VEDbtnApprove">APPROVE</button>
                <button type="submit" className="VEDbtnDeny" onClick={()=>window.location.href="/dashboard"}>DENY</button>
                <br></br>
                
              </div>
             
            </div>
          
            {/* </div> */}
          </div>
        </div>
      )
       
}

export default VendorEntryDetails