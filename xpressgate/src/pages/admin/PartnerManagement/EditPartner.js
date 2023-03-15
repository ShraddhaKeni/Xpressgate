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

const EditPartner = () => {

    // const [premise, setPremise] = useState({
    //     name: '',
    //     type: '',
    //     noofblocks: parseInt(0),
    //     address: '',
    //     landmark: '',
    //     state: '',
    //     city: '',
    //     pincode: '',
    //     status: true
    // })
    // const [toast, setToast] = useState({ show: false })

    // const [states, setState] = useState([])
    // const [area, setArea] = useState([])
    // const navigate = useNavigate()

    // useEffect(() => {
    //     getDetails()
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


    // const handleSubmit = async (e) => {
    //     e.preventDefault()
    //     try {

    //         if (premise.name != '' && premise.address != '' && premise.noofblocks != 0 && premise.state != '' && premise.landmark != '' && premise.address != '' && premise.city != '') {
    //             const { data } = await axios.post(`${window.env_var}api/community/add`, premise)
    //             if (data.status_code == 200) {
    //                 setToast(TOAST.SUCCESS(data?.message));
    //                 goBackInOneSec(navigate)
    //             } else {
    //                 setToast(TOAST.ERROR(data?.message));
    //             }
    //         }
    //         else {
    //             alert('Fields Empty !')
    //         }

    //     } catch (error) {
    //         alert('Could not add Community.!')
    //     }

    // }



    return (
        <>
            {/* <ToastMessage show={toast.show} message={toast.message} type={toast.type} handleClose={() => { setToast({ show: false }) }} /> */}

            <div>
                <div className='page-label'>
                    <label>Update Partner</label>
                </div>
                <div>

                    <Form className='fcadmin'>

                        <SimpleInputComponent label={'First Name'} placeholder={'Enter First Name'} name={'first_name'} id={'firstname'} />
                        <SimpleInputComponent label={'Last Name'} placeholder={'Enter Last Name'} name={'last_name'} id={'lastname'} />
                        <SimpleInputComponent label={'User Name'} placeholder={'Enter User Name'} name={'user_name'} id={'username'} />
                        <SimpleInputComponent label={'Mobile No.'} placeholder={'Enter Mobile Number'} type={'number'} name={'mobile_number'} id={'mobileno'} />
                        <SimpleInputComponent label={'Email'} name={'email'} placeholder={'Enter Email'} id={'email'} type={'email'} />
                        <SimpleInputComponent label={'Password'} name={'password'} placeholder={'Enter Password'} id={'password'} type={'password'} />
                        <SimpleInputComponent label={'Profile Picture'} name={'profile_pic'} id={'profile_pic'} type={'file'}  />
                        <button type="submit" className="BTN_ADD_premise ">Update Partner</button>

                    </Form>

                </div>
            </div>
        </>
    )
}

export default EditPartner

