import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { SimpleDropDownComponent, SimpleInputComponent } from '../../admin/components/input';
import { Form } from 'react-bootstrap';
import { ToastMessage } from '../../../components/ToastMessage';
import { addProgram } from '../../../common/partner/partner_api';
import { goBackInOneSec, TOAST } from '../../../common/utils';


function AddCourse() {
  const navigate = useNavigate();
  const [toast, setToast] = useState({ show: false })
  const [programType, setProgramType] = useState(0)
  const [ProgramCategory, setProgramCategory] = useState(0)
  const [program, setProgram] = useState({
    name: "",
    category: "",
    max_members: "",
    type: 1,
    fee: undefined,
    details: "",
 
})

const [value, setValue] = useState(new Date().toLocaleString());

// const handleChange = (e) => {
//     console.log(e.target.value);

//     setValue(e.target.value);
// };


const handleTypeChange = (e) => {
  console.log(e.target.value);
  setProgramType(e.target.value);

};
const handleCategoryChange = (e) => {
  console.log(e.target.value);
  setProgramCategory(e.target.value);

};



const handleSubmit = async (e) => {
  e.preventDefault();

  //Validate the data by regex before submit

  let c = { ...program, valid: value }
  c.type = programType;

  if (programType === 0) {
      alert("Please select Program Type");
      return;
  }
  if (ProgramCategory === 0) {
      alert("Please select Program Type");
      return;
  }
c.category= ProgramCategory


  const res = await addProgram(c)
  console.log(res)
  if (res && res.data?.status_code == 200) {
      setToast(TOAST.SUCCESS(res?.data?.message));
      goBackInOneSec(navigate)
  } else if (res.data?.status_code == 201) {
      setToast(TOAST.ERROR(res?.data?.message));
  }
  else {
      alert(res.message);
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
    <SimpleDropDownComponent items={[{ id: 1, option: 'Fashion' }, { id: 2, option: ' ' }]} label={'Category'} name={'Category'} id={'Program_Category'} onChange={(e) => { handleCategoryChange(e) }} />
    <SimpleInputComponent label={'Maximum no of Members'} placeholder={'No of Members'} name={'Maximum no of Members'} type={'number'}onChange={(e) => setProgram({...program, max_members: e.target.value })}  required  />
    <SimpleDropDownComponent items={[{ id: 1, option: 'Online' }, { id: 2, option: 'Offline' }]} label={'Program Type'} name={'Program_Type'} id={'Program_type'} onChange={(e) => { handleTypeChange(e) }}/>
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
