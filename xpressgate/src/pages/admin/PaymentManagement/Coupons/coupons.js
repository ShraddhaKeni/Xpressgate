import React, { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { getAllCoupons } from '../../../../common/admin/admin_api';
import RouterPath from '../../../../common/constants/path/routerPath';
import PaginationCalculate from '../../../../components/GuardModule/Utils/paginationCalculate';
let PageSize = 6;

export const CouponsList = () => {

    const navigate = useNavigate();

    const [coupons, setCoupons] = useState();
    const [allCoupons, setAllCoupons] = useState();
    const [currentPage, setCurrentPage] = useState(1);



    useEffect(() => {
        async function getCoupons() {
            const res = await getAllCoupons();
            if (res && res.data.status_code == 200) {
                setCoupons(getCurrentCoupons(res.data.data.block))
            }
        }

        getCoupons();
    }, [])

    function getCurrentCoupons(data) {
        console.log(data);
        const firstPageIndex = (currentPage) * PageSize
        const lastPageIndex = firstPageIndex + PageSize;
        setAllCoupons(data);
        return data?.slice(firstPageIndex, lastPageIndex);
    }

    const handleAddPremise = () => {
        navigate(RouterPath.ADD_COUPON)
    }

    const handlePageChange = (page) => {

        setCurrentPage(page.selected);

        setCoupons(getCurrentCoupons(allCoupons));

    }

    const handleEditClick = (someId) => {
        navigate(RouterPath.EDIT_COUPON)
    }
    return (
        <div className="container pb-5">
            <div className='page-label'>
                <label>Coupons</label>
            </div>
            <div className='main-container mt-5'>

                <div className='table-top-right-content'>
                    <div className='table-search pl-2'>
                        <span><img src="/images/vendorlistsearch.svg" alt='search icon'></img></span>
                        <span><input className='search' placeholder='Search' onChange={(e) => { }} /></span>
                    </div>
                    <div className="table-add-new-button" onClick={handleAddPremise}>
                        <img src="/images/ic_plus.svg" />  Add New Coupon
                    </div>
                </div>

                <div id="cardsection">
                    <div className="row row-cols-1 row-cols-md-3 g-3 mb-5">

                        {coupons && coupons.map((coupon) => {

                            return <div className="col" key={coupon.id}>
                                <div className="card-green ">
                                    <div className='d-flex justify-content-end mr-5'><button className={`${coupon.status == 1 ? 'highlight-active' : 'highlight-inactive'} p-2 px-3`}><span className={`${coupon.status == 1 ? 'dot' : 'dot-inactive'}`}></span>{coupon.status == 1 ? 'Active' : 'Inactive'}</button></div>
                                    <div>
                                        <p className='dash-heading-sm'>{coupon.name || "n/a"}</p>
                                        <p className='dash-heading'>{coupon.code || "n/a"}</p>
                                        <p className='dash-heading-md'>{coupon.amount || "n/a"}</p>
                                        <Link to={`${RouterPath.COUPON_DETAILS}`} state={{ coupon }} type="button" className="btn btn-primary blue-bg">View</Link>
                                    </div>
                                </div>

                            </div>


                        })}

                    </div>
                </div>

                {allCoupons && <div className='flex space-between'>
                    <p>Showing {currentPage} of {`${Math.ceil(allCoupons.length / PageSize)}`}</p>

                    {/* <PaginationCalculate totalPages={Math.ceil(allCoupons.length / PageSize)} postperPage={PageSize} currentPage={currentPage} paginate={handlePageChange} /> */}
                    <PaginationCalculate totalPages={Math.ceil(allCoupons.length / PageSize)} postperPage={3} currentPage={currentPage} paginate={handlePageChange} />

                </div>}

            </div >
        </div >
    )
}
