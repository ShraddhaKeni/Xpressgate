import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { addPlan } from '../../../../common/admin/admin_api';
import RouterPath from '../../../../common/constants/path/routerPath';
import { goBackInOneSec, TOAST } from '../../../../common/utils';
import { ToastMessage } from '../../../../components/ToastMessage';
import { SimpleDropDownComponent, SimpleInputComponent } from '../../components/input';

export const AddPlan = () => {

    const navigate = useNavigate();
    const [toast, setToast] = useState({ show: false })

    let plan = {
        name: "",
        code: "",
        type: 1,
        status: true,
        amount: "",
        description: ""
    }
    const planTypes = [{ id: 1, option: "Normal" }, { id: 2, option: "Master" }];

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await addPlan(plan)
        console.log(res);
        if (res && res.data?.status_code == 200) {
            setToast(TOAST.SUCCESS(res?.data?.message));
            goBackInOneSec(navigate)
        } else {
            setToast(TOAST.ERROR(res?.data?.message));
        }


    }


    return (
        <>
            <ToastMessage show={toast.show} message={toast.message} type={toast.type} handleClose={() => { setToast({ show: false }) }} />

            <img src='/images/side_bar_img.svg' className='PAY_Coupans_side_Img' />
            <div>
                <div className='Page-Label'>
                    <label>Add New Subscription Plan</label>
                </div>
                <div>

                    <Form className='formclass fcadmin'>

                        <SimpleInputComponent label={'Plan Name'} name={'name'} onChange={(e) => plan.name = e.target.value} required />
                        <SimpleInputComponent label={'Plan code'} name={'code'} onChange={(e) => plan.code = e.target.value} required />
                        <SimpleInputComponent label={'Amount'} name={'amount'} onChange={(e) => plan.amount = e.target.value} required />
                        <SimpleDropDownComponent label={'Type'} name={'type'} items={planTypes} onChange={(e) => plan.type = e.target.value} required />
                        <SimpleInputComponent label={'Description'} type={'textarea'} name={'name'} onChange={(e) => plan.description = e.target.value} required />



                        <button type="button" onClick={(e) => handleSubmit(e)} className="BTN_ADD_premise">Add</button>

                    </Form>

                </div>
            </div>
        </>
    )
}

