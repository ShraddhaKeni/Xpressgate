import React, { useEffect, useState } from 'react';
import './Noticelist.css';
import { Button } from 'react-bootstrap';
import LogOut from './Utils/LogOut';
import { Link } from 'react-router-dom';
import axios from 'axios'
import PaginationCalculate from '../GuardModule/Utils/paginationCalculate';
import { getAllByPlaceholderText } from '@testing-library/react';
import SocietyHeader from './Utils/Societyheader'
import { useNavigate } from 'react-router-dom';

const Noticelist = () => {
  const [notice, setNotice] = useState([])
  const [currentPage, setCurrentpage] = useState(1)
  const [postPerPage, setPostPerPage] = useState(12)
  const [currentPosts, setCurrentPosts] = useState([])
  const [pageCount, setpageCount] = useState(0)
  const navigate = useNavigate()
  useEffect(() => {
    getNotices()
  }, [])

  const getNotices = async () => {
    try {
      const { data } = await axios.get(`${window.env_var}api/notices/getAll/632970d054edb049bcd0f0b4`) //will update with localstorage
      setNotice(data.data.notice)
      const indexoflast = currentPage * postPerPage  //endoffset
      const indexoffirst = indexoflast - postPerPage //startoffset
      setCurrentPosts(data.data.notice.slice(indexoffirst, indexoflast))
    } catch (error) {
      console.log(error)
    }
  }
  async function paginate(event) {
    const { data } = await axios.get(`${window.env_var}api/notices/getAll/632970d054edb049bcd0f0b4`) //will update with localstorage
    setCurrentpage(event.selected + 1)
    const indexoflast = (event.selected + 1) * postPerPage  //endoffset
    const indexoffirst = (indexoflast - postPerPage) //startoffset
    setCurrentPosts(data.data.notice.slice(indexoffirst, indexoflast))
  }

  function getDate(value) {
    let date = new Date(value)
    return date.getDay() + '/' + date.getMonth() + '/' + date.getFullYear()
  }

  function findText(e)
  {
    let search = e.target.value.toLowerCase()
    let arr = notice.filter(x=>{
      if(x.noticeTitle.toLowerCase().includes(search))
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
    <div className="nlcontainer">
      <div id="nlheadersection">
        <SocietyHeader/>
      </div>
      <div id="nlsection">
        <div className='nlsocietyname'>
          <img src="/images/societyicon.svg" alt="society name" />
          <label>Society Name</label>
        </div>
        <div className='nlsidelinks'>
          <a className='sidelinks' href="/noticelist">Notice List</a><br></br><br></br>
          <a className='sidelinks' onClick={()=>navigate('/addNotice')}>Add Notice</a>
        </div>
        <div className='nlsideimage'><img src="/images/societysideimg.svg" alt="society sideimage" /></div>
      </div>
      <div className='nlbackgroundimg'>
        <div className='nldisplay'>
          <label>Notice List</label>
        </div>
        <div> <Button type="button" className="btnAddnotice" onClick={()=>navigate('/addNotice')}><img src="/images/plus.svg" alt="header logo"  />&nbsp;Add New Notice</Button></div>
      
        <div className='row'>
          <div className='nlsearchbox'>
            <span><img src="/images/vendorlistsearch.svg" alt='search icon'></img>
              <input className='vlsearch_input' placeholder='Search' onChange={(e)=>findText(e)}></input></span>
          </div>
        </div>

        <table id="nltable" class="table table-striped table-bordered table-sm " cellspacing="0" style={{ border: '2px solid black' }}>
          <thead>
            <tr>
              <th class="th-sm">Sr. No.</th>
              <th class="th-sm">Notice Title</th>
              <th class="th-sm">Notice Date</th>
            </tr>
          </thead>
          <tbody>

            {currentPosts.map((item, index) => {
              return (
                <tr>
                  <td>{currentPage <= 2 ? (currentPage - 1) * 12 + (index + 1) : (currentPage - 1 + 1) + (index + 1)}</td>
                  <td >{item.noticeTitle}</td>
                  <td>{getDate(item.eventDate)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <PaginationCalculate totalPages={notice.length} postperPage={postPerPage} currentPage={currentPage} paginate={paginate} />
      </div>
    </div>
  )
}

export default Noticelist

