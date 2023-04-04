import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { SimpleDropDownComponent, SimpleInputComponent } from '../../admin/components/input';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import { ToastMessage } from '../../../components/ToastMessage';
import { goBackInOneSec, TOAST } from '../../../common/utils';
import { mobileValidation, emailValidation } from '../../../components/auth/validation';
function AddStudent() {
  const [student, setStudent] = useState({
    name: '',
    program: '',
    program_type: 1,
    phone: '',
    email: '',
    address: '',
    occupation: '',
    attachment: '',
    status: true
})
const [allprograms, setAllPrograms] = useState([]);
const [toast, setToast] = useState({ show: false })
const navigate = useNavigate()
const [isError, setError] = useState(false)

useEffect(() => {
  getAllProgram()
}, [])
const getAllProgram = async () => {
  try {
  
    const { data } = await axios.get(`${window.env_var}api/partner/programs`)
    console.log(data)
    setAllPrograms(data.data)
  
  //   document.getElementById('programname').value = location.state.id;
  
    
    setError(false)
  } catch (error) {
    setError(true)
  }
}
const getProgramDetails = async (e) => { 
  setStudent({ ...student, program: e.target.value }) 
 console.log(e.target.value )
 const { data } = await axios.get(`${window.env_var}api/partner/programs/${e.target.value}`)
console.log(data)
}

const handleSubmit = async (e) => {
  e.preventDefault()
  try {

      if (student.name != '' && student.program != '' && student.program_type != 0 && student.phone != '' && student.email != '' && student.address != '' && student.occupation != '' && student.attachment != ''  ) {
        if (await mobileValidation(document.getElementById('phone').value) && emailValidation(document.getElementById('email').value)) { 
        const { data } = await axios.post(`${window.env_var}api/partner/students`, student)
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
      console.log(error)
        alert('Could not add member.!')
    }

}


  return (
    <>
     <ToastMessage show={toast.show} message={toast.message} type={toast.type} handleClose={() => { setToast({ show: false }) }} />
      <div>
        <div className="page-label">
          <label>Add New Member</label>
        </div>
        <div>

<Form className='fcadmin' method='POST' >

    <SimpleInputComponent label={'Member Name'} placeholder={'Enter Member Name'} name={'name'} id={'name'} type={'text'} onChange={(e) => { setStudent({ ...student, name: e.target.value }) }} required />
    <div class="form-group  form-group5 row">
              <label class="col-lg-4 col-form-label float-left GForm_label">Program Name</label>
              <div class="col-lg-5 col-md-2 col-sm-2">
                <select class="form-control input-lg input-lg1 AEN_border" id="programname" name="Type" type="text"  onChange={(e) => { getProgramDetails(e) }}>
                  <option value={null} selected disabled>Select Program</option>
                  {allprograms.map((item) => {
                    return (
                      <option value={item._id} >{item.name}</option>
                    )
                  })}
                </select>
              </div>
            </div>
    <SimpleDropDownComponent items={[{ id: 1, option: 'Online' }, { id: 2, option: 'Offline' }]} label={'Program Type'} name={'Program Type'} onChange={(e) => { setStudent({ ...student, program_type: e.target.value }) }} id={'Program_type'}  />
    < SimpleInputComponent label={'Phone No'} name={'Phone No'} placeholder={'Phone No'} id={'phone'} type={'number'} onChange={(e) => { setStudent({ ...student, phone: e.target.value }) }} required />
    < SimpleInputComponent label={'Email Address'} name={'Email Address'} placeholder={'Email'} type={'email'} id={'email'} onChange={(e) => { setStudent({ ...student, email: e.target.value }) }}  required />
    <SimpleInputComponent label={'Address'} name={'address_line'} placeholder={'Enter Address'} id={'address'} type={'textarea'} onChange={(e) => { setStudent({ ...student, address: e.target.value }) }} />
    < SimpleInputComponent label={'Occupation'} name={'Occupation'} placeholder={'Occupation'} id={'occupation'} onChange={(e) => { setStudent({ ...student, occupation: e.target.value }) }}  required />
    < SimpleInputComponent label={'Attachments'} name={'Attachments'} placeholder={'Attachments'} id={'attachment'} type={'file'} onChange={(e) => { setStudent({ ...student, attachment: e.target.value }) }} required />


    <button type="submit" className="BTN_ADD_premise "  onClick={(e) => handleSubmit(e)} >Save</button>

</Form>

</div>
        </div>
  
    </>
  );
}

export default AddStudent;