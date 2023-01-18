import '../SocietyModule/AddBlock.css';
import { Button } from 'react-bootstrap';
import LogOut from '../../components/SocietyModule/Utils/LogOut';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Loader } from "../Loader";

const AddBlock = () => {
  const [loading, setLoading] = useState(true)
  const [blocks, setBlocks] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    setLoading(false);
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const sendData = {
        name: document.getElementById('block_name').value,
        community_id: localStorage.getItem('community_id'),
        status: "1"
      }
      const { data } = await axios.post(`${window.env_var}api/block/add`, sendData)
      setBlocks(data.data)
      window.location.href = '/blockList'

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className="blcontainer">
        <div id="blheadersection">
          <div className="firstblsection">
            <div id="bllogo"><img src="/images/loginlogo.svg" alt="header logo" /></div>
            <div id="blsociety"><label>Society</label></div>
            <div id="blspace"></div>
            <div id="blnotification"><a href="abc"><img src="/images/notification.svg" alt="notificationicon" /></a></div>
            <div id="blsetting"><a href="/changesocpassword"><img src="/images/setting.svg" alt="settingicon" /></a></div>
            <div id="bllogoutbutton"><LogOut /></div>
          </div>
        </div>
        <div id="societynamesection">
          <div className='blsocietyname'>
            <img src="/images/societyicon.svg" alt="society name" />
            <label>Society Name</label>
          </div>
          {/* <div className='blsidelinks '>
            <Link to={{pathname: "/flatlist"}}>Flat List</Link><br></br><br></br>
            <Link to={{pathname: "/addflat"}}>Add Flat</Link>
          </div> */}
          
          <div className='nlsidelinks'>
            <a className='ADD_BListsidelink' href="/blockList">Block List</a><br></br><br />
            <a className='ADD_ABlockSidelink' href="/addblock"><b>Add Block</b></a><br /><br />
            {/* <a className='ADD_Flatsidelinks' href="/addflat">Flat List</a><br/><br/> */}
            <a className='ADD_Addsidelinks' href="/addflat">Add Flat</a>
          </div>
          <div className='blsideimage'><img src="/images/societysideimg.svg" alt="dashboard sideimage" /></div>
         
        </div>
        <div className='blbackgroundimg'>
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

