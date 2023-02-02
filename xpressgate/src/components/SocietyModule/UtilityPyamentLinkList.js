import React, { useEffect, useState } from "react";
import "../SocietyModule/Community.css";
import LogOut from './Utils/LogOut'
import { ButtonBase, Icon, IconButton } from '@mui/material';
import PaginationCalculate from "../GuardModule/Utils/paginationCalculate";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Loader } from "../Loader";
import Societyheader from './Utils/Societyheader'
import ErrorScreen from "../../common/ErrorScreen";

const UtilityPyamentLinkList = () => {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(true)
  const [community, setCommunity] = useState([])
  const [currentPage, setCurrentpage] = useState(0)
  const [postPerPage, setPostPerPage] = useState(10)
  const [currentPosts, setCurrentPosts] = useState([])
  const [isError,setError] = useState(false)


  useEffect(() => {
    getDetails()
  }, [])

  const getDetails = async () => {
    try {
      const { data } = await axios.get(`${window.env_var}api/paymentlink/getall/${localStorage.getItem("community_id")}`)
      
      setCommunity(data.data.links)
      const indexoflast = (currentPage + 1) * postPerPage  //endoffset
      const indexoffirst = (indexoflast - postPerPage) //startoffset
      console.log(data.data);
      setCurrentPosts(data.data.links.slice(indexoffirst, indexoflast))
      setLoading(false);
      setError(false)
    } catch (error) {
      setError(true)
    }
  }

  async function paginate(event) {

    setCurrentpage(event.selected)
    const indexoflast = (event.selected + 1) * postPerPage  //endoffset
    const indexoffirst = (indexoflast - postPerPage) //startoffset
    setCurrentPosts(community.slice(indexoffirst, indexoflast))
  }


  const handleAddLink = () => {
    navigate('/utilitypaymentlink')
  }

  const handleEditLink = (link) => {
    navigate('/utilitypaymentlink', { state: { type: link.type, id: link.id } })
  }

  const handleDeleteLink = async (link) => {
    const sendData = {
      id: link.id,
      community_id: localStorage.getItem("community_id"),
      type: link.type,
    }
    console.log(sendData);
    const { data } = await axios.post(`${window.env_var}api/paymentlink/delete`, sendData)
    if (data.status_code == 200) {
      //setToast({ show: true, type: "success", message: data.message })
      window.location.href = '/utilitypaymentlinklist'
    } else {
      console.log(data.status_code)
      //setToast({ show: true, type: "error", message: `${data.message}` })
    }
  }


  async function findText(e) {
    let text = community.filter(x => x.type.toLowerCase().includes(e.target.value.toLowerCase()))
    if (text) {
      setCurrentPosts(text)
    }
    else {
      await paginate(0)
    }

  }
  if(isError)
  return <ErrorScreen/>

  return (
    <div className="addguestcontainer2">
      <div id="addflatsection">
        <Societyheader />
      </div>
      <div id="societynamesection">
        <div className="SC_societyname">
          <img src="/images/societyicon.svg" alt="Society image" />
          <label>Society Name</label>
        </div>
        <br />

        <div className="SC_sideimage">
          <img src="/images/societysideimg.svg" alt="dashboard sideimage" />
        </div>

      </div>
      <div className="addguestbackgroundimg">
        <div className="SC_display">
          <label>Utility Payment Link List</label>
        </div>
        <Loader loading={loading}>
          <div> <button type="submit" className="btnAddnotice" onClick={() => {
            window.location.href = "/utilitypaymentlink";
          }}>&#10011; Add New Link</button></div>
          <div className='row'>
            <div className='nlsearchbox'>
              <span><img src="/images/vendorlistsearch.svg" alt='search icon'></img>
                <input className='vlsearch_input' placeholder='Search' onChange={(e) => { findText(e) }}></input></span>
            </div>
          </div>
          <br />
          <table id="Table-Header" class="table table-striped table-bordered table-sm " cellspacing="0">
            <thead className='table-th'>
              <tr>
                <th class="th-sm" >Sr No.</th>
                <th class="th-sm">Payment Type</th>
                <th class="th-sm">Links</th>
                <th class="th-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentPosts.map((item, index) => {
                return (
                  <tr>
                    <td>{index + 1 + (currentPage * postPerPage)}</td>
                    <td>{item.type}</td>
                    <td>{item.link?.substr(0, 12)}...</td>
                    <td>
                      <div>
                        <IconButton onClick={() => { handleEditLink(item) }}>
                          <img src="/images/icon_edit.svg" />
                        </IconButton>

                        {item.status === true ? <IconButton onClick={() => handleDeleteLink(item)}>
                          <img src="/images/icon_delete.svg" />
                        </IconButton> : ''}

                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          {community.length > postPerPage && <div className='paginate'>
            <PaginationCalculate totalPages={community.length} postperPage={postPerPage} currentPage={currentPage} paginate={paginate} />
          </div>}
        </Loader>
      </div>
    </div>
  );
};

export default UtilityPyamentLinkList;