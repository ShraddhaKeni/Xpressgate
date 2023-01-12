import React, { useEffect, useState } from 'react';
import PaginationCalculate from '../../../components/GuardModule/Utils/paginationCalculate';
import { SimpleInputComponent } from '../components/input';
import { ButtonBase, Icon, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { ButtonUnstyled } from '@mui/base';
import { MaterialButton } from '../components/MaterialButton';
import axios from 'axios';
import { deleteCommunity } from '../../../common/admin/admin_api';

const PremiseList = () => {

    const navigate = useNavigate();

    const [community, setCommunity] = useState([])
    const [currentPage, setCurrentpage] = useState(0)
    const [postPerPage, setPostPerPage] = useState(10)
    const [currentPosts, setCurrentPosts] = useState([])

    useEffect(() => {
        getCommunities()
    }, [])

    const getCommunities = async () => {
        try {
            const { data } = await axios.get(`${window.env_var}api/community/get`)
            setCommunity(data.data.community)
            const indexoflast = (currentPage + 1) * postPerPage  //endoffset
            const indexoffirst = (indexoflast - postPerPage) //startoffset
            console.log(data.data);
            setCurrentPosts(data.data.community.slice(indexoffirst, indexoflast))
        } catch (error) {

        }
    }
    async function paginate(event) {

        setCurrentpage(event.selected)
        const indexoflast = (event.selected + 1) * postPerPage  //endoffset
        const indexoffirst = (indexoflast - postPerPage) //startoffset
        setCurrentPosts(community.slice(indexoffirst, indexoflast))
    }

    const removePremise = async (id) => {
        await deleteCommunity(id);
        window.location.reload();
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
        <>
            <img src='/images/side_bar_img.svg' className='Premise_side_Img' />
            <div>
                <div className='page-label'>
                    <label>Premise Management</label>
                </div>
                <div>
                    <div className='table-top-right-content'>
                        <div className='table-search pl-2'>
                            <span><img src="/images/vendorlistsearch.svg" alt='search icon'></img></span>
                            <span><input className='search' placeholder='Search' onChange={(e) => { findText(e) }} /></span>
                        </div>

                        <div className="table-add-new-button" onClick={handleAddPremise}>

                            <span className='ml-2'>&#43; Add New Premise</span>
                        </div>
                    </div>

                    <table id="table-header" class="table table-striped table-bordered table-sm " cellspacing="0">
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
                                        <td>{index + 1 + (currentPage * postPerPage)}</td>
                                        <td>{item.name}</td>
                                        <td>{item.noofblocks}</td>
                                        <td><ButtonUnstyled className='approve-active'>{item.status == true ? 'Unapprove' : 'Approve'}</ButtonUnstyled></td>
                                        <td>
                                            <div>
                                                <IconButton onClick={() => { handleEditClick(item.id) }}>
                                                    <img src="/images/icon_edit.svg" />
                                                </IconButton>

                                                {item.status === true ? <IconButton onClick={() => removePremise(item._id)}>
                                                    <img src="/images/icon_delete.svg" />
                                                </IconButton> : ''}

                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}


                        </tbody>
                    </table>
                    {community.length > postPerPage && <div className='paginate'>
                        <PaginationCalculate totalPages={community.length} postperPage={postPerPage} currentPage={currentPage} paginate={paginate} />
                    </div>}
                </div >
            </div >

        </>)
}

export default PremiseList

