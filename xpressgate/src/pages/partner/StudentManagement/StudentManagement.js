import React from 'react'
import { ButtonUnstyled } from '@mui/base';
import PaginationCalculate from '../../../components/GuardModule/Utils/paginationCalculate';

function StudentManagement() {
    return (
        <>
        <div>
        <div className='page-label'>
          <label>Enrolled Student List</label>
        </div>
        <div>
          <div className="table-top-right-content">
            <div className='CNameSelectButn'>
              <select id="Course_name" name="course_name">
                <option value=" " disabled selected>Course Name</option>
                <option value=" "></option>
                <option value=" "></option>
              </select>
            </div>
            <div className="table-srch pl-2">
              <span>
                <img src="/images/vendorlistsearch.svg" alt="search icon"></img>
              </span>
              <span>
                <input className="search" placeholder="Search" />
              </span>
            </div>
            <div className="table-add-new-butn" onClick={() => { window.location.href = '/partner/student/addstudent' }}>
              <span className="ml-2">&#43; Add New Student</span>
            </div>
          </div>
        </div>
        <br/>
        <table id="table-header" class="table table-striped table-bordered table-sm " cellspacing="0">
                            <thead className='table-th'>
                                <tr>
                                    <th class="th-sm" >Student name</th>
                                    <th class="th-sm">Phone Number</th>
                                    <th class="th-sm">Email</th>
                                    <th class="th-sm">Payment</th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                        <tr>
                                            <td> 1</td>
                                            <td> 2 </td>
                                            <td> 3</td>
                                            <td><ButtonUnstyled className='Paid-Butn'> Paid </ButtonUnstyled></td>
                                           
                                        </tr>
                                
                               


                            </tbody>
                        </table>
                        <PaginationCalculate totalPages={" "} postperPage={" "} currentPage={" "} paginate={" "} />
          </div>
       </>
    )
}

export default StudentManagement