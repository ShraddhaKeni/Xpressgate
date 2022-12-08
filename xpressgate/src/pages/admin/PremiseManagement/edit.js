import React, { useEffect, useRef, useState } from 'react';
import '../../../styles/addPremise.css';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { SimpleDropDownComponent, SimpleInputComponent } from '../components/input';
import { getDefaultNormalizer } from '@testing-library/react';
import { StraightenSharp } from '@mui/icons-material';

const EditPremise = () => {

    const location = useLocation()
    const [premise,setPremise] = useState({
        community_id:'',
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
    const [re_render,setRender] = useState(false)
    const navigate = useNavigate()

    const city = useRef()

    useEffect(()=>{
       
                getDetails().then(async()=>{
                    const id = await getCommunity()
                    await getArea(id)
                    await getCommunity()                
                })
            
        
        
    },[])

   const getCommunity=async()=>{
    try {
        const {data} = await axios.get(`${window.env_var}api/community/getone/${location.state.id}`)
        setPremise({...premise,
        community_id:location.state.id,
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
            
            await setArea(array)
        } catch (error) {
            alert('Data loading Failed')
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if(premise.name!=''&&premise.address!=''&&premise.noofblocks!=0&&premise.state!=''&&premise.landmark!=''&&premise.address!=''&&premise.city!='')
            {
                const {data} = await axios.post(`${window.env_var}api/community/update`,premise)
                navigate('/admin/premises')
            }
            else
            {   
                alert('Fields Empty !')
            }
            
        } catch (error) {
            alert('Could not add Community.!')
        }
        
    }


    return (
        
        <>
        {location.state?<div className="addvehiclecontainer">
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

                    <div class="form-group row">
                        <label for="inputentryno" class="col-sm-2 col-md-2 col-lg-2 col-form-label float-left">{'City'}</label>
                        <div class="col-sm-4 col-md-4 col-lg-4">
                            <select ref={city} type="text" class="form-control input-lg" name={'city_name'} id={'city'} onChange={(e) =>{setPremise({...premise,city:e.target.value})}}>
                                <option disabled selected value={null}>Select City</option>
                                {area.map((item) => {
                                    return (
                                        <option value={item._id}>{item.option}</option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                    <SimpleInputComponent label={'Pincode'} name={'pincode'} id={'pincode'} onChange={(e) =>{setPremise({...premise,pincode:e.target.value})}}/>

                    <Button type="submit" onClick={(e) => handleSubmit(e)} className="btnAddVeh">Update Premise</Button>
                </Form>

            </div>
        </div>:window.history.back(-1)}
        
        </>
    )
}

export default EditPremise

