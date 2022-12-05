import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { SimpleInputComponent } from '../../components/input';

export const AddPlan = () => {

    const handleSubmit = async (e) => {

    }


    return (
        <div className="addvehiclecontainer">

            <div className='avbackgroundimg center-vertical'>
                <div className='Addvehicledisplay'>
                    <label>Add new Subscription Plan</label>
                </div>
                <Form className='formclass'>

                    <SimpleInputComponent label={'Plan Name'} />
                    <SimpleInputComponent label={'Plan code'} />
                    <SimpleInputComponent label={'Amount'} />
                    <SimpleInputComponent label={'Type'} />
                    <SimpleInputComponent label={'Description'} type={'textarea'} />



                    <Button type="submit" onClick={(e) => handleSubmit(e)} className="btnAddVeh">Add</Button>

                </Form>

            </div>
        </div>
    )
}

