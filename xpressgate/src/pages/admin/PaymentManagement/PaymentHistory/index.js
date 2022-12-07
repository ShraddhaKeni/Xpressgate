import { ButtonUnstyled } from '@mui/base';
import { IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PaginationCalculate from '../../../../components/GuardModule/Utils/paginationCalculate';


export const PaymentsHistory = () => {

    const navigate = useNavigate();

    const handleSubmit = async (e) => {

    }

    const handleAddPremise = (someId) => {
        navigate('/admin/premises/add')
    }

    const handleEditClick = (someId) => {
        navigate('/admin/premises/edit')
    }

    return (
        <div className="container pb-5">
            <div className='page-label'>
                <label>Payment History</label>
            </div>
            <div className='main-container mt-5'>

                <div className='table-top-right-content search-right mb-5'>
                    <div className='table-search'>
                        <span><img src="/images/vendorlistsearch.svg" alt='search icon'></img></span>
                        <span><input className='search_input' placeholder='Search' onChange={(e) => { }} /></span>
                    </div>
                </div>

                <table id="table-header" class="table table-striped " cellspacing="0">
                    <thead className='table-th'>
                        <tr>
                            <th class="th-sm">ID No.</th>
                            <th class="th-sm">Payment Type</th>
                            <th class="th-sm">Date</th>
                            <th class="th-sm">Amount</th>
                            <th class="th-sm">Status</th>
                            <th class="th-sm"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>!</td>
                            <td>!</td>
                            <td>!</td>
                            <td>!</td>
                            <td> <p className='status-pending'>Pending</p></td>
                            <td>
                                <ButtonUnstyled className='download-invoice'>Download Invoice</ButtonUnstyled>
                            </td>
                        </tr>
                        <tr>
                            <td>!</td>
                            <td>!</td>
                            <td>!</td>
                            <td>!</td>
                            <td>
                                <p className='status-success'>Completed</p>
                            </td>
                            <td>
                                <ButtonUnstyled className='download-invoice'>Download Invoice</ButtonUnstyled>
                            </td>
                        </tr>
                        <tr>
                            <td>!</td>
                            <td>!</td>
                            <td>!</td>
                            <td>!</td>
                            <td>
                                <p className='status-failed'>Failed</p>
                            </td>
                            <td>
                                <ButtonUnstyled className='download-invoice'>Download Invoice</ButtonUnstyled>
                            </td>
                        </tr>
                        <tr>
                            <td>!</td>
                            <td>!</td>
                            <td>!</td>
                            <td>!</td>
                            <td>
                                <p className='status-pending'>Pending</p>
                            </td>
                            <td>
                                <ButtonUnstyled className='download-invoice'>Download Invoice</ButtonUnstyled>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className='flex space-between'>
                    <p>Showing 6 of 20</p>
                    <PaginationCalculate totalPages={10} postperPage={20} currentPage={2} paginate={10} />
                </div>

            </div >
        </div >
    )
}
