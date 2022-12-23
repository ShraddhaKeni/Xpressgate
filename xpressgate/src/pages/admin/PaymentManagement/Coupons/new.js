import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { addCoupon } from '../../../../common/admin/admin_api';
import RouterPath from '../../../../common/constants/path/routerPath';
import { SimpleDropDownComponent, SimpleInputComponent } from '../../components/input';
import dayjs from 'dayjs';


export const AddCoupon = () => {

    const navigate = useNavigate();

    const [couponType, setCouponType] = useState(0)

    const [value, setValue] = useState(new Date().toLocaleString());

    const handleChange = (e) => {
        console.log(e.target.value);

        setValue(e.target.value);
    };

    const handleTypeChange = (e) => {
        console.log(e.target.value);
        setCouponType(e.target.value);

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
        console.log(value.value);
        coupon.valid = value;

        if (couponType === 0) {
            alert("Please select Coupon Type");
            return;
        }



        const res = await addCoupon(coupon)
        console.log(res);
        if (res.data && res.data?.status_code == 200) {
            navigate(RouterPath.COUPONS_LIST);
        } else if (res.data?.status_code == 201) {
            alert(res.data?.message);
        }
        else {
            alert(res.message);
        }


    }


    return (
        <>
          <img src='/images/side_bar_img.svg' className='PAY_Coupans_side_Img' />
        <div>
            <div className='page-label'>
                <label>Generate Coupon</label>
            </div>
            <div>

                <Form className='formclass fcadmin' method='POST' onSubmit={handleSubmit}>

                    <SimpleInputComponent label={'Coupon Name'} name={'name'} onChange={(e) => coupon.name = e.target.value} required />
                    <SimpleInputComponent label={'Validity'} type={'datepicker'} name={'valid'} required onChange={(e) => handleChange(e)} />
                    <SimpleInputComponent label={'Code'} name={'code'} required onChange={(e) => coupon.code = e.target.value} />
                    <SimpleDropDownComponent items={[{ id: 1, option: 'Flat' }, { id: 2, option: 'Percentage' }]} label={'Type'} name={'type'} id={'state'} onChange={(e) => { handleTypeChange(e) }} />
                    < SimpleInputComponent label={'Amount'} name={'amount'} required onChange={(e) => coupon.amount = e.target.value} type={'number'} />
                    {couponType > 1 &&
                        <SimpleInputComponent label={'Limit'} name={'limit'} required onChange={(e) => coupon.amount = e.target.value} type={'number'} />
                    }
                    <SimpleInputComponent label={'Description'} type={'textarea'} name={'description'} onChange={(e) => coupon.description = e.target.value} />

                    <Button type="submit" className="hovergreen btnAddVeh" style={{ marginLeft: '18vw' }}>Generate</Button>

                </Form>

            </div>
        </div>
        </>
    )
}

