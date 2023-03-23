import React, { useEffect, useRef, useState } from 'react';
import '../../../styles/addPremise.css';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { SimpleDropDownComponent, SimpleInputComponent } from '../components/input';
import { getDefaultNormalizer } from '@testing-library/react';
import { ToastMessage } from '../../../components/ToastMessage';
import { goBackInOneSec, TOAST } from '../../../common/utils';
import { Email } from '@mui/icons-material';
import { id } from 'date-fns/locale';

const EditPartner = () => {


    const location = useLocation()
    const [partner, setPartner] = useState({
        firstname: '',
        lastname: '',
        username: '',
        mobileno: '',
        email: '',
        password: '',
        profile_pic: '',
        status: true,
        added_by: localStorage.getItem('admin_id'),
    })
    const [toast, setToast] = useState({ show: false })


    const [re_render, setRender] = useState(false)
    const navigate = useNavigate()

    // const city = useRef()

    useEffect(() => {

        getCommunity()
    }, [])

    const getCommunity = async () => {
        try {
            console.log(location.state.id)
            const { data } = await axios.get(`${window.env_var}api/partner/${location.state.id}`)
            console.log(data)
            setPartner({
                ...partner,
                community_id: location.state.id,
                firstname: data.data.firstname,
                lastname: data.data.lastname,
                username: data.data.username,
                mobileno: data.data.mobileno,
                email: data.data.email,
                profile_pic: data.data.profile_pic,
                status: true
            })
            // document.getElementById('firstname').defaultValue = data.data.firstname
            //document.getElementById('lastname').defaultValue = data.data.lastname
            //document.getElementById('username').defaultValue = data.data.username
            //document.getElementById('mobileno').defaultValue = data.data.mobileno
            // document.getElementById('email').value = data.data.email

            // await getArea(data.data.community[0].state)
            // document.getElementById('password').value = data.data.password

            // document.getElementById('profile_pic').defaultValue = data.data.profile_pic
            return data.data
        } catch (error) {
            console.log(error)
        }
    }


    // const getDetails = async () => {
    //     try {
    //         const { data } = await axios.get(`${window.env_var}api/state/get`)
    //         let array = data.data.map(item => {
    //             return {
    //                 id: item._id,
    //                 option: item.name,
    //                 country_id: item.country_id
    //             }
    //         })
    //         setState(array)

    //     } catch (error) {
    //         setToast({ show: true, type: "error", message: "Data loading Failed" });
    //     }
    // }

    // const getArea = async (id) => {
    //     try {
    //         const { data } = await axios.get(`${window.env_var}api/area/get/${id}`)
    //         let array = data.data.map(item => {
    //             return {
    //                 id: item._id,
    //                 option: item.area_name,
    //                 state_id: item.state_id,
    //                 pincode: item.pincode
    //             }
    //         })

    //         await setArea(array)
    //     } catch (error) {
    //         setToast({ show: true, type: "error", message: "Data loading Failed" });

    //     }
    // }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {

            if (partner.firstname != '' && partner.lastname != '' && partner.username != '' && partner.mobileno != '' && partner.email != '' && partner.password != '') {
                console.log(location.state.id)
                console.log(partner)
                const { data } = await axios.put(`${window.env_var}api/partner/${location.state.id}`, partner)
                if (data.status_code == 200) {
                    setToast(TOAST.SUCCESS(data?.message));
                    goBackInOneSec(navigate)
                } else {
                    setToast(TOAST.ERROR(data?.message));
                }
            }
            else {
                setToast({ show: true, type: "error", message: "Fields Empty!" });

            }

        } catch (error) {
            setToast({ show: true, type: "error", message: "Could not add Community.!" });

        }

    }

    return (
        <>
            <ToastMessage show={toast.show} message={toast.message} type={toast.type} handleClose={() => { setToast({ show: false }) }} />

            <div>
                <div className='page-label'>
                    <label>Update Partner</label>
                </div>
                <div>

                    <Form className='fcadmin'>
                        <SimpleInputComponent label={'First Name'} placeholder={'Enter First Name'} name={'first_name'} id={'firstname'} text={partner.firstname} onChange={(e) => { setPartner({ ...partner, firstname: e.target.value }) }} />
                        <SimpleInputComponent label={'Last Name'} placeholder={'Enter Last Name'} name={'last_name'} id={'lastname'} text={partner.lastname} onChange={(e) => { setPartner({ ...partner, lastname: e.target.value }) }} />
                        <SimpleInputComponent label={'User Name'} placeholder={'Enter User Name'} name={'user_name'} id={'username'} text={partner.username} onChange={(e) => { setPartner({ ...partner, username: e.target.value }) }} />
                        <SimpleInputComponent label={'Mobile No.'} placeholder={'Enter Mobile Number'} type={'number'} name={'mobile_number'} text={partner.mobileno} id={'mobileno'} onChange={(e) => { setPartner({ ...partner, mobileno: e.target.value }) }} />
                        <SimpleInputComponent label={'Email'} name={'email'} placeholder={'Enter Email'} id={'email'} type={'email'} text={partner.email} onChange={(e) => { setPartner({ ...partner, email: e.target.value }) }} />
                        <SimpleInputComponent label={'Password'} name={'password'} placeholder={'Enter Password'} id={'password'} type={'password'} onChange={(e) => { setPartner({ ...partner, password: e.target.value }) }} />
                        <SimpleInputComponent label={'Profile Picture'} name={'profile_pic'} id={'profile_pic'} type={'file'} onChange={(e) => { setPartner({ ...partner, profile_pic: e.target.value }) }} />
                        <button type="submit" className="BTN_ADD_premise " onClick={(e) => handleSubmit(e)}>Add Partner</button>


                    </Form>

                </div>
            </div>
        </>
    )
}

export default EditPartner


