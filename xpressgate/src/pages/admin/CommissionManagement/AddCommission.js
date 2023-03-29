import React, { useEffect, useRef, useState } from 'react';
import '../../../styles/addPremise.css';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useLocation } from "react-router-dom";
import { SimpleDropDownComponent, SimpleInputComponent } from '../components/input';
import { getDefaultNormalizer } from '@testing-library/react';
import { ToastMessage } from '../../../components/ToastMessage';
import { goBackInOneSec, TOAST } from '../../../common/utils';
import { Email } from '@mui/icons-material';

const AddCommission = () => {

    const [commission, setCommission] = useState({
        program_id: '',
            amount: '',
        commission: '',
    payment_status: false,
            status: true

        
    })
    const [toast, setToast] = useState({ show: false })
    const [allprograms, setAllPrograms] = useState([]);
    const location = useLocation();
    const [isError, setError] = useState(false)
    const navigate = useNavigate()
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
         setCommission({ ...commission, program_id: e.target.value }) 
        console.log(e.target.value )
        const { data } = await axios.get(`${window.env_var}api/partner/programs/${e.target.value}`)
        console.log(data.data.fee)
       
  

         setCommission({ ...commission, amount: data.data.fee }) 
    }



    const handleSubmit = async (e) => {
        console.log(commission)
        e.preventDefault()
        try {

         
                const { data } = await axios.post(`${window.env_var}api/commission/add`, commission)
                if (data.status_code == 200) {
                    setToast(TOAST.SUCCESS(data?.message));
                    goBackInOneSec(navigate)
                } else {
                    setToast(TOAST.ERROR(data?.message));
                }
            }
          

         catch (error) {
            console.log(error)
            alert('Could not add commission.!')
        }

    }



    return (
        <>
            <ToastMessage show={toast.show} message={toast.message} type={toast.type} handleClose={() => { setToast({ show: false }) }} />

            <div>
                <div className='page-label'>
                    <label>Add New Commission</label>
                </div>
                <div>

                    <Form className='fcadmin'>
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
                        <SimpleInputComponent label={'Amount'} placeholder={'Enter Amount'} name={'amount'} id={'amount'} type={'number'} text={commission.amount} readonly disabled/>
                        <SimpleInputComponent label={'Commission'} placeholder={'Enter Commission'} name={'commission'} id={'commission'} type={'number'} onChange={(e) => { setCommission({ ...commission, commission: e.target.value }) }} />
                        <SimpleDropDownComponent items={[{ id: 1, option: 'Paid' }, { id: 2, option: 'Not Paid' }]} label={'Payment Status'} name={'payment_status'} id={'payment_status'}  onChange={(e) => { setCommission({ ...commission, payment_status: e.target.value }) }}  />
                        <button type="submit" className="BTN_ADD_premise " onClick={(e) => handleSubmit(e)} >Add Commission</button>

                    </Form>

                </div>
            </div>
        </>
    )
}

export default AddCommission

