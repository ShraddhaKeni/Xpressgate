import React, { useEffect, useRef, useState } from 'react';
import '../../../../styles/addPremise.css';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { getDefaultNormalizer } from '@testing-library/react';
import RouterPath from '../../../../common/constants/path/routerPath';
import { SimpleDropDownComponent, SimpleInputComponent } from '../../components/input';
import { addPaymentGateway } from '../../../../common/admin/admin_api';

const AddPaymentGateway = () => {

    const [paymentgateway, setPaymentGateway] = useState({
        name: '',
        type: '',
        noofblocks: parseInt(0),
        address: '',
        landmark: '',
        state: '',
        city: '',
        pincode: '',
        status: true
    })

    const navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {

            if (paymentgateway.payment_gateway_name != '' && paymentgateway.payment_api_key != '') {
                const { data } = await addPaymentGateway(paymentgateway);
                navigate(RouterPath.MANAGE_PAYMENT_GATEWAY);

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
                    <label>Add New Gateway</label>
                </div>
                <div>

                    <Form className='formclass fcadmin'>

                        <SimpleInputComponent label={'Payment Gateway Name'} name={'payment_gateway_name'} id={'premises'} onChange={(e) => { setPaymentGateway({ ...paymentgateway, payment_gateway_name: e.target.value }) }} />
                        <SimpleInputComponent label={'API Key'} name={'payment_api_key'} id={'address'} onChange={(e) => { setPaymentGateway({ ...paymentgateway, payment_api_key: e.target.value }) }} />
                        <button type="submit" onClick={(e) => handleSubmit(e)} className="BTN_ADD_premise ">Create</button>

                    </Form>

                </div>
            </div>
        </>
    )
}

export default AddPaymentGateway

