import React, { useEffect, useRef, useState } from 'react';
import '../../../../styles/addPremise.css';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { getDefaultNormalizer } from '@testing-library/react';
import RouterPath from '../../../../common/constants/path/routerPath';
import { SimpleDropDownComponent, SimpleInputComponent } from '../../components/input';
import { getAllPaymentGateways, updatePaymentGateway, updateSMSGateway } from '../../../../common/admin/admin_api';
import { ToastMessage } from '../../../../components/ToastMessage';
import { goBackInOneSec, TOAST } from '../../../../common/utils';

const EditSMSGateway = () => {


    const location = useLocation();


    const navigate = useNavigate()

    const [smsgateway, setPaymentGateway] = useState(location.state.data);
    const [toast, setToast] = useState({ show: false })


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {

            if (smsgateway.gateway_name != '' && smsgateway.api_key != '') {
                const { data } = await updateSMSGateway(smsgateway);
                if (data && data?.status_code == 200) {
                    setToast(TOAST.SUCCESS(data?.message));
                    goBackInOneSec(navigate)
                } else if (data?.status_code == 201) {
                    setToast(TOAST.ERROR(data?.message));
                }
            }
            else {
                setToast(TOAST.ERROR('Fields Empty !'));

            }

        } catch (error) {
            setToast(TOAST.ERROR('Could not add SMS Gateway!'));

        }

    }




    return (
        <>
            <ToastMessage show={toast.show} message={toast.message} type={toast.type} handleClose={() => { setToast({ show: false }) }} />

            <div>
                <div className='page-label'>
                    <label>Update SMS Gateway</label>
                </div>
                <div>

                    <Form className='formclass fcadmin'>

                        <SimpleInputComponent label={'SMS Gateway Name'} placeholder={'Enter SMS Gateway Name'} name={'payment_gateway_name'} id={'premises'} text={smsgateway?.gateway_name} onChange={(e) => { setPaymentGateway({ ...smsgateway, gateway_name: e.target.value }) }} />
                        <SimpleInputComponent label={'API Key'} placeholder={'Enter API Key'} name={'payment_api_key'} id={'address'} text={smsgateway?.api_key} onChange={(e) => { setPaymentGateway({ ...smsgateway, api_key: e.target.value }) }} required />
                        <button type="submit" onClick={(e) => handleSubmit(e)} className="BTN_ADD_premise ">Save</button>

                    </Form>

                </div>
            </div>
        </>
    )
}

export default EditSMSGateway

