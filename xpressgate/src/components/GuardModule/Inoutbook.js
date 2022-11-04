import React from 'react';
import './Inoutbook.css';
import { Button } from 'react-bootstrap';
import { useState, useEffect } from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate';

const Inoutbook = () => {
  const [inoutdata, setInoutdata] = useState([])
  const [offset, setOffset] = useState(0);
  const [data, setData] = useState([]);
  const [perPage] = useState(10);
  const [pageCount, setPageCount] = useState(0)

  
 
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

      const community_id = "632970d054edb049bcd0f0b4"

      const { data } = await axios.get(`api/inout/getall/` + community_id)
      setInoutdata(data.data.list)
      //console.log(data.data.list)
    } catch (err) {
      console.log(err)
    }
  }

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setOffset(selectedPage + 1)
  };
  return (
    <div className="inoutbookcontainer">
      <div id="headersection">
        <div class="firstheadersection">
          <div id="dashboardlogo"><img src="/images/loginlogo.svg" alt="header logo" /></div>
          <div id="dashboardguard"><label>Guard</label></div>
          <div id="dashboardspace"></div>
          <div id="dashboardnotification"><a href="abc"><img src="/images/notification.svg" alt="notificationicon" /></a></div>
          <div id="dashboardsetting"><a href="abc"><img src="/images/setting.svg" alt="settingicon" /></a></div>
          <div id="dashboardlogoutbutton"> <Button type="submit" className="btnlogout">Log Out<img src="/images/logout.svg" alt="header logo" /></Button></div>
        </div>
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
                <tr>
                  <td>1</td>
                  <td>{iodata.guestFirstName} {iodata.guestLastName}</td>
                  <td>{iodata.type=='2'? iodata.type=='1' ? 'Guest' : 'Vendor' : 'Daily Helper'}</td>
                  <td>{iodata.block_name}</td>
                  <td>{iodata.flat_number}</td>
                  <td>{iodata.guestFirstName}</td>
                  <td>{dateTimeFormat(iodata.intime)}</td>
                  <td>{iodata.guestFirstName}</td>
                </tr>)
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Inoutbook

