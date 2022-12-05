import React, { useEffect, useState } from 'react';
import '../../../styles/premises.css';
import PaginationCalculate from '../../../components/GuardModule/Utils/paginationCalculate';
import { SimpleInputComponent } from '../components/input';
import { ButtonBase, Icon, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { ButtonUnstyled } from '@mui/base';
import { MaterialButton } from '../components/MaterialButton';
import axios from 'axios';

const PremiseList = () => {

    const navigate = useNavigate();

    const [community,setCommunity] = useState([])

    useEffect(()=>{
        getCommunities()
    },[])

    const getCommunities=async()=>{
        try {
            const {data} = await axios.get(`${window.env_var}api/community/get`)
            setCommunity(data.data.community)
        } catch (error) {
            alert('Data loading failed.')
        }
    }


    const handleSubmit = async (e) => {

    }

    const handleAddPremise = () => {
        navigate('/admin/premises/add')
    }

    const handleEditClick = (id) => {
        
        navigate('/admin/premises/edit',{state:{id}})
    }

    return (
        <div className="container pb-5">

            <div className='main-container mt-5'>

                <div className='table-top-right-content'>
                    <div className='table-search'>
                        <span><img src="/images/vendorlistsearch.svg" alt='search icon'></img></span>
                        <span><input className='search_input' placeholder='Search' onChange={(e) => { }} /></span>
                    </div>
                    <div className="table-add-new-button" onClick={handleAddPremise}>
                        <img src="/images/ic_plus.svg" /> Add new Premise
                    </div>
                </div>

                <table id="table-header" class="table table-striped overflow-auto" cellspacing="0">
                    <thead className='table-th'>
                        <tr>
                            <th class="th-sm" >ID No.</th>
                            <th class="th-sm">Premise Name</th>
                            <th class="th-sm">No of Blocks</th>
                            <th class="th-sm">Status</th>
                            <th class="th-sm">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {community.map((item,index)=>{
                            return(
                                <tr>
                                    <td>!</td>
                                    <td>{item.name}</td>
                                    <td>{item.noofblocks}</td>
                                    <td><ButtonUnstyled className='approve-active'>{item.status==true?'Unapprove':'Approve'}</ButtonUnstyled></td>
                                    <td>
                                        <div>
                                            <IconButton onClick={()=>{handleEditClick(item.id)}}>
                                                <img src="/images/icon_edit.svg" />
                                            </IconButton>
                                            <IconButton>
                                                <img src="/images/icon_delete.svg" /></IconButton>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                        
                        
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

export default PremiseList

