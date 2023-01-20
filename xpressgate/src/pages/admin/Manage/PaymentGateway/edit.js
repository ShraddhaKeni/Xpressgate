import React, { useEffect, useRef, useState } from 'react';
import '../../../../styles/addPremise.css';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { getDefaultNormalizer } from '@testing-library/react';
import RouterPath from '../../../../common/constants/path/routerPath';
import { SimpleDropDownComponent, SimpleInputComponent } from '../../components/input';
import { getAllPaymentGateways, updatePaymentGateway } from '../../../../common/admin/admin_api';
import { ToastMessage } from '../../../../components/ToastMessage';
import { goBackInOneSec, TOAST } from '../../../../common/utils';

const EditPaymentGateway = () => {


    const location = useLocation();


    const navigate = useNavigate()

    const [paymentgateway, setPaymentGateway] = useState(location.state.data);

    const [toast, setToast] = useState({ show: false })

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {

            if (paymentgateway.payment_gateway_name != '' && paymentgateway.payment_api_key != '') {
                const { data } = await updatePaymentGateway(paymentgateway);
                if (data && data?.status_code == 200) {
                    setToast(TOAST.SUCCESS(data?.message));
                    goBackInOneSec(navigate)
                } else if (data?.status_code == 201) {
                    setToast(TOAST.ERROR(data?.message));
                }
            }
            else {
                setToast(TOAST.ERROR("Fields Empty!"));
            }

        } catch (error) {
            setToast(TOAST.ERROR('Could not update Payment Gateway!'));
        }

    }




    return (
        <>
            <ToastMessage show={toast.show} message={toast.message} type={toast.type} handleClose={() => { setToast({ show: false }) }} />

            <img src='/images/side_bar_img.svg' className='AddPremise_side_Img' />
            <div>
                <div className='page-label'>
                    <label>Update Payment Gateway</label>
                </div>
                <div>

                    <Form className='formclass fcadmin'>

                        <SimpleInputComponent label={'Payment Gateway Name'} name={'payment_gateway_name'} id={'premises'} text={paymentgateway?.payment_gateway_name} onChange={(e) => { setPaymentGateway({ ...paymentgateway, payment_gateway_name: e.target.value }) }} />
                        <SimpleInputComponent label={'API Key'} name={'payment_api_key'} id={'address'} text={paymentgateway?.payment_api_key} onChange={(e) => { setPaymentGateway({ ...paymentgateway, payment_api_key: e.target.value }) }} />
                        <button type="submit" onClick={(e) => handleSubmit(e)} className="BTN_ADD_premise ">Save</button>

                    </Form>

                </div>
            </div>
        </>
    )
}

export default EditPaymentGateway

