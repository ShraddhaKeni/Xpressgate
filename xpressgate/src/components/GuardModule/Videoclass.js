import React, { useEffect, useState } from 'react';
import './Videoclass.css';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import ReactPlayer from 'react-player'
import PaginationCalculate from './Utils/paginationCalculate';

const Videoclass = () => {
  const [videodata, setVideodata] = useState([])

  const [currentPage, setCurrentpage] = useState(1)
  const [postPerPage, setPostPerPage] = useState(6)
  const [currentPosts,setCurrentPosts] = useState([])

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    let data = await axios.get(process.env.REACT_APP_SERVER_PATH+'api/videolist/getAll')
      setVideodata(data.data.data.videolist)
      const indexoflast = currentPage*postPerPage  //endoffset
      const indexoffirst = indexoflast - postPerPage //startoffset
      setCurrentPosts(data.data.data.videolist.slice(indexoffirst,indexoflast))
    //console.log("sk" + JSON.stringify(videodata))
  }
  
  async function  paginate(event)
  {
    const {data} = await axios.get(`${process.env.REACT_APP_SERVER_PATH}api/videolist/getAll`)
    setCurrentpage(event.selected+1)
    const indexoflast = (event.selected+1)*postPerPage  //endoffset
    const indexoffirst = (indexoflast - postPerPage) //startoffset
    setCurrentPosts(data.data.videolist.slice(indexoffirst,indexoflast))
  }
  
  return (
    <div className="videoclasscontainer">
      <div id="videoheadersection">
        <div class="videofirstheadersection">
          <div id="videodashboardlogo"><img src="/images/loginlogo.svg" alt="header logo" /></div>
          <div id="videodashboardguard"><label>Guard</label></div>
          <div id="videodashboardspace"></div>
          <div id="videodashboardnotification"><a href="abc"><img src="/images/notification.svg" alt="notificationicon" /></a></div>
          <div id="videodashboardsetting"><a href="abc"><img src="/images/setting.svg" alt="settingicon" /></a></div>
          <div id="videodashboardlogoutbutton"> <Button type="submit" className="videobtnlogout">Log Out<img src="/images/logout.svg" alt="header logo" /></Button></div>
        </div>
      </div>
      <div id="videoguardnamesection">
        <div className='videoguardname'>
          <img src="/images/guardnameicon.svg" alt="guard name" />
          <label>Guard Name</label>
        </div>
        <div className='videosideimage'><img src="/images/sideimage.svg" alt="dashboard sideimage" /></div>
      </div>
      <div className='vcbackgroundimg'>
        <div id="cardsection">
          <div className='Dailyhelplistdisplay'>
            <label>Daily Help List</label>
          </div>
          <div className="row row-cols-1 row-cols-md-3 g-4 fullcardscss">
            {currentPosts.map(vdata => {
              return (
              <div className="col">
              
                <div className="videocard">
                  {/* <video className='videoclass' src={vdata.videoURL} controls></video> */}
                  <ReactPlayer className='player' url={vdata.videoURL} />
                  <label className='card-titlename'>{vdata.videoTitle}</label>
                  {/* <p className='card-content'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p> */}
                </div>
              </div>)
            })}
          </div>
          <PaginationCalculate totalPages={videodata.length} postperPage={postPerPage} currentPage={currentPage} paginate={paginate}/>
        </div>
      </div>
    </div>
  )
}

export default Videoclass

