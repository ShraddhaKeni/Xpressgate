import React from "react";
import "../../../styles/EditVideo.css";

const EditVideo = () => {
  return (
    <>
    
    <div className="AdminSideImg"><img src="/images/AdminSideImage.svg"  alt="Admin side image"></img></div>
    <div className="EditVideocontainer">
        <img src="/images/AdminBgImg.svg" className="Editbgimg"></img>
      <div className="EditVideodisplay">
        <label>Edit Video</label>
      </div>
      <div className="Editvideoform">
            <div className="inboxes">
                <label for="EVideoName" className="Evideoname">Video Name</label>
                <input type="text" id="EVideoName" value="Video Name" className="Evideonameinput" placeholder="Video Name"></input>
            </div>
            <br/>
            <div className="inboxes">
                <div><label  className="Evideodescription">Video Description</label></div>
                <div><textarea  value="" className="Evideodescriptioninput" placeholder="Video Description"></textarea></div>
            </div>
            <br/>
            <div className="inboxes">
                <label for="EVideoUrl" className="EvideoUrl">Video Url</label>
                <input type="text" id="EVideoName" value="" className="EvideoUrlinput" placeholder="Video Url"></input>
            </div>
            
        </div>
        <br/>
        <div className="VideoButtons">
            <div><button type="button" className="EditSaveButton">Edit & Save</button></div>
            <div><button type="button" className="VideoRemoveButton">Remove</button></div>
        </div>
     </div>
  </>
     
  );
};

export default EditVideo;
