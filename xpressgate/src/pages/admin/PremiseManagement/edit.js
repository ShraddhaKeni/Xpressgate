import React, { useEffect, useRef, useState } from 'react';
import '../../../styles/addPremise.css';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { SimpleDropDownComponent, SimpleInputComponent } from '../components/input';
import { getDefaultNormalizer } from '@testing-library/react';
import { StraightenSharp } from '@mui/icons-material';
import { ToastMessage } from '../../../components/ToastMessage';
import { goBackInOneSec, waitOneSec } from '../../../common/utils';

const EditPremise = () => {

    const location = useLocation()
    const [premise, setPremise] = useState({
        community_id: '',
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
    const [re_render, setRender] = useState(false)
    const navigate = useNavigate()

    const city = useRef()

    useEffect(() => {

        getDetails().then(async () => {
            const id = await getCommunity()
            await getArea(id)
            await getCommunity()
        })



    }, [])

    const getCommunity = async () => {
        try {
            const { data } = await axios.get(`${window.env_var}api/community/getone/${location.state.id}`)
            setPremise({
                ...premise,
                community_id: location.state.id,
                name: data.data.community[0].name,
                type: '',
                noofblocks: data.data.community[0].noofblocks,
                address: data.data.community[0].address,
                landmark: data.data.community[0].landmark,
                state: data.data.community[0].state,
                city: data.data.community[0].city,
                pincode: data.data.community[0].pincode,
                status: true
            })
            document.getElementById('premises').defaultValue = data.data.community[0].name
            document.getElementById('block').defaultValue = data.data.community[0].noofblocks
            document.getElementById('address').defaultValue = data.data.community[0].address
            document.getElementById('landmark').defaultValue = data.data.community[0].landmark
            document.getElementById('state').value = data.data.community[0].state

            // await getArea(data.data.community[0].state)
            document.getElementById('city').value = data.data.community[0].city

            document.getElementById('pincode').defaultValue = data.data.community[0].pincode
            return data.data.community[0].state
        } catch (error) {
            console.log(error)
        }
    }


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
            setToast({ show: true, type: "error", message: "Data loading Failed" });
        }
    }

    const getArea = async (id) => {
        try {
            const { data } = await axios.get(`${window.env_var}api/area/get/${id}`)
            let array = data.data.map(item => {
                return {
                    id: item._id,
                    option: item.area_name,
                    state_id: item.state_id,
                    pincode: item.pincode
                }
            })

            await setArea(array)
        } catch (error) {
            setToast({ show: true, type: "error", message: "Data loading Failed" });

        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (premise.name != '' && premise.address != '' && premise.noofblocks != 0 && premise.state != '' && premise.landmark != '' && premise.address != '' && premise.city != '') {
                const { data } = await axios.post(`${window.env_var}api/community/update`, premise)
                if (data.status_code == 200) {
                    setToast({ show: true, type: "success", message: "Updated Successfully!" });
                    goBackInOneSec(navigate)
                } else {
                    setToast({ show: true, type: "error", message: data.message });
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

            <img src='/images/side_bar_img.svg' className='AddPremise_side_Img' />
            {location.state ? <div>
                <div className='page-label'>
                    <label>{premise.name || "Premise"}</label>
                </div>
                <div>

                    <Form className='formclass fcadmin'>

                        <SimpleInputComponent label={'Premises Name'} name={'premises_name'} id={'premises'} text={premise.name} onChange={(e) => { setPremise({ ...premise, name: e.target.value }) }} />
                        <SimpleInputComponent label={'Number of Blocks'} name={'number_block'} type={'number'} text={premise.noofblocks} id={'block'} onChange={(e) => { setPremise({ ...premise, noofblocks: parseInt(e.target.value) }) }} />
                        <SimpleInputComponent label={'Address'} name={'address_line'} id={'address'} text={premise.address} onChange={(e) => { setPremise({ ...premise, address: e.target.value }) }} />
                        <SimpleInputComponent label={'Landmark'} name={'landmark_name'} id={'landmark'} text={premise.landmark} onChange={(e) => { setPremise({ ...premise, landmark: e.target.value }) }} />
                        <SimpleDropDownComponent items={states} label={'State'} name={'state_id'} id={'state'} selected={premise.state_id} onChange={(e) => { setPremise({ ...premise, state: e.target.value }); getArea(e.target.value) }} />
                        <SimpleDropDownComponent items={area} label={'City'} name={'city_id'} id={'city'} selected={premise.city_id} onChange={(e) => { setPremise({ ...premise, city: e.target.value }) }} />
                        <SimpleInputComponent label={'Pincode'} name={'pincode'} type={'number'} id={'pincode'} text={premise.pincode} onChange={(e) => { setPremise({ ...premise, pincode: e.target.value }) }} />

                        <button type="submit" onClick={(e) => handleSubmit(e)} className=" BUTN_ADD_premise" >Update Premise</button>
                    </Form>

                </div>
            </div> : window.history.back(-1)}

        </>
    )
}

export default EditPremise

