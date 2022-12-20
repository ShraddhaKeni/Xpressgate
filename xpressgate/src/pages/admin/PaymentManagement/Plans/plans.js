import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { getAllPlans } from '../../../../common/admin/admin_api';
import RouterPath from '../../../../common/constants/path/routerPath';
import PaginationCalculate from '../../../../components/GuardModule/Utils/paginationCalculate';
let PageSize = 6;
export const PlansList = () => {

    const navigate = useNavigate();

    const [plans, setPlans] = useState();


    const [allPlans, setAllPlans] = useState();
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        async function getCoupons() {
            const res = await getAllPlans();
            if (res && res.data.status_code == 200) {
                console.log(res.data.data.plan);
                setPlans(getCurrentPlans(res.data.data.plan))
            }
        }
        getCoupons();
    }, [])

    function getCurrentPlans(data) {
        if (data.length < PageSize) {
            return data;
        }
        const firstPageIndex = (currentPage) * PageSize
        const lastPageIndex = firstPageIndex + PageSize;
        return data?.slice(firstPageIndex, lastPageIndex);
    }
    const handlePageChange = (page) => {

        setCurrentPage(page.selected);

        setPlans(getCurrentPlans(allPlans));

    }



    const handleAddPlan = () => {
        navigate(RouterPath.ADD_PLAN)
    }

    const handleEditClick = (someId) => {
        navigate(RouterPath.PLAN_DETAILS)
    }
    return (
        <div className="container pb-5">
            <div className='page-label'>
                <label>Subscription Plan</label>
            </div>
            <div className='main-container'>

                <div className='table-top-right-content'>
                    <div className='table-search pl-2'>
                        <span><img src="/images/vendorlistsearch.svg" alt='search icon'></img></span>
                        <span><input className='search' placeholder='Search' onChange={(e) => { }} /></span>
                    </div>
                    <div className="table-add-new-button" onClick={handleAddPlan}>
                        <img src="/images/ic_plus.svg" />
                        <span className='ml-2'> Add New Plan</span>

                    </div>
                </div>

                <div id="cardsection">
                    <div className="row row-cols-1 row-cols-md-3 g-3 mb-5">

                        {plans && plans.map((plan) => {
                            console.log("Main", plan);
                            return <div className="col" key={plan.id}>
                                <div className="col">
                                    <div className="card-green">
                                        <div className='d-flex justify-content-end mr-5'><button className={`${plan.status == true ? 'highlight-active' : 'highlight-inactive'} p-2 px-3`}><span className={`${plan.status == true ? 'dot' : 'dot-inactive'}`}></span>{plan.status == true ? 'Active' : 'Inactive'}</button></div>
                                        <div>
                                            <p className='dash-heading-sm'>{plan.name}</p>
                                            <p className='dash-heading'>{plan.code || 'N/A'}</p>
                                            <p className='dash-heading-md'><b>{plan.type || 'N/A'}</b></p>
                                            <Link to={`${RouterPath.PLAN_DETAILS}`} state={{ plan }} type="button" className="btn btn-primary blue-bg">View</Link>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        })}



                    </div>
                </div>

                {allPlans && <div className='flex space-between'>
                    <p>Showing {currentPage} of {`${Math.ceil(allPlans.length / PageSize)}`}</p>

                    {/* <PaginationCalculate totalPages={Math.ceil(allCoupons.length / PageSize)} postperPage={PageSize} currentPage={currentPage} paginate={handlePageChange} /> */}
                    <PaginationCalculate totalPages={Math.ceil(allPlans.length / PageSize)} postperPage={3} currentPage={currentPage} paginate={handlePageChange} />

                </div>}

            </div >
        </div >
    )
}
