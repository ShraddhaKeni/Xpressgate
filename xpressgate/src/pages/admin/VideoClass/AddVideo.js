import React, { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../../styles/AddVideo.css";
import axios from "axios";
import { goBackInOneSec, TOAST } from "../../../common/utils";
import { ToastMessage } from "../../../components/ToastMessage";
const AddVideo = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const title = useRef([])
  const url = useRef([])

  const [toast, setToast] = useState({ show: false })

  const handleSubmit = async () => {
    try {
      const sendData = {
        videoTitle: title.current.value,
        videoURL: url.current.value
      }
      const { data } = await axios.post(`${window.env_var}api/videolist/add`, sendData)
      if (data && data?.status_code == 200) {
        setToast(TOAST.SUCCESS(data?.message));
        goBackInOneSec(navigate)
      } else if (data?.status_code == 201) {
        setToast(TOAST.ERROR(data?.message));
      }
    } catch (error) {
      navigate('/admin/video')
    }
  }
  return (
    <>
      <ToastMessage show={toast.show} message={toast.message} type={toast.type} handleClose={() => { setToast({ show: false }) }} />

      <div>
        <div className="page-label">
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
