import { ButtonUnstyled } from '@mui/base';
import { IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllPlans, getPaymentHistory, getPaymentHistoryByCommunityId } from '../../../../common/admin/admin_api';
import RouterPath from '../../../../common/constants/path/routerPath';
import PaginationCalculate from '../../../../components/GuardModule/Utils/paginationCalculate';

const PageSize = 10;
export const PremisesPayHistory = ({ route }) => {

    const navigate = useNavigate();

    const [history, setHistory] = useState();
    const [allHistory, setAllHistory] = useState();
    const [currentPage, setCurrentPage] = useState(0);

    const openInNewTab = (url) => {

        window.open(url, '_blank', 'noopener,noreferrer');
    };


    const handlePageChange = (page) => {

        setCurrentPage(page.selected + 1);
        const lastPageIndex = (page.selected + 1) * PageSize
        const firstPageIndex = lastPageIndex - PageSize;
        setHistory(allHistory?.slice(firstPageIndex, lastPageIndex));

    }


    useEffect(() => {
        async function getPayments() {
            const res = await getPaymentHistoryByCommunityId('632970d054edb049bcd0f0b4');
            if (res && res.data.status_code == 200) {
                let d = res.data.data;
                setAllHistory(d);
                setHistory(getCurrentHistory(d));
            }
        }

        getPayments();
    }, [])

    function getCurrentHistory(data) {
        if (data.length < PageSize) {
            return data;
        }
        const lastPageIndex = (currentPage) * PageSize
        const firstPageIndex = lastPageIndex - PageSize;
        console.log(lastPageIndex, firstPageIndex);
        setHistory(data?.slice(firstPageIndex, lastPageIndex));
    }

    const handleAddPremise = (someId) => {
        navigate('/admin/premises/add')
    }

    const handleEditClick = (someId) => {
        navigate('/admin/premises/edit')
    }

    function findText(e) {
        let search = e.target.value.toLowerCase()
        let arr = allHistory.filter(x => {
            if (x.payment_type_name.toLowerCase().includes(search)) {
                return true
            }

        })
        if (arr) {
            setHistory(getCurrentHistory(arr));
        }
        else {
            setHistory(getCurrentHistory(allHistory))
        }

    }

    return (
        <>
         <img src='/images/side_bar_img.svg' className='PAY_Coupans_side_Img' />
        <div>
            <div className='page-label'>
                <label>Payment History</label>
            </div>
            <div>

                <div className='table-top-right-content search-right mb-5'>
                    <div className='Table-Search pl-2'>
                        <span><img src="/images/vendorlistsearch.svg" alt='search icon'></img></span>
                        <span><input className='search' placeholder='Search' onChange={(e) => { findText(e) }} /></span>
                    </div>
                </div>

                <table id="table-header" class="table table-striped table-bordered table-sm " style={{ border: '2px solid black' }} cellspacing="0">

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
                        {history && history.map((item) => {
                            return <tr>
                                <td>{item.pg_transection_id}</td>
                                <td>{item.payment_type_name}</td>
                                <td>{item.date?.slice(0, 10) || "n/a"}</td>
                                <td>{item.amount}</td>
                                <td> <p className={`status-${item.status_name.toLowerCase()}`}>{item.status_name}</p></td>
                                <td>
                                    <ButtonUnstyled className='download-invoice' onClick={() => openInNewTab(item.invoice_url)}>Download Invoice</ButtonUnstyled>
                                </td>
                            </tr>
                        })}

                    </tbody>
                </table>
                {allHistory && <div className='paginate'>
                    {/* <PaginationCalculate totalPages={Math.ceil(allCoupons.length / PageSize)} postperPage={PageSize} currentPage={currentPage} paginate={handlePageChange} /> */}
                    <PaginationCalculate totalPages={allHistory.length} postperPage={PageSize} currentPage={currentPage} paginate={handlePageChange} />

                </div>}

            </div >
        </div >
        </>
    )
}
