import React, { useEffect, useState } from "react";
import "../../../styles/VideoClass.css";
import PaginationCalculate from '../../../components/GuardModule/Utils/paginationCalculate';
import ReactPlayer from 'react-player'
import { getAccordionDetailsUtilityClass } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const VideoClass = () => {

  const [videos, setVideos] = useState([])
  const [currentPage, setCurrentpage] = useState(1)
  const [postPerPage, setPostPerPage] = useState(6)
  const [currentPosts, setCurrentPosts] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    getDetails()
  }, [])

  const getDetails = async () => {


    try {
      const { data } = await axios.get(`${window.env_var}api/videolist/getAll`)
      setVideos(data.data.videolist)
      const indexoflast = (currentPage) * postPerPage  //endoffset
      const indexoffirst = (indexoflast - postPerPage) //startoffset
      setCurrentPosts(data.data.videolist.slice(indexoffirst, indexoflast))
    } catch (error) {
      console.log(error)
    }


  }


  async function paginate(event) {

    setCurrentpage(event.selected + 1)
    const indexoflast = (event.selected + 1) * postPerPage  //endoffset
    const indexoffirst = (indexoflast - postPerPage) //startoffset
    setCurrentPosts(videos.slice(indexoffirst, indexoflast))
  }

  return (
    <>

      <div className="Videoocontainer">
        <img src="/images/AdminBgImg.svg" className="videoclassbgimg"></img>
        <div className="videodisplay">
          <label>Video Class</label>
        </div>
        <div className="VideoButton">
          <button type="button" className="VideoAddBtn" onClick={() => navigate('/admin/addvideo')}>&#43; Add New Video</button>
        </div>
        <div className="row row-cols-1 row-cols-md-3 g-4 fullcardscss">

          {console.log(currentPosts)}
          {currentPosts.map(item => {
            return (
              <div className="col">

                <div className="videocard">
                  {/* <video className='videoclass' src={vdata.videoURL} controls></video> */}
                  <ReactPlayer className='player' url={item.videoURL} />
                  <label className='card-titlename' onClick={() => { navigate('/admin/editvideo', { state: { id: item._id } }) }}>{item.videoTitle}</label>
                  {/* <p className='card-content'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p> */}
                </div>
              </div>
            )
          })}
        </div>
        <div className="paginate">
          <PaginationCalculate totalPages={videos.length} postperPage={postPerPage} currentPage={currentPage} paginate={paginate} />
        </div>
      </div>

    </>

  );
};

export default VideoClass;
