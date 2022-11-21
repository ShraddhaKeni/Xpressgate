import React from "react";
import "../SocietyModule/Plumber.css";
import LogOut8 from "../SocietyModule/LogOut8";
import ReactPaginate from "react-paginate";
import { useState, useEffect } from "react";
import axios from "axios";

const Plumber = () => {
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
        <div className="firstheadersection1">
          <div id="dashboardlogo1">
            <img src="/images/loginlogo.svg" alt="header logo" />
          </div>
          <div id="dashboardguard1">
            <label>Society</label>
          </div>
          <div id="dashboardspace"></div>
          <div id="dashboardnotification1">
            <a href="abc">
              <img src="/images/notification.svg" alt="notificationicon" />
            </a>
          </div>
          <div id="dashboardsetting1">
            <a href="abc">
              <img src="/images/setting.svg" alt="settingicon" />
            </a>
          </div>
          <div id="dashboardlogoutbutton">
            <LogOut8/>
          </div>
        </div>
      </div>
      <div id="societynamesection">
        <div className="societyname">
          <img src="/images/profileicon.svg" alt="Society image" />
          <label>Society Name</label>
        </div>
        <div class="noticelist">
          <h4><b>Notice List</b></h4>
          <a href="abcd" class="Notice">Plumber</a><br/>
          <a href="abcd" class="Notice">Electrician</a>
          </div>
        <div className="sideimage5">
          <img src="/images/communitysideimg.svg" alt="dashboard sideimage" />
        </div>
      </div>
      <div className="addguestbackgroundimg">
        <div className="Addguestdisplay3">
          <label>Plumber</label>
        </div>

        <input
          type=" search"
          className="search"
          name="Search"
          placeholder="&#128269; Search"
        ></input>

        <table
          id="inoutbooktable1"
          class="table table-striped table-bordered table-sm "
          cellspacing="0"
          // style={{ border: '2px solid #14335D;;'}}
        >
          <thead>
            <tr>
              <th class="th-sm">Name</th>
              <th class="th-sm">Added by</th>
              <th class="th-sm">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Ram naik</td>
              <td>Sita naik</td>
              <td> </td>
            </tr>
            <tr>
              <td>Ram naik</td>
              <td>Sita naik</td>
              <td> </td>
            </tr>
            <tr>
              <td>Ram naik</td>
              <td>Sita naik</td>
              <td> </td>
            </tr>
            <tr>
              <td>Ram naik</td>
              <td>Sita naik</td>
              <td> </td>
            </tr>
            <tr>
              <td>Ram naik</td>
              <td>Sita naik</td>
              <td> </td>
            </tr>
            <tr>
              <td>Ram naik</td>
              <td>Sita naik</td>
              <td> </td>
            </tr>
            <tr>
              <td>Ram naik</td>
              <td>Sita naik</td>
              <td> </td>
            </tr>
            <tr>
              <td>Ram naik</td>
              <td>Sita naik</td>
              <td> </td>
            </tr>
            <tr>
              <td>Ram naik</td>
              <td>Sita naik</td>
              <td> </td>
            </tr>
            <tr>
              <td>Ram naik</td>
              <td>Sita naik</td>
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

export default Plumber;
