import React from "react";
import "../../../styles/AddVideo.css";



const AddVideo = () => {
  return (
    <>
    
    <div className="AdminSideImg"><img src="/images/AdminSideImage.svg"  alt="Admin side image"></img></div>
    <div className="AddVideocontainer">
        <img src="/images/AdminBgImg.svg" className="Addbgimg"></img>
      <div className="AddVideodisplay">
        <label>Add Video</label>
      </div>
      <div className="addvideoform">
            <div className="inboxes">
                <label for="VideoName" className="videoname">Video Name</label>
                <input type="text" id="VideoName" value="Video Name" className="videonameinput" placeholder="Video Name"></input>
            </div>
            <br/>
            <div className="inboxes">
                <div><label  className="videodescription">Video Description</label></div>
                <div><textarea  value="" className="videodescriptioninput" placeholder="Video Description"></textarea></div>
            </div>
            <br/>
            <div className="inboxes">
                <label for="VideoUrl" className="videoUrl">Video Url</label>
                <input type="text" id="VideoName" value="" className="videoUrlinput" placeholder="Video Url"></input>
            </div>
            
        </div>
        <br/>
        <div className="VideoAddButton">
            <button type="button" className="VideoaddButton">Add</button>
        </div>
     </div>
  
     </>
  );
};

export default AddVideo;
