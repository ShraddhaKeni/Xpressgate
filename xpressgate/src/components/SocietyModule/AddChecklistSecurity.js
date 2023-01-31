import React, { useEffect, useState } from "react";
import "./Addguard.css";
import LogOut from './Utils/LogOut'
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import axios from "axios";
import { useLocation } from "react-router-dom";
import { checkSociety } from '../auth/Auth'
import { useNavigate } from 'react-router-dom';
import { mobileValidation, emailValidation } from '../auth/validation';
import { Loader } from "../Loader";
import ErrorScreen from "../../common/ErrorScreen";

const AddChecklistSecurity = () => {
    const [loading, setLoading] = useState(true)
    const [guard, setGuard] = useState({})
    const location = useLocation()
    const [type, setType] = useState('add')
    const navigate = useNavigate()
    const [isError, setError] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {

            if (type == 'edit') {
                if (await mobileValidation(document.getElementById('phone').value) && emailValidation(document.getElementById('email').value)) {
                    let formdata = new FormData()
                    formdata.append('community_id', localStorage.getItem('community_id'))
                    formdata.append('firstname', document.getElementById('firstname').value)
                    formdata.append('lastname', document.getElementById('lastname').value)
                    formdata.append('username', document.getElementById('username').value)
                    formdata.append('mobileno', document.getElementById('phone').value)
                    formdata.append('email', document.getElementById('email').value)
                    formdata.append('guard_id', location.state.id)
                    if (document.getElementById('profilePic').value) {
                        formdata.append('profile_pic', document.getElementById('profilePic').files[0])
                    }

                    const { data } = await axios.post(`${window.env_var}api/guard/update`, formdata)

                    window.location.href = '/guardList'
                } else {
                    alert('Enter valid mobile number/ Email Id')
                }
            }
            else {

                if (await mobileValidation(document.getElementById('phone').value) && emailValidation(document.getElementById('email').value)) {
                    let formdata = new FormData()
                    formdata.append('community_id', localStorage.getItem('community_id'))
                    formdata.append('firstname', document.getElementById('firstname').value)
                    formdata.append('lastname', document.getElementById('lastname').value)
                    formdata.append('username', document.getElementById('username').value)
                    formdata.append('password', document.getElementById('password').value)
                    formdata.append('mobileno', document.getElementById('phone').value)
                    formdata.append('email', document.getElementById('email').value)
                    formdata.append('profile_pic', document.getElementById('profilePic').files[0])
                    const { data } = await axios.post(`${window.env_var}api/guard/add`, formdata)
                    console.log('hi')
                    window.location.href = '/guardList'
                } else {
                    alert('Enter valid mobile number/Email id')
                }
            }
        } catch (error) {

        }
    }

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
                        getGuardDetails()
                        setType(location.state.type)
                    }
                    else {
                        // window.history.back(-1)
                    }
                })
                .catch(err => {
                    localStorage.clear();
                    window.location.href = '/societylogin'
                })
            setLoading(false);
        }
        else {
            window.location.href = '/'
        }



    }, [])

    const getGuardDetails = async () => {
        try {
            const { data } = await axios.get(`${window.env_var}api/guard/getone/${location.state.id}`)
            setGuard(data.data)
            setError(false)
        } catch (error) {
            setError(true)
        }
    }

    if (isError)
        return <ErrorScreen />

    return (
        <div className="addguestcontainer4">
            <div id="addflatsection">
                <div className="addflatheadersection">
                    <div id="aflogo"><img src="/images/loginlogo.svg" alt="header logo" /></div>
                    <div id="afsociety"><label>Society</label></div>
                    <div id="afspace"></div>
                    <div id="afnotification"><a href="abc"><img src="/images/notification.svg" alt="notificationicon" /></a></div>
                    <div id="afsetting"><a href="/changesocpassword"><img src="/images/setting.svg" alt="settingicon" /></a></div>
                    <div id="aflogoutbutton"><LogOut /></div>
                </div>

            </div>
            <div id="societynamesection">
                <div className="AGSname">
                    <img src="/images/societyicon.svg" alt="Society image" />
                    <label>Society Name</label>
                </div>

                <div className='GLsidelinks pl-5'>
                    <p className='noticegll float-left' onClick={() => navigate('/security-checklist')}><b>Reports</b></p>
                    <a className='aggnotice float-left' onClick={() => navigate('/add-security-checklist')}><b>Add Checklist</b></a>
                </div>
                <div className="AGSideimg">
                    <img src="/images/communitysideimg.svg" alt="dashboard sideimage" />
                </div>
            </div>
            <div className="addguestbackgroundimg">
                <Loader loading={loading}>
                    <div className='AG_display'>
                        <label>{type == 'edit' ? 'Update Checklist' : 'Add Checklist'}</label>
                    </div>
                    <Form className='formclass'>
                        <div class="form-group form-group6 row">
                            <label class="col-lg-2 col-form-label ADN_label">Name</label>
                            <div class="col-lg-4">
                                {type == 'edit' ? <input type="text" class="form-control input-lg SideB" name="First name" id='firstname' placeholder="First Name" defaultValue={guard.firstname} /> :
                                    <input type="text" class="form-control input-lg input-lg1 SideB" name="First name" id='firstname' placeholder="Enter Checklist Name" />}
                            </div>
                        </div>

                        <div class="form-group form-group6 row">
                            <label class="col-lg-2 col-form-label ADN_label">Action</label>
                            <div class="col-lg-4">
                                {type == 'edit' ? <input type="text" class="form-control input-lg SideB" name="Last name" id="username" defaultValue={guard.username} placeholder="Username" />
                                    : <input type="text" class="form-control input-lg input-lg1 SideB" name="Last name" id="username" placeholder="Action" />}

                            </div>
                        </div>


                        <button type="submit" onClick={(e) => handleSubmit(e)} className="AGBtn">{type == 'edit' ? 'Update Guard' : 'Add Guard'}</button>
                    </Form>
                </Loader>
            </div>
        </div>



    );
};

export default AddChecklistSecurity;
