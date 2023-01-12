import React, { useEffect, useState } from 'react';
import { ButtonBase, Icon, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { deleteCommunity, deletePaymentGateway, getAllPaymentGateways } from '../../../../common/admin/admin_api';
import PaginationCalculate from '../../../../components/GuardModule/Utils/paginationCalculate';
import RouterPath from '../../../../common/constants/path/routerPath';

const PaymentGateways = () => {

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
            const { data } = await getAllPaymentGateways();
            setCommunity(data.data.payment_gateway)
            const indexoflast = (currentPage + 1) * postPerPage  //endoffset
            const indexoffirst = (indexoflast - postPerPage) //startoffset
            console.log(data.data);
            setCurrentPosts(data.data.payment_gateway.slice(indexoffirst, indexoflast))
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
        await deletePaymentGateway(id);
        window.location.reload();
    }

    const handleAddPremise = () => {
        navigate(RouterPath.ADD_PAYMENT_GATEWAY)
    }

    const handleEditClick = (data) => {

        navigate(RouterPath.EDIT_PAYMENT_GATEWAY, { state: { data } })
    }

    async function findText(e) {
        let text = community.filter(x => x.payment_gateway_name.toLowerCase().includes(e.target.value.toLowerCase()))
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
                    <label>Manage Payment Gateway</label>
                </div>
                <div>
                    <div className='table-top-right-content'>
                        <div className='table-search pl-2'>
                            <span><img src="/images/vendorlistsearch.svg" alt='search icon'></img></span>
                            <span><input className='search' placeholder='Search' onChange={(e) => { findText(e) }} /></span>
                        </div>

                        <div className="table-add-new-button" onClick={handleAddPremise}>

                            <span className='ml-2'>&#43; Add New Gateway</span>
                        </div>
                    </div>

                    <table id="table-header" class="table table-striped table-bordered table-sm " cellspacing="0">
                        <thead className='table-th'>
                            <tr>
                                <th class="th-sm" >ID No.</th>
                                <th class="th-sm">Payment Gateway Name</th>
                                <th class="th-sm">API Key</th>
                                <th class="th-sm">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentPosts.map((item, index) => {
                                return (
                                    <tr>
                                        <td>{index + 1 + (currentPage * postPerPage)}</td>
                                        <td>{item.payment_gateway_name}</td>
                                        <td>{item.payment_api_key?.slice(0, 5)}***</td>
                                        <td>
                                            <div>
                                                <IconButton onClick={() => { handleEditClick(item) }}>
                                                    <img src="/images/icon_edit.svg" />
                                                </IconButton>

                                                <IconButton onClick={() => removePremise(item.id)}>
                                                    <img src="/images/icon_delete.svg" />
                                                </IconButton>

                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}


                        </tbody>
                    </table>
                    {currentPosts.length > postPerPage && <div className='paginate'>
                        <PaginationCalculate totalPages={community.length} postperPage={postPerPage} currentPage={currentPage} paginate={paginate} />
                    </div>}
                </div >
            </div >

        </>)
}

export default PaymentGateways

