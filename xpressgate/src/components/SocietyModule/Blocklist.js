import './Blocklist.css';
import { Button } from 'react-bootstrap';
import LogOut from '../../components/SocietyModule/Utils/LogOut';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Blocklist = () => {
  const [blocks,setBlocks] = useState([])
  const navigate = useNavigate()
  useEffect(()=>{
    getBlocks()
  },[])

  const getBlocks = async()=>{
    try {
      const {data} = await axios.get(`${process.env.REACT_APP_SERVER_PATH}api/block/blockList`)
      setBlocks(data.data.block)
    } catch (error) {
      console.log(error)
    }
  }
const navigateToList = (id)=>{
  navigate('/flatList',{state:{id:id}})
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
            <div id="blsetting"><a href="abc"><img src="/images/setting.svg" alt="settingicon" /></a></div>
            <div id="bllogoutbutton"><LogOut/></div>
          </div>
        </div>
        <div id="societynamesection">
          <div className='societyname'>
            <img src="/images/societyicon.svg" alt="society name" />
            <label>Society Name</label>
          </div>
          <div className='blsideimage'><img src="/images/societysideimg.svg" alt="dashboard sideimage" /></div>
        </div>
        <div className='blbackgroundimg'>
          <div className='societydisplay'>
            <label>Block List</label>
          </div>
          <div id="blcardsection">
            <div className="row row-cols-1 row-cols-md-3 g-4 fullcardscss">

              {blocks.map(item=>{
                return(
                  <div className="col">
                    <div className="blminicard"><br></br>
                      <label className='blblock'>Block {item.block}</label><br></br>
                      <label className='blflat'>Flats - {item.flat!==[]?parseInt(item.flat):0}</label><br></br><br></br>
                      <Button type="button" className="btnView" onClick={()=>{navigateToList(item._id)}} >View</Button><br></br>
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

