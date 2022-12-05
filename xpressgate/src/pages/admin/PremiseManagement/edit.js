import React, { useEffect, useState } from 'react';
import '../../../styles/addPremise.css';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { SimpleDropDownComponent, SimpleInputComponent } from '../components/input';

const EditPremise = () => {

    const handleSubmit = async (e) => {

    }


    return (
        <div className="addvehiclecontainer">

            <div className='avbackgroundimg center-vertical'>
                <div className='Addvehicledisplay'>
                    <label>Premises Name</label>
                </div>
                <Form className='formclass'>

                    <SimpleInputComponent label={'Premises Name'} name={'premises_name'} id={'premises'} onChange={(e) => { }} />
                    <SimpleDropDownComponent label={'Community Type'} />
                    <SimpleDropDownComponent label={'Subscription Type'} />
                    <SimpleInputComponent label={'Number of Blocks'} />
                    <SimpleInputComponent label={'Address'} />
                    <SimpleInputComponent label={'Landmark'} />
                    <SimpleDropDownComponent label={'State'} />
                    <SimpleDropDownComponent label={'City'} />
                    <SimpleInputComponent label={'Pincode'} />


                    <Button type="submit" onClick={(e) => handleSubmit(e)} className="btnAddVeh">Update Premise</Button>
                </Form>

            </div>
        </div>
    )
}

export default EditPremise

