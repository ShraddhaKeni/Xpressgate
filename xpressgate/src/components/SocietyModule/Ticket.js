import React, { useEffect, useState } from 'react';
import './Ticket.css';
import { Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import LogOut from './Utils/LogOut';

const Ticket = () => {
  const location= useLocation()
  const [ticket,setTicket] = useState({})
  const [firstname,setFname] = useState()
  const [lastname,setLname] = useState()
  useEffect(()=>{
    if(location.state)
    {
      getTicket()
    }
    else
    {
      window.location.href='/ticketlist'
    }
  })

  const getTicket=async()=>{
    try {
      const {data} = await axios.get(`${window.env_var}api/tickets/findTicket/${location.state.id}`)
      setTicket(data.data.tickets[0])
      setFname(data.data.tickets[0].ticketRaisedBy.firstname)
      setLname(data.data.tickets[0].ticketRaisedBy.lastname)
    } catch (error) {
      console.log(error)
    }
  }



  return (
    <div className="ticketcontainer">
      <div id="tktheadersection">
        <div class="tktfirstheadersection">

          <div id="tktlogo"><img src="/images/loginlogo.svg" alt="header logo" /></div>
          <div id="tktsociety"><label>Society</label></div>
          <div id="tktspace"></div>
          <div id="tktnotification"><a href="abc"><img src="/images/notification.svg" alt="notificationicon" /></a></div>
          <div id="tktsetting"><a href="/changesocpassword"><img src="/images/setting.svg" alt="settingicon" /></a></div>
          <div id="tktlogoutbutton"> <LogOut/></div>
        </div>
      </div>
      <div id="tktsection">
        <div className='tktname'>
          <img src="/images/societyicon.svg" alt="guard name" />
          <label>Society Name</label>
        </div>
        <div className='tktsideimage'><img src="/images/societysideimg.svg" alt="dashboard sideimage" /></div>
      </div>
      <div className='tktbackgroundimg'>
        <div className='tktdisplay'>
          <label>{ticket.ticketNo}</label>
        </div>
        <div className="col">
          <div className="tktcard">
            <br></br>
            <label className="tktlabel">{ticket.ticketNo}</label>
            
            <div className="name ticket_name">{firstname} {lastname}</div>
            <div><label className='tktIssuelabels'>Issue</label></div>
            <div className='tktclass'>
              <label>{ticket.tickettype}</label>
              <div className='flatnodisplay'></div>
            </div>
            <br></br>
            <div><label className='tktdesclabels'>Description</label></div>
            <div className='detailsclass'>
              <div><label className='date text-right'>{ticket.ticketDescription}</label></div>
              <div><label className='intime'></label></div>
              <div><label className='outtime'></label></div>
              <div><label className='noofpeople'></label></div>
              <div><label className='vehicleno'></label></div>
            </div>
            <br></br>
            <div><label className='tktailabels'>Attached images</label></div>
            <br></br>
            <br/>
            <div className='tktmsgbox'>
              <label className='tktmsgs'>Message</label>
              <button className='tktMsgBtn'>Resolved</button></div>
            <br></br>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Ticket

