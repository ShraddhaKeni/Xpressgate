import './Blocklist.css';
import { Button } from 'react-bootstrap';
import LogOut from '../../components/SocietyModule/Utils/LogOut';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Blocklist = () => {
  const [blocks, setBlocks] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    getBlocks()
  }, [])

  const getBlocks = async () => {
    try {
      const { data } = await axios.get(`${window.env_var}api/block/blockList`);
      console.log(data.data.block);
      setBlocks(data.data.block)
    } catch (error) {
      console.log(error)
    }
  }
  const navigateToList = (id, block) => {
    navigate('/flatList', { state: { id: id, block: block } })
  }

  function blockDetails(id, name) {
    navigate('/updateblock', { state: { id: id, type: 'edit', name: name } })
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
          <div className='nlsidelinks'>
            <a className='BListsidelink' href="/blockList"><b>Block List</b></a><br></br><br />
            <a className='ABlockSidelink' href="/addblock">Add Block</a><br /><br />
            <a className='Addsidelinks' href="/addflat">Add Flat</a>
          </div>
          <div className='blsideimage'><img src="/images/societysideimg.svg" alt="dashboard sideimage" /></div>
        </div>
        <div className='blbackgroundimg'>
          <div className='BL_display'>
            <label>Block List</label>
          </div>
          <button type="button" onClick={() => { window.location.href = '/addblock' }} className="AddBlist">&#10011; Add New Block</button>
          <div id="blcardsection">
          
              <div className="row row-cols-3 d-f BLfullcardscss">
                {blocks.map((item, index) => {
                  return (
                    <div className="col">
                      <div className="blminicard"><br></br>
                        <a><img src="/images/pencilicon.png" className="pencilicon" onClick={() => blockDetails(item._id, item.block)}></img></a>
                        <label className='Blblock'>Block {item.block}</label><br></br>
                        <label className='Blflat'>Flats - {item.flat !== [] ? parseInt(item.flat) : 0}</label><br></br><br></br>
                        <button type="button" className="btnView" onClick={() => { navigateToList(item._id, item.block) }} >View</button><br></br>
                      </div>
                    </div>
                  )
                })}
              </div>
           
          </div>
        </div>
      </div>
    </>
  )
}

export default Blocklist

