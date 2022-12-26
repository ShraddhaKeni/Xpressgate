import React, { useEffect, useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { deletePlan, deleteplan, getAllplans, getPlanById, getplanById, updatePlan, updateplan } from '../../../../common/admin/admin_api';
import RouterPath from '../../../../common/constants/path/routerPath';

export const PlanDetails = () => {

    const location = useLocation();

    const navigate = useNavigate()




    const [plan, setplans] = useState(location?.state?.plan);



    const handleDelete = async () => {
        const res = await deletePlan(plan.id)
        console.log(res)
        if (res && res.data?.status_code == 200) {
            navigate(RouterPath.PRLANS_LIST)
        }
    }

    const toggleActive = async () => {
        let updatedPlan = plan;
        updatedPlan.status = updatedPlan.status == 1 ? 0 : 1;
        setplans(updatedPlan);
        const res = await updatePlan(updatedPlan)
        console.log(updatedPlan)
        if (res && res.data?.status_code == 200) {
            navigate(RouterPath.PRLANS_LIST)
        }
    }

    return (

        <>
         <img src='/images/side_bar_img.svg' className='PAY_Coupans_side_Img' />
            {!plan && <Navigate to={RouterPath.PRLANS_LIST} />}
            {plan &&
                <div>
                    <div className='page-label'>
                        <label>Plan Details</label>
                    </div>
                    <div style={{ margin: '0 20%', marginTop: '5%' }}>
                        <div className="trans-bg-container">
                            <div>
                                <p className='h3 bold'><b>Plan Details</b></p>
                                <div className='d-flex justify-content-end mr-5'><button onClick={toggleActive} className={`${plan?.status == true ? 'HL-active' : 'highlight-inactive'} p-2 px-3`} ><span className={`${plan.status == true ? 'dot' : 'dot-inactive'}`}></span>{plan.status == true ? 'Active' : 'Inactive'}</button></div>
                            </div>
                            <p className='blue-bg d-inline-block p-4 h3'>{plan.code || "n/a"}</p>
                            <p className='h3 bold mb-5'><b>{plan.name || "n/a"}</b></p>
                            <p className='bg-light-green-rounded px-4 h4'>Amount: {plan.amount}</p>
                            <p className='h5 text-center px-5 my-4'><b>{plan.description || "n/a"}</b></p>
                            <button type='button' className='CD_btn' onClick={() => handleDelete()}>DELETE PLAN</button>
                        </div>
                    </div>
                </div>
            }
        </>

    )
}
