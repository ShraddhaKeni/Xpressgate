import "../../../styles/PrivacyPolicy.css";
import React, { Component, useState, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import axios from "axios";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import SideLayOut from "../../../components/base/Layout/SideLayOut";
import Header from "../../../components/base/Layout/Header";

const PrivacyPolicy = () => {
  const [policydata, setdata] = useState({});
  const ckdata = '<h1>This is test</h1>'
  const handleChange = (e, editor) => {
    let edited_data = editor.getData();
    console.log(e, 'In handleChange', edited_data);
  }

  useEffect(() => {
    getPrivacyPolicy()
  }, [])

  const getPrivacyPolicy = async () => {
    try {
      const { data } = await axios.post(`${window.env_var}api/legal/getone`, { type: 'term' });
      setdata(data.data[0]);
      console.log(data.data[0]);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
       <div className='flex flex-col'>

<Header />
<div className='flex'>

    <SideLayOut/>

    <div className='flex-1 d-flex' style={{ width: "100%", height: '100%' }}>
        <div className='Policycontainer'>
        <div className="page-label" >
          <label>Privacy Policy</label>
        </div>

        <img src='/images/side_bar_img.svg' className='Ppolicy_side_Img' />
        <div className="policiestextbox">
        <div className="editor">
              <CKEditor editor={ClassicEditor} data={policydata.rn} onchange={(e, editor) => { handleChange(e, editor) }} />
            </div>
            </div>
        </div>

    </div>
</div>
</div>
    </>
  );
};

export default PrivacyPolicy;
