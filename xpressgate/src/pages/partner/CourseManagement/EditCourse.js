import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { SimpleDropDownComponent, SimpleInputComponent } from '../../admin/components/input';
import { Form } from 'react-bootstrap';
import { ToastMessage } from '../../../components/ToastMessage';

import { goBackInOneSec, TOAST } from '../../../common/utils';
import axios from 'axios'
import { id } from 'date-fns/locale';
function EditCourse() {
  const location = useLocation()
  const [program, setProgram] = useState({
    partner: localStorage.getItem('partner_id'),
    name: "",
    category: "",
    max_members: "",
    type: 1,
    fee: undefined,
    details: "",
 
})
const [toast, setToast] = useState({ show: false })
const [value, setValue] = useState(new Date().toLocaleString());
const navigate = useNavigate()
const [programType, setProgramType] = useState(0)
const [ProgramCategory, setProgramCategory] = useState(0)
const [allprograms, setAllPrograms] = useState([]);

useEffect(() => {

  getProgram()
   }, [])
  
      const getProgram = async () => {
          try {
         
            const { data } = await axios.get(`${window.env_var}api/partner/programs/${location.state.id}`)   
              setProgram({
                
                  ...program,
                  community_id: location.state.id,
                  partner_id: location.state.id,
              
                  name: data.data.name,
                  category: data.data.category,
                  max_members: data.data.max_members,
                  type: data.data.type,
                  fee: data.data.fee,
                  details: data.data.details,
                  status: true
              })
          
              document.getElementById('programname').defaultValue =data.data.name
              document.getElementById('Program_Category').defaultValue = data.data.category
              document.getElementById('max_members').defaultValue = data.data.max_members
              document.getElementById('Program_type').defaultValue = data.data.type
              document.getElementById('fee').defaultValue =  data.data.fee
              document.getElementById('details').defaultValue = data.data.details
              return data.data
          } catch (error) {
              console.log(error)
          }
      }


      const handleSubmit = async (e) => {
        e.preventDefault()
        try {
      
            if (program.name != '' && program.category != '' && program.max_members != '' && program.mobileno != '' && program.type != '' && program.fee != '' && program.fee != '') {
                
                const { data } = await axios.put(`${window.env_var}api/partner/programs/${location.state.id}`, program)
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
            alert('Could not Update Program.!')
        }
      
      }


  return (
    <>
       <ToastMessage show={toast.show} message={toast.message} type={toast.type} handleClose={() => { setToast({ show: false }) }} />
      <div>
        <div className="page-label">
          <label>Update Program</label>
        </div>
        <div>

<Form className='fcadmin' method='POST' onSubmit={handleSubmit} >

<SimpleInputComponent label={'Program Name'} placeholder={'Enter Program Name'} name={'Program Name'} id={'programname'}  text={program.name} onChange={(e) => { setProgram({ ...program, name: e.target.value }) }} required />
    <SimpleDropDownComponent items={[{ id: 1, option: 'Fashion' }, { id: 2, option: 'Dance ' },{ id: 3, option: 'Sports ' },{ id: 4, option: 'Classes ' }]} label={'Category'} name={'Category'} id={'Program_Category'} selected={program.category} onChange={(e) => { setProgram({ ...program, category: e.target.value }) }} />
    <SimpleInputComponent label={'Maximum no of Members'} placeholder={'No of Members'} name={'Maximum no of Members'} type={'number'} id={'max_members'}  text={program.max_members} onChange={(e) => setProgram({...program, max_members: e.target.value })}  required  />
    <SimpleDropDownComponent items={[{ id: 1, option: 'Online' }, { id: 2, option: 'Offline' }]} label={'Program Type'} name={'Program_Type'} id={'Program_type'}  selected={program.type} onChange={(e) => { setProgram({ ...program, type: e.target.value }) }}/>
    < SimpleInputComponent label={'Fees'} name={'Fees'} placeholder={'Fees'}  type={'number'} id={'fee'}  text={program.fee} onChange={(e) => setProgram({...program, fee: e.target.value })} required />
    <SimpleInputComponent label={'Program Details'} placeholder={'Enter Program Details'} type={'textarea'} name={'Program_Details'} id={'details'}  text={program.details} onChange={(e) => setProgram({...program, details: e.target.value })} />



    <button type="submit" className="BTN_ADD_premise">Update</button>

</Form>

</div>
        </div>
  
    </>
  );
}

export default EditCourse;
