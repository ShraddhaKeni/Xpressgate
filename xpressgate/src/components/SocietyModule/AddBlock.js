import '../SocietyModule/AddBlock.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Loader } from "../Loader";
import { ToastMessage } from '../ToastMessage';
import ErrorScreen from '../../common/ErrorScreen';
import Societyheader from "./Utils/Societyheader";

const AddBlock = () => {
  const [loading, setLoading] = useState(true)
  const [blocks, setBlocks] = useState([])
  const navigate = useNavigate()
  const [toast, setToast] = useState({ show: false })
  const [isError,setError] = useState(false)
  useEffect(() => {
    setLoading(false);
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(document.getElementById('block_name').value != "")
    {
      try {
        const sendData = {
          name: document.getElementById('block_name').value,
          community_id: localStorage.getItem('community_id'),
          status: "1"
        }
        const { data } = await axios.post(`${window.env_var}api/block/add`, sendData)
        setBlocks(data.data)
        setToast({ show: true, type: "success", message: "Added successfully" })
        setTimeout(() => {
          window.location.href = '/blockList'
        }, 1500);

      } catch (error) {
        setToast({ show: true, type: "error", message: "Check Data." });
      }
    }
    else{
      setToast({ show: true, type: "error", message: "Block name cannot be empty." });
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
            <a className='ADD_BListsidelink' href="/blockList">Block List</a><br></br><br />
            <a className='ADD_ABlockSidelink' href="/addblock"><b>Add Block</b></a><br /><br />
            <a className='ADD_Addsidelinks' href="/addflat">Add Flat</a>
          </div>
          <div className='blsideimage'><img src="/images/societysideimg.svg" alt="dashboard sideimage" /></div>
        </div>
        <div className='blbackgroundimg'>
        <ToastMessage show={toast.show} message={toast.message} type={toast.type} handleClose={() => { setToast({ show: false }) }} />
          <div className='BL_display'>
            <label>Add Block</label>
          </div>
          <Loader loading={loading}>
            <div className='addblock_form'>
              <label for="block_name" className='ABl_label'>Block Name</label>
              <input type="text" id="block_name" className='ABl_input' placeholder='Block Name'></input>
            </div><br />
            <div className='ADDB_BtN'>
              <button type='button' onClick={(e) => handleSubmit(e)} className='BtnADDBlock'>Add</button>
            </div>
          </Loader>
        </div></div>
    </>
  )
}
export default AddBlock;