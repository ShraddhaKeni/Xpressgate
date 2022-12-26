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
       <img src='/images/side_bar_img.svg' className='Premise_side_Img' />
      <div >
        <div className="page-label">
          <label>Video Class</label>
        </div>

        <div style={{ marginLeft: '0' }}>
          <div className="table-top-right-content">

            <div className="VideoButton">
              <div className="Video_AddBTN mt-3" onClick={() => { navigate('/admin/addvideo') }}>
                
                <span className='ml-2'>&#43; Add New Video</span>
              </div>
            </div>
          </div>
          <div className="row row-cols-1 row-cols-md-3 mt-5">

            {console.log(currentPosts)}
            {currentPosts.map(item => {
              return (
                <div className="col">

                  <div className="videocard ">
                    {/* <video className='videoclass' src={vdata.videoURL} controls></video> */}
                    <ReactPlayer className='player' url={item.videoURL} />
                    <label className='card-titlename' onClick={() => { navigate('/admin/editvideo', { state: { id: item._id } }) }}>{item.videoTitle}</label>
                    {/* <p className='card-content'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p> */}
                  </div>
                </div>
              )
            })}

          </div>
          <div className="paginate" style={{ marginTop: '2%' }}>
            <PaginationCalculate totalPages={videos.length} postperPage={postPerPage} currentPage={currentPage} paginate={paginate} />
          </div>
        </div>

      </div>

    </>

  );
};

export default VideoClass;
