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
import ErrorScreen from '../../common/ErrorScreen.js';
import Pagination from '../../common/Pagination';
import Table from 'react-bootstrap/Table';
import GuardMobileSidebar from '../GuardMobileSidebar';
const GuestList = () => {

  const [guests, setGuests] = useState([])
  const [currentPage, setCurrentpage] = useState(1)
  const [postPerPage, setPostPerPage] = useState(12)
  const [currentPosts, setCurrentPosts] = useState([])
  const [pageCount, setpageCount] = useState(0)
  const [isError, setError] = useState(false)
  const [filterArr, setFilter] = useState([])
  const [menu, setMenuOpen] = useState(false)
  const [loading, setLoading] = useState(true)

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
      setTimeout(() => {
        setLoading(false)
      }, 2000)

    } catch (error) {
      setLoading(false)
      setError(true)
      console.log(error)
    }
  }
  const dateTimeFormat = (time) => {
    let ntime = time.split('T');
    let titime = ntime[1].split('.');
  
    return titime[0]
  }


  const dateFormat = (date) => {
    var d = new Date(date)
    return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()

  }

  const guestEntry = async (id) => {
    navigate('/guestentry', { state: { id: id } })
  }

  function settingCurrent(value) {
    setCurrentPosts(value)
  }

  function settingPage(value){
    setCurrentpage(value)
  }

  if (isError)
    return <ErrorScreen />

  return (
    <>
      <div className='flex flex-col'>

        <div id="headersection">
          <GuardHeader onMenuClick={() => {
            setMenuOpen(true)
          }} />
        </div>
        <div className='flex'>

          <div id="guardnamesection">
            <div className='GuestLName'>
              <img src="/images/guardnameicon.svg" alt="guard name" />
              <label>{localStorage.getItem('name')}</label>
            </div>
            <div className='GuestLsideimage'><img src="/images/sideimage.svg" alt="dashboard sideimage" /></div>
          </div>
          <Loader loading={loading}>
          <div className='flex-1 d-flex' style={{ width: "100%", height: '100%' }}>
            <div className='new-main-container'>
              <main>
                <div className='GuestL_display'>
                  <label>Guest List</label>
                </div>
                <div>
                  <Table id="InoutBooktable" class="table table-striped table-bordered table-sm " cellspacing="0" style={{ border: '2px solid black' }} size='sm' responsive>
                    <thead>
                      <tr>
                        <th class="th-sm">Sr No.</th>
                        <th class="th-sm">Name</th>
                        <th class="th-sm">Visitor Type</th>
                        <th class="th-sm">Block</th>
                        <th class="th-sm">Flat No.</th>
                        <th class="th-sm">Date</th>
                        <th class="th-sm">In Time</th>
                        <th class="th-sm">Parking Section</th>
                        <th class="th-sm">Parking Time</th>
                        <th class="th-sm">Vehicle Number</th>
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
                            <td>{items.parking_section_details || '-'}</td>
                            <td>{/*{calculateParkingTime(iodata.intime, iodata.outtime)}*/}
                              {items.parking_time || '-'}
                            </td>
                            <td>{items.vehicle_no || '-'}</td>
                            <td>{items.status == '1' ? 'In' : 'Out'}</td>
                          </tr>)
                         
                      })}

                    </tbody>
                  </Table>
                </div>
                <Pagination totalPages={filterArr.length > 0 ? filterArr.length : guests.length} data={filterArr.length > 0 ? filterArr : guests} settingCurrent={settingCurrent} settingPage={settingPage} />
              </main>
            </div>

          </div>
          </Loader>
        </div>


        <GuardMobileSidebar open={menu} onHide={() => setMenuOpen(false)} />


      </div >

    </>
  )
}

export default GuestList