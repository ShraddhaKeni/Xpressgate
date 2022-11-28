import React, { useEffect, useState } from 'react';
import '../../../styles/premises.css';
import PaginationCalculate from '../../../components/GuardModule/Utils/paginationCalculate';
import { SimpleInputComponent } from '../components/input';
import { ButtonBase, Icon, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { ButtonUnstyled } from '@mui/base';
import { MaterialButton } from '../components/MaterialButton';

const PremiseList = () => {

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
        <div className="addvehiclecontainer">

            <div className='avbackgroundimg center-vertical'>

                <div className='table-top-right-content'>
                    <div className='table-search'>
                        <span><img src="/images/vendorlistsearch.svg" alt='search icon'></img></span>
                        <span><input className='search_input' placeholder='Search' onChange={(e) => { }} /></span>
                    </div>
                    <div className="table-add-new-button" onClick={handleAddPremise}>
                        <img src="/images/ic_plus.svg" /> Add new Premise
                    </div>
                </div>

                <table id="table-header" class="table table-striped " cellspacing="0">
                    <thead className='table-th'>
                        <tr>
                            <th class="th-sm">ID No.</th>
                            <th class="th-sm">Premise Name</th>
                            <th class="th-sm">No of Blocks</th>
                            <th class="th-sm">Status</th>
                            <th class="th-sm">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>!</td>
                            <td>!</td>
                            <td>!</td>
                            <td><ButtonUnstyled className='approve-active'>Approve</ButtonUnstyled></td>
                            <td>
                                <div>
                                    <IconButton>
                                        <img src="/images/icon_edit.svg" />
                                    </IconButton>
                                    <IconButton>
                                        <img src="/images/icon_delete.svg" /></IconButton>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>!</td>
                            <td>!</td>
                            <td>!</td>
                            <td><ButtonUnstyled className='approve-inactive' disabled>Approved</ButtonUnstyled></td>
                            <td>
                                <div>
                                    <IconButton>
                                        <img src="/images/icon_edit.svg" />
                                    </IconButton>
                                    <IconButton>
                                        <img src="/images/icon_delete.svg" /></IconButton>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>!</td>
                            <td>!</td>
                            <td>!</td>
                            <td>!</td>
                            <td>
                                <div>
                                    <IconButton>
                                        <img src="/images/icon_edit.svg" />
                                    </IconButton>
                                    <IconButton>
                                        <img src="/images/icon_delete.svg" /></IconButton>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>!</td>
                            <td>!</td>
                            <td>!</td>
                            <td>!</td>
                            <td>
                                <div>
                                    <IconButton onClick={(e) => { handleEditClick('some_id') }}>
                                        <img src="/images/icon_edit.svg" />
                                    </IconButton>
                                    <IconButton>
                                        <img src="/images/icon_delete.svg" /></IconButton>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <PaginationCalculate totalPages={10} postperPage={20} currentPage={2} paginate={10} />

            </div >
        </div >
    )
}

export default PremiseList

