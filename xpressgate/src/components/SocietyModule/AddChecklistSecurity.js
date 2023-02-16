import React, { useEffect, useState } from "react";
import "./Addguard.css";
import LogOut from './Utils/LogOut'
import { Form } from 'react-bootstrap';
import axios from "axios";
import { useLocation } from "react-router-dom";
import { checkSociety } from '../auth/Auth'
import { useNavigate } from 'react-router-dom';
import { Loader } from "../Loader";
import ErrorScreen from "../../common/ErrorScreen";
import { goBackInOneSec, reloadInOneSec, TOAST } from "../../common/utils";

const AddChecklistSecurity = () => {
    const [loading, setLoading] = useState(true)
    const [guard, setGuard] = useState({})
    const location = useLocation()
    const [type, setType] = useState('add')
    const navigate = useNavigate()
    const [isError, setError] = useState(false)
    const [toast, setToast] = useState({ show: false })

    const [checklist] = useState(location?.state?.data || undefined);



    const handleSubmit = async (e) => {
        e.preventDefault()

        try {

            if (type == 'edit') {
                let formdata = new FormData()
                formdata.append('community_id', localStorage.getItem('community_id'))
                formdata.append('item', document.getElementById('item').value)
                formdata.append('frequency', document.getElementById('frequency').value)
                formdata.append('id', checklist.id)



                const { data } = await axios.post(`${window.env_var}api/checklist/add`, formdata)

                if (data && data?.status_code == 200) {
                    setToast(TOAST.SUCCESS(data?.message));
                    goBackInOneSec()
                } else if (data?.status_code == 201) {
                    setToast(TOAST.ERROR(data?.message));
                }
            }
            else {

                let formdata = new FormData()
                formdata.append('community_id', localStorage.getItem('community_id'))
                formdata.append('item', document.getElementById('item').value)
                formdata.append('frequency', document.getElementById('frequency').value)

                const { data } = await axios.post(`${window.env_var}api/checklist/add`, formdata)

                if (data && data?.status_code == 200) {
                    setToast(TOAST.SUCCESS(data?.message));
                    reloadInOneSec()
                } else if (data?.status_code == 201) {
                    setToast(TOAST.ERROR(data?.message));
                }

            }
        } catch (error) {
            console.log(error)
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
            const { data } = await axios.get(`${window.env_var}api/checklist/getone/${location.state.id}`)
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

                    <p className='noticegll float-left' onClick={() => navigate('/security-checklist-report')}><b>Reports</b></p>
                    <p className='aggnotice float-left' onClick={() => navigate('/add-security-checklist')}><b>Add Checklist</b></p>
                    <p className='noticegll float-left' onClick={() => navigate('/security-checklist')}><b>Checklists</b></p>

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
                    <Form className='formclass' onSubmit={(e) => handleSubmit(e)}>

                        <div class="form-group form-group6 row">
                            <label class="col-lg-2 col-form-label ADN_label">Action</label>
                            <div class="col-lg-4">
                                {type == 'edit' ? <input type="text" class="form-control input-lg SideB" name="item" id="username" defaultValue={guard.item} placeholder="Enter Action Name" required />
                                    : <input type="text" class="form-control input-lg input-lg1 SideB" name="item" id="username" placeholder="Enter Action Name" required />}

                            </div>
                        </div>

                        <div class="form-group form-group6 row">
                            <label class="col-lg-2 col-form-label ADN_label">Frequency</label>
                            <div class="col-lg-4">
                                {type == 'edit' ? <input type="number" class="form-control input-lg SideB" name="frequency" id="username" defaultValue={guard.frequency} placeholder="Enter Frequency" required />
                                    : <input type="number" class="form-control input-lg input-lg1 SideB" name="frequency" id="username" placeholder="Enter Frequency" required />}

                            </div>
                        </div>

                        <div class="form-group form-group6 row">
                            <label class="col-lg-2 col-form-label ADN_label">Other Details</label>
                            <div class="col-lg-4">
                                {type == 'edit' ? <textarea type="text" class="form-control input-lg SideB" name="other_details" id="username" defaultValue={guard.other_details} placeholder="Enter More Details" required />
                                    : <textarea type="text" class="form-control input-lg input-lg1 SideB" name="other_details" id="username" placeholder="Enter More Details" required />}

                            </div>
                        </div>

                        <button type="submit" className="btnAddV">{type == 'edit' ? 'Update' : 'Add'}</button>
                    </Form>
                </Loader>
            </div>
        </div >



    );
};

export default AddChecklistSecurity;
