import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { SimpleDropDownComponent, SimpleInputComponent } from '../../admin/components/input';
import { Form } from 'react-bootstrap';
import { ToastMessage } from '../../../components/ToastMessage';
import { addProgram } from '../../../common/partner/partner_api';
import { goBackInOneSec, TOAST } from '../../../common/utils';
import axios from 'axios';

function AddCourse() {
  const navigate = useNavigate();

  const [toast, setToast] = useState({ show: false })
  const [programType, setProgramType] = useState(0)
  const [ProgramCategory, setProgramCategory] = useState(0)
  const [program, setProgram] = useState({
    partner: localStorage.getItem('partner_id'),
    name: "",
    category: "",
    max_members: "",
    type: 1,
    fee: undefined,
    details: "",
 
})

const [value, setValue] = useState(new Date().toLocaleString());




const handleSubmit = async (e) => {
  console.log(program)
  e.preventDefault()
  try {

      if (program.name != '' && program.category != '' && program.max_members != '' && program.mobileno != '' && program.type != '' && program.fee != '' && program.fee != '') {
          
          const { data } = await axios.post(`${window.env_var}api/partner/programs`, program)
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
      alert('Could not add Program.!')
  }

}


  return (
    <>
    <ToastMessage show={toast.show} message={toast.message} type={toast.type} handleClose={() => { setToast({ show: false }) }} />

      <div>
        <div className="page-label">
          <label>Add New Program</label>
        </div>
        <div>

<Form className='fcadmin' method='POST' onSubmit={handleSubmit} >

    <SimpleInputComponent label={'Program Name'} placeholder={'Enter Program Name'} name={'Program Name'} onChange={(e) => { setProgram({ ...program, name: e.target.value }) }} required />
    <SimpleDropDownComponent items={[{ id: 1, option: 'Fashion' }, { id: 2, option: 'Dance ' },{ id: 3, option: 'Sports ' },{ id: 4, option: 'Classes ' }]} label={'Category'} name={'Category'} id={'Program_Category'} onChange={(e) => { setProgram({ ...program, category: e.target.value }) }}  />
    <SimpleInputComponent label={'Maximum no of Members'} placeholder={'No of Members'} name={'Maximum no of Members'} type={'number'}onChange={(e) => setProgram({...program, max_members: e.target.value })}  required  />
    <SimpleDropDownComponent items={[{ id: 1, option: 'Online' }, { id: 2, option: 'Offline' }]} label={'Program Type'} name={'Program_Type'} id={'Program_type'} onChange={(e) => { setProgram({ ...program, type: e.target.value }) }} />
    < SimpleInputComponent label={'Fees'} name={'Fees'} placeholder={'Fees'}  type={'number'} onChange={(e) => setProgram({...program, fee: e.target.value })} required />
    <SimpleInputComponent label={'Program Details'} placeholder={'Enter Program Details'} type={'textarea'} name={'Program_Details'} onChange={(e) => setProgram({...program, details: e.target.value })} />



    <button type="submit" className="BTN_ADD_premise " >Add</button>

</Form>

</div>
        </div>
  
    </>
  );
}

export default AddCourse;
