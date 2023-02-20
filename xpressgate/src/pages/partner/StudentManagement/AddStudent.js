import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { SimpleDropDownComponent, SimpleInputComponent } from '../../admin/components/input';
import { Form } from 'react-bootstrap';
function AddStudent() {
  return (
    <>
      <div>
        <div className="page-label">
          <label>Add New Member</label>
        </div>
        <div>

<Form className='fcadmin' method='POST' >

    <SimpleInputComponent label={'Member Name'} placeholder={'Enter Member Name'} name={'Member Name'} type={'text'} required />
    <SimpleDropDownComponent items={[{ id: 1, option: 'Fashion Designing' }, { id: 2, option: ' ' }]} label={'Program'} name={'Program'} id={'Program'}  />
    <SimpleDropDownComponent items={[{ id: 1, option: 'Online' }, { id: 2, option: 'Offline' }]} label={'Program Type'} name={'Program Type'} id={'Program_type'}  />
    < SimpleInputComponent label={'Phone No'} name={'Phone No'} placeholder={'Phone No'}  type={'number'} required />
    < SimpleInputComponent label={'Email Address'} name={'Email Address'} placeholder={'Email'} type={'email'}  required />
    <SimpleInputComponent label={'Address'} name={'address_line'} placeholder={'Enter Address'} id={'address'} type={'textarea'}  />
    < SimpleInputComponent label={'Occupation'} name={'Occupation'} placeholder={'Occupation'}  required />
    < SimpleInputComponent label={'Attachments'} name={'Attachments'} placeholder={'Attachments'} type={'file'}  required />


    <button type="submit" className="BTN_ADD_premise " >Save</button>

</Form>

</div>
        </div>
  
    </>
  );
}

export default AddStudent;