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
import { mobileValidation, emailValidation } from '../../../components/auth/validation';
import SelectMode from '../../../components/auth/SelectMode';
const EditCommission = () => {

    const [commission, setCommission] = useState({
        program_id: '',
        amount: '',
        commission: '',
        payment_status: false,
        status: true  

        
    })
    
    const [toast, setToast] = useState({ show: false })
    const [isError, setError] = useState(false)
    const navigate = useNavigate()
    const location = useLocation();
    const [allprograms, setAllPrograms] = useState([]);
    useEffect(() => {
      
        getCommission()
        getAllProgram()
         }, [])
        
            const getCommission = async () => {
                try {
                   
                    const { data } = await axios.get(`${window.env_var}api/commission/getone/${location.state.id}`)
                    console.log(data)
                    setCommission({
                        ...commission,
                        community_id: location.state.id,
                        program_id: data.data.program_id,
                        amount: data.data.amount,
                        commission: data.data.commission,
                        payment_status: data.data.payment_status,
                        status: true
                    })
                  
                    document.getElementById('programname').value =data.data.program_id
                    document.getElementById('amount').defaultValue = data.data.amount
                    document.getElementById('commission').defaultValue = data.data.commission
                   
                    document.getElementById('payment_status').defaultValue = data.data.payment_status
                  
                    return data.data
                } catch (error) {
                    console.log(error)
                }
            }
            const getAllProgram = async () => {
                try {  
                  const { data } = await axios.get(`${window.env_var}api/partner/programs`)
                  setAllPrograms(data.data)
                  setError(false)
                } catch (error) {
                  setError(true)
                }
              }



    const handleSubmit = async (e) => {
        console.log(commission)
        e.preventDefault()
        try {

           
            const { data } = await axios.put(`${window.env_var}api/commission/update/${location.state.id}`, commission)
                if (data.status_code == 200) {
                    setToast(TOAST.SUCCESS(data?.message));
                    goBackInOneSec(navigate)
                } else {
                    setToast(TOAST.ERROR(data?.message));
                }
            }
         catch (error) {
            alert('Could not add Community.!')
        }

    }
    const getProgramDetails = async (e) => { 
        setCommission({ ...commission, program_id: e.target.value }) 
     
    }



    return (
        <>
            <ToastMessage show={toast.show} message={toast.message} type={toast.type} handleClose={() => { setToast({ show: false }) }} />

            <div>
                <div className='page-label'>
                    <label>Update Commission</label>
                </div>
                <div>

                    <Form className='fcadmin'>
                    <div class="form-group  form-group5 row">
              <label class="col-lg-4 col-form-label float-left GForm_label">Program Name</label>
              <div class="col-lg-5 col-md-2 col-sm-2">
                <select class="form-control input-lg input-lg1 AEN_border" id="programname" name="Type" type="text">
                <option value={null}  selected disabled>Select Program</option>
               
                  {allprograms.map((item) => {
                    return (
                     
                      <option value={item._id} id={item.fee}>{item.name}</option>
                    )
                  })}
                 
                </select>
              </div>
            </div>
                        <SimpleInputComponent label={'Amount'} placeholder={'Enter Amount'} name={'amount'} id={'amount'} type={'number'} text={commission.amount} onChange={(e) => { setCommission({ ...commission, amount: e.target.value }) }} readonly/>
                        <SimpleInputComponent label={'Commission'} placeholder={'Enter Commission'} name={'commission'} id={'commission'} type={'number'} text={commission.commission} onChange={(e) => { setCommission({ ...commission, commission: e.target.value }) }} />
                        <SimpleDropDownComponent items={[{ id: 1, option: 'Paid' }, { id: 0, option: 'Not Paid' }]} label={'Payment Status'} name={'payment_status'} id={'payment_status'} text={commission.payment_status}   onChange={(e) => { setCommission({ ...commission, payment_status: e.target.value }) }}  />
                        <button type="submit" className="BUTNnn_ADD_premise " onClick={(e) => handleSubmit(e)}>Update Commission</button>

                    </Form>

                </div>
            </div>
        </>
    )
}

export default EditCommission

