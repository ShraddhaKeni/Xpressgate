import "../../../styles/PrivacyPolicy.css";
import React, { Component, useState, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import axios from "axios";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

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
      <div>
        <div className="page-label" >
          <label>Privacy Policy</label>
        </div>

        <div className="Policycontainer" >
          <div className="policiestextbox">
            <div className="editor">
              <CKEditor editor={ClassicEditor} data={policydata.rn} onchange={(e, editor) => { handleChange(e, editor) }} />
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default PrivacyPolicy;
