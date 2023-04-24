import React, { useEffect, useState } from 'react';
import './Videoclass.css';
import axios from 'axios';
import ReactPlayer from 'react-player'
import PaginationCalculate from './Utils/paginationCalculate';
import LogOut from './Utils/LogOut';
import GuardHeader from './Utils/GuardHeader';
import Loader from '../../common/Loader';
import ErrorScreen from '../../common/ErrorScreen';
import GuardMobileSidebar from '../GuardMobileSidebar';
const Videoclass = () => {
  const [videodata, setVideodata] = useState([])

  const [currentPage, setCurrentpage] = useState(1)
  const [postPerPage, setPostPerPage] = useState(6)
  const [currentPosts, setCurrentPosts] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [isError, setError] = useState(false)
  const [menu, setMenuOpen] = useState(false)

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {

    try {
      let data = await axios.get(`${window.env_var}api/videolist/getAll`)
      setVideodata(data.data.data.videolist)
      const indexoflast = currentPage * postPerPage  //endoffset
      const indexoffirst = indexoflast - postPerPage //startoffset
      setCurrentPosts(data.data.data.videolist.slice(indexoffirst, indexoflast))
      setTimeout(() => {
        setLoading(false)
      }, 2000)
      setError(false)
    } catch (error) {
      setTimeout(() => {
        setLoading(false)
      }, 2000)
      setError(true)
    }

  
    setLoading(false);
  }

  async function paginate(event) {
    const { data } = await axios.get(`${window.env_var}api/videolist/getAll`)
    setCurrentpage(event.selected + 1)
    const indexoflast = (event.selected + 1) * postPerPage  //endoffset
    const indexoffirst = (indexoflast - postPerPage) //startoffset
    setCurrentPosts(data.data.videolist.slice(indexoffirst, indexoflast))
  }

  if (isLoading)
    return <Loader />

  if (isError)
    return <ErrorScreen />


  return (
    <>
      <div className="videoclasscontainer">
        <div id="videoheadersection">
          {/* <div class="videofirstheadersection">
          <div id="videodashboardlogo"><img src="/images/loginlogo.svg" alt="header logo" /></div>
          <div id="videodashboardguard"><label>Guard</label></div>
          <div id="videodashboardspace"></div>
          <div id="videodashboardnotification"><a href="abc"><img src="/images/notification.svg" alt="notificationicon" /></a></div>
          <div id="videodashboardsetting"><a href="abc"><img src="/images/setting.svg" alt="settingicon" /></a></div>
          <div id="videodashboardlogoutbutton"> <LogOut/></div>
        </div> */}
          <GuardHeader onMenuClick={() => {
            setMenuOpen(true)
          }} />
        </div>
        <div id="videoguardnamesection">
          <div className='VG_Name'>
            <img src="/images/guardnameicon.svg" alt="guard name" />
            <label>{localStorage.getItem('name')}</label>
          </div>
          <div className='VG_SImG'><img src="/images/sideimage.svg" alt="dashboard sideimage" /></div>
        </div>
        <div className='vcbackgroundimg'>
          <div id="cardsection">
            <div className='VG_Display'>
              <label>Video class List</label>
            </div>
            <div className="row row-cols-1 row-cols-md-3 g-4 fullcardscss allcards">
              {currentPosts.map(vdata => {
                return (
                  <div className="col">

                    <div className="ViDeOcArD">
                      {/* <video className='videoclass' src={vdata.videoURL} controls></video> */}
                      <ReactPlayer className='player' url={vdata.videoURL} />
                      <label className='card-titlename'>{vdata.videoTitle}</label>
                      {/* <p className='card-content'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p> */}
                    </div>
                  </div>)
              })}
            </div>
          </div>
          <div style={{marginTop : '5%'}}>
          <PaginationCalculate totalPages={videodata.length} postperPage={postPerPage} currentPage={currentPage} paginate={paginate} />
        </div>
        </div>
      </div>

      <GuardMobileSidebar open={menu} onHide={() => setMenuOpen(false)} />

    </>

  )
}

export default Videoclass

