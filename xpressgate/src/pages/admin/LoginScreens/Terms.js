import React from "react";
import "../../../styles/Terms.css";
import SideLayOut from '../../../components/base/Layout/SideLayOut'

const Terms = () => {
  return (
    <>
    <SideLayOut/>
    <div className="AdminSideImg"><img src="./images/AdminSideImage.svg"  alt="Admin side image"></img></div>
    <div className="Termscontainer">
      <div className="Admindisplay">
        <label>Terms & Conditions</label>
      </div>
      <div className="conditionstextbox">
        <p className="contitionpara">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
      </div>
    </div>
    </>
  );
};

export default Terms;
