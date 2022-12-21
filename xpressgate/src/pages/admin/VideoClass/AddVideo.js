import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../../styles/AddVideo.css";
import axios from "axios";
const AddVideo = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const title = useRef([])
  const url = useRef([])


  const handleSubmit = async () => {
    try {
      const sendData = {
        videoTitle: title.current.value,
        videoURL: url.current.value
      }
      const { data } = await axios.post(`${window.env_var}api/videolist/add`, sendData)
      navigate('/admin/video')
    } catch (error) {
      navigate('/admin/video')
    }
  }
  return (
    <>

      <div className="AddVideocontainer">
        <img src="/images/AdminBgImg.svg" className="Addbgimg"></img>
        <div className="AddVideodisplay">
          <label>Add Video</label>
        </div>
        <div className="addvideoform">
          <div className="inboxes">
            <label for="VideoName" className="videoname">Video Name</label>
            <input type="text" id="VideoName" ref={title} className="videonameinput" placeholder="Video Name"></input>
          </div>
          <br />
          <br />
          <div className="inboxes">
            <label for="VideoUrl" className="videoUrl">Video Url</label>
            <input type="text" id="VideoName" ref={url} className="videoUrlinput" placeholder="Video Url"></input>
          </div>

        </div>
        <br />
        <div className="VideoAddButton">
          <button type="button" onClick={() => handleSubmit()} className="VideoaddButton">Add</button>
        </div>
      </div>

    </>
  );
};

export default AddVideo;
