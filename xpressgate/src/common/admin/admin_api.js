import { getRequest, postRequest } from "../axios_client";




/// DASHBOARD ///

export async function getDashboard() {
    try {
        return await postRequest('admin/dashboard', {});
    } catch (error) {
        return error
    }
}


/// PAYMENT ///
export async function addPlan(data) {
    try {
        return await postRequest('plan/add', data);
    } catch (error) {
        return error
    }
}


export async function getAllPlans() {
    try {
        return await getRequest('plan/getall');
    } catch (error) {
        return error
    }
}

export async function deletePlan(id) {
    try {
        return await postRequest('plan/delete', { "plan_id": id });
    } catch (error) {
        return error
    }
}

export async function updatePlan(data) {
    try {
        return await postRequest('plan/update', data);
    } catch (error) {
        return error
    }
}

export async function getPlanById(id) {
    try {
        return await postRequest('plan/delete', id);
    } catch (error) {
        return error
    }
}

export async function getPaymentHistory() {
    try {
        return await getRequest('paymenthistory/getall');
    } catch (error) {
        return error
    }
}

export async function getPaymentHistoryByCommunityId(id) {
    try {
        return await getRequest(`paymenthistory/getbycommunity/${id}`);
    } catch (error) {
        return error
    }
}



/// COUPONS ////

export async function addCoupon(data) {
    try {
        return await postRequest('coupon/add', data);
    } catch (error) {
        return error
    }
}

export async function getAllCoupons() {
    try {
        return await getRequest('coupon/getall');
    } catch (error) {
        return error
    }
}

export async function getCouponById(id) {
    try {
        return await getRequest(`coupon/getbyid/${id}`);
    } catch (error) {
        return error
    }
}

export async function deleteCoupon(id) {
    try {
        return await postRequest(`coupon/delete`, { coupon_id: id });
    } catch (error) {
        return error
    }
}

export async function updateCoupon(coupon) {
    try {
        return await postRequest(`coupon/update`, coupon);
    } catch (error) {
        return error
    }
}