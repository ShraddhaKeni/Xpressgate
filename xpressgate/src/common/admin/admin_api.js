import { getRequest, postRequest } from "../axios_client";







/// PAYMENT ///


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