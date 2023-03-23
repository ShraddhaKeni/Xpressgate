import React, { useEffect, useState } from 'react';
import PaginationCalculate from '../../../components/GuardModule/Utils/paginationCalculate';
import { SimpleInputComponent } from '../components/input';
import { ButtonBase, Icon, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { ButtonUnstyled } from '@mui/base';
import { MaterialButton } from '../components/MaterialButton';
import axios from 'axios';
import { deletePartner } from '../../../common/admin/admin_api';
import { Loader } from '../../../components/Loader';
import { ToastMessage } from '../../../components/ToastMessage';

const PartnerList = () => {

    const navigate = useNavigate();
    const [toast, setToast] = useState({ show: false })

    const [partner, setPartner] = useState([])
    const [currentPage, setCurrentpage] = useState(0)
    const [postPerPage, setPostPerPage] = useState(10)
    const [currentPosts, setCurrentPosts] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCommunities()
    }, [])

    const getCommunities = async () => {
        try {
            const { data } = await axios.get(`${window.env_var}api/partner`)
            setPartner(data.data)
            const indexoflast = (currentPage + 1) * postPerPage  //endoffset
            const indexoffirst = (indexoflast - postPerPage) //startoffset
            console.log(data.data);
            setCurrentPosts(data.data.slice(indexoffirst, indexoflast))
            setLoading(false);
        } catch (error) {

        }
    }
    async function paginate(event) {

        setCurrentpage(event.selected)
        const indexoflast = (event.selected + 1) * postPerPage  //endoffset
        const indexoffirst = (indexoflast - postPerPage) //startoffset
        setCurrentPosts(partner.slice(indexoffirst, indexoflast))
    }

    const removePremise = async (id) => {
        await deletePartner(id);
        setToast({ show: true, type: "success", message: "Deleted Successfully!" });
        getCommunities();
    }

    const handleAddPartner = () => {
        navigate('/addnewpartner')
    }

    const handleEditClick = (id) => {

        navigate('/updatepartner', { state: { id } })
    }

    async function findText(e) {
        let text = partner.filter(x => x.name.toLowerCase().includes(e.target.value.toLowerCase()))
        if (text) {
            setCurrentPosts(text)
        }
        else {
            await paginate(0)
        }

    }

    return (
        <>
            <ToastMessage show={toast.show} message={toast.message} type={toast.type} handleClose={() => { setToast({ show: false }) }} />

            {/* <Loader loading={loading}> */}
                <div>
                    <div className='page-label'>
                        <label>Partner Management</label>
                    </div>
                    <div>
                        <div className='table-top-right-content'>
                            <div className='table-search pl-2'>
                                <span><img src="/images/vendorlistsearch.svg" alt='search icon'></img></span>
                                <span><input className='search' placeholder='Search' onChange={(e) => { findText(e) }}  /></span>
                            </div>

                            <div className="table-add-new-button" onClick={handleAddPartner}>

                                <span className='ml-2'>&#43; Add New Partner</span>
                            </div>
                        </div>

                        <table id="table-header" class="table table-striped table-bordered table-sm " cellspacing="0">
                            <thead className='table-th'>
                                <tr>
                                    <th class="th-sm" >Sr No.</th>
                                    <th class="th-sm">First Name</th>
                                    <th class="th-sm">Last Name</th>
                                    <th class="th-sm">Mobile No.</th>
                                    <th class="th-sm">Status</th>
                                    <th class="th-sm">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentPosts.map((item, index) => {
                                    return (
                                        <tr>
                                            <td>{index + 1 + (currentPage * postPerPage)}</td>
                                            <td>{item.firstname}</td>
                                            <td>{item.lastname}</td>
                                            <td>{item.mobileno}</td>
                                     
                                            <td><ButtonUnstyled className='approve-active'>{item.status == true ? 'Active' : 'InActive'}</ButtonUnstyled></td>
                                            <td>
                                                <div>
                                                    <IconButton onClick={() => { handleEditClick(item._id) }}>
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
                        <br/>
                        {partner.length > postPerPage && <div className='paginate'>
                            <PaginationCalculate totalPages={partner.length} postperPage={postPerPage} currentPage={currentPage} paginate={paginate} />
                        </div>}
                    </div >
                </div >
            {/* </Loader> */}

        </>)
}

export default PartnerList

