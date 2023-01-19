import React from 'react'
import LogOut from './Utils/LogOut';
import '../GuardModule/GuestList.css';
import { Button } from 'react-bootstrap';
import { useState, useEffect } from 'react'
import axios from 'axios'
import PaginationCalculate from './Utils/paginationCalculate';
import { useNavigate } from 'react-router-dom';
import GuardHeader from './Utils/GuardHeader';
import { checkGuard } from '../auth/Auth'
import { Loader } from "../Loader";
const GuestList = () => {
  const [loading, setLoading] = useState(true)
  const [guests, setGuests] = useState([])
  const [currentPage, setCurrentpage] = useState(1)
  const [postPerPage, setPostPerPage] = useState(12)
  const [currentPosts, setCurrentPosts] = useState([])
  const [pageCount, setpageCount] = useState(0)
  const navigate = useNavigate()
  useEffect(() => {
    if (checkGuard()) {
      const config = {
        headers: {
          'x-access-token': localStorage.getItem('accesstoken')
        }
      }
      axios.get(`${window.env_var}api/guard/checkLogin`, config)
        .then(({ data }) => {
          getData()
        })
        .catch(err => {
          localStorage.clear();
          window.location.href = '/guardLogin'
        })
        setLoading(false);
    } else {
      window.location.href = '/'
    }
  }, [])

  const getData = async () => {
    try {
      const { data } = await axios.post(`${window.env_var}api/guard/getallguest`, { community_id: localStorage.getItem('community_id') })
      setGuests(data.data.guests_list)
      const indexoflast = currentPage * postPerPage  //endoffset
      const indexoffirst = indexoflast - postPerPage //startoffset
      setCurrentPosts(data.data.guests_list.slice(indexoffirst, indexoflast))

    } catch (error) {
      console.log(error)
    }
  }
  const dateTimeFormat = (time) => {
    // var d = new Date(date)
    // return (d.getHours()-5) + ':' + d.getMinutes()
    //console.log(time) //2022-11-24 T 12:09:03.184 Z
    let ntime = time.split('T');
    let titime = ntime[1].split('.');
    console.log(titime[0])
    return titime[0]

  }


  const dateFormat = (date) => {
    var d = new Date(date)
    return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()

  }

  async function paginate(event) {
    setCurrentpage(event.selected + 1)
    const indexoflast = (event.selected + 1) * postPerPage  //endoffset
    const indexoffirst = (indexoflast - postPerPage) //startoffset
    setCurrentPosts(guests.slice(indexoffirst, indexoflast))
  }

  const guestEntry = async (id) => {
    navigate('/guestentry', { state: { id: id } })
  }

  return (
    <div className="inoutbookcontainer">
      <div id="headersection">
        <GuardHeader />
      </div>
      <div id="guardnamesection">
        <div className='GuestLName'>
          <img src="/images/guardnameicon.svg" alt="guard name" />
          <label>{localStorage.getItem('name')}</label>
        </div>
        <div className='GuestLsideimage'><img src="/images/sideimage.svg" alt="dashboard sideimage" /></div>
      </div>
      <div className='iobbackgroundimg'>
        <div className='GuestL_display'>
          <label>Guest List</label>
        </div>
        <Loader loading={loading}>
        {/* <div class="table-responsive"> */}
        <table id="inoutbooktable" class="table table-striped table-bordered table-sm " cellspacing="0" style={{ border: '2px solid black' }}>
          <thead>
            <tr>
              <th class="th-sm">Sr No.</th>
              <th class="th-sm">Name</th>
              <th class="th-sm">Visitor Type</th>
              <th class="th-sm">Block</th>
              <th class="th-sm">Flat No.</th>
              <th class="th-sm">Date</th>
              <th class="th-sm">In Time</th>
              <th class="th-sm">Status</th>
            </tr>
          </thead>
          <tbody>
            {currentPosts.map((items, index) => {
              return (
                <tr>
                  <td>{currentPage <= 2 ? (currentPage - 1) * 12 + (index + 1) : (currentPage - 1) * 12 + (index + 1)}</td>
                  <td onClick={() => { guestEntry(items.Guest_id) }}>{items.guestFirstName} {items.guestLastName}</td>
                  <td>Guest</td>
                  <td>{items.block_name}</td>
                  <td>{items.flat_number}</td>
                  <td>{dateFormat(items.time)}</td>
                  <td>{dateTimeFormat(items.time)}</td>
                  <td>-</td>
                </tr>)
            })}

          </tbody>
        </table>
        {/* <div className="App">
      {data} */}
        <PaginationCalculate totalPages={guests.length} postperPage={postPerPage} currentPage={currentPage} paginate={paginate} />

        </Loader>
        {/* </div> */}
      </div>
    </div>
  )
}

export default GuestList