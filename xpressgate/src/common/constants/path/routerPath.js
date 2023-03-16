const RouterPath = {


    ADMIN_DASHBOARD: "/admin/dashboard",
    PREMISES_LIST: "/admin/premises",
    ADD_PREMISE: "/admin/premises/add",
    EDIT_PREMISE: "/admin/premises/edit",

    PAYMENT_HISTORY: "/admin/payments/history",
    PREMISE_PAYMENT_HISTORY: "/admin/payments/history/premise/:premise",

    PRLANS_LIST: "/admin/payments/plans",
    ADD_PLAN: "/admin/payments/plans/add",
    EDIT_PLAN: "/admin/payments/plans/edit",
    PLAN_DETAILS: "/admin/payments/plans/details",



    COUPONS_LIST: "/admin/payments/coupons",
    ADD_COUPON: "/admin/payments/coupons/add",
    EDIT_COUPON: "/admin/payments/coupons/edit",
    COUPON_DETAILS: "/admin/payments/coupons/details",



    VIDEO_CLASS: "/admin/video",

    REPORTS: "/admin/reports",

    ADMIN_PROFILE: "/admin/adminprofile",
    VIDEO_CLASS: "/admin/video",
    ADD_VIDEO: "/admin/addvideo",
    EDIT_VIDEO: "/admin/editvideo",
    REPORTS: "/admin/reports",
    TERMS: "/admin/configurations/terms",
    PRIVACY_POLICY: "/admin/configurations/privacypolicy",
    //    ADMIN_CHANGE_PASSWORD: "/admin/adminchangepassword"

    MANAGE_PAYMENT_GATEWAY: "/admin/manage/pg",
    ADD_PAYMENT_GATEWAY: "/admin/manage/pg/add",
    EDIT_PAYMENT_GATEWAY: "/admin/manage/pg/:id",


    MANAGE_SMS_PROVIDER: "/admin/manage/sms",
    ADD_SMS_PROVIDER: "/admin/manage/sms/add",
    EDIT_SMS_PROVIDER: "/admin/manage/sms/:id",

    MANAGE_SLIDERS: "/admin/manage/sliders",

    ADD_SOCIETY_MEMBER: "/addsocietymember",
    PARTNER_LIST: "/partnerlist",
    ADD_PARTNER: "/addnewpartner",
    EDIT_PARTNER: "/updatepartner",


    /// Partner Routes


    PARTNER_DASHBOARD: "/partner/dashboard",
    PARTNER_HOME: "/partner",
    COURSE_MANAGEMENT: "/partner/course",
    STUDENT_MANAGEMENT: "/partner/student",
    PARTNER_CHANGE_PASSWORD: "/partnerchangepassword",
    PARTNER_PROFILE: "/partnerprofile",
    EDIT_PROFILE: "/updatepartnerprofile",
    ADD_COURSE:"/partner/course/addcourse",
    EDIT_COURSE:"/partner/course/editcourse",
    COURSE_DETAILS:"/partner/course/coursedetails",
    ADD_STUDENT: "/partner/student/addstudent",
    EDIT_STUDENT: "/partner/student/editstudent",
    STUDENT_DETAILS: "/partner/student/studentdetails",


};
export default RouterPath;