import React, { useEffect, useState } from 'react';
import '../../../styles/addPremise.css';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { SimpleDropDownComponent, SimpleInputComponent } from '../components/input';

export const AddCoupon = () => {

    const handleSubmit = async (e) => {

    }


    return (
        <div className="addvehiclecontainer">

            <div className='avbackgroundimg center-vertical'>
                <div className='Addvehicledisplay'>
                    <label>Create Coupon</label>
                </div>
                <Form className='formclass'>

                    <SimpleInputComponent label={'Coupon Name'} />
                    <SimpleInputComponent label={'Validity'} />
                    <SimpleInputComponent label={'Pincode'} />
                    <SimpleInputComponent label={'Type'} />
                    <SimpleInputComponent label={'Amount'} />
                    <SimpleInputComponent label={'Description'} type={'textarea'} />



                    <Button type="submit" onClick={(e) => handleSubmit(e)} className="btnAddVeh">Generate</Button>

                </Form>

            </div>
        </div>
    )
}

