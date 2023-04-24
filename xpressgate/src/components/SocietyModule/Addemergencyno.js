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
import { Loader } from "../Loader";
import { ToastMessage } from '../ToastMessage';
import ErrorScreen from "../../common/ErrorScreen";

const Addemergencyno = () => {
  const [toast, setToast] = useState({ show: false })
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
  const [update, setUpdate] = useState('add')
  const [loading, setLoading] = useState(true)
  const [isError,setError] = useState(false)

  useEffect(() => {
    getTypes()
    if (checkSociety()) {
      const config = {
        headers: {
          'x-access-token': localStorage.getItem('accesstoken')
        }
      }
      axios.get(`${window.env_var}api/society/checkLogin`, config)
        .then(({ data }) => {
          if (location.state) {
            setename(location.state.ename)
            setetype(location.state.etype)
            setecontact(location.state.econtact)
            setType(location.state.addedittype)
            setUpdate(location.state.update)
            document.getElementById('emergencytype').value = location.state.etype
          } else {
            getTypes()
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

  const getTypes = async () => {
    try {
      const { data } = await axios.get(`${window.env_var}api/admin/emergencycontactstype/getAlltype`)
      setError(false)
      setTypes(data.data.emergencycontacttypes)
    } catch (error) {
      console.log(error);
      setError(true)
    }
  }

  function getValues() {
    document.getElementById('emergencytype').value = location.state.etype
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {

      if (addedittype == 'add') {
        setToast({ show: true, type: "success", message: "Added successfully" })
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
            setTimeout(() => {
              window.location.href = '/emergencyList'
            }, 1500);
          
          }
          else {
            setToast({ show: true, type: "error", message: "Enter valid mobile number" });
            document.getElementById('contact_number').style.border = '1px solid red'
          }

        }
        else {

          if (name.current.value == "") {
            setToast({ show: true, type: "error", message: "Enter Name" });
            document.getElementById('contact_number').style.border = 'none'
            document.getElementById('contact_name').style.border = '1px solid red'
          }
          else if (contact.current.value == "") {
            setToast({ show: true, type: "error", message: "Enter mobile number" });
            document.getElementById('contact_name').style.border = 'none'
            document.getElementById('contact_number').style.border = '1px solid red'
          }
        }
      } else {
        setToast({ show: true, type: "success", message: "Updated successfully" })
        const sendData = {
        
          id: location.state.id,
          contactName: document.getElementById('contact_name').value,
          contactNumber: document.getElementById('contact_number').value,
          contactType: document.getElementById('emergencytype').value
        }
        
        const { data } = await axios.post(`${window.env_var}api/emergencycontacts/update`, sendData)
     
        setTimeout(() => {
          window.location.href = '/emergencyList'
        }, 1500);
      }
    } catch (error) {
      console.log(error)
    }
  }

  if(isError)
    return <ErrorScreen/>



  return (
    <div className="addguestcontainer4">
      <div id="addflatsection">
        <SocietyHeader />
      </div>
      <div id="societynamesection">
        <div className="AEN_societyname">
          <img src="/images/societyicon.svg" alt="Society image" />
          <label>Society Name</label>
        </div>
        <div class="EN_noticelist">
          <a href="/emergencyList" class="AENLNotice">Emergency Number List</a><br /><br />
          <a href="/addemergency" class="AAENNotice"><b>{update == 'update' ? 'Update' : 'Add'} Emergency Number</b></a>
        </div>
        <div className="AEN_sideimage">
          <img src="/images/societysideimg.svg" alt="dashboard sideimage" />
        </div>
      </div>
      <div className="addguestbackgroundimg">
      <ToastMessage show={toast.show} message={toast.message} type={toast.type} handleClose={() => { setToast({ show: false }) }} />
        <Loader loading={loading}>
          <div className="AEN_display">
            <label>{update == 'update' ? 'Update' : 'Add'} Emergency Number</label>
          </div>
          <Form className='formclass'>
            <div class="form-group  form-group5 row">
              <label class="col-lg-2 col-form-label ADN_label">Type</label>
              <div class="col-lg-4">
                <select class="form-control input-lg input-lg1 AEN_border" ref={type}  id="emergencytype" name="Type">
                  <option value={null} selected disabled>Select Type</option>
                  {contactTypes.map((items) => {
                    return <option value={items.id}>{items.emgContactType}</option>
                  })}
                </select>
              </div>
            </div>
            <div class="form-group form-group5 row">
              <label class="col-lg-2 col-form-label ADN_label ">Name</label>
              <div class="col-lg-4">
                {ename ? <input type="text" id="contact_name" ref={name} defaultValue={ename} name="Name" className="form-control input-lg input-lg1 AEN_border" placeholder="Name"></input> : <input type="text" class="form-control input-lg input-lg1 AEN_border" id="contact_name" ref={name} name="Name" placeholder="Name"></input>}
              </div>
            </div>
            <div class="form-group form-group5 row">
              <label class="col-lg-2 col-form-label ADN_label ">Phone Number</label>
              <div class="col-lg-4">
                {econtact ? <input type="number" id="contact_number" ref={contact} defaultValue={econtact} name="Phone Number" className="form-control input-lg input-lg1 AEN_border" maxLength="10" placeholder="Contact"></input> : <input type="number" class="form-control input-lg input-lg1 AEN_border" id="contact_number" ref={contact} name="Phone Number" maxLength="10" placeholder="Contact"></input>}
              </div>
            </div>


            <button type="submit" onClick={(e) => handleSubmit(e)} className="AEN_btnAdd">{update == 'update' ? 'Update' : 'Add'} Number</button>
          </Form>

        </Loader>
      </div>
    </div>
  );
};

export default Addemergencyno;
