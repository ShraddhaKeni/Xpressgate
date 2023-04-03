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
import { ToastMessage } from "../ToastMessage";
import Societyheader from "./Utils/Societyheader";

const AddChecklistSecurity = () => {
    const [loading, setLoading] = useState(true)
    const [guard, setGuard] = useState({})
    const [staffTypes, setStaffTypes] = useState([]);
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

                let formdata = {
                    'community_id': localStorage.getItem('community_id'),
                    'item': document.getElementById('item').value,
                    'frequency': document.getElementById('frequency').value,
                    'other_details': document.getElementById('other_details').value,
                    'for': document.getElementById('for').value,
                    'id': location.state.id
                }
                const { data } = await axios.post(`${window.env_var}api/checklist/update`, formdata)

                if (data && data?.status_code == 200) {
                    setToast(TOAST.SUCCESS(data?.message));
                    goBackInOneSec(navigate)
                } else if (data?.status_code == 201) {
                    setToast(TOAST.ERROR(data?.message));
                }
            }
            else {


                let formdata = {
                    'community_id': localStorage.getItem('community_id'),
                    'item': document.getElementById('item').value,
                    'frequency': document.getElementById('frequency').value,
                    'other_details': document.getElementById('other_details').value,
                    'for': document.getElementById('for').value
                }

                const { data } = await axios.post(`${window.env_var}api/checklist/add`, formdata)

                if (data && data?.status_code == 200) {
                    setToast(TOAST.SUCCESS(data?.message));
                    goBackInOneSec(navigate)
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

                    getStaffTypes();
                    if (location.state) {
                        getGuardDetails();
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

    const getStaffTypes = async () => {
        try {
            const { data } = await axios.get(`${window.env_var}api/admin/otherstaff/getAll`)
            setStaffTypes(data.data.OtherStaffType)
            setError(false)
            //console.log(data.data.community.filter(x=>x.name))
            //setCommunityid(data.data.community[0].name)
        } catch (error) {
            setError(true)
        }
    }

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
            <ToastMessage show={toast.show} message={toast.message} type={toast.type} handleClose={() => { setToast({ show: false }) }} />

            <div id="addflatsection">
                <Societyheader />

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
                <div className="NCSsideImg">
                    <img src="/images/societysideimg.svg" alt="dashboard sideimage" />
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
                                {type == 'edit' ? <input type="text" class="form-control input-lg SideB" name="item" id="item" defaultValue={guard.item} placeholder="Enter Action Name" required />
                                    : <input type="text" class="form-control input-lg input-lg1 SideB" name="item" id="item" placeholder="Enter Action Name" required />}

                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-lg-2 col-form-label ADN_label">For Staff Type</label>
                            <div class="col-lg-4">
                                <select class="form-control input-lg ADTBorder" id="for" placeholder="Block" required>
                                    <option value={null} disabled selected>Select Staff Type</option>
                                    {staffTypes && staffTypes.map(item => {
                                        console.log(item, guard)
                                        return (
                                            <option value={item.id} selected={item.id === guard.for}>{item.designation}</option>
                                        )
                                    })}
                                </select>
                            </div>
                        </div>




                        <div class="form-group form-group6 row">
                            <label class="col-lg-2 col-form-label ADN_label">Frequency</label>
                            <div class="col-lg-4">
                              
                        {type == 'edit' ? <select class="form-control input-lg inputborder" defaultValue={guard.frequency} id="frequency" name="frequency" placeholder="Enter Frequency">
                                    <option value={null} selected disabled > Select Frequency </option>
                                    <option value="1"> Daily </option>
                                    <option value="2"> Monthly </option>
                                    <option value="3"> Quarterly </option>
                                    <option value="4"> Half-yearly </option>
                                    <option value="5"> Yearly </option>
                            </select>:
                            <select class="form-control input-lg inputborder" id="frequency" name="frequency" placeholder="Enter Frequency" required>
                                    <option value={null} selected disabled > Select Frequency </option>
                                    <option value="1"> Daily </option>
                                    <option value="2"> Monthly </option>
                                    <option value="3"> Quarterly </option>
                                    <option value="4"> Half-yearly </option>
                                    <option value="5"> Yearly </option>
                            </select> }
                            </div>
                        </div>

                        <div class="form-group form-group6 row">
                            <label class="col-lg-2 col-form-label ADN_label">Other Details</label>
                            <div class="col-lg-4">
                                {type == 'edit' ? <textarea type="text" class="form-control input-lg SideB" name="other_details" id="other_details" defaultValue={guard.other_details} placeholder="Enter More Details" required />
                                    : <textarea type="text" class="form-control input-lg input-lg1 SideB" name="other_details" id="other_details" placeholder="Enter More Details" required />}

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
