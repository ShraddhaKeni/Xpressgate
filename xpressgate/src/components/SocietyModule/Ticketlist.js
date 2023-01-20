import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PaginationCalculate from '../GuardModule/Utils/paginationCalculate';
import './Ticketlist.css';
import Societyheader from './Utils/Societyheader';
import { Loader } from "../Loader";

const Ticketlist = () => {

  const [tickets,setTicket] = useState([])
  //pagination
  const [currentPage, setCurrentpage] = useState(1)
  const [postPerPage, setPostPerPage] = useState(12)
  const [currentPosts,setCurrentPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(()=>{
    getTickets()
  },[])

  const getTickets=async()=>{
    try {
      const {data}= await axios.get(`${window.env_var}api/tickets/getAll`)
      setTicket(data.data.tickets)
      const indexoflast = currentPage*postPerPage  //endoffset
      const indexoffirst = indexoflast - postPerPage //startoffset
      setCurrentPosts(data.data.tickets.slice(indexoffirst,indexoflast))
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }

  function  paginate(event)
  {
    setCurrentpage(event.selected+1)
    const indexoflast = (event.selected+1)*postPerPage  //endoffset
    const indexoffirst = (indexoflast - postPerPage) //startoffset
    setCurrentPosts(tickets.slice(indexoffirst,indexoflast))
  }

  const  dateTimeFormat=(date)=>
  {
    var d = new Date(date)
    return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()
  }

  const navigateToTicket=(id,ticketreply)=>{
    navigate('/ticket',{state:{id:id,ticketreply:ticketreply}})
  }

  function findText(e)
  {
    console.log(currentPosts)
    let search = e.target.value.toLowerCase()
    let arr = tickets.filter(x=>{
      if(x.ticketRaisedBy.firstname.toLowerCase().includes(search))
      {
        return true
      }
      else if(x.ticketRaisedBy.lastname.toLowerCase().includes(search))
      {
        return true
      }
    })
    if(arr)
    {
      const indexoflast =currentPage*postPerPage  //endoffset
      const indexoffirst = (indexoflast - postPerPage)
      setCurrentPosts(arr.slice(indexoffirst,indexoflast))
    }
    else
    {
      paginate(0)
    }
  }

  return (
    <div className="tlcontainer">
      <div id="tlheadersection">
        <Societyheader/>
      </div>
      <div id="tlsection">
        <div className='tlname'>
        <img src="/images/societyicon.svg" alt="society name" />
          <label>Society Name</label>
        </div>
        <div className='tlsideimage'><img src="/images/societysideimg.svg" alt="dashboard sideimage" /></div>
      </div>
      <div className='tlbackgroundimg'>
        <div className='tldisplay'>
          <label>Ticket Management</label>
        </div>
        <Loader loading={loading}>
          <div className='row'>
            <div className='vmsearchbox'>
              <span><img src="/images/vendorlistsearch.svg" alt='search icon'></img>
                <input placeholder='Search' onChange={(e) => { findText(e) }}></input></span>
            </div>
          </div>
          <table id="tltable" class="table table-striped table-bordered table-sm " cellspacing="0" style={{ border: '2px solid black' }}>
            <thead>
              <tr>
                <th class="th-sm">Ticket No.</th>
                <th class="th-sm">Created By</th>
                <th class="th-sm">Issue</th>
                <th class="th-sm">Date</th>
              </tr>
            </thead>
            <tbody>
              {currentPosts.map((items,index)=>{
                return(
                  <tr onClick={()=>{navigateToTicket(items._id, items.ticket_reply)}}>
                    <td>{items.ticketNo}</td>
                    <td >{items.ticketRaisedBy.firstname} {items.ticketRaisedBy.lastname}</td>
                    <td>{items.tickettype}</td>
                    <td>{dateTimeFormat(items.date)}</td>
                </tr>
                )
              })}
            
            </tbody>
          </table>
          <PaginationCalculate totalPages={tickets.length} postperPage={postPerPage} currentPage={currentPage} paginate={paginate}/>
        </Loader>
      </div>
    </div>
  )
}
export default Ticketlist;