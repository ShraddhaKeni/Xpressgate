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

const EditSMSGateway = () => {


    const location = useLocation();


    const navigate = useNavigate()

    const [smsgateway, setPaymentGateway] = useState(location.state.data);


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {

            if (smsgateway.payment_gateway_name != '' && smsgateway.payment_api_key != '') {
                const { data } = await updateSMSGateway(smsgateway);
                navigate(RouterPath.MANAGE_SMS_PROVIDER)
            }
            else {
                alert('Fields Empty !')
            }

        } catch (error) {
            alert('Could not add Payment Gateway!')
        }

    }




    return (
        <>
            <img src='/images/side_bar_img.svg' className='AddPremise_side_Img' />
            <div>
                <div className='page-label'>
                    <label>Update SMS Gateway</label>
                </div>
                <div>

                    <Form className='formclass fcadmin'>

                        <SimpleInputComponent label={'Payment Gateway Name'} name={'payment_gateway_name'} id={'premises'} text={smsgateway?.gateway_name} onChange={(e) => { setPaymentGateway({ ...smsgateway, gateway_name: e.target.value }) }} />
                        <SimpleInputComponent label={'API Key'} name={'payment_api_key'} id={'address'} text={smsgateway?.api_key} onChange={(e) => { setPaymentGateway({ ...smsgateway, api_key: e.target.value }) }} />
                        <button type="submit" onClick={(e) => handleSubmit(e)} className="BTN_ADD_premise ">Save</button>

                    </Form>

                </div>
            </div>
        </>
    )
}

export default EditSMSGateway

