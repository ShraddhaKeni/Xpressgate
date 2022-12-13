import { ButtonUnstyled } from '@mui/base';
import { IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllPlans, getPaymentHistory } from '../../../../common/admin/admin_api';
import PaginationCalculate from '../../../../components/GuardModule/Utils/paginationCalculate';

const PageSize = 10;
export const PaymentsHistory = () => {

    const navigate = useNavigate();

    const [history, setHistory] = useState();
    const [allHistory, setAllHistory] = useState();
    const [currentPage, setCurrentPage] = useState(1);

    const openInNewTab = (url) => {

        window.open(url, '_blank', 'noopener,noreferrer');
    };


    const handlePageChange = (page) => {

        setCurrentPage(page.selected);

        setHistory(getCurrentHistory(allHistory));

    }


    useEffect(() => {
        async function getPayments() {
            const res = await getPaymentHistory();
            if (res && res.data.status_code == 200) {
                setHistory(getCurrentHistory(res.data.data))
            }
        }

        getPayments();
    }, [])

    function getCurrentHistory(data) {
        if (data.length < PageSize) {
            return data;
        }
        const firstPageIndex = (currentPage) * PageSize
        const lastPageIndex = firstPageIndex + PageSize;
        return data?.slice(firstPageIndex, lastPageIndex);
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
                    <div className='table-search pl-2'>
                        <span><img src="/images/vendorlistsearch.svg" alt='search icon'></img></span>
                        <span><input className='search_input' placeholder='Search' onChange={(e) => { }} /></span>
                    </div>
                </div>

                <table id="table-header" class="table table-light table-striped" cellspacing="0">
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
                                <td>{item.payment_type}</td>
                                <td>{item.payment_date || "n/a"}</td>
                                <td>{item.amount}</td>
                                <td> <p className={`status-${item.status_name.toLowerCase()}`}>{item.status_name}</p></td>
                                <td>
                                    <ButtonUnstyled className='download-invoice' onClick={() => openInNewTab(item.invoice_url)}>Download Invoice</ButtonUnstyled>
                                </td>
                            </tr>
                        })}

                    </tbody>
                </table>
                {allHistory && <div className='flex space-between'>
                    <p>Showing {currentPage} of {`${Math.ceil(allHistory.length / PageSize)}`}</p>

                    {/* <PaginationCalculate totalPages={Math.ceil(allCoupons.length / PageSize)} postperPage={PageSize} currentPage={currentPage} paginate={handlePageChange} /> */}
                    <PaginationCalculate totalPages={Math.ceil(allHistory.length / PageSize)} postperPage={PageSize} currentPage={currentPage} paginate={handlePageChange} />

                </div>}

            </div >
        </div >
    )
}
