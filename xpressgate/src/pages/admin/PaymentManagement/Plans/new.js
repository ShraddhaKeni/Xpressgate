import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { addPlan } from '../../../../common/admin/admin_api';
import RouterPath from '../../../../common/constants/path/routerPath';
import { SimpleDropDownComponent, SimpleInputComponent } from '../../components/input';

export const AddPlan = () => {

    const navigate = useNavigate();

    let plan = {
        name: "",
        code: "",
        type: 1,
        status: true,
        amount: "",
        description: ""
    }
    const planTypes = useState([{ id: "1", option: "Type 1" }, { id: "2", option: "Type 2" }])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await addPlan(plan)
        console.log(res);
        if (res && res.data.status_code == 200) {
            navigate(RouterPath.PRLANS_LIST);
        }


    }


    return (
        <div className="addvehiclecontainer">

            <div className='avbackgroundimg center-vertical'>
                <div className='Addvehicledisplay'>
                    <label>Add new Subscription Plan</label>
                </div>
                <Form className='formclass'>

                    <SimpleInputComponent label={'Plan Name'} name={'name'} onChange={(e) => plan.name = e.target.value} required />
                    <SimpleInputComponent label={'Plan code'} name={'code'} onChange={(e) => plan.code = e.target.value} required />
                    <SimpleInputComponent label={'Amount'} name={'amount'} onChange={(e) => plan.amount = e.target.value} required />
                    <SimpleDropDownComponent label={'Type'} name={'type'} items={planTypes} onChange={(e) => plan.type = e.target.value} required />
                    <SimpleInputComponent label={'Description'} type={'textarea'} name={'name'} onChange={(e) => plan.description = e.target.value} required />



                    <Button type="button" onClick={(e) => handleSubmit(e)} className="btnAddVeh">Add</Button>

                </Form>

            </div>
        </div>
    )
}

