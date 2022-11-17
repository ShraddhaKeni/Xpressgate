import React from "react";
import "../SocietyModule/Managementteam.css";
import LogOut from "../Utils/LogOut10";
// import { Button } from 'react-bootstrap';
import ReactPaginate from "react-paginate";
import { useState, useEffect } from "react";
import axios from "axios";

const Managementteam = () => {
    const [offset, setOffset] = useState(0);
    const [data, setData] = useState([]);
    const [perPage] = useState(10);
    const [pageCount, setPageCount] = useState(0);
  
    const getData = async () => {
      const res = await axios.get(`https://jsonplaceholder.typicode.com/photos`);
      const data = res.data;
      const slice = data.slice(offset, offset + perPage);
      const postData = slice.map((pd) => (
        <div key={pd.id}>
          <p>{pd.title}</p>
          <img src={pd.thumbnailUrl} alt="" />
        </div>
      ));
      setData(postData);
      setPageCount(Math.ceil(data.length / perPage));
    };
  
    useEffect(() => {}, []);
  
    const handlePageClick = (e) => {
      const selectedPage = e.selected;
      setOffset(selectedPage + 1);
    };


  return (
    <div className="addguestcontainer1">
      <div id="headersection1">
        <div id="addflatsection">
          <div className="addflatheadersection">
            <div id="aflogo"><img src="/images/loginlogo.svg" alt="header logo" /></div>
            <div id="afsociety"><label>Society</label></div>
            <div id="afspace"></div>
            <div id="afnotification"><a href="abc"><img src="/images/notification.svg" alt="notificationicon" /></a></div>
            <div id="afsetting"><a href="abc"><img src="/images/setting.svg" alt="settingicon" /></a></div>
            <div id="aflogoutbutton"><LogOut /></div>
          </div>
        </div>
      </div>
      <div id="societynamesection">
        <div className="societyname">
          <img src="/images/profileicon.svg" alt="Society image" />
          <label>Society Name</label>
        </div>
        <br/>
        <div class="noticelist">
          <h4>Management Team list</h4>
          <a href="/addmanage" class="Notice">Add Management Number</a>
          </div>
        <div className="sideimage2">
          <img src="/images/communitysideimg.svg" alt="dashboard sideimage" />
        </div>
      </div>
      <div className="addguestbackgroundimg">
        <div className="Addguestdisplay3">
          <label>Management Team</label>
        </div>
        <div >
        {/* <button type="button" className="AddNN" onClick={() => {
                window.location.href = "abc";
              }}>&#10011; Add New Number</button> */}
        <input
          type=" search"
          className="search2"
          name="Search"
          placeholder="&#128269; Search"
        ></input>
        </div>

        <table
          id="inoutbooktable1"
          class="table table-striped table-bordered table-sm "
          cellspacing="0"
          // style={{ border: '2px solid #14335D;;'}}
        >
          <thead>
            <tr>
              <th class="th-sm">Resident</th>
              <th class="th-sm">Designation</th>
              <th class="th-sm">Time Period </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Doctor</td>
              <td>Ram Naik</td>
              <td> </td>
            </tr>
            <tr>
              <td>Doctor</td>
              <td>Ram Naik</td>
              <td> </td>
            </tr>
            <tr>
              <td>Doctor</td>
              <td>Ram Naik</td>
              <td> </td>
            </tr>
            <tr>
              <td>Doctor</td>
              <td>Ram Naik</td>
              <td> </td>
            </tr>
            <tr>
              <td>Doctor</td>
              <td>Ram Naik</td>
              <td> </td>
            </tr>
            <tr>
              <td>Doctor</td>
              <td>Ram Naik</td>
              <td> </td>
            </tr>
            <tr>
              <td>Doctor</td>
              <td>Ram Naik</td>
              <td> </td>
            </tr>
            <tr>
              <td>Doctor</td>
              <td>Ram Naik</td>
              <td> </td>
            </tr>
            <tr>
              <td>Doctor</td>
              <td>Ram Naik</td>
              <td> </td>
            </tr>
          
          </tbody>
        </table>
        {/* <div className="App">
      {data} */}
        <ReactPaginate
          previousLabel={"prev"}
          nextLabel={"next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
      </div>
    </div>
       
       
    
  );
};

export default Managementteam;
