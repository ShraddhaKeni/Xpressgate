import '../SocietyModule/UpdateBlock.css';
import { Button } from 'react-bootstrap';
import LogOut from '../../components/SocietyModule/Utils/LogOut';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const UpdateBlock = () => {
//   const [blocks, setBlocks] = useState([])
//   const navigate = useNavigate()
//   useEffect(() => {
//     getBlocks()
//   }, [])

//   const getBlocks = async () => {
//     try {
//       const { data } = await axios.get(`${window.env_var}api/block/blockList`)
//       setBlocks(data.data.block)
//     } catch (error) {
//       console.log(error)
//     }
//   }
//   const navigateToList = (id,block) => {
//     navigate('/flatList', { state: { id: id,block:block} })
//   }
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
          <a className='UDT_BListsidelink' href="/blockList">Block List</a><br></br><br/>
          <a className='UDT_ABlockSidelink' href="/addblock">Add Block</a><br/><br/>
          <a className='UDT_Flatsidelinks' href="/addflat">Flat List</a><br/><br/>
          <a className='UDT_Addsidelinks' href="/addflat">Add Flat</a>
        </div>
          <div className='blsideimage'><img src="/images/societysideimg.svg" alt="dashboard sideimage" /></div>
        </div>
        <div className='blbackgroundimg'>
          <div className='BL_display'>
            <label>Update Block</label>
          </div>
        <div className='addblock_form'>
            <label for="block_name" className='ABl_label'>Block Name</label>
            <input type="text" id="block_name" className='ABl_input'></input>
        </div><br/>
          <div className='ADDB_BtN'>
            <button type='button' className='BtnADDBlock'>Update</button>
          </div>



         </div></div>
    </>
  )
}

export default UpdateBlock;

