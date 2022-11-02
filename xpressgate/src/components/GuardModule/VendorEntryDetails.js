import axios from 'axios';
import React,{useEffect, useState} from 'react'
import { Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import LogOut from './Utils/LogOut';
const VendorEntryDetails = () => {
    const current = new Date();
    const [date, setDate] = useState(`${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`);
    const [vendorData, setVendorData] = useState({})
    const location = useLocation()
    

    useEffect(()=>{
        getData()
    },[])

    const getData =async()=>{
        try {
            const {data} = await axios.get(`/api/vendorlist/getOne/${location.state.id}`)
            setVendorData(data.data.list[0])
        } catch (error) {
            
        }
    } 

    const submitData=async()=>{
        const data = {
            firstname:vendorData.vendor_name,
            lastname:'',
            mobileno:vendorData.contact,
            intime:Date.now(),
            outtime:"",
            community_id:localStorage.getItem('community_id'),
            flat_id:vendorData.flat_id,
            type:2,
            status:1,
            allowed_by:localStorage.getItem('guard_id')
        }
        try {
            const saveData = await axios.post(`/api/inout/add`,data)
            window.location.href='/vendorlist'
        } catch (error) {
            console.log(error)
        }
    }
  
    return (
      <div className="frequentvisitorcontainer">
        <div id="headersection">
          <div class="firstheadersection">
           {console.log(vendorData)}
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
            <label>{vendorData.entrycode}</label>
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
                <div className='flatnodisplay'>{vendorData.flats}, {vendorData.block}</div>
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