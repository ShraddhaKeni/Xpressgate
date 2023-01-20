import React, { useEffect, useRef, useState } from 'react';
import './Addeditamenity.css';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import LogOut from './Utils/LogOut';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { checkSociety } from '../auth/Auth'
import { Loader } from '../Loader';
import ErrorScreen from '../../common/ErrorScreen'

const Addeditamenity = () => {

  //to store data
  const [amenity, setAmenity] = useState({})
  const [type, setType] = useState('add')
  //to use data from previous page
  const location = useLocation()

  //to get datta from input tags
  const amenityType = useRef([])
  const image = useRef()
  const rule = useRef([])
  const rent = useRef([])
  const status = useRef([])
  const [loading, setLoading] = useState(true)
  const [isError,setError] = useState(false)

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
            getDetails(location.state.id)
            setType(location.state.type)
          }
          else {
            //window.location.href='/addeditamenity'

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

  const getDetails = async (id) => {
    try {
      const { data } = await axios.get(`${window.env_var}api/society/amenities/getEach/${id}`)
      setAmenity(data.data.amenity[0])
      setError(false)
    } catch (error) {
      setError(true)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if (type == 'edit') {
        let formData = new FormData()
        formData.append('amenityType', amenityType.current.value)
        formData.append('id', location.state.id)
        formData.append('rule', rule.current.value)
        formData.append('rent', rent.current.value)
        formData.append('status', status.current.value)

        if (document.getElementById('amenity_image').value) {
          formData.append('image', document.getElementById('amenity_image').files[0])
        }
        const { data } = await axios.post(`${window.env_var}api/society/amenities/updateAmenities`, formData)
        window.location.href = '/amenities'
      }
      else {
        let formData = new FormData()
        formData.append('amenityType', amenityType.current.value)
        formData.append('image', document.getElementById('amenity_image').files[0])
        formData.append('rule', rule.current.value)
        formData.append('rent', rent.current.value)
        formData.append('status', status.current.value)
        const { data } = await axios.post(`${window.env_var}api/society/amenities/addAmenities`, formData)
        window.location.href = '/amenities'
      }

    } catch (error) {
      console.log(error)
    }
  }

  if(isError)
    return <ErrorScreen/>


  return (
    <div className="aeacontainer">
      <div id="aeasection">
        <div className="aeaheadersection">
          <div id="aealogo"><img src="/images/loginlogo.svg" alt="header logo" /></div>
          <div id="aeasociety"><label>Society</label></div>
          <div id="aeaspace"></div>
          <div id="aeanotification"><a href="abc"><img src="/images/notification.svg" alt="notificationicon" /></a></div>
          <div id="aeasetting"><a href="/changesocpassword"><img src="/images/setting.svg" alt="settingicon" /></a></div>
          <div id="aealogoutbutton"><LogOut /></div>
        </div>
      </div>
      <div id="aeasocietysection">
        <div className='aeasocietyname'>
          <img src="/images/societyicon.svg" alt="society name" />
          <label>Society Name</label>
        </div>
        <div className='aeasideimage'><img src="/images/societysideimg.svg" alt="society sideimage" /></div>
      </div>
      <div className='aeabackgroundimg'>
        <Loader loading={loading}>
          <div className='aeadisplay'>
            <label>{type == 'edit' ? 'Edit Amenity' : 'New Amenity'}</label>
          </div>
          <Form className='aeaclass'>
            <div class="form-group row">
              <label for="inputentryno" class="col-sm-2 col-md-2 col-lg-2 col-form-label ADN_label">Name</label>
              <div class="col-sm-4 col-md-4 col-lg-4">
                {type == 'edit' ? <input type="text" class="form-control input-lg sideBord" ref={amenityType} defaultValue={amenity.amenityType} name="community" placeholder="Name" /> :
                  <input type="text" class="form-control input-lg sideBord" ref={amenityType} name="community" placeholder="Name" />}
              </div>
            </div>
            <div class="form-group row">
              <label class="col-lg-2 col-form-label ADN_label">Rule for Booking</label>
              <div class="col-lg-4">
                {type == 'edit' ? <textarea type="text" class="form-control input-lg sideBord" ref={rule} defaultValue={amenity.rule} name="inputnoofpeople" placeholder="Rule for Booking" />
                  : <textarea type="text" class="form-control input-lg sideBord" ref={rule} name="inputnoofpeople" placeholder="Rule for Booking" />}

              </div>
            </div>
            <div class="form-group row">
              <label class="col-lg-2 col-form-label ADN_label">Status</label>
              <div class="col-lg-4">
                <select class="form-control input-lg sideBord" ref={status} name="flatNo" placeholder="Status" value>
                  {type == 'edit' ? (amenity.status == false ? <> <option value={true} >Active</option>
                    <option value={false} selected>Inactive</option></> : <> <option value={true} selected>Active</option>
                    <option value={false} >Inactive</option></>) : <> <option value={true} >Active</option>
                    <option value={false} >Inactive</option></>}

                </select>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-lg-2 col-form-label ADN_label">Rent</label>
              <div class="col-lg-4">
                {type == 'edit' ? <input type="number" class="form-control input-lg sideBord" defaultValue={amenity.rent} ref={rent} name="inputnoofpeople" placeholder="Rent"></input> :
                  <input type="number" class="form-control input-lg sideBord" ref={rent} name="inputnoofpeople" placeholder="Rent"></input>}

              </div>
            </div>
            <div class="form-group row">
              <label class="col-lg-2 col-form-label ADN_label">Image</label>
              <div class="col-lg-4">
                <input type="file" accept='.jpg ,.jpeg ,.png' class="form-control input-lg sideBord" id='amenity_image' ref={image} name="inputnoofpeople"></input>
              </div>
            </div>
            <button type="submit" onClick={(e) => { handleSubmit(e) }} className="btnAddAmenity">{type == 'edit' ? 'Edit' : 'Add'}  Amenity</button>
          </Form>
        </Loader>
      </div>
    </div>
  )
}

export default Addeditamenity

