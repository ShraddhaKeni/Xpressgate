import React from "react";
import "../../../styles/Terms.css";
import { Component, useState, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import SideLayOut from "../../../components/base/Layout/SideLayOut";
import Header from "../../../components/base/Layout/Header";
import axios from "axios";
const Terms = () => {

  const [policydata, setdata] = useState({});
  const [editedData, setEditedData] = useState("");

  const handleChange = (e, editor) => {
    let edited_data = editor.getData();
    console.log(e, 'In handleChange', edited_data);
    setEditedData(edited_data);
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
  const updatePrivacyPolicy = async (e) => {
    e.preventDefault();
    if (editedData) {
      try {
        const { data } = await axios.post(`${window.env_var}api/legal/update`, { id: policydata.id, type: 'term', content: editedData, status: 1 });
        //setdata(data.data[0]);
        //console.log(data.data[0]);
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Add Some text First!")
    }

  }

  return (
    <>

      <div className="policy_page-label" >
        <label>Terms & Conditions</label>
      </div>
      <div className='Policycontainer'>

        <img src='/images/side_bar_img.svg' className='Ppolicy_side_Img' />

        <div className="policiestextbox">
          <div className='table-top-right-content'>
            <button type="submit" onClick={updatePrivacyPolicy} className="BTN_ADD_premise" >Update</button>
          </div>
          <div className="editor">
            <br />
            <CKEditor editor={ClassicEditor} data={policydata.rn} onChange={(e, editor) => { handleChange(e, editor) }} />
          </div>
        </div>
      </div>

    </>
  );
};

export default Terms;
