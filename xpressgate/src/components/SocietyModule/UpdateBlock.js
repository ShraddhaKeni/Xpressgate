import '../SocietyModule/UpdateBlock.css';
import { Button } from 'react-bootstrap';
import LogOut from '../../components/SocietyModule/Utils/LogOut';
import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Loader } from "../Loader";
import { ToastMessage } from '../ToastMessage';
import Societyheader from './Utils/Societyheader'
import ErrorScreen from '../../common/ErrorScreen';

const UpdateBlock = () => {
  const [blocks, setBlocks] = useState({})
  const navigate = useNavigate()
  const location = useLocation()
  const [type, setType] = useState('add')
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState({ show: false })
  const [isError,setError] = useState(false)
  useEffect(() => {
    if (location.state) {
      setType(location.state.type)
      setLoading(false);
      setError(false)
    }
    else{
      setLoading(false);
      setError(true)
    }
  }, [])

  const handleSubmit = async(e)=>{
    e.preventDefault()
    try {
      const sendData = {
        id: location.state.id,
        name: document.getElementById('block_name').value,
        community_id: localStorage.getItem('community_id')
      }
      const {data} = await axios.post(`${window.env_var}api/block/update`,sendData);
      setToast({ show: true, type: "success", message: "Updated successfully" })
      setTimeout(() => {
        window.location.href='/blockList'
      }, 1500);
    
    
    } catch (error) {
      setToast({ show: true, type: "error", message: "Check Data." });
    }
  }
  if(isError)
    return <ErrorScreen/>

  return (
    <>
      <div className="blcontainer">
        <div id="blheadersection">
          <Societyheader/>
        </div>
        <div id="societynamesection">
          <div className='blsocietyname'>
            <img src="/images/societyicon.svg" alt="society name" />
            <label>Society Name</label>
          </div>
          <div className='nlsidelinks'>
            <a className='UDT_BListsidelink' href="/blockList">Block List</a><br></br><br/>
            <a className='UDT_ABlockSidelink' href="/addblock">Add Block</a><br/><br/>
            <a className='UDT_Addsidelinks' href="/addflat">Add Flat</a>
          </div>
          <div className='blsideimage'><img src="/images/societysideimg.svg" alt="dashboard sideimage" /></div>
        </div>
        <div className='blbackgroundimg'>
        <ToastMessage show={toast.show} message={toast.message} type={toast.type} handleClose={() => { setToast({ show: false }) }} />
          <div className='BL_display'>
            <label>Update Block</label>
          </div>
          <Loader loading={loading}>
            <div className='addblock_form'>
              <label for="block_name" className='ABl_label'>Block Name</label>
              <input type="text" id="block_name" className='ABl_input' defaultValue={location.state.name}></input>
            </div>
            <br/>
            <div className='ADDB_BtN'>
              <button type='button' onClick={(e)=>{handleSubmit(e)}} className='BtnADDBlock'>Update</button>
            </div>
          </Loader>
        </div>
      </div>
    </>
  )
}
export default UpdateBlock;