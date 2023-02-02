import React, { useEffect, useState } from 'react';
import './Flatlist.css';
import { Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import PaginationCalculate from '../GuardModule/Utils/paginationCalculate';
import { Loader } from "../Loader";
import Societyheader from './Utils/Societyheader';

const FlatListNA = () => {
  const [flats,setFlats] = useState([])
  const [currentPage, setCurrentpage] = useState(1)
  const [postPerPage, setPostPerPage] = useState(12)
  const [currentPosts,setCurrentPosts] = useState([])
  const [pageCount,setpageCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const location = useLocation()
  useEffect(()=>{
    getFlats()
  },[])

  const getFlats=async()=>{
    try {
      const {data} = await axios.get(`${window.env_var}api/flats/getList/${location.state.id}`)
      setFlats(data.data.list)
      const indexoflast = currentPage*postPerPage  //endoffset
      const indexoffirst = indexoflast - postPerPage //startoffset
      setCurrentPosts(data.data.list.slice(indexoffirst,indexoflast))
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }
  
  async function  paginate(event)
  {
    const {data} = await axios.get(`${window.env_var}api/flats/getList/${location.state.id}`)
    setCurrentpage(event.selected+1)
    const indexoflast = (event.selected+1)*postPerPage  //endoffset
    const indexoffirst = (indexoflast - postPerPage) //startoffset
    setCurrentPosts(data.data.list.slice(indexoffirst,indexoflast))
  }
  
  async function findText(e)
  {
    let text = flats.filter(x=>x.lastname.toLowerCase().includes(e.target.value.toLowerCase()))
    if(text)
    {
      setCurrentPosts(text)
    }
    else
    {
      paginate(0)
    }
  }

  return (
    <div className="inoutbookcontainer">
      <div id="headersection">
        <Societyheader />
      </div>
      <div id="guardnamesection">
        <div className='guardname'>
          <img src="/images/societyicon.svg" alt="society name" />
          <label>Society Name</label>
        </div>
        <div className='sideimage'><img src="/images/societysideimg.svg" alt="dashboard sideimage" /></div>
      </div>
      <div className='iobbackgroundimg'>
        <div className='inoutbookdisplay'>
          <label>Block A</label>
        </div>
        <Loader loading={loading}>
          <div className='row'>
            <div className='searchbox'>
              <span><img src="/images/vendorlistsearch.svg" alt='search icon'></img></span>
              <span><label className='searchlabel'>Search</label><input className='search_input' onChange={(e)=>findText(e)} ></input></span>
            </div>
          </div>
          <table id="flatlisttable" class="table table-striped table-bordered table-sm " cellspacing="0" style={{ border: '2px solid black' }}>
            <thead>
              <tr>
                <th class="th-sm">Flat No</th>
                <th class="th-sm">Owner Name</th>
                <th class="th-sm">Family Members</th>
                <th class="th-sm">No. of Vehicles</th>
              </tr>
            </thead>
            <tbody>
              {currentPosts.map(item=>{
                if(item.status==false)
                {
                  return(  
                    <tr style={{backgroundColor:'red'}}>
                      <td>{item.flat_number}</td>
                      <td >{item.firstname} {item.lastname}</td>
                      <td>{item.family}</td>
                      <td>{item.vehical}</td>
                    </tr>
                  )
                }
                else
                {
                  return(
                    <tr>
                      <td>{item.flat_number}</td>
                      <td>{item.firstname} {item.lastname}</td>
                      <td>{item.family}</td>
                      <td>{item.vehical}</td>
                    </tr>
                  )
                }
              })}
            </tbody>
          </table>
          <PaginationCalculate totalPages={flats.length} postperPage={postPerPage} currentPage={currentPage} paginate={paginate}/>
        </Loader>
      </div>
    </div>
  )
}
export default FlatListNA;