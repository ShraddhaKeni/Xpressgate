import React, { useEffect, useRef, useState } from 'react';
import './Addlocalservice.css';

import { Form } from 'react-bootstrap';

import Societyheader from './Utils/Societyheader';
import axios from 'axios';
import { checkSociety } from '../auth/Auth';
import { useLocation } from 'react-router-dom';
import { ToastMessage } from '../ToastMessage';
import { Loader } from "../Loader";


const UtilityPaymentLink = () => {
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState({ show: false })
  const [linkData, setLinkData] = useState();
  const location = useLocation()
  const [dropDownRef, setDropDown] = useState()
  const [linkRef, setLink] = useState()
  const [isError, setError] = useState(false)
  const pagePrefix = location.state ? "Update " : "Add "

  useEffect(() => {
    if (checkSociety()) {
      const config = {
        headers: {
          'x-access-token': localStorage.getItem('accesstoken')
        }
      }
      axios.get(`${window.env_var}api/society/checkLogin`, config)
        .then(({ data }) => {
          if (location.state) {
            getLinkDetails()
          }
          else {
            setLoading(false);
          }
        })
        .catch(err => {
          localStorage.clear();
          window.location.href = '/societylogin'
        })
    }
    else {
      window.location.href = '/'
    }
  }, [])

  const getLinkDetails = async () => {
    try {
      const { data } = await axios.post(`${window.env_var}api/paymentlink/getone`,
        {
          "community_id": localStorage.getItem("community_id"),
          "type": location.state.type
        });

      setLinkData(data.data.links[0]);

      setLink(data.data.links[0].link);
      setDropDown(data.data.links[0].type)

      setLoading(false);
      setError(false)
    } catch (error) {
      setError(true)
      setLoading(false);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (location.state?.id) {
        setToast({ show: true, type: "success", message: "Link updated successfully" })
        const sendData = {
          id: location.state.id,
          community_id: localStorage.getItem("community_id"),
          type: document.getElementById('type').value,
          link: document.getElementById('link').value,
          status: "1",
        }
        console.log(sendData);
        const { data } = await axios.post(`${window.env_var}api/paymentlink/update`, sendData)
        if (data.status_code == 200) {
          setToast({ show: true, type: "success", message: data.message })
          setTimeout(() => {
            window.location.href = '/utilitypaymentlinklist'
          }, 1500);
        } else {
          console.log(data.status_code)
          setToast({ show: true, type: "error", message: `${data.message}` })
        }
      }
      else {
        const sendData = {
          community_id: localStorage.getItem("community_id"),
          type: document.getElementById('type').value,
          link: document.getElementById('link').value,
          status: "1",
        }
        const { data } = await axios.post(`${window.env_var}api/paymentlink/add`, sendData)
        if (data.status_code == 200) {
          setToast({ show: true, type: "success", message: "Link added successfully" })
          setTimeout(() => {
            window.location.href = '/utilitypaymentlinklist'
          }, 1500);
          // window.location.href = '/utilitypaymentlinklist'
        } else {
          console.log(data.status_code)
          setToast({ show: true, type: "error", message: `${data.message}` })
        }
      }
    } catch (error) {
      setToast({ show: true, type: "error", message: "Check Data." });
    }
  }

  return (
    <div className="alscontainer">
      <div id="alssection">
        <Societyheader />
      </div>
      <div id="alssocietysection">
        <div className='alssocietyname'>
          <img src="/images/societyicon.svg" alt="society name" />
          <label>Society Name</label>
        </div>
        <div className='UPL_SideImage'><img src="/images/societysideimg.svg" alt="society sideimage" /></div>
      </div>
      <div className='alsbackgroundimg'>
        <ToastMessage show={toast.show} message={toast.message} type={toast.type} handleClose={() => { setToast({ show: false }) }} />

        <div className='UPL_DisPlay'>
          <label>{pagePrefix} Utility Payment Link</label>
        </div>
        <Loader loading={loading}>
          <Form className='formclass'>
            <div class="form-group row">
              <label class="col-lg-2 col-form-label ADN_label">Utility Type</label>
              <div class="col-lg-4">
                <select class="form-control input-lg inputborder" defaultValue={'Select Utility Type'} value={dropDownRef} id="type" name="type" placeholder="Service" required onChange={(e) => { setDropDown(e.target.value) }}>
                  <option value={null} disabled > Select Utility Type </option>
                  <option value="Electricity"> Electricity </option>
                  <option value="Water"> Water </option>
                  <option value="LPG"> LPG </option>
                  <option value="Landline"> Landline </option>
                </select>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-lg-2 col-form-label ADN_label">Payment Link</label>
              <div class="col-lg-4">
                <input type="text" class="form-control input-lg inputborder" id='link' value={linkRef} onChange={(e) => { setLink(e.target.value) }} name="link" placeholder="Payment Link" required></input>
              </div>
            </div>

            <button type="submit" className="btnAddV" onClick={handleSubmit}>{pagePrefix} Link</button>
          </Form>
        </Loader>
      </div>
    </div>
  )
}
export default UtilityPaymentLink;