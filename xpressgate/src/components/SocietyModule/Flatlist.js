import React, { useEffect, useState } from 'react';
import './Flatlist.css';
import { Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PaginationCalculate from '../GuardModule/Utils/paginationCalculate';
import { Loader } from "../Loader";
import Societyheader from './Utils/Societyheader';

const Flatlist = () => {

  const [loading, setLoading] = useState(true)
  const [flats, setFlats] = useState([])
  const [currentPage, setCurrentpage] = useState(1)
  const [postPerPage, setPostPerPage] = useState(12)
  const [currentPosts, setCurrentPosts] = useState([])
  const [pageCount, setpageCount] = useState(0)
  const location = useLocation()
  const navigate = useNavigate()
  useEffect(() => {

    if (location.state) {
      getFlats()
    }
    else {
      window.location.href = '/blockList'
    }

  }, [])

  const getflatlist = async () => {
    try {
      const { data } = await axios.get(`${window.env_var}api/flats/getList/${location.state.id}`)
      setFlats(data.data.list)
      const indexoflast = currentPage * postPerPage  //endoffset
      const indexoffirst = indexoflast - postPerPage //startoffset
      setCurrentPosts(data.data.list.slice(indexoffirst, indexoflast))
    } catch (error) {
      console.log(error)
    }
  }

  const getFlats = async () => {
    try {
      const { data } = await axios.get(`${window.env_var}api/flats/getList/${location.state.id}`)
      setFlats(data.data.list)
      const indexoflast = currentPage * postPerPage  //endoffset
      const indexoffirst = indexoflast - postPerPage //startoffset
      setCurrentPosts(data.data.list.slice(indexoffirst, indexoflast))
      setLoading(false);
    } catch (error) {
      console.log(error)
      setLoading(false);
    }
  }

  async function paginate(event) {
    setCurrentpage(event.selected + 1)
    const indexoflast = (event.selected + 1) * postPerPage  //endoffset
    const indexoffirst = (indexoflast - postPerPage) //startoffset
    setCurrentPosts(flats.slice(indexoffirst, indexoflast))
  }

  function findText(e)
  {
    let search = e.target.value.toLowerCase()
    let arr = flats.filter(x=>{
      if(String(x.firstname).toLowerCase().includes(search))
      {
        return true
      }
      else if(String(x.lastname).toLowerCase().includes(search))
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

  const aprroveFlatScreen = (id,family,vehicle) => {
    navigate('/approveFlat', { state: { id: id ,family,vehicle} })
  }

  return (
    <div className="flcontainer">
      <div id="flheadersection">
        <Societyheader/>
      </div>
      <div id="flsection">
        <div className='flname'>
          <img src="/images/societyicon.svg" alt="society name" />
          <label>Society Name</label>
        </div>
        <div className='nlsidelinks'>
          <a className='AfListsidelink' href="/blockList">Block List</a><br></br><br/>
          <a className='AflockSidelink' href="/addblock">Add Block</a><br/><br/>
          <a className='BlAddsidelinks' href="/addflat">Add Flat</a>
        </div>
        <div className='flsideimage'><img src="/images/societysideimg.svg" alt="dashboard sideimage" /></div>
      </div>
      <div className='flbackgroundimg'>
        <Loader loading={loading}>
          <div className='fldisplay'>
            <label>Block {location.state.block}</label>
          </div>
          <button type="button" onClick={()=>{window.location.href='/addflat'}} className="ADDFlaT">&#10011; Add Flat</button>
          <div className='row'>
            <div className='flsearchbox'>
              <span><img src="/images/vendorlistsearch.svg" alt='search icon'></img>
              <input className='flsearch_input' placeholder='Search' onChange={(e) => { findText(e) }}></input></span>
            </div>
          </div>
          <table id="fltable" class="table table-striped table-bordered table-sm " cellspacing="0" style={{ border: '2px solid black' }}>
            <thead>
              <tr>
                <th class="th-sm">Flat No</th>
                <th class="th-sm">Owner Name</th>
                <th class="th-sm">Family Members</th>
                <th class="th-sm">No. of Vehicles</th>
                <th class="th-sm">Status</th>
              </tr>
            </thead>
            <tbody>
              {currentPosts.map(item => {
                return (
                  <tr style={item.status == false ? { backgroundColor: '#AED8DC' } : { backgroundColor: 'white' }} onClick={() => { item.status == false ? aprroveFlatScreen(item._id,item.family,item.vehical) : getFlats()}}>
                    <td>{item.flat_number}</td>
                    <td >{item.firstname} {item.lastname}</td>
                    <td>{item.family}</td>
                    <td>{item.vehical}</td>
                    <td>{item.status == false ? 'Unoccupied' : 'Occupied'}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <PaginationCalculate totalPages={flats.length} postperPage={postPerPage} currentPage={currentPage} paginate={paginate} />
        </Loader>
      </div>
    </div>
  )
}
export default Flatlist;