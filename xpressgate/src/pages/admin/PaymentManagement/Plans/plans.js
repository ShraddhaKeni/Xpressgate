import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { getAllPlans } from '../../../../common/admin/admin_api';
import RouterPath from '../../../../common/constants/path/routerPath';
import PaginationCalculate from '../../../../components/GuardModule/Utils/paginationCalculate';
import { Loader } from '../../../../components/Loader';
let PageSize = 6;
export const PlansList = () => {

    const navigate = useNavigate();

    const [plans, setPlans] = useState();

    const [loading, setLoading] = useState(true);

    const [allPlans, setAllPlans] = useState();
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        async function getCoupons() {
            const res = await getAllPlans();
            if (res && res.data.status_code == 200) {
                console.log(res.data.data.plan);
                setAllPlans(res.data.data.plan);
                getCurrentPlans(res.data.data.plan)
            }
            setLoading(false);
        }
        getCoupons();
    }, [])

    function getCurrentPlans(data) {
        const lastPageIndex = (currentPage) * PageSize
        const firstPageIndex = lastPageIndex - PageSize;
        console.log(lastPageIndex, firstPageIndex);

        if (data.length < PageSize) {
            setPlans(data?.slice(firstPageIndex, lastPageIndex));
            return data;
        }

        setPlans(data?.slice(firstPageIndex, lastPageIndex));
    }
    const handlePageChange = (page) => {
        setCurrentPage(page.selected + 1);
        const lastPageIndex = (page.selected + 1) * PageSize
        const firstPageIndex = lastPageIndex - PageSize;
        console.log(lastPageIndex, firstPageIndex);
        setPlans(allPlans?.slice(firstPageIndex, lastPageIndex));
    }



    const handleAddPlan = () => {
        navigate(RouterPath.ADD_PLAN)
    }

    const handleEditClick = (someId) => {
        navigate(RouterPath.PLAN_DETAILS)
    }


    function findText(e) {
        let search = e.target.value.toLowerCase()
        let arr = allPlans.filter(x => {
            if (x.name.toLowerCase().includes(search)) {
                return true
            }

        })
        console.log(arr);
        if (arr) {
            getCurrentPlans(arr);
        }
        else {
            getCurrentPlans(allPlans);
        }

    }


    return (
        <>
            <Loader loading={loading}>
                <div>
                    <div className='page-label'>
                        <label>Subscription Plan</label>
                    </div>
                    <div>

                        <div className='table-top-right-content'>
                            <div className='table-srch pl-2'>
                                <span><img src="/images/vendorlistsearch.svg" alt='search icon'></img></span>
                                <span><input className='search' placeholder='Search' onChange={(e) => { findText(e) }} /></span>
                            </div>
                            <div className="table-add-new-butn" onClick={handleAddPlan}>
                                <span className='ml-2'>&#43; Add New Plan</span>

                            </div>
                        </div>

                        <div id="cardsection">
                            <div className="row row-cols-1 row-cols-md-3 g-3 mb-5 allcards">

                                {console.log("Main", plans)}
                                {plans && plans.map((plan) => {

                                    return <div className="col card_hover_animation" key={plan.id}>
                                        <div className="col">
                                            <div className="Coupon-card-green ">
                                                <div className='d-flex justify-content-end mr-5'><button className={`${plan.status == true ? 'highlight-active' : 'highlight-inactive'} p-2 px-3`}><span className={`${plan.status == true ? 'dot' : 'dot-inactive'}`}></span>{plan.status == true ? 'Active' : 'Inactive'}</button></div>
                                                <div>
                                                    <p className='dash-Coupon_heading-sm'>{plan.name}</p>
                                                    <p className='Coupon-heading'>{plan.code || 'N/A'}</p>
                                                    <p className='dash-Coupon_heading-md'><b>{plan.type || 'N/A'}</b></p>
                                                    <Link to={`${RouterPath.PLAN_DETAILS}`} state={{ plan }} type="button" className="btn btn-primary blue-bg">View</Link>
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                })}



                            </div>
                        </div>

                        {allPlans && <div className='paginate'>
                            {/* <PaginationCalculate totalPages={Math.ceil(allCoupons.length / PageSize)} postperPage={PageSize} currentPage={currentPage} paginate={handlePageChange} /> */}
                            <PaginationCalculate totalPages={allPlans.length} postperPage={PageSize} currentPage={currentPage} paginate={handlePageChange} />

                        </div>}

                    </div >
                </div >
            </Loader>
        </>
    )
}
