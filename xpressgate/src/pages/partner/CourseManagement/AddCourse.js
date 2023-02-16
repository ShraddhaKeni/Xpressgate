import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { SimpleDropDownComponent, SimpleInputComponent } from '../../admin/components/input';
import { Form } from 'react-bootstrap';
function AddCourse() {
  return (
    <>
      <div>
        <div className="page-label">
          <label>Add New Course</label>
        </div>
        <div>

<Form className='fcadmin' method='POST' >

    <SimpleInputComponent label={'Course Name'} placeholder={'Enter Course Name'} name={'Course Name'} required />
    <SimpleDropDownComponent items={[{ id: 1, option: 'Fashion' }, { id: 2, option: ' ' }]} label={'Category'} name={'Category'} id={'Cousre_Category'}  />
    <SimpleInputComponent label={'Maximum no of Students'} placeholder={'No of Students'} name={'Maximum no of Students'} required  />
    <SimpleDropDownComponent items={[{ id: 1, option: 'Online' }, { id: 2, option: 'Offline' }]} label={'Course Type'} name={'Course Type'} id={'Course_Type'}  />
    < SimpleInputComponent label={'Fees'} name={'Fees'} placeholder={'Fees'}  type={'number'} required />
    <SimpleInputComponent label={'Course Details'} placeholder={'Enter Course Details'} type={'textarea'} name={'Course Details'}  />



    <button type="submit" className="BTN_ADD_premise " >Add</button>

</Form>

</div>
        </div>
  
    </>
  );
}

export default AddCourse;
