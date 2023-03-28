import React, { useEffect, useRef, useState } from 'react';
import '../../../styles/addPremise.css';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { SimpleDropDownComponent, SimpleInputComponent } from '../components/input';
import { getDefaultNormalizer } from '@testing-library/react';
import { ToastMessage } from '../../../components/ToastMessage';
import { goBackInOneSec, TOAST } from '../../../common/utils';
import { Email } from '@mui/icons-material';
import { mobileValidation, emailValidation } from '../../../components/auth/validation';
const AddPartner = () => {

    const [partner, setPartner] = useState({
        firstname: '',
        lastname: '',
        username: '',
        mobileno: '',
        email: '',
        password: '',
        profile_pic: '',
        status: true,
        added_by: '63735bb77225962320f4c9d7',
    })
    const [toast, setToast] = useState({ show: false })


    const navigate = useNavigate()

    // useEffect(() => {
    //     // getDetails()
    // }, [])

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
    //         console.log(error)
    //         alert('Data loading Failed')
    //     }
    // }

    // const getArea = async (value) => {
    //     try {
    //         console.log(states.find(item => item.id == value));
    //         const id = states.find(item => item.id == value).id
    //         const { data } = await axios.get(`${window.env_var}api/area/get/${id}`)
    //         let array = data.data.map(item => {
    //             console.log(item);
    //             return {
    //                 id: item._id,
    //                 option: item.area_name,
    //                 state_id: item.state_id,
    //                 pincode: item.pincode
    //             }
    //         })
    //         setArea(array)
    //     } catch (error) {
    //         console.log(error)
    //         alert('Data loading Failed')
    //     }
    // }


    const handleSubmit = async (e) => {
        console.log(partner)
        e.preventDefault()
        try {

            if (partner.firstname != '' && partner.lastname != '' && partner.username != '' && partner.mobileno != '' && partner.email != '' && partner.password != '' && partner.profile_pic != '') {
                if (await mobileValidation(document.getElementById('mobileno').value) && emailValidation(document.getElementById('email').value)) {
                const { data } = await axios.post(`${window.env_var}api/partner`, partner)
                if (data.status_code == 200) {
                    setToast(TOAST.SUCCESS(data?.message));
                    goBackInOneSec(navigate)
                } else {
                    setToast(TOAST.ERROR(data?.message));
                }
            }
            else {
                setToast({ show: true, type: "error", message: 'Enter valid mobile number/ Email Id' });
                // alert('Enter valid mobile number/ Email Id')
              }}
            else {
                alert('Fields Empty !')
            }

        } catch (error) {
            alert('Could not add Community.!')
        }

    }



    return (
        <>
            <ToastMessage show={toast.show} message={toast.message} type={toast.type} handleClose={() => { setToast({ show: false }) }} />

            <div>
                <div className='page-label'>
                    <label>Add New Partner</label>
                </div>
                <div>

                    <Form className='fcadmin'>

                        <SimpleInputComponent label={'First Name'} placeholder={'Enter First Name'} name={'first_name'} id={'firstname'}  onChange={(e) => { setPartner({ ...partner, firstname: e.target.value }) }} />
                        <SimpleInputComponent label={'Last Name'} placeholder={'Enter Last Name'} name={'last_name'} id={'lastname'}  onChange={(e) => { setPartner({ ...partner, lastname: e.target.value }) }}  />
                        <SimpleInputComponent label={'User Name'} placeholder={'Enter User Name'} name={'user_name'} id={'username'} onChange={(e) => { setPartner({ ...partner, username: e.target.value }) }}  />
                        <SimpleInputComponent label={'Mobile No.'} placeholder={'Enter Mobile Number'} type={'number'} name={'mobile_number'} id={'mobileno'} maxLength={'10'}  onChange={(e) => { setPartner({ ...partner, mobileno: e.target.value }) }}   />
                        <SimpleInputComponent label={'Email'} name={'email'} placeholder={'Enter Email'} id={'email'} type={'email'} onChange={(e) => { setPartner({ ...partner, email: e.target.value }) }}  />
                        <SimpleInputComponent label={'Password'} name={'password'} placeholder={'Enter Password'} id={'password'} type={'password'} onChange={(e) => { setPartner({ ...partner, password: e.target.value }) }}  />
                        <SimpleInputComponent label={'Profile Picture'} name={'profile_pic'} id={'profile_pic'} type={'file'} onChange={(e) => { setPartner({ ...partner, profile_pic: e.target.files[0] }) }}   />
                        <button type="submit" className="BTN_ADD_premise "  onClick={(e) => handleSubmit(e)}>Add Partner</button>

                    </Form>

                </div>
            </div>
        </>
    )
}

export default AddPartner

