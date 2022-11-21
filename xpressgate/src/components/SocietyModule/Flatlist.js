import React, { useEffect, useState } from 'react';
import './Flatlist.css';
import { Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PaginationCalculate from '../GuardModule/Utils/paginationCalculate';

const Flatlist = () => {

  const [flats,setFlats] = useState([])
  const [currentPage, setCurrentpage] = useState(1)
  const [postPerPage, setPostPerPage] = useState(12)
  const [currentPosts,setCurrentPosts] = useState([])
  const [pageCount,setpageCount] = useState(0)
  const location = useLocation()
  const navigate = useNavigate()
  useEffect(()=>{
    if(location.state)
    {
      getFlats()
    }
    else
    {
      window.location.href='/blockList'
    }
    
  },[])

  const getFlats=async()=>{
    try {
      const {data} = await axios.get(`${window.env_var}api/flats/getList/${location.state.id}`)
      setFlats(data.data.list)
      const indexoflast = currentPage*postPerPage  //endoffset
      const indexoffirst = indexoflast - postPerPage //startoffset
      setCurrentPosts(data.data.list.slice(indexoffirst,indexoflast))
    } catch (error) {
      console.log(error)
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

  const aprroveFlatScreen=(id)=>{
    navigate('/approveFlat',{state:{id:id}})
  }


  return (
    <div className="inoutbookcontainer">
      <div id="headersection">
        <div class="firstheadersection">
          <div id="dashboardlogo"><img src="/images/loginlogo.svg" alt="header logo" /></div>
          <div id="dashboardguard"><label>Society</label></div>
          <div id="dashboardspace"></div>
          <div id="dashboardnotification"><a href="abc"><img src="/images/notification.svg" alt="notificationicon" /></a></div>
          <div id="dashboardsetting"><a href="abc"><img src="/images/setting.svg" alt="settingicon" /></a></div>
          <div id="dashboardlogoutbutton"> <Button type="submit" className="btnlogout">Log Out<img src="/images/logout.svg" alt="header logo" /></Button></div>
        </div>
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
        <div className='row'>
          <div className='searchbox'>
            <span><img src="/images/vendorlistsearch.svg" alt='search icon'></img></span>
            <span><label className='searchlabel'>Search</label><input className='search_input' onChange={(e)=>findText(e)} ></input></span>
          </div>
        </div>
        <table id="inoutbooktable" class="table table-striped table-bordered table-sm " cellspacing="0" style={{ border: '2px solid black' }}>
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

            {currentPosts.map(item=>{
              return(
              <tr style={item.status==false?{backgroundColor:'#AED8DC'}:{backgroundColor:'white'}} onClick={()=>{item.status==false?aprroveFlatScreen(item._id):getFlats()}}>
                <td>{item.flat_number}</td>
                <td >{item.firstname} {item.lastname}</td>
                <td>{item.family}</td>
                <td>{item.vehical}</td>
                <td>{item.status==false?'Unoccupied':'Occupied'}</td>
              </tr>
          )
            })}
           
          </tbody>
        </table>
        <PaginationCalculate totalPages={flats.length} postperPage={postPerPage} currentPage={currentPage} paginate={paginate}/>
      </div>
    </div>
  )
}

export default Flatlist

