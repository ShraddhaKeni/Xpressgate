import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { SimpleDropDownComponent, SimpleInputComponent } from '../../admin/components/input';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import { ToastMessage } from '../../../components/ToastMessage';
import { goBackInOneSec, TOAST } from '../../../common/utils';
import { mobileValidation, emailValidation } from '../../../components/auth/validation';
import { id } from 'date-fns/locale';
function EditStudent() {

  const location = useLocation()
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
  const [re_render, setRender] = useState(false)
  const navigate = useNavigate()
  const [isError, setError] = useState(false)
 

  useEffect(() => {
    getAllProgram()
          getStudentDetail()
          
  }, [])
  const getAllProgram = async () => {
    try {
    
      const { data } = await axios.get(`${window.env_var}api/partner/programs`)
      console.log(data)
      setAllPrograms(data.data)
    console.log(data.data)
      // document.getElementById('programname').value = location.state.id;
    
      
      setError(false)
    } catch (error) {
      setError(true)
    }
  }


  const getStudentDetail = async () => {
      try {
      
          const { data } = await axios.get(`${window.env_var}api/partner/students/${location.state.id}`)
          console.log(data)
          setStudent({
              ...student,
              community_id: location.state.id,
           
              name: data.data.name,
              program: data.data.program,
              program_type: data.data.program_type,
              phone: data.data.phone,
              email: data.data.email,
              address: data.data.address,
              occupation: data.data.occupation,
              attachment: data.data.attachment,
              status: true
          })
          document.getElementById('name').defaultValue = data.data.name
          document.getElementById('programname').value = data.data.program
          document.getElementById('Program_type').defaultValue = data.data.program_type
          document.getElementById('phone').defaultValue = data.data.phone
          document.getElementById('email').defaultValue = data.data.email
          document.getElementById('address').defaultValue = data.data.address
          document.getElementById('occupation').defaultValue = data.data.occupation
          document.getElementById('attachment').defaultValue = data.data.attachment
          console.log(data.data)
          return data.data
      } catch (error) {
          console.log(error)
      }
  }



  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
  
        if (student.name != '' && student.program != '' && student.program_type != 0 && student.phone != '' && student.email != '' && student.address != '' && student.occupation != '' && student.attachment != ''  ) {
          if (await mobileValidation(document.getElementById('phone').value) && emailValidation(document.getElementById('email').value)) { 
          const { data } = await axios.put(`${window.env_var}api/partner/students/${location.state.id}`, student)
          console.log(data)
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
          alert('Could not Update member.!')
      }
  
  }
  






  return (
    <>
    <ToastMessage show={toast.show} message={toast.message} type={toast.type} handleClose={() => { setToast({ show: false }) }} />
      <div>
        <div className="page-label">
          <label>Update Member</label>
        </div>
        <div>

<Form className='fcadmin' method='POST' >
<SimpleInputComponent label={'Member Name'} placeholder={'Enter Member Name'} name={'name'} id={'name'} type={'text'} text={student.name} onChange={(e) => { setStudent({ ...student, name: e.target.value }) }} required />
    <div class="form-group  form-group5 row">
              <label class="col-lg-4 col-form-label float-left GForm_label">Program Name</label>
              <div class="col-lg-5 col-md-2 col-sm-2">
                <select class="form-control input-lg input-lg1 AEN_border" id="programname" name="programname" >
                  <option value={null} selected disabled>Select Program</option>
                  {allprograms.map((item) => {
                    return (
                      <option value={item._id} >{item.name}</option>
                    )
                  })}
                </select>
              </div>
            </div>
    <SimpleDropDownComponent items={[{ id: 1, option: 'Online' }, { id: 2, option: 'Offline' }]} label={'Program Type'} name={'Program Type'} selected={student.program_type} onChange={(e) => { setStudent({ ...student, program_type: e.target.value }) }} id={'Program_type'}  />
    < SimpleInputComponent label={'Phone No'} name={'Phone No'} placeholder={'Phone No'} id={'phone'} type={'number'}  text={student.phone} onChange={(e) => { setStudent({ ...student, phone: e.target.value }) }} required />
    < SimpleInputComponent label={'Email Address'} name={'Email Address'} placeholder={'Email'} type={'email'} id={'email'}  text={student.email} onChange={(e) => { setStudent({ ...student, email: e.target.value }) }}  required />
    <SimpleInputComponent label={'Address'} name={'address_line'} placeholder={'Enter Address'} id={'address'} type={'textarea'} text={student.address} onChange={(e) => { setStudent({ ...student, address: e.target.value }) }} />
    < SimpleInputComponent label={'Occupation'} name={'Occupation'} placeholder={'Occupation'} id={'occupation'} text={student.occupation} onChange={(e) => { setStudent({ ...student, occupation: e.target.value }) }}  required />
    < SimpleInputComponent label={'Attachments'} name={'Attachments'} placeholder={'Attachments'} id={'attachment'}  type={'file'} onChange={(e) => { setStudent({ ...student, attachment: e.target.value }) }} required />


    <button type="submit" className="BTN_ADD_premise "  onClick={(e) => handleSubmit(e)} >Update</button>

</Form>

</div>
        </div>
  
    </>
  );
}

export default EditStudent;