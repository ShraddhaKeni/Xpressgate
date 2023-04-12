import React from 'react';
import './Inoutbook.css';
import { useState, useEffect } from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom'
import PaginationCalculate from './Utils/paginationCalculate';
import LogOut from './Utils/LogOut';
import GuardHeader from './Utils/GuardHeader';
import { checkGuard } from '../auth/Auth';
import Loader from '../../common/Loader';
import ErrorScreen from '../../common/ErrorScreen';
import Pagination from '../../common/Pagination';
import Table from 'react-bootstrap/Table';
import GuardMobileSidebar from '../GuardMobileSidebar';
import moment from 'moment';
const Inoutbook = () => {
  const [inoutdata, setInoutdata] = useState([])
  const navigate = useNavigate()
  const [currentPage, setCurrentpage] = useState(1)
  const [postPerPage, setPostPerPage] = useState(12)
  const [currentPosts, setCurrentPosts] = useState([])
  const [community_id, setID] = useState(localStorage.getItem('community_id'))
  const [isLoading, setLoading] = useState(true)
  const [isError, setError] = useState(false)
  const current = new Date();
  const [date, setDate] = useState(`${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`);
  const [filterArr, setFilter] = useState([])
  const [menu, setMenuOpen] = useState(false)

  const dateTimeFormat = (timestamp) => {
    var d = new Date(timestamp)
    return d.getHours() + ':' + d.getMinutes()
  }

  useEffect(() => {
    if (checkGuard()) {
      const config = {
        headers: {
          'x-access-token': localStorage.getItem('accesstoken')
        }
      }
      axios.get(`${window.env_var}api/guard/checkLogin`, config)
        .then(({ data }) => {
          getInOutBookData()
        })
        .catch(err => {
          localStorage.clear();
          window.location.href = '/guardLogin'
        })

    } else {
      window.location.href = '/'
    }

  }, [])

  const calculateParkingTime = (intime, outtime) => {
    if (intime && outtime) {
      var duration = moment.duration(moment(outtime).diff(moment(intime)));
      console.log(duration);
      let hours = duration.asHours() ? duration.asHours().toFixed(0) + " Hrs" : ""
      var minutes = hours + duration.asMinutes() ? duration.asMinutes().toFixed(0) + " Mins" : ""
      return minutes;
    } else {
      return "";
    }
  }

  const getInOutBookData = async () => {
    try {
      const { data } = await axios.get(`${window.env_var}api/inout/getall/${localStorage.getItem('community_id')}`)
      console.log(data)
      setInoutdata(data.data.list)
      const indexoflast = currentPage * postPerPage  //endoffset
      const indexoffirst = indexoflast - postPerPage //startoffset
      setCurrentPosts(data.data.list.slice(indexoffirst, indexoflast))
      setTimeout(() => {
        setLoading(false)
      }, 2000)
      setError(false)
    } catch (err) {
      setLoading(false)
      setError(true)
    }
  }
  const routeNavigate = (id) => {
    navigate('/inoutbookcard', { state: { id: id } })
  }


  // const paginate = async(event)=>{
  //   const { data } = await axios.get(`${window.env_var}api/inout/getall/` + community_id)
  //   setCurrentpage(event.selected+1)
  //   const indexoflast = (event.selected+1)*postPerPage  //endoffset
  //   const indexoffirst = indexoflast - postPerPage //startoffset
  //   setCurrentPosts(inoutdata.slice(indexoffirst,indexoflast))
  // }

  function settingCurrent(value) {
    setCurrentPosts(value)
  }

  if (isLoading)
    return <Loader />
  if (isError)
    return <ErrorScreen />


  return (
    <>
      <div className='flex flex-col'>

        <div id="headersection">
          <GuardHeader onMenuClick={() => {
            setMenuOpen(true)
          }} />        </div>
        <div className='flex'>

          <div id="guardnamesection">
            <div className='GuestLName'>
              <img src="/images/guardnameicon.svg" alt="guard name" />
              <label>{localStorage.getItem('name')}</label>
            </div>
            <div className='GuestLsideimage'><img src="/images/sideimage.svg" alt="dashboard sideimage" /></div>
          </div>

          <div className='flex-1 d-flex' style={{ width: "100%", height: '100%' }}>
            <div className='new-main-container'>
              <main>
                <div className='GuestL_display'>
                  <label>In-Out Book</label>
                </div>
                <button type="button" onClick={() => { window.location.href = '/addinout' }} className="AddInOutBtn">&#10011; Add In Out</button>
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
                      {currentPosts.map((iodata, index) => {
                        return (
                          <tr onClick={() => routeNavigate(iodata.booking_id)}>
                            <td>{(currentPage - 1) * 12 + (index + 1)}</td>
                            <td >{iodata.guestFirstName} {iodata.guestLastName}</td>
                            <td>{iodata.type == '1' ? 'Guest' : iodata.type == '2' ? 'Vendor' : 'Daily Helper'}</td>
                            <td>{iodata.block_name}</td>
                            <td>{iodata.flat_number}</td>
                            <td>{date}</td>
                            <td>{dateTimeFormat(iodata.intime)}</td>
                            <td>{iodata.parking_section_details}</td>
                            <td>{/*{calculateParkingTime(iodata.intime, iodata.outtime)}*/}
                              {iodata.parking_time}
                            </td>
                            <td>{iodata.vehicle_no}</td>
                            <td>{iodata.status == '1' ? 'In' : 'Out'}</td>
                          </tr>)
                      })}
                    </tbody>
                  </Table>
                </div>
                <Pagination totalPages={filterArr.length > 0 ? filterArr.length : inoutdata.length} data={filterArr.length > 0 ? filterArr : inoutdata} settingCurrent={settingCurrent} />
              </main>
            </div>

          </div>
        </div>




      </div >

      <GuardMobileSidebar open={menu} onHide={() => setMenuOpen(false)} />


    </>
  )
}

export default Inoutbook

