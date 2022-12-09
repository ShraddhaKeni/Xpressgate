
import "../../../styles/PrivacyPolicy.css";
import React, { Component , useState  } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const PrivacyPolicy = () => {
  const [data,setdata]=useState('');
  const handleChange=(e,editor)=>{
    setdata(editor.getData());
  }
  return (
    <>
    
   
    <div className="AdminSideImg"><img src="/images/AdminSideImage.svg"  alt="Admin side image"></img></div>
    <div className="Policycontainer">
      <div className="Adminpolicydisplay">
        <label>Privacy Policy</label>
      </div>
      <div className="policiestextbox">
      <div className="editor"> <CKEditor editor={ClassicEditor} onchange={(e,editor)=>{handleChange(e,editor)}} /></div>
        <div>
          {data}
        </div>
      </div>
    </div>
    </>
  );
};

export default PrivacyPolicy;
