import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { SimpleDropDownComponent, SimpleInputComponent } from '../../admin/components/input';
import { Form } from 'react-bootstrap';
function EditCourse() {
  return (
    <>
      <div>
        <div className="page-label">
          <label>Update Program</label>
        </div>
        <div>

<Form className='fcadmin' method='POST' >

    <SimpleInputComponent label={'Program Name'} placeholder={'Enter Program Name'} name={'Program Name'} required />
    <SimpleDropDownComponent items={[{ id: 1, option: 'Fashion' }, { id: 2, option: ' ' }]} label={'Category'} name={'Category'} id={'Cousre_Category'}  />
    <SimpleInputComponent label={'Maximum no of Members'} placeholder={'No of Members'} name={'Maximum no of Members'} required  />
    <SimpleDropDownComponent items={[{ id: 1, option: 'Online' }, { id: 2, option: 'Offline' }]} label={'Program Type'} name={'Program Type'} id={'Program_type'}  />
    < SimpleInputComponent label={'Fees'} name={'Fees'} placeholder={'Fees'}  type={'number'} required />
    <SimpleInputComponent label={'Program Details'} placeholder={'Enter Program Details'} type={'textarea'} name={'Program Details'}  />



    <button type="submit" className="BTN_ADD_premise " >Update</button>

</Form>

</div>
        </div>
  
    </>
  );
}

export default EditCourse;
