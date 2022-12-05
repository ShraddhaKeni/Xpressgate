import React, { useEffect, useRef, useState } from 'react';
import '../../../styles/addPremise.css';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { SimpleDropDownComponent, SimpleInputComponent } from '../components/input';
import { getDefaultNormalizer } from '@testing-library/react';

const EditPremise = () => {

    const location = useLocation()
    const [premise,setPremise] = useState({
        name:'',
        type:'',
        noofblocks:parseInt(0),
        address:'',
        landmark:'',
        state:'',
        city:'',
        pincode:'',
        status:true
    })
    const [states,setState] = useState([])
    const [area,setArea] = useState([])
    const navigate = useNavigate()

    const premise_name = useRef()

    useEffect(()=>{
        if(location.state)
        {
            getCommunity()
            getDetails()
            // getArea()
        }
        else
        {
            window.location.back(-1)
        }
    },[])

   const getCommunity=async()=>{
    try {
        const {data} = await axios.get(`${window.env_var}api/community/getone/${location.state.id}`)
        setPremise({
        name: data.data.community[0].name,
        type:'',
        noofblocks: data.data.community[0].noofblocks,
        address:data.data.community[0].address,
        landmark:data.data.community[0].landmark,
        state:data.data.community[0].state,
        city:data.data.community[0].city,
        pincode:data.data.community[0].pincode,
        status:true
        })
        document.getElementById('premises').value = data.data.community[0].name
        document.getElementById('block').value = data.data.community[0].noofblocks
        document.getElementById('address').value = data.data.community[0].address
        document.getElementById('landmark').value = data.data.community[0].landmark
        const state_select = document.getElementById('state')
        const state_options = Array.from(state_select.options)
        const selected = state_options.find(x=>x.text===data.data.community[0].state)
        selected.selected = true

        document.getElementById('city').value = data.data.community[0].city
        document.getElementById('pincode').value = data.data.community[0].pincode
    
    } catch (error) {
        alert('Data loading Failed !')
    }
   }

    const getDetails = async()=>{
        try {
            const {data} = await axios.get(`${window.env_var}api/state/get`)
            let array = data.data.map(item=>{
                return{
                    _id:item._id,
                    option:item.name,
                    country_id:item.country_id
                }
            })
            setState(array)
            
        } catch (error) {
            alert('Data loading Failed')
        }
    }

    const getArea = async(id)=>{
        try {
            const {data} = await axios.get(`${window.env_var}api/area/get/${id}`)
            let array = data.data.map(item=>{
                return{
                    _id:item._id,
                    option:item.area_name,
                    state_id:item.state_id,
                    pincode:item.pincode
                }
            })
            setArea(array)
        } catch (error) {
            alert('Data loading Failed')
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log()
    }


    return (
        <div className="addvehiclecontainer">
            <div className='avbackgroundimg center-vertical'>
                <div className='Addvehicledisplay'>
                    <label>Premises Name</label>
                </div>
                <Form className='formclass'>

                    <SimpleInputComponent label={'Premises Name'} name={'premises_name'} id={'premises'} onChange={(e) =>{setPremise({...premise,name:e.target.value})}} />
                    <SimpleInputComponent label={'Number of Blocks'} name={'number_block'} id={'block'} onChange={(e) =>{setPremise({...premise,noofblocks:parseInt(e.target.value)})}} />
                    <SimpleInputComponent label={'Address'} name={'address_line'} id={'address'} onChange={(e) =>{setPremise({...premise,address:e.target.value})}}/>
                    <SimpleInputComponent label={'Landmark'} name={'landmark_name'} id={'landmark'} onChange={(e) =>{setPremise({...premise,landmark:e.target.value})}}/>
                    <SimpleDropDownComponent items={states} label={'State'} name={'state_name'} id={'state'}  onChange={(e) =>{setPremise({...premise,state:e.target.value});getArea(e.target.value)}}/>
                    <SimpleDropDownComponent items ={area} label={'City'} name={'city_name'} id={'city'} onChange={(e) =>{setPremise({...premise,city:e.target.value})}}/>
                    <SimpleInputComponent label={'Pincode'} name={'pincode'} id={'pincode'} onChange={(e) =>{setPremise({...premise,pincode:e.target.value})}}/>

                    <Button type="submit" onClick={(e) => handleSubmit(e)} className="btnAddVeh">Update Premise</Button>
                </Form>

            </div>
        </div>
    )
}

export default EditPremise

