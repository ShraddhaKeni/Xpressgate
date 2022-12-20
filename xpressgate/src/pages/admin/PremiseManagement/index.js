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

    const [community, setCommunity] = useState([])
    const [currentPage, setCurrentpage] = useState(1)
    const [postPerPage, setPostPerPage] = useState(12)
    const [currentPosts, setCurrentPosts] = useState([])

    useEffect(() => {
        getCommunities()
    }, [])

    const getCommunities = async () => {
        try {
            const { data } = await axios.get(`${window.env_var}api/community/get`)
            setCommunity(data.data)
            const indexoflast = (currentPage) * postPerPage  //endoffset
            const indexoffirst = (indexoflast - postPerPage) //startoffset
            setCurrentPosts(data.data.slice(indexoffirst, indexoflast))
        } catch (error) {
            alert('Data loading failed.')
        }
    }
    async function paginate(event) {

        setCurrentpage(event.selected + 1)
        const indexoflast = (event.selected + 1) * postPerPage  //endoffset
        const indexoffirst = (indexoflast - postPerPage) //startoffset
        setCurrentPosts(community.slice(indexoffirst, indexoflast))
    }

    const removePremise = async (id) => {

    }

    const handleAddPremise = () => {
        navigate('/admin/premises/add')
    }

    const handleEditClick = (id) => {

        navigate('/admin/premises/edit', { state: { id } })
    }

    async function findText(e) {
        let text = community.filter(x => x.name.toLowerCase().includes(e.target.value.toLowerCase()))
        if (text) {
            setCurrentPosts(text)
        }
        else {
            await paginate(0)
        }

    }

    return (
        <div className="container pb-5">

            <div className='main-container mt-5'>

                <div className='table-top-right-content'>
                    <div className='table-search pl-2'>
                        <span><img src="/images/vendorlistsearch.svg" alt='search icon'></img></span>
                        <span><input className='search' placeholder='Search' onChange={(e) => { findText(e) }} /></span>
                    </div>
                    <div className="table-add-new-button" onClick={handleAddPremise}>
                        <img src="/images/ic_plus.svg" />
                        <span className='ml-2'> Add New Premise</span>
                    </div>
                </div>

                <table id="table-header" class="table table-light table-striped overflow-auto" cellspacing="0">
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
                        {currentPosts.map((item, index) => {
                            return (
                                <tr>
                                    <td>{(currentPage - 1) * 12 + (index + 1)}</td>
                                    <td>{item.name}</td>
                                    <td>{item.noofblocks}</td>
                                    <td><ButtonUnstyled className='approve-active'>{item.status == true ? 'Unapprove' : 'Approve'}</ButtonUnstyled></td>
                                    <td>
                                        <div>
                                            <IconButton onClick={() => { handleEditClick(item.id) }}>
                                                <img src="/images/icon_edit.svg" />
                                            </IconButton>

                                            {item.status === false ? <IconButton onClick={() => removePremise(item._id)}>
                                                <img src="/images/icon_delete.svg" />
                                            </IconButton> : ''}

                                        </div>
                                    </td>
                                </tr>
                            )
                        })}


                    </tbody>
                </table>
                {currentPosts.length > 0 && <div className='flex space-between mx-5'>
                    <p>Showing {currentPosts.length} of {community.length}</p>
                    <PaginationCalculate totalPages={community.length} postperPage={postPerPage} currentPage={currentPage} paginate={paginate} />
                </div>}
            </div >
        </div >
    )
}

export default PremiseList

