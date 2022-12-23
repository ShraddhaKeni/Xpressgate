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
                setAllCoupons(res.data.data.coupons);
                getCurrentCoupons(res.data.data.coupons)
            }
        }

        getCoupons();
    }, [])

    function getCurrentCoupons(data) {
        const lastPageIndex = (currentPage) * PageSize
        const firstPageIndex = lastPageIndex - PageSize;
        console.log(lastPageIndex, firstPageIndex);

        if (data.length < PageSize) {
            setCoupons(data?.slice(firstPageIndex, lastPageIndex));
            return data;
        }

        setCoupons(data?.slice(firstPageIndex, lastPageIndex));
    }

    const handleAddPremise = () => {
        navigate(RouterPath.ADD_COUPON)
    }

    const handlePageChange = (page) => {

        setCurrentPage(page.selected + 1);
        const lastPageIndex = (page.selected + 1) * PageSize
        const firstPageIndex = lastPageIndex - PageSize;
        console.log(lastPageIndex, firstPageIndex);
        setCoupons(allCoupons?.slice(firstPageIndex, lastPageIndex));

    }

    function findText(e) {
        let search = e.target.value.toLowerCase()
        let arr = allCoupons.filter(x => {
            console.log(x);
            if (x?.code?.toLowerCase()?.includes(search)) {
                return true
            }

        })
        console.log(arr);
        if (arr) {
            getCurrentCoupons(arr);
        }
        else {
            getCurrentCoupons(allCoupons);
        }

    }

    const handleEditClick = (someId) => {
        navigate(RouterPath.EDIT_COUPON)
    }
    return (
        <>
         <img src='/images/side_bar_img.svg' className='PAY_Coupans_side_Img' />
        <div>
            <div className='page-label'>
                <label>Coupons</label>
            </div>

            <div>

                <div className='table-top-right-content'>
                    <div className='table-srch pl-2'>
                        <span><img src="/images/vendorlistsearch.svg" alt='search icon'></img></span>
                        <span><input className='search' placeholder='Search' onChange={(e) => { findText(e) }} /></span>
                    </div>
                    <div className="table-add-new-butn" onClick={handleAddPremise}>
                        <span className='ml-2'>&#43; Add New Coupon</span>
                    </div>
                </div>

                <div id="cardsection pt-5">
                    <div className="row row-cols-1 row-cols-md-3 g-3 mb-5">

                        {coupons && coupons.map((coupon) => {

                            return <div className="col" key={coupon.id}>
                                <div className="Coupon-card-green ">
                                    <div className='d-flex justify-content-end mr-5'><button className={`${coupon.status == 1 ? 'highlight-active' : 'highlight-inactive'} p-2 px-3`}><span className={`${coupon.status == 1 ? 'dot' : 'dot-inactive'}`}></span>{coupon.status == 1 ? 'Active' : 'Inactive'}</button></div>
                                    <div>
                                        <p className='dash-Coupon_heading-sm'>{coupon.name || "n/a"}</p>
                                        <p className='Coupon_heading'>{coupon.code || "n/a"}</p>
                                        <p className='dash-Coupon_heading-md'>{coupon.amount || "n/a"}</p>
                                        <Link to={`${RouterPath.COUPON_DETAILS}`} state={{ coupon }} type="button" className="btn btn-primary blue-bg">View</Link>
                                    </div>
                                </div>

                            </div>


                        })}


                    </div>
                    {allCoupons?.length &&
                        <div className="paginate" style={{ marginTop: '8%' }}>
                            <PaginationCalculate totalPages={allCoupons.length} postperPage={PageSize} currentPage={currentPage} paginate={handlePageChange} />
                        </div>
                    }
                </div>

            </div >

        </div >
        </>
    )
}
