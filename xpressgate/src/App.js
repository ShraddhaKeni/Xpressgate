import './App.css';
import React, { useEffect } from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
//require('dotenv').config()
import Login from './components/GuardModule/Login';
import Dashboard from './components/GuardModule/Dashboard';
import Addinout from './components/GuardModule/Addinout';
import Addguest from './components/GuardModule/Addguest';
import Dailyhelplist from './components/GuardModule/Dailyhelplist';
import Videoclass from './components/GuardModule/Videoclass';
import Inoutbook from './components/GuardModule/Inoutbook';
import Vendorlist from './components/GuardModule/Vendorlist';
import Inoutbookcard from './components/GuardModule/Inoutbookcard';
import Frequentvisitor from './components/GuardModule/Frequentvisitor';
import Dailyservicepasscode from './components/GuardModule/Dailyservicepasscode';
import PrivateRoutes from './components/GuardModule/Utils/PrivateRoutes';
import VendorEntryDetails from './components/GuardModule/VendorEntryDetails';
import GuestList from './components/GuardModule/GuestList';
import Forgotpassword from './components/GuardModule/Forgotpassword';
import OTPscreen from './components/GuardModule/otp';
import Newpassword from './components/GuardModule/Newpassword';
import SocietyDashboard from './components/SocietyModule/Societydashboard'
import GuestEntry from './components/GuardModule/GuestEntry';
import Flatlist from './components/SocietyModule/Flatlist'
import Flatapprovallist from './components/SocietyModule/Flatapprovallist'
import Blocklist from './components/SocietyModule/Blocklist'
import Addflat from './components/SocietyModule/Addflat'
import Addnotice from './components/SocietyModule/Addnotice'
import Noticelist from './components/SocietyModule/Noticelist'
import Addvehicle from './components/SocietyModule/Addvehicle'
import SelectMode from './components/auth/SelectMode';
import FlatListNA from './components/SocietyModule/FlatListNA';
import Vehiclemanagement from './components/SocietyModule/Vehiclemanagement';
import AddParkingSec from './components/SocietyModule/AddParkingSec';
import Editguard from './components/SocietyModule/Editguard';
import Addguard from './components/SocietyModule/Addguard';
import Guardlist from './components/SocietyModule/Guardlist';
import GuardProfile from './components/SocietyModule/GuardProfile';
import Profile from './components/SocietyModule/Profile';
import Managementteam from './components/SocietyModule/Managementteam';
import Local_service from './components/SocietyModule/Local_service';
import Addmanagementteam from './components/SocietyModule/Addmanagementteam';
import Plumber from './components/SocietyModule/Plumber';
import Login_society from './components/SocietyModule/Login';
import Entercode from './components/SocietyModule/Entercode';
import Reset from './components/SocietyModule/Reset';
import Enter_new_pswd from './components/SocietyModule/Enter_new_pswd';
import Password from './components/SocietyModule/Password'
import Addemergencyno from './components/SocietyModule/Addemergencyno';
import Emergency from './components/SocietyModule/Emergency';
import Vendor_Payment from './components/SocietyModule/Vendor_Payment'
import Payment from './components/SocietyModule/Payment'
import Addlocalservice from './components/SocietyModule/Addlocalservice'
import Community from './components/SocietyModule/Community'
import GuestManagement from './components/SocietyModule/GuestManagement'
import Ticketlist from './components/SocietyModule/Ticketlist'
import Ticket from './components/SocietyModule/Ticket'
import Amenities from './components/SocietyModule/Amenities'
import Amenitylist from './components/SocietyModule/Amenitylist'
import Approvallistamenity from './components/SocietyModule/Approvallistamenity'
import Addeditamenity from './components/SocietyModule/Addeditamenity'
import ChangePassword from './components/GuardModule/ChangePassword';
import SocietyDues from './components/SocietyModule/SocietyDues';
import UtilityPayment from './components/SocietyModule/UtilityPayment';
import Package from './components/SocietyModule/Package';
import ApprovalList from './components/SocietyModule/ApprovalList'
import SocietyPaymentHistory from './components/SocietyModule/SocietyPaymentHistory';
import AdminModuleComponent from './pages/admin';
import SuperAdminLogin from './pages/admin/LoginScreens/SuperAdminLogin';
import AdminEnterNewPass from './pages/admin/LoginScreens/AdminEnterNewPass';
import AdminEnterCode from './pages/admin/LoginScreens/AdminEnterCode';
import RouterPath from './common/constants/path/routerPath';
import SocChangePassword from './components/SocietyModule/ChangePassword';
import PackageList from './components/SocietyModule/PackageList';
import AdminChangePass from './pages/admin/LoginScreens/AdminChangePass';
import AdminReset from './pages/admin/LoginScreens/AdminReset';
import Viewparking from './components/SocietyModule/Viewparking';
import SocietyDuesTable from './components/SocietyModule/SocietyDuesTable';
import VendorPaymentTable from './components/SocietyModule/VendorPaymentTable';
import UtilityPaymentTable from './components/SocietyModule/UtilityPaymentTable';
import Report from './components/SocietyModule/Report';
import AddBlock from './components/SocietyModule/AddBlock';
import UpdateBlock from './components/SocietyModule/UpdateBlock';
import SocReport from './components/SocietyModule/SocReport';
import AddSocietyMember from './components/SocietyModule/AddSocietyMember';
import EditGuard from './components/GuardModule/EditGuard';
import Admin_Change_Password from './pages/admin/LoginScreens/Admin_Change_Password';
import UtilityPaymentLink from './components/SocietyModule/UtilityPaymentLink';
import UtilityPyamentLinkList from './components/SocietyModule/UtilityPyamentLinkList';
import ChecklistSecurity from './components/SocietyModule/ChecklistSecurity';
import CheckListMaintenance from './components/SocietyModule/ChecklistMaintenance';
import ChecklistCommunityStaff from './components/SocietyModule/ChecklistCommunityStaff';
import ChecklistsMain from './components/SocietyModule/ChecklistsMain';
import AddChecklistSecurity from './components/SocietyModule/AddChecklistSecurity';
import Addmaintenanceschedule from './components/SocietyModule/Addmaintenanceschedule'
import Maintenancelist from './components/SocietyModule/Maintenancelist'
import Addmaintenancebill from './components/SocietyModule/Addmaintenancebill'
import Maintenancebilllist from './components/SocietyModule/Maintenancebilllist'
import Arrearslist from './components/SocietyModule/Arrearslist'
import Addarrears from './components/SocietyModule/Addarrears'
import ViewGuestParkingSec from './components/SocietyModule/ViewGuestParkingSec';
import AddGuestParkingSec from './components/SocietyModule/AddGuestParkingSec';
import Invoice from './components/Invoice';
import GuestManagementcard from './components/SocietyModule/GuestManagementcard';
import PartnerModule from './pages/partner/PartnerModule';
import PartnerLogin from './pages/partner/PartnerLoginScreens/PartnerLogin';
import PartnerEnterMobile from './pages/partner/PartnerLoginScreens/PartnerEnterMobile';
import PartnerEnterCode from './pages/partner/PartnerLoginScreens/PartnerEnterCode';
import PartnerNewPassword from './pages/partner/PartnerLoginScreens/PartnerNewPassword';
import ViewParkedVehicle from './components/SocietyModule/ViewParkedVehicle';
import GuestViewParking from './components/SocietyModule/GuestViewParking';







function App() {

  window.env_var = "http://143.110.187.80:5050/"
  //window.env_var = "http://localhost:5050/"
  useEffect(() => {

  }, [])
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<SelectMode />} exact></Route>
          <Route path="/dashboard" element={<Dashboard />} exact></Route>
          <Route path="/addinout" element={<Addinout />} exact></Route>
          <Route path="/addguest" element={<Addguest />} exact></Route>
          <Route path="/dailyhelp" element={<Dailyhelplist />} exact></Route>
          <Route path="/videoclass" element={<Videoclass />} exact></Route>
          <Route path="/inoutbook" element={<Inoutbook />} exact></Route>
          <Route path="/vendorlist" element={<Vendorlist />} exact></Route>
          <Route path="/inoutbookcard" element={<Inoutbookcard />} exact></Route>
          <Route path="/frequent" element={<Frequentvisitor />} exact></Route>
          <Route path="/dailyservice" element={<Dailyservicepasscode />} exact></Route>
          <Route path="/vendorentry" element={<VendorEntryDetails />} exact></Route>
          <Route path="/guestlist" element={<GuestList />} exact></Route>
          <Route path="/forgotpassword" element={<Forgotpassword />} exact></Route>
          <Route path="/otp" element={<OTPscreen />} exact></Route>
          <Route path="/newpassword" element={<Newpassword />} exact></Route>
          <Route path="/guestentry" element={<GuestEntry />} exact></Route>
          <Route path="/scDashboard" element={<SocietyDashboard />} exact></Route>
          {/* <Route path="/flatlist" element={<Flatlist />} exact></Route> */}
          <Route path="/flatapprovallist" element={<Flatapprovallist />} exact></Route>
          <Route path="/blocklist" element={<Blocklist />} exact></Route>
          <Route path="/addflat" element={<Addflat />} exact></Route>
          <Route path="/addnotice" element={<Addnotice />} exact></Route>
          <Route path="/addvehicle" element={<Addvehicle />} exact></Route>
          <Route path="/guardLogin" element={<Login />} exact></Route>
          <Route path="/addFlat" element={<Addflat />} exact></Route>
          <Route path="/changesocpassword" element={<SocChangePassword />} exact></Route>
          <Route path="/sreport" element={<Report />} exact></Route>


          <Route path="/blockList" element={<Blocklist />} exact></Route>
          <Route path="/flatList" element={<Flatlist />} exact></Route>
          <Route path="/naFlatList" element={<FlatListNA />} exact></Route>
          <Route path="/approveFlat" element={<Flatapprovallist />} exact></Route>
          <Route path="/noticeList" element={<Noticelist />} exact></Route>
          <Route path="/addNotice" element={<Addnotice />} exact></Route>
          <Route path="/manageVehicle" element={<Vehiclemanagement />} exact></Route>
          <Route path="/editGuard" element={<Editguard />} exact></Route>
          <Route path="/addGuard" element={<Addguard />} exact></Route>
          <Route path="/guardList" element={<Guardlist />} exact></Route>
          <Route path="/guardDetails" element={<GuardProfile />} exact></Route>
          <Route path="/profile" element={<Profile />} exact></Route>
          <Route path="/management" element={<Managementteam />} exact></Route>
          <Route path="/localservices" element={<Local_service />} exact></Route>
          <Route path='/addManagement' element={<Addmanagementteam />} exact></Route>
          <Route path='/servicevendors' element={<Plumber />} exact></Route>
          <Route path='/societylogin' element={<Login_society />} exact></Route>
          <Route path='/scotp' element={<Entercode />} exact></Route>
          <Route path='/screset' element={<Reset />} exact></Route>
          <Route path='/newpass' element={<Enter_new_pswd />} exact></Route>
          <Route path='/resetpassword' element={<Password />} exact></Route>
          <Route path='/addemergency' element={<Addemergencyno />} exact></Route>
          <Route path='/emergencyList' element={<Emergency />} exact></Route>
          <Route path='/vendorpayment' element={<Vendor_Payment />} exact></Route>
          <Route path='/payment' element={<Payment />} exact></Route>
          <Route path='/community' element={<Community />} exact></Route>
          <Route path='/addlocalservice' element={<Addlocalservice />} exact></Route>
          <Route path="/changeguardpass" element={<ChangePassword />} exact></Route>
          <Route path="/vehiclemanagement" element={<Vehiclemanagement />} exact></Route>
          <Route path="/addparking" element={<AddParkingSec />} exact></Route>
          <Route path="/viewparking" element={<Viewparking />} exact></Route>
          <Route path="/guestManagement" element={<GuestManagement />} exact></Route>
          <Route path="/ticketlist" element={<Ticketlist />} exact></Route>
          <Route path="/ticket" element={<Ticket />} exact></Route>
          <Route path="/amenities" element={<Amenities />} exact></Route>
          <Route path="/amenitylist" element={<Amenitylist />} exact></Route>
          <Route path="/approvallistamenity" element={<Approvallistamenity />} exact></Route>
          <Route path="/addeditamenity" element={<Addeditamenity />} exact></Route>
          <Route path="/societydues" element={<SocietyDues />} exact></Route>
          <Route path="/utilitypayment" element={<UtilityPayment />} exact></Route>
          <Route path="/package" element={<Package />} exact></Route>
          <Route path="/Approvallist" element={<ApprovalList />} exact></Route>
          <Route path="/paymenthistory" element={<SocietyPaymentHistory />} exact></Route>
          <Route path="/societyduesrecord" element={<SocietyDuesTable />} exact></Route>
          <Route path="/vendorpaymentrecord" element={<VendorPaymentTable />} exact></Route>
          <Route path="/utilitypaymentrecord" element={<UtilityPaymentTable />} exact></Route>
          <Route path="/addmaintenanceschedule" element={<Addmaintenanceschedule />} exact></Route>
          <Route path="/maintenancelist" element={<Maintenancelist />} exact></Route>
          <Route path="/addmaintenancebill" element={<Addmaintenancebill />} exact></Route>
          <Route path="/maintenancebilllist" element={<Maintenancebilllist />} exact></Route>
          <Route path="/addarrears" element={<Addarrears />} exact></Route>
          <Route path="/arrearslist" element={<Arrearslist />} exact></Route>
          <Route path="/guestmanagementcard" element={<GuestManagementcard />} exact></Route>


          <Route path={RouterPath.ADMIN_DASHBOARD} element={<AdminModuleComponent />}></Route>

          <Route path={RouterPath.ADD_PREMISE} element={<AdminModuleComponent />}></Route>
          <Route path={RouterPath.EDIT_PREMISE} element={<AdminModuleComponent />}></Route>
          <Route path={RouterPath.PREMISES_LIST} element={<AdminModuleComponent />}></Route>

          <Route path={RouterPath.COUPONS_LIST} element={<AdminModuleComponent />}></Route>
          <Route path={RouterPath.EDIT_COUPON} element={<AdminModuleComponent />}></Route>
          <Route path={RouterPath.ADD_COUPON} element={<AdminModuleComponent />}></Route>
          <Route path={RouterPath.COUPON_DETAILS} element={<AdminModuleComponent />}></Route>

          <Route path={RouterPath.PRLANS_LIST} element={<AdminModuleComponent />}></Route>
          <Route path={RouterPath.ADD_PLAN} element={<AdminModuleComponent />}></Route>
          <Route path={RouterPath.EDIT_PLAN} element={<AdminModuleComponent />}></Route>
          <Route path={RouterPath.PLAN_DETAILS} element={<AdminModuleComponent />}></Route>
          <Route path={RouterPath.PAYMENT_HISTORY} element={<AdminModuleComponent />}></Route>
          <Route path={RouterPath.PREMISE_PAYMENT_HISTORY} element={<AdminModuleComponent />}></Route>
          <Route path={RouterPath.ADMIN_PROFILE} element={<AdminModuleComponent />}></Route>
          <Route path={RouterPath.VIDEO_CLASS} element={<AdminModuleComponent />}></Route>
          <Route path={RouterPath.ADD_VIDEO} element={<AdminModuleComponent />}></Route>
          <Route path={RouterPath.EDIT_VIDEO} element={<AdminModuleComponent />}></Route>
          <Route path={RouterPath.REPORTS} element={<AdminModuleComponent />}></Route>
          <Route path={RouterPath.TERMS} element={<AdminModuleComponent />}></Route>
          <Route path={RouterPath.PRIVACY_POLICY} element={<AdminModuleComponent />}></Route>
          {/* <Route path={RouterPath.ADMIN_CHANGE_PASSWORD} element={<Admin_Change_Password />}></Route> */}


          <Route path={RouterPath.MANAGE_PAYMENT_GATEWAY} element={<AdminModuleComponent />}></Route>
          <Route path={RouterPath.ADD_PAYMENT_GATEWAY} element={<AdminModuleComponent />}></Route>
          <Route path={RouterPath.EDIT_PAYMENT_GATEWAY} element={<AdminModuleComponent />}></Route>
          <Route path={RouterPath.MANAGE_SMS_PROVIDER} element={<AdminModuleComponent />}></Route>

          <Route path={RouterPath.ADD_SMS_PROVIDER} element={<AdminModuleComponent />}></Route>
          <Route path={RouterPath.EDIT_SMS_PROVIDER} element={<AdminModuleComponent />}></Route>
          <Route path={RouterPath.MANAGE_SLIDERS} element={<AdminModuleComponent />}></Route>
          <Route path={RouterPath.ADD_SLIDER} element={<AdminModuleComponent />}></Route>

          <Route path='/addsocietymember' element={<AdminModuleComponent />}></Route>


          <Route path='/adminchangepassword' element={<AdminModuleComponent />}></Route>
          <Route path='/superadminlogin' element={<SuperAdminLogin />}></Route>
          <Route path='/enternewpass' element={<AdminEnterNewPass />}></Route>
          <Route path='/adminentercode' element={<AdminEnterCode />}></Route>
          <Route path='/adminresetpass' element={<AdminReset />}></Route>
          <Route path='/adminchangepass' element={<AdminChangePass />}></Route>
          <Route path='/addblock' element={<AddBlock />}></Route>
          <Route path='/updateblock' element={<UpdateBlock />}></Route>
          <Route path='/socreports' element={<SocReport />}></Route>
          <Route path='/editguarddetails' element={<EditGuard />}></Route>
          <Route path='/utilitypaymentlinklist' element={<UtilityPyamentLinkList />}></Route>
          <Route path='/viewguestparkingsection' element={<ViewGuestParkingSec />}></Route>
          <Route path='/addguestparkingsection' element={<AddGuestParkingSec />}></Route>
          <Route path='/invoice' element={<Invoice />}></Route>
          <Route path='/viewparkedvehicle' element={<ViewParkedVehicle />}></Route>
          <Route path='/guestparking' element={<GuestViewParking />}></Route>

          <Route path='/security-checklist' element={<ChecklistSecurity />}></Route>
          <Route path='/maintenance-checklist' element={<CheckListMaintenance />}></Route>
          <Route path='/community-staff-checklist' element={<ChecklistCommunityStaff />}></Route>
          <Route path='/checklists' element={<ChecklistsMain />}></Route>

          <Route path='/add-security-checklist' element={<AddChecklistSecurity />}></Route>








          <Route path="/utilitypaymentlink" element={<UtilityPaymentLink />} exact></Route>
          <Route path="/packagelist" element={<PackageList />} exact></Route>
          <Route path="/paymenthistory" element={<SocietyPaymentHistory />} exact></Route>
          {/* <Route path="/societyduesrecord" element={<SocietyDuesTable />} exact></Route> */}
          <Route path="/vendorpaymentrecord" element={<VendorPaymentTable />} exact></Route>
          <Route path="/utilitypaymentrecord" element={<UtilityPaymentTable />} exact></Route>




          <Route path="/partnerlogin" element={<PartnerLogin />} exact></Route>
          <Route path="/partnerentermobile" element={<PartnerEnterMobile />} exact></Route>
          <Route path="/partnerentercode" element={<PartnerEnterCode />} exact></Route>
          <Route path="/partnernewpassword" element={<PartnerNewPassword />} exact></Route>

          <Route path={RouterPath.PARTNER_DASHBOARD} element={<PartnerModule />}></Route>

          <Route path={RouterPath.PARTNER_HOME} element={<PartnerModule />}></Route>


          <Route path={RouterPath.COURSE_MANAGEMENT} element={<PartnerModule />}></Route>

          <Route path={RouterPath.STUDENT_MANAGEMENT} element={<PartnerModule />}></Route>
          <Route path={RouterPath.PARTNER_CHANGE_PASSWORD} element={<PartnerModule />}></Route>
          <Route path={RouterPath.PARTNER_PROFILE} element={<PartnerModule />}></Route>
          <Route path={RouterPath.ADD_COURSE} element={<PartnerModule />}></Route>
          <Route path={RouterPath.EDIT_COURSE} element={<PartnerModule />}></Route>
          <Route path={RouterPath.COURSE_DETAILS} element={<PartnerModule />}></Route>
          <Route path={RouterPath.ADD_STUDENT} element={<PartnerModule />}></Route>
          <Route path={RouterPath.EDIT_STUDENT} element={<PartnerModule />}></Route>
          <Route path={RouterPath.STUDENT_DETAILS} element={<PartnerModule />}></Route>
          <Route path={RouterPath.EDIT_PROFILE} element={<PartnerModule />}></Route>




        </Routes>
      </Router>
    </div>
  );
}

export default App;
