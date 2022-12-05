import React, { useEffect, useRef, useState } from "react";
import "./Addemergencyno.css";
import LogOut from './Utils/LogOut'
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import axios from "axios";

const Addemergencyno = () => {

  const [contactTypes, setTypes] = useState([])
  const name = useRef([])
  const type = useRef([])
  const contact = useRef([])

  useEffect(()=>{
    getTypes()
  },[])

  const getTypes=async()=>{
    try {
      const {data} = await axios.get(`${window.env_var}api/admin/emergencycontactstype/getAlltype`)
      setTypes(data.data.emergencycontacttypes)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit= async(e)=>{
    e.preventDefault()
    try {
      if(name.current.value!==""&&type.current.value!==""&&contact.current.value!=="")
      {
        document.getElementById('contact_name').style.border='none'
        document.getElementById('contact_number').style.border='none'
        const sendData = {
          contactName:name.current.value,
          contactType:type.current.value,
          contactNumber:contact.current.value
        }
        const {data} = await axios.post(`${window.env_var}api/emergencycontacts/addContact`,sendData)
        window.location.href='/emergencyList'
      }
      else
      {
        if(name.current.value=="")
        {
          document.getElementById('contact_number').style.border='none'
          document.getElementById('contact_name').style.border='1px solid red'
        }
        else if(contact.current.value=="")
        {
          document.getElementById('contact_name').style.border='none'
          document.getElementById('contact_number').style.border='1px solid red'
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="addguestcontainer4">
    <div id="addflatsection">
        <div className="addflatheadersection">
          <div id="aflogo"><img src="/images/loginlogo.svg" alt="header logo" /></div>
          <div id="afsociety"><label>Society</label></div>
          <div id="afspace"></div>
          <div id="afnotification"><a href="abc"><img src="/images/notification.svg" alt="notificationicon" /></a></div>
          <div id="afsetting"><a href="abc"><img src="/images/setting.svg" alt="settingicon" /></a></div>
          <div id="aflogoutbutton"><LogOut/></div>
        </div>
    
    </div>
      <div id="societynamesection">
        <div className="societyname">
          <img src="/images/profileicon.svg" alt="Society image" />
          <label>Society Name</label>
        </div>
        
        <div className="sideimage4">
          <img src="/images/communitysideimg.svg" alt="dashboard sideimage" />
        </div>
      </div>
      <div className="addguestbackgroundimg">
        <div className="Addguestdisplay5">
          <label>Add Emergency Number</label>
        </div>
        <Form className='formclass'>
         
            <div class="form-group form-group5 row">
              <label class="col-lg-2 col-form-label  labelsize2">Name</label>
              <div class="col-lg-4">
                <input type="text" class="form-control input-lg input-lg1" id="contact_name" ref={name} name="Name" placeholder="Name"></input>
              </div>
            </div>
            <div class="form-group form-group5 row">
              <label class="col-lg-2 col-form-label  labelsize2">Phone Number</label>
              <div class="col-lg-4">
                <input type="number" class="form-control input-lg input-lg1" id="contact_number" ref={contact} name="Phone Number" placeholder="Contact"></input>
              </div>
            </div>
            <div class="form-group  form-group5 row">
              <label class="col-lg-2 col-form-label  labelsize2">Type</label>
              <div class="col-lg-4">
                <select  class="form-control input-lg input-lg1" ref={type} name="Type">
                    <option value={null} selected disabled>Select Type</option>
                    {contactTypes.map((items)=> {
                      return <option value={items.id}>{items.emgContactType}</option>
                    })}
                </select>
              </div>
            </div>
            
            <Button type="submit" onClick={(e)=>handleSubmit(e)} className="btnAdd4">Add Number</Button>
            </Form>
       
       
      </div>
    </div>
  );
};

export default Addemergencyno;
