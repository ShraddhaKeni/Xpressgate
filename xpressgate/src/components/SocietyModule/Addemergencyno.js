import React, { useEffect, useRef, useState } from "react";
import "./Addemergencyno.css";
import LogOut from './Utils/LogOut'
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import axios from "axios";
import { checkSociety } from '../auth/Auth'
import SocietyHeader from './Utils/Societyheader'
import { mobileValidation } from "../auth/validation";
import { useLocation } from "react-router-dom";

const Addemergencyno = () => {

  const [contactTypes, setTypes] = useState([])
  const name = useRef([])
  const type = useRef([])
  const contact = useRef([])
  const [addedittype, setType] = useState('add')
  const location = useLocation()
  const [ename, setename] = useState()
  const [etype, setetype] = useState()
  const [econtact, setecontact] = useState()
  const [one, setOne] = useState({})
  

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
            getTypes().then(() => {
              getValues()
            })
            setename(location.state.ename)
            setetype(location.state.etype)
            setecontact(location.state.econtact)
            setType(location.state.addedittype)
          } else { 
            getTypes()
          }

        })
        .catch(err => {
          localStorage.clear();
          window.location.href = '/societylogin'
        })
    }
    else {
      window.location.href = '/'
    }

  }, [])
 
  const getTypes = async () => {
    try {
      const { data } = await axios.get(`${window.env_var}api/admin/emergencycontactstype/getAlltype`)
      //setOne(data.data.emergencycontacttypes.find(x => x.id === location.state.id))
      //console.log(location.state.id)
      setTypes(data.data.emergencycontacttypes)
    } catch (error) {
      console.log(error)
    }
  }

  function getValues() {
    document.getElementById('emergencytype').value = one.id
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      
      if (addedittype == 'add') {
        
        if (name.current.value !== "" && type.current.value !== "" && contact.current.value !== "") {
          if (await mobileValidation(contact.current.value)) {
            document.getElementById('contact_name').style.border = 'none'
            document.getElementById('contact_number').style.border = 'none'

            const sendData = {
              contactName: name.current.value,
              contactType: type.current.value,
              contactNumber: contact.current.value
            }

            const { data } = await axios.post(`${window.env_var}api/emergencycontacts/addContact`, sendData)
            window.location.href = '/emergencyList'
          }
          else {

            document.getElementById('contact_number').style.border = '1px solid red'
          }

        }
        else {
          if (name.current.value == "") {
            document.getElementById('contact_number').style.border = 'none'
            document.getElementById('contact_name').style.border = '1px solid red'
          }
          else if (contact.current.value == "") {
            document.getElementById('contact_name').style.border = 'none'
            document.getElementById('contact_number').style.border = '1px solid red'
          }
        }
      } else {
       
        const sendData = {
          id: location.state.id,
          contactName: document.getElementById('contact_name').value,
          contactNumber: document.getElementById('contact_number').value,
          contactType: document.getElementById('emergencytype').value
        }
        const { data } = await axios.post(`${window.env_var}api/emergencycontacts/update`, sendData)
        //console.log(data)
        window.location.href = '/emergencyList'
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="addguestcontainer4">
      <div id="addflatsection">
        <SocietyHeader />
      </div>
      <div id="societynamesection">
        <div className="AEN_societyname">
          <img src="/images/profileicon.svg" alt="Society image" />
          <label>Society Name</label>
        </div>

        <div className="AEN_sideimage">
          <img src="/images/communitysideimg.svg" alt="dashboard sideimage" />
        </div>
      </div>
      <div className="addguestbackgroundimg">
        <div className="AEN_display">
          <label>Add Emergency Number</label>
        </div>
        <Form className='formclass'>

          <div class="form-group form-group5 row">
            <label class="col-lg-2 col-form-label  labelsize2">Name</label>
            <div class="col-lg-4">
              {ename ? <input type="text" id="contact_name" ref={name} defaultValue={ename} name="Name" className="form-control input-lg input-lg1 AEN_border" placeholder="Name"></input> : <input type="text" class="form-control input-lg input-lg1 AEN_border" id="contact_name" ref={name} name="Name" placeholder="Name"></input>}
            </div>
          </div>
          <div class="form-group form-group5 row">
            <label class="col-lg-2 col-form-label  labelsize2">Phone Number</label>
            <div class="col-lg-4">
              {econtact ? <input type="number" id="contact_number" ref={contact} defaultValue={econtact} name="Phone Number" className="form-control input-lg input-lg1 AEN_border" placeholder="Contact"></input> : <input type="number" class="form-control input-lg input-lg1 AEN_border" id="contact_number" ref={contact} name="Phone Number" placeholder="Contact"></input>}
            </div>
          </div>
          <div class="form-group  form-group5 row">
            <label class="col-lg-2 col-form-label  labelsize2">Type</label>
            <div class="col-lg-4">
              <select class="form-control input-lg input-lg1 AEN_border" ref={type} id="emergencytype" name="Type">
                <option value={null} selected disabled>Select Type</option>
                {contactTypes.map((items) => {
                  return <option value={items.id}>{items.emgContactType}</option>
                })}
              </select>
            </div>
          </div>

          <Button type="submit" onClick={(e) => handleSubmit(e)} className="AEN_btnAdd">Add Number</Button>
        </Form>


      </div>
    </div>
  );
};

export default Addemergencyno;
