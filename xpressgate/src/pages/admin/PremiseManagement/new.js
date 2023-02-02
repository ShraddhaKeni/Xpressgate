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

const AddPremise = () => {

    const [premise, setPremise] = useState({
        name: '',
        type: '',
        noofblocks: parseInt(0),
        address: '',
        landmark: '',
        state: '',
        city: '',
        pincode: '',
        status: true
    })
    const [toast, setToast] = useState({ show: false })

    const [states, setState] = useState([])
    const [area, setArea] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getDetails()
    }, [])

    const getDetails = async () => {
        try {
            const { data } = await axios.get(`${window.env_var}api/state/get`)
            let array = data.data.map(item => {
                return {
                    id: item._id,
                    option: item.name,
                    country_id: item.country_id
                }
            })
            setState(array)
        } catch (error) {
            console.log(error)
            alert('Data loading Failed')
        }
    }

    const getArea = async (value) => {
        try {
            console.log(states.find(item => item.id == value));
            const id = states.find(item => item.id == value).id
            const { data } = await axios.get(`${window.env_var}api/area/get/${id}`)
            let array = data.data.map(item => {
                console.log(item);
                return {
                    id: item._id,
                    option: item.area_name,
                    state_id: item.state_id,
                    pincode: item.pincode
                }
            })
            setArea(array)
        } catch (error) {
            console.log(error)
            alert('Data loading Failed')
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {

            if (premise.name != '' && premise.address != '' && premise.noofblocks != 0 && premise.state != '' && premise.landmark != '' && premise.address != '' && premise.city != '') {
                const { data } = await axios.post(`${window.env_var}api/community/add`, premise)
                if (data.status_code == 200) {
                    setToast(TOAST.SUCCESS(data?.message));
                    goBackInOneSec(navigate)
                } else {
                    setToast(TOAST.ERROR(data?.message));
                }
            }
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
                    <label>Add New Premises</label>
                </div>
                <div>

                    <Form className='formclass fcadmin'>

                        <SimpleInputComponent label={'Premises Name'} placeholder={'Enter Premise Name'} name={'premises_name'} id={'premises'} onChange={(e) => { setPremise({ ...premise, name: e.target.value }) }} />
                        <SimpleInputComponent label={'Number of Blocks'} placeholder={'Enter Number of Blocks'} type={'number'} name={'number_block'} id={'block'} onChange={(e) => { setPremise({ ...premise, noofblocks: parseInt(e.target.value) }) }} />
                        <SimpleInputComponent label={'Address'} name={'address_line'} placeholder={'Enter Address'} id={'address'} onChange={(e) => { setPremise({ ...premise, address: e.target.value }) }} />
                        <SimpleInputComponent label={'Landmark'} name={'landmark_name'} placeholder={'Enter Landmark'} id={'landmark'} onChange={(e) => { setPremise({ ...premise, landmark: e.target.value }) }} />
                        <SimpleDropDownComponent items={states} label={'State'} name={'state_name'} id={'state'} onChange={(e) => { setPremise({ ...premise, state: e.target.value }); getArea(e.target.value) }} />
                        <SimpleDropDownComponent items={area} label={'City'} name={'city_name'} id={'city'} onChange={(e) => { setPremise({ ...premise, city: e.target.value }) }} />
                        <SimpleInputComponent label={'Pincode'} name={'pincode'} id={'pincode'} placeholder={'Enter Pincode'} onChange={(e) => { setPremise({ ...premise, pincode: e.target.value }) }} />
                        <button type="submit" onClick={(e) => handleSubmit(e)} className="BTN_ADD_premise ">Add Premise</button>

                    </Form>

                </div>
            </div>
        </>
    )
}

export default AddPremise

