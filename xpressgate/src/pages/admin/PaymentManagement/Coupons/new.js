import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { addCoupon } from '../../../../common/admin/admin_api';
import RouterPath from '../../../../common/constants/path/routerPath';
import { SimpleInputComponent } from '../../components/input';
import dayjs from 'dayjs';


export const AddCoupon = () => {

    const navigate = useNavigate();

    const [value, setValue] = useState(new Date().toLocaleString());

    const handleChange = (newValue) => {
        console.log(newValue.target.value);

        setValue(newValue);
    };

    let coupon = {
        name: "",
        code: "",
        valid: "",
        type: 1,
        amount: undefined,
        limit: undefined,
        status: true
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        //Validate the data by regex before submit
        coupon.valid = value.slice(0, 9);
        const res = await addCoupon(coupon)
        console.log(res);
        if (res && res.data.status_code == 200) {

            navigate(RouterPath.COUPONS_LIST);
        }


    }


    return (
        <div className="addvehiclecontainer">

            <div className='avbackgroundimg center-vertical'>
                <div className='Addvehicledisplay'>
                    <label>Create Coupon</label>
                </div>
                <Form className='formclass' method='POST' onSubmit={handleSubmit}>

                    <SimpleInputComponent label={'Coupon Name'} name={'name'} onChange={(e) => coupon.name = e.target.value} required />
                    <SimpleInputComponent label={'Validity'} type={'datepicker'} name={'valid'} required onChange={handleChange} value={value} />
                    <SimpleInputComponent label={'Code'} name={'code'} required onChange={(e) => coupon.code = e.target.value} />
                    <SimpleInputComponent label={'Type'} name={'type'} required onChange={(e) => coupon.type = e.target.value} />
                    <SimpleInputComponent label={'Amount'} name={'amount'} required onChange={(e) => coupon.amount = e.target.value} type={'number'} />
                    <SimpleInputComponent label={'Description'} type={'textarea'} name={'description'} onChange={(e) => coupon.description = e.target.value} />



                    <Button type="submit" className="btnAddVeh">Generate</Button>

                </Form>

            </div>
        </div>
    )
}

