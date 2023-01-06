import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import '../../../../styles/addPremise.css';
import { Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { getDefaultNormalizer } from '@testing-library/react';
import RouterPath from '../../../../common/constants/path/routerPath';
import { SimpleDropDownComponent, SimpleInputComponent } from '../../components/input';
import { addSMSGateway } from '../../../../common/admin/admin_api';

const SMSProvider = () => {

    const [sms, setSMS] = useState({
        gateway_name: '',
        api_key: ''
    })
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {

            if (sms.api_key != '' && sms.gateway_name != '') {
                const { data } = await addSMSGateway(sms)
                navigate(-1)
            }
            else {
                alert('Fields Empty !')
            }

        } catch (error) {
            alert('Could not add SMS Gateway!')
        }

    }



    return (
        <>
            <img src='/images/side_bar_img.svg' className='AddPremise_side_Img' />
            <div>
                <div className='page-label'>
                    <label>Manage SMS Provider</label>
                </div>
                <div>

                    <Form className='formclass fcadmin'>

                        <SimpleInputComponent label={'SMS Provider Name'} name={'gateway_name'} id={'smss'} onChange={(e) => { setSMS({ ...sms, gateway_name: e.target.value }) }} />
                        <SimpleInputComponent label={'API Key'} name={'api_key'} id={'address'} onChange={(e) => { setSMS({ ...sms, api_key: e.target.value }) }} />
                        <button type="submit" onClick={(e) => handleSubmit(e)} className="BTN_ADD_premise ">Save</button>

                    </Form>

                </div>
            </div>
        </>
    )
}

export default SMSProvider

