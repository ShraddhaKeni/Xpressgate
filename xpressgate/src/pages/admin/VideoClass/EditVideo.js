import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../../styles/EditVideo.css";

const EditVideo = () => {

  const [video, setVideo] = useState({})
  const location = useLocation()
  const navigate = useNavigate()

  const title = useRef([])
  const url = useRef([])
  useEffect(() => {
    if (location.state.id) {
      getDetails()
    }
    else {
      navigate('/admin/videos')
    }

  }, [])

  const getDetails = async () => {
    try {
      const { data } = await axios.get(`${window.env_var}api/videolist/find/${location.state.id}`)
      setVideo(data.data[0])

    } catch (error) {
      console.log(error)
    }
  }

  const updateVideo = async (id) => {
    try {
      const sendData = {
        id: id,
        videoTitle: title.current.value,
        videoURL: url.current.value
      }
      const { data } = await axios.post(`${window.env_var}api/videolist/update`, sendData)
      navigate('/admin/video')
    } catch (error) {
      console.group(error)
    }
  }

  return (
    <>

      <div className="EditVideocontainer">
        <img src="/images/AdminBgImg.svg" className="Editbgimg"></img>
        <div className="EditVideodisplay">
          <label>Edit Video</label>
        </div>
        <div className="Editvideoform">
          <div className="inboxes">
            <label for="EVideoName" className="Evideoname">Video Name</label>
            <input type="text" id="EVideoName" ref={title} className="Evideonameinput" defaultValue={video.videoTitle} placeholder="Video Name"></input>
          </div>
          <br />

          <br />
          <div className="inboxes">
            <label for="EVideoUrl" className="EvideoUrl">Video Url</label>
            <input type="text" id="EVideoURL" ref={url} defaultValue={video.videoURL} className="EvideoUrlinput" placeholder="Video Url"></input>
          </div>

        </div>
        <br />
        <div className="VideoButtons">
          <div><button type="button" onClick={() => updateVideo(video._id)} className="EditSaveButton">Edit & Save</button></div>
          <div><button type="button" className="VideoRemoveButton">Remove</button></div>
        </div>
      </div>
    </>

  );
};

export default EditVideo;
