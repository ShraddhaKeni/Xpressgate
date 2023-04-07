import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../SocietyModule/Viewparking.css";
import { ButtonBase, Icon, IconButton } from '@mui/material';
import PaginationCalculate from "../GuardModule/Utils/paginationCalculate";
import Societyheader from './Utils/Societyheader';
// import { Loader } from "../Loader";
import Table from 'react-bootstrap/Table';
import { ToastMessage } from "../ToastMessage";
import ErrorScreen from '../../common/ErrorScreen';
import { checkSociety } from '../auth/Auth';
import Loader from '../../common/Loader';
import moment from 'moment';
import Pagination from '../../common/Pagination';
const SocietyInOutBook = () => {
  const [inoutdata, setInoutdata] = useState([])
  const navigate = useNavigate()
  const [currentPage, setCurrentpage] = useState(1)
  const [postPerPage, setPostPerPage] = useState(12)
  const [currentPosts, setCurrentPosts] = useState([])
  const [community_id, setID] = useState("632970d054edb049bcd0f0b4")
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
    if (checkSociety()) {
      const config = {
        headers: {
          'x-access-token': localStorage.getItem('accesstoken')
        }
      }
      axios.get(`${window.env_var}api/society/checkLogin`, config)
        .then(({ data }) => {
          getInOutBookData()
        })
        .catch(err => {
          localStorage.clear();
          window.location.href = '/societylogin'
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
      const { data } = await axios.get(`${window.env_var}api/inout/getallSociety/` + community_id)
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

  function settingCurrent(value) {
    setCurrentPosts(value)
  }
//   async function paginate(event) {
//     setCurrentPage(event.selected)
//     const indexoflast = (event.selected + 1) * postPerPage  //endoffset
//     const indexoffirst = indexoflast - postPerPage //startoffset
// setCurrentPosts(inoutdata.slice(indexoffirst, indexoflast))
//   }

  function findText(e) {
    let search = e.target.value.toLowerCase()
    let arr = inoutdata.filter(x => {
      if (x.guestFirstName?.toLowerCase().includes(search)) {
              return true
            }
            else if (x.guestLastName?.toLowerCase().includes(search)) {
              return true
            }
          })

          if(arr)
          {
            const indexoflast = currentPage * postPerPage //endoffset
            const indexoffirst = (indexoflast - postPerPage)
            setCurrentPosts(arr.slice(indexoffirst,indexoflast))
          }
          else
          {
            settingCurrent(0)
          }
        }
  if (isLoading)
    return <Loader />
  if (isError)
    return <ErrorScreen />

  return (
    <div className="addguestcontainer4">
      <div id="addflatsection">
        <Societyheader/>
      </div>
      <div id="societynamesection">
        <div className="VP_societyname">
          <img src="/images/societyicon.svg" alt="Society image" />
          <label>Society Name</label>
        </div>
        <div className="ParticipantsideImg">
          <img src="/images/societysideimg.svg" alt="dashboard sideimage" />
        </div>
      </div>
      <div className="addguestbackgroundimg">
      
        <div className='VPdisplay'>
          <label>In-Out Book</label>
        </div>
        {/* <Loader loading={loading}> */}
          <div className='row'>
            <div className='VP_searchbox'>
              <span>
                <img src="/images/vendorlistsearch.svg" alt='search icon'></img>
                <input placeholder='Search' id="search_input" onChange={(e) => { findText(e) }}></input>
              </span>
            </div>
          </div>
          <br/>
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
                        <th class="th-sm">Out Time</th>
                        <th class="th-sm">Parking Section</th>
                        <th class="th-sm">Parking Time</th>
                        <th class="th-sm">Vehicle Number</th>
                        <th class="th-sm">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                    {currentPosts.map((iodata, index) => {
                        return (
                          <tr>
                          
                            <td>{(currentPage - 1) * 12 + (index + 1)}</td>
                            <td >{iodata.guestFirstName} {iodata.guestLastName}</td>
                            <td>{iodata.type == '1' ? 'Guest' : iodata.type == '2' ? 'Vendor' : 'Daily Helper'}</td>
                            <td>{iodata.block_name}</td>
                            <td>{iodata.flat_number}</td>
                            <td>{date}</td>
                            <td>{dateTimeFormat(iodata.intime)}</td>
                            <td>{dateTimeFormat(iodata.outtime)}</td>
                            <td>{iodata.parking_section_details}</td>
                            <td>{iodata.parking_time}</td>
                            <td>{iodata.vehicle_no}</td>
                            <td>{iodata.status == '1' ? 'In' : 'Out'}</td>
                          </tr>)
                         })}
                    </tbody>
                  </Table>
          <br/>
 
          <Pagination totalPages={filterArr.length > 0 ? filterArr.length : inoutdata.length} data={filterArr.length > 0 ? filterArr : inoutdata}  settingCurrent={settingCurrent}  />
        {/* </Loader> */}
      </div>
    </div>     
  );
}
export default SocietyInOutBook;
