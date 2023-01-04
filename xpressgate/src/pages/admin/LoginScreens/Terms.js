import React from "react";
import "../../../styles/Terms.css";
import { Component, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import SideLayOut from "../../../components/base/Layout/SideLayOut";
import Header from "../../../components/base/Layout/Header";
const Terms = () => {
  const [data, setdata] = useState('');
  const handleChange = (e, editor) => {
    setdata(editor.getData());
  }
  return (
    <>

       <div className="policy_page-label" >
          <label>Terms & Conditions</label>
        </div>
        <div className='Policycontainer'>
        

        <img src='/images/side_bar_img.svg' className='Ppolicy_side_Img' />
        <div className="policiestextbox">
        <div className="editor">
          <br/>
        <CKEditor editor={ClassicEditor} onchange={(e, editor) => { handleChange(e, editor) }} />
            </div>
            </div>
        </div>

    </>
  );
};

export default Terms;
