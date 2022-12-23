import React from "react";
import "../../../styles/Terms.css";
import { Component, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
const Terms = () => {
  const [data, setdata] = useState('');
  const handleChange = (e, editor) => {
    setdata(editor.getData());
  }
  return (
    <>

<img src='/images/side_bar_img.svg' className='DashBoard_side_Img' />
      <div className="container">
        <div className="page-label" >
          <label>Terms and Conditions</label>
        </div>

        <div className="Policycontainer" >

          <div className="policiestextbox">
            <div className="editor">
              <div className="editor"> <CKEditor editor={ClassicEditor} onchange={(e, editor) => { handleChange(e, editor) }} /></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Terms;
