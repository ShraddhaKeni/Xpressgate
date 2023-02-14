import React, { useEffect, useState } from "react";
import "../../../components/SocietyModule/AddSocietyMember.css";
// import LogOut from './Utils/LogOut'
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { Loader } from "../Loader";
// import ErrorScreen from "../../common/ErrorScreen";
// import { TOAST } from "../../common/utils";
// import { ToastMessage } from "../ToastMessage";

const PartnerProfile = () => {
//   const [member, setMember] = useState({})
//   const [file, setProfilePicFile] = useState()
//   const navigate = useNavigate();
//   const [communities, setCommunity] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [isError, setError] = useState(false)
//   useEffect(() => {
//     getCommunities()
//   }, [])
//   const [toast, setToast] = useState({ show: false })

//   const getCommunities = async () => {
//     try {
//       const { data } = await axios.get(`${window.env_var}api/community/get`)
//       setCommunity(data.data.community);
//       setLoading(false);
//       setError(false)
//     } catch (error) {
//       setError(true)
//     }
//   }


//   const handleAddSocietyMember = async (e) => {
//     e.preventDefault();
    // Pass member to add Society member api - POST
    // What to do with the profile pic?

//     try {
//       const formData = new FormData();
//       formData.append('profile_pic', file)
//       for (var key in member) {
//         formData.append(key, member[key]);
//       }
//       const config = {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       }
//       const { data } = await axios.post(`${window.env_var}api/community/addResident`, formData, config);

//       if (data && data?.status_code == 200) {
//         setToast(TOAST.SUCCESS(data?.message));
//         setTimeout(() => {
//           navigate('/admin/dashboard');

//         }, 1000)
//       } else if (data?.status_code == 201) {
//         setToast(TOAST.ERROR(data?.message));
//       }
//     } catch (error) {
//       setToast(TOAST.ERROR(error?.message));
//     }


//   }
//   if (isError)
//     return <ErrorScreen />
  return (

    <>
      {/* <ToastMessage show={toast.show} message={toast.message} type={toast.type} handleClose={() => { setToast({ show: false }) }} /> */}

      <div>
        <div className='page-label'>
          <label>Profile</label>
        </div>
        <div>
          <Form className='fcadmin' >
           
           
            <div class="form-group row">
              <label class="col-lg-3 col-form-label ADN_label">First Name</label>
              <div class="col-lg-7">
                <input required type="text" class="form-control input-lg SideB" id='First_name' name="firstname" placeholder="Enter First Name"
                //   onChange={(e) => { setMember({ ...member, firstname: e.target.value }); console.log(member) }}
                >
                </input>

              </div>
            </div>
            <div class="form-group row">
              <label class="col-lg-3 col-form-label ADN_label">Last Name</label>
              <div class="col-lg-7">
                <input required type="text" class="form-control input-lg SideB" id='last_name' name="lastname" placeholder="Enter Last Name"
                //   onChange={(e) => { setMember({ ...member, lastname: e.target.value }); console.log(member) }}

                >
                </input>

              </div>
            </div>
            <div class="form-group row">
              <label class="col-lg-3 col-form-label ADN_label">Email</label>
              <div class="col-lg-7">
                <input required type="email" class="form-control input-lg SideB" id='email' name="Email" placeholder="Enter Email"
                //   onChange={(e) => { setMember({ ...member, email: e.target.value }); console.log(member) }}

                />
              </div>
            </div>
            <div class="form-group row">
              <label class="col-lg-3 col-form-label ADN_label">Mobile No</label>
              <div class="col-lg-7">
                <input required type="number" class="form-control input-lg SideB" id='mobile_no' name="Mobile No" placeholder="Enter Mobile No"
                //   onChange={(e) => { setMember({ ...member, mobileno: e.target.value }); console.log(member) }}

                />
              </div>
            </div>
            <div class="form-group row">
              <label class="col-lg-3 col-form-label ADN_label">User Name</label>
              <div class="col-lg-7">
                <input required type="text" class="form-control input-lg SideB" id='username' name="username" placeholder="Enter Username"
                //   onChange={(e) => { setMember({ ...member, username: e.target.value }); console.log(member) }}

                />
              </div>
            </div>
            <div class="form-group row">
              <label class="col-lg-3 col-form-label ADN_label">Password</label>
              <div class="col-lg-7">
                <input required type="text" class="form-control input-lg SideB" id='password' name="password" placeholder="Enter Password"
                //   onChange={(e) => { setMember({ ...member, username: e.target.value }); console.log(member) }}

                />
              </div>
            </div>
            <div class="form-group row">
              <label class="col-lg-3 col-form-label ADN_label">Profile picture</label>
              <div class="col-lg-7">
                <input type="file" class="form-control input-lg SideB" id='picture' name="profile_pic"
                //   onChange={(e) => {
                //     let file = e.target.files[0];
                //     setProfilePicFile(file)
                //   }}
                >
                </input>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-lg-3 col-form-label ADN_label">Gender</label>
              <div class="col-lg-7">
                <select required type="text" class="form-control input-lg SideB" id='gender' name="Gender"
                //   onChange={(e) => { setMember({ ...member, gender: e.target.value }); console.log(member) }}
                >
                  <option disabled value={'1'} selected>Male</option>
                  <option value={'2'}>Female</option>

                </select>
              </div>
            </div>
        
            <button type="submit" className="BTN_ADD_premise">
             Save
            </button>
          </Form>
        </div>
      </div>

    </>
  );
};

export default PartnerProfile;
