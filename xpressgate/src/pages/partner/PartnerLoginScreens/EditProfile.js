import React, { useEffect, useState } from "react";
import "../../../components/SocietyModule/AddSocietyMember.css";
// import LogOut from './Utils/LogOut'
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../../../src/common/Loader";
import ErrorScreen from "../../../common/ErrorScreen";
import { TOAST } from "../../../common/utils";
import { ToastMessage } from "../../../components/ToastMessage";
import { id } from "date-fns/locale";
import { useLocation } from "react-router-dom";
const EditProfile = () => {
  const [toast, setToast] = useState({ show: false })
  const [partner, setPartner] = useState({})
  const [loading, setLoading] = useState(true)
  const [menu, setMenuOpen] = useState(false)
  const location = useLocation()
  useEffect(() => {
    getPartnerDetails()
  }, [])

  const getPartnerDetails = async () => {
    try {
      const { data } = await axios.get(`${window.env_var}api/partner/${localStorage.getItem('partner_id')}`)
      setPartner(data.data)
      setLoading(false);
    } catch (error) {

    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
  
    try {

      let formdata = new FormData()
      
      formdata.append('firstname', document.getElementById('firstname').value)
      formdata.append('lastname', document.getElementById('lastname').value)
      formdata.append('username', document.getElementById('username').value)
      formdata.append('mobileno', document.getElementById('phone').value)
      formdata.append('email', document.getElementById('email').value)
      formdata.append('partner_id', localStorage.getItem('partner_id'))

      if (document.getElementById('picture').value) {
        formdata.append('profile_pic', document.getElementById('picture').files[0])
      }
console.log(id)
      const { data } = await axios.put(`${window.env_var}api/partner/${localStorage.getItem('partner_id')}`, formdata)
      console.log(data)
      setToast({ show: true, type: "success", message: "Partner profile updated successfully" })
      setTimeout(() => {
        window.location.href = '/partner/dashboard'
      }, 1500);
   

    } catch (error) {
      setToast({ show: true, type: "error", message: "Check Data." });
    }
  }

  return (

    <>
      <ToastMessage show={toast.show} message={toast.message} type={toast.type} handleClose={() => { setToast({ show: false }) }} />

      <div>
        <div className='page-label'>
          <label>Update Profile</label>
        </div>
        <div>
          <Form className='FCPArtner' >
           
           
              <div class="form-group row" onSubmit={(e) => handleSubmit(e)}>
              <label class="col-lg-3 col-form-label ADN_label">First Name</label>
              <div class="col-lg-5">
                <input required type="text" class="form-control input-lg SideB" id='firstname' name="firstname" placeholder="Enter First Name"
                defaultValue={partner.firstname}
                >
                </input>

              </div>
            </div>
            <div class="form-group row">
              <label class="col-lg-3 col-form-label ADN_label">Last Name</label>
              <div class="col-lg-5">
                <input required type="text" class="form-control input-lg SideB" id='lastname' name="lastname" placeholder="Enter Last Name"
               defaultValue={partner.lastname}

                >
                </input>

              </div>
            </div>
            <div class="form-group row">
              <label class="col-lg-3 col-form-label ADN_label">Email</label>
              <div class="col-lg-5">
                <input required type="email" class="form-control input-lg SideB" id='email' name="email" placeholder="Enter Email"
                 readOnly defaultValue={partner.email} 

                />
              </div>
            </div>
            <div class="form-group row">
              <label class="col-lg-3 col-form-label ADN_label">Mobile No</label>
              <div class="col-lg-5">
                <input required type="number" class="form-control input-lg SideB" id='phone' name="phone" placeholder="Enter Mobile No"
                 readOnly defaultValue={partner.mobileno} 

                />
              </div>
            </div>
            <div class="form-group row">
              <label class="col-lg-3 col-form-label ADN_label">User Name</label>
              <div class="col-lg-5">
                <input required type="text" class="form-control input-lg SideB" id='username' name="username" placeholder="Enter Username"
                defaultValue={partner.username}

                />
              </div>
            </div>
            <div class="form-group row">
              <label class="col-lg-3 col-form-label ADN_label">Profile picture</label>
              <div class="col-lg-5">
                <input type="file" class="form-control input-lg SideB" id='picture' name="profile_pic" required >
                </input>
              </div>
            </div>
            <button type="submit" className="SAVR_BUTN_PROFILE" onClick={(e) => handleSubmit(e)}>
                Update
            </button>
          </Form>
        </div>
      </div>

    </>
  );
};

export default EditProfile;
