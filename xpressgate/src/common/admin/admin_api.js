import { getRequest, postRequest, deleteRequest } from "../axios_client";




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


/// PREMISE ///

export async function deleteCommunity(id) {
    try {
        return await postRequest(`community/delete`, { community_id: id });
    } catch (error) {
        return error
    }
}

// /// PARTNER MANAGEMENT ///

export async function deletePartner(id) {
    try {
        return await deleteRequest(`/partner/${id}`);
    } catch (error) {
        return error
    }
}


/// Payment Gateways ///
export async function getAllPaymentGateways() {
    try {
        return await getRequest(`paymentgateway/getall`);
    } catch (error) {
        return error
    }
}

export async function addPaymentGateway(data) {
    try {
        return await postRequest(`paymentgateway/add`, data);
    } catch (error) {
        return error
    }
}

export async function updatePaymentGateway(data) {
    try {
        return await postRequest(`paymentgateway/update`, data);
    } catch (error) {
        return error
    }
}

export async function deletePaymentGateway(id) {
    try {
        return await postRequest(`paymentgateway/remove`, { id: id });
    } catch (error) {
        return error
    }
}


/// SMS ///

export async function getAllSMSGateway() {
    try {
        return await getRequest(`smsgateway/getall`);
    } catch (error) {
        return error
    }
}

export async function addSMSGateway(data) {
    try {
        return await postRequest(`smsgateway/add`, data);
    } catch (error) {
        return error
    }
}

export async function updateSMSGateway(data) {
    try {
        return await postRequest(`smsgateway/update`, data);
    } catch (error) {
        return error
    }
}

export async function deleteSMSGateway(id) {
    try {
        return await postRequest(`smsgateway/remove`, { id: id });
    } catch (error) {
        return error
    }
}


/// SLIDERS  ///


export async function getAllSliders() {
    try {
        return await getRequest(`slider/getall`);
    } catch (error) {
        return error
    }
}

export async function deleteSlider(id) {
    try {
        return await postRequest(`slider/remove`, { id: id });
    } catch (error) {
        return error
    }
}

/// commission ///
export async function deleteCommission(id) {
    try {
        return await postRequest(`commission/delete`, { id: id });
    } catch (error) {
        return error
    }
}