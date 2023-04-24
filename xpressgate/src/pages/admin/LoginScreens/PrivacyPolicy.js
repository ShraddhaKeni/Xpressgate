import "../../../styles/PrivacyPolicy.css";
import React, { Component, useState, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import axios from "axios";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import SideLayOut from "../../../components/base/Layout/SideLayOut";
import Header from "../../../components/base/Layout/Header";
import { Button } from "@mui/material";
import { TOAST } from "../../../common/utils";
import { ToastMessage } from "../../../components/ToastMessage";

const PrivacyPolicy = () => {
  const [policydata, setdata] = useState({});
  const [editedData, setEditedData] = useState("");
  const handleChange = (e, editor) => {
    let edited_data = editor.getData();
    setEditedData(edited_data);
   
  }
  const [toast, setToast] = useState({ show: false })

  useEffect(() => {
    getPrivacyPolicy()
  }, [])

  const getPrivacyPolicy = async () => {
    try {
      const { data } = await axios.post(`${window.env_var}api/legal/getone`, { type: 'privacy' });
      setdata(data.data[0]);
    
    } catch (error) {
      console.log(error);
    }
  }

  const updatePrivacyPolicy = async (e) => {
    e.preventDefault();
    if (editedData) {
      try {
        const { data } = await axios.post(`${window.env_var}api/legal/update`, { id: policydata.id, type: 'privacy', content: editedData, status: 1 });
      
        setToast(TOAST.SUCCESS(data?.message));
       
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Add Some text First!")
    }

  }

  return (
    <>
     
      <div className="policy_page-label " >
        <label>Privacy Policy</label>
      </div>
     

      <div className='Policycontainer'>
        <ToastMessage show={toast.show} message={toast.message} type={toast.type} handleClose={() => { setToast({ show: false }) }} />



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

export default PrivacyPolicy;
