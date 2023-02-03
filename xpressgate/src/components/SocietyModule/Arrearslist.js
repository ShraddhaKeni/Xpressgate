import React from "react";
import "../SocietyModule/Arrearslist.css";
import LogOut from "./Utils/LogOut";
// import { Button } from 'react-bootstrap';
import ReactPaginate from "react-paginate";
import { useState, useEffect } from "react";
import axios from "axios";
import PaginationCalculate from "../GuardModule/Utils/paginationCalculate";
import Societyheader from "./Utils/Societyheader";
import { useNavigate } from "react-router-dom";
import { Loader } from "../Loader";
import { ButtonBase, Icon, IconButton } from '@mui/material';

const Arrearslist = () => {
  const [loading, setLoading] = useState(false)
  const [arrears, setArrears] = useState([])
  const [currentPage, setCurrentpage] = useState(1)
  const [postPerPage, setPostPerPage] = useState(12)
  const [currentPosts, setCurrentPosts] = useState([])
  const [pageCount, setpageCount] = useState(0)
  const [isError,setError] = useState(false)
  const [toast, setToast] = useState({ show: false })
  const navigate = useNavigate();
  useEffect(()=>{
    getArrears()
  },[])

  const getArrears = async () => {
    try {
      const { data } = await axios.get(`${window.env_var}api/arrears/getall`) 
      setArrears(data.data.arrears)
      const indexoflast = currentPage * postPerPage  //endoffset
      const indexoffirst = indexoflast - postPerPage //startoffset
      setCurrentPosts(data.data.arrears.slice(indexoffirst, indexoflast))
      setLoading(false);
      setError(false)
    } catch (error) {
      setLoading(false);
      setError(true)
    }
  }

  async function paginate(event) {
    const { data } = await axios.get(`${window.env_var}api/arrears/getall`) //will update with localstorage
    setCurrentpage(event.selected + 1)
    const indexoflast = (event.selected + 1) * postPerPage  //endoffset
    const indexoffirst = (indexoflast - postPerPage) //startoffset
    setCurrentPosts(data.data.arrears.slice(indexoffirst, indexoflast))
  }

  const handleEditLink = (items) => {
    navigate('/addarrears', { state: { id: items._id, type: 'edit' } })
  }

  const handleDeleteLink = async (link) => {

    try {
      const { data } = await axios.get(`${window.env_var}api/arrears/remove/${link._id}`)
      setToast({ show: true, message: "Team Member Deleted Successfully", type: "error" })
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className="addguestcontainer4">
      <div id="addflatsection">
        <Societyheader />
      </div>
      <div id="societynamesection">
        <div className="EN_societyname">
          <img src="/images/societyicon.svg" alt="Society image" />
          <label>Society Name</label>
        </div>

        <div class="arrearslist">
          <a href="/arrearslist" class="MSLList"><b>Arrears List</b></a><br /><br />
          <a href="/addarrears" class="Addmaintenancelink">Add Arrears</a>
        </div>
        <div className="EN_sideimg">
          <img src="/images/societysideimg.svg" alt="dashboard sideimage" />
        </div>
      </div>
      <div className="addguestbackgroundimg">

        <div className="EN_display">
          <label>Arrears List</label>
        </div>
        <br/>
        <Loader loading={loading}>
        <div className='vendorpayment_search'>
                <span><img src="/images/vendorlistsearch.svg" alt='search icon'></img>
                  <input placeholder='Search'></input></span>
            </div>
          <div className="AddSDBlock">
            <button type="button" className="SDAddBTN" onClick={() => {
              window.location.href = "/addarrears";
            }}>&#10011; Add Arrears</button>
          </div>
          {/* <div >
            <button type="button" className="EN_Add" onClick={() => {
              window.location.href = "/addarrears";
            }}>&#10011; Add Arrears</button>

          </div> */}
          {/* <div className="row">
            <div className='EMMsearchbox'>
              <span><img src="/images/vendorlistsearch.svg" alt='search icon'></img>
                <input placeholder='Search' ></input></span>
            </div>
          </div> */}
          <table
            id="inoutbooktable"
            class="table table-striped table-bordered table-sm "
            cellspacing="0"
          // style={{ border: '2px solid #14335D;;'}}
          >
            <thead>
              <tr>
                <th class="th-sm">Block</th>
                <th class="th-sm">Flat</th>
                <th class="th-sm">Invoice Number</th>
                <th class="th-sm">Arrears</th>
                <th class="th-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
            {currentPosts.map((item, index) => {
                return (
              <tr>
                <td>{item.block_name}</td>
                <td>{item.flat_name}</td>
                <td>{item.invoice_number}</td>
                <td>{item.arrears}</td>
                <td>
                  <div>
                    <IconButton onClick={() => { handleEditLink(item) }}>
                      <img src="/images/icon_edit.svg" />
                    </IconButton>

                    <IconButton onClick={() => handleDeleteLink(item)}>
                      <img src="/images/icon_delete.svg" />
                    </IconButton>

                  </div>
                </td>
              </tr>
              )
            })}



            </tbody>
          </table>
          <PaginationCalculate totalPages={arrears.length} postperPage={postPerPage} currentPage={currentPage} paginate={paginate} />
        </Loader>
      </div>
    </div>



  );
};

export default Arrearslist;
