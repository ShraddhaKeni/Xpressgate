import React from 'react';
import './Inoutbook.css';
import { Button } from 'react-bootstrap';
import { useState, useEffect } from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import {useNavigate} from 'react-router-dom'
import PaginationCalculate from './Utils/paginationCalculate';
import GuardHeader from './Utils/GuardHeader';

const Inoutbook = () => {
  const [inoutdata, setInoutdata] = useState([])
  const navigate = useNavigate()
  const [currentPage, setCurrentpage] = useState(1)
  const [postPerPage, setPostPerPage] = useState(12)
  const [currentPosts,setCurrentPosts] = useState([])
  const [community_id, setID] = useState("632970d054edb049bcd0f0b4")
 
  const  dateTimeFormat=(timestamp)=>
  {
    var d = new Date(timestamp)
    return d.getHours()+':'+d.getMinutes()  
  }

  useEffect(() => {
    getInOutBookData()
  }, [])

  const getInOutBookData = async () => {
    try {

      

      const { data } = await axios.get(`${window.env_var}api/inout/getall/` + community_id)
      setInoutdata(data.data.list)
      const indexoflast = currentPage*postPerPage  //endoffset
      const indexoffirst = indexoflast - postPerPage //startoffset
      setCurrentPosts(data.data.list.slice(indexoffirst,indexoflast))
      //console.log(data.data.list)
    } catch (err) {
      console.log(err)
    }
  }
  const routeNavigate=(id)=>{
    navigate('/inoutbookcard',{state:{id:id}})
  }
 

  const paginate = async(event)=>{
    const { data } = await axios.get(`${window.env_var}api/inout/getall/` + community_id)
    setCurrentpage(event.selected+1)
    const indexoflast = currentPage*postPerPage  //endoffset
    const indexoffirst = indexoflast - postPerPage //startoffset
    setCurrentPosts(data.data.list.slice(indexoffirst,indexoflast))
  }
  return (
    <div className="inoutbookcontainer">
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
      <div className='iobbackgroundimg'>
        <div className='inoutbookdisplay'>
          <label>In-out Book</label>
        </div>

        <table id="inoutbooktable" class="table table-striped table-bordered table-sm " cellspacing="0" style={{ border: '2px solid black' }}>
          <thead>
            <tr>
              <th class="th-sm"></th>
              <th class="th-sm">Name</th>
              <th class="th-sm">Visitor type</th>
              <th class="th-sm">Block</th>
              <th class="th-sm">Flat No.</th>
              <th class="th-sm">Date</th>
              <th class="th-sm">In time</th>
              <th class="th-sm">Status</th>
            </tr>
          </thead>
          <tbody>
            {inoutdata.map(iodata => {
              return (
                <tr onClick={()=>routeNavigate(iodata.booking_id)}>
                  <td>1</td>
                  <td >{iodata.guestFirstName} {iodata.guestLastName}</td>
                  <td>{iodata.type=='2'? iodata.type=='1' ? 'Guest' : 'Vendor' : 'Daily Helper'}</td>
                  <td>{iodata.block_name}</td>
                  <td>{iodata.flat_number}</td>
                  <td>{iodata.guestFirstName}</td>
                  <td>{dateTimeFormat(iodata.intime)}</td>
                  <td>{iodata.status==1?'In':'Out'}</td>
                </tr>)
            })}
          </tbody>
        </table>
        <PaginationCalculate totalPages={inoutdata.length} postperPage={postPerPage} currentPage={currentPage} paginate={paginate}/>

      </div>
    </div>
  )
}

export default Inoutbook

