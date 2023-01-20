import React, { useEffect, useState, useRef } from 'react';
import './Ticket.css';
import { Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import LogOut from './Utils/LogOut';
import { Loader } from "../Loader";
import Societyheader from './Utils/Societyheader'

const Ticket = () => {
  const location = useLocation()
  const [ticket, setTicket] = useState({})
  const [firstname, setFname] = useState()
  const [lastname, setLname] = useState()
  const [msg, setMsg] = useState()
  const ticketreply = useRef([])
  const [imageList,setimageList] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (location.state) {
      getTicket()
    }
    else {
      window.location.href = '/ticketlist'
    }
  })

  const getTicket = async () => {
    try {
      const { data } = await axios.get(`${window.env_var}api/tickets/findTicket/${location.state.id}`)
      setTicket(data.data.tickets[0])
      setFname(data.data.tickets[0].ticketRaisedBy.firstname)
      setLname(data.data.tickets[0].ticketRaisedBy.lastname)
      setimageList(data.data.tickets[0].ticket_pics.split(','));
      setMsg(location.state.ticketreply)
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const senddata = {
        id: location.state.id,
        ticket_reply: document.getElementById('message').value
      }
      const { data } = await axios.post(`${window.env_var}api/tickets/resolveTicket`, senddata);
      window.location.href = '/ticketlist'
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="ticketcontainer">
      <div id="tktheadersection">
        <Societyheader/>
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
        <Loader loading={loading}>
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
              <div>
                {imageList.map((items,index)=>{
                  if(items == '')
                  {}
                  else{
                    return(
                      <img src={`${window.env_var}` + items} alt='Ticket issue image' width="100px" height="100px" className='AttacHedImg'></img>
                    )
                  }
                })}
              </div>
              <br /> 
              <div className='tktmsgbox'>
                {location.state ? <input type="text" id="message" defaultValue={msg} name="Phone Number" className="tktmsgs" placeholder="Message"></input> : <input type='text' id="message" className='tktmsgs' placeholder='Message'></input>}
                <button className='tktMsgBtn' onClick={(e) => { handleSubmit(e) }}>Resolved</button>
              </div>
              <br></br>
            </div>
          </div>
        </Loader>
      </div>
    </div>
  )
}
export default Ticket;