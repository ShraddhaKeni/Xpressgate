import React from "react";
import "../../../styles/Reports.css";
import SideLayOut from "../../../components/base/Layout/SideLayOut"; 
const VideoClass = () => {
  return (
    <>
    <SideLayOut/>
    <div className="AdminSideImg"><img src="./images/AdminSideImage.svg"  alt="Admin side image"></img></div>
    <div className="Videoocontainer">
      <img src="./images/AdminBgImg.svg" className="videoclassbgimg"></img>
      <div className="videodisplay">
        <label>Reports</label>
      </div>
      <div className="VideoButton">
        <button type="button" className="VideoAddBtn">Add New Video</button>
      </div>
     </div>
  </>
     
  );
};

export default VideoClass;
