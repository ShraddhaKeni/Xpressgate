import React from "react";
import "../../../styles/VideoClass.css";
import SideLayOut from "../../../components/base/Layout/SideLayOut"; 
import PaginationCalculate from '../../../components/GuardModule/Utils/paginationCalculate';
const VideoClass = () => {
  return (
    <>
    <SideLayOut/>
    <div className="AdminSideImg"><img src="./images/AdminSideImage.svg"  alt="Admin side image"></img></div>
    <div className="Videoocontainer">
      <img src="./images/AdminBgImg.svg" className="videoclassbgimg"></img>
      <div className="videodisplay">
        <label>Video Class</label>
      </div>
      <div className="VideoButton">
        <button type="button" className="VideoAddBtn">&#43; Add New Video</button>
      </div>
      <div className="paginate">
        <PaginationCalculate totalPages={10} postperPage={20} currentPage={2} paginate={10} /></div>
     </div>
     
  </>
     
  );
}; 

export default VideoClass;
