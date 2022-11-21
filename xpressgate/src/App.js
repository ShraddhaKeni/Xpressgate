import './App.css';
import React, { useEffect } from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
//require('dotenv').config()
import Login from './components/GuardModule/Login';
import Dashboard from './components/GuardModule/Dashboard';
import Addvendor from './components/GuardModule/Addvendor';
import Addguest from './components/GuardModule/Addguest';
import Dailyhelplist from './components/GuardModule/Dailyhelplist';
import Videoclass from './components/GuardModule/Videoclass';
import Inoutbook from './components/GuardModule/Inoutbook';
import Vendorlist from './components/GuardModule/Vendorlist';
import Inoutbookcard from './components/GuardModule/Inoutbookcard';
import Frequentvisitor from './components/GuardModule/Frequentvisitor';
import Dailyservicepasscode from './components/GuardModule/Dailyservicepasscode';
// import PrivateRoutes from './components/GuardModule/Utils/PrivateRoutes';
import VendorEntryDetails from './components/GuardModule/VendorEntryDetails';
import GuestList from './components/GuardModule/GuestList';
import Forgotpassword from './components/GuardModule/Forgotpassword';
import OTPscreen from './components/GuardModule/otp';
import Newpassword from './components/GuardModule/Newpassword';
import SocietyDashboard from './components/SocietyModule/Societydashboard';
import GuestEntry from './components/GuardModule/GuestEntry';
import Flatlist from './components/SocietyModule/Flatlist'
import Flatapprovallist from './components/SocietyModule/Flatapprovallist';
import Login_society from './components/SocietyModule/Login';
import Enter_new_pswd from './components/SocietyModule/Enter_new_pswd';
import Entercode from './components/SocietyModule/Entercode'
import Reset from "./components/SocietyModule/Reset";
import Main_reset from './components/SocietyModule/Main_reset';
import Profile from './components/SocietyModule/Profile';
import Password from './components/SocietyModule/Password';
import Community from './components/SocietyModule/Community';
import Local_service from './components/SocietyModule/Local_service';
import Addlocalservice from './components/SocietyModule/Addlocalservice';
import Addemergencyno from './components/SocietyModule/Addemergencyno';
import Addmanagementteam from './components/SocietyModule/Addmanagementteam';
import Plumber from './components/SocietyModule/Plumber';
import Managementteam from './components/SocietyModule/Managementteam';
import Emergency from './components/SocietyModule/Emergency';
import Guardlist from './components/SocietyModule/Guardlist';
import Addguard from './components/SocietyModule/Addguard';
import Editguard from './components/SocietyModule/Editguard';
import GuardProfile from './components/SocietyModule/GuardProfile';
import Payment from './components/SocietyModule/Payment';
import Vendor_Payment from './components/SocietyModule/Vendor_Payment';
import Society_dues from './components/SocietyModule/Society_dues';
import Utility_payment from './components/SocietyModule/Utility_payment';
import Approval_list from './components/SocietyModule/Approval_list';
import Package from './components/SocietyModule/Package';
function App() {

  window.env_var = "http://143.110.187.80:5050/"
  useEffect(() => {

  }, [])
  return (
    <div className="App">
      <Router>
        <Routes>

          {/* <Route element={<PrivateRoutes />}> */}
            <Route path="/dashboard" element={<Dashboard />} exact></Route>
            <Route path="/addvendor" element={<Addvendor />} exact></Route>
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
            <Route path="/societydashboard" element={<SocietyDashboard />} exact></Route>
            <Route path="/flatlist" element={<Flatlist />} exact></Route>
            <Route path="/flatapprovallist" element={<Flatapprovallist />} exact></Route>
            <Route path="/newpswd" element={<Enter_new_pswd/>} exact></Route>
            <Route path="/entercode" element={<Entercode/>} exact></Route>
            <Route path="/reset" element={<Reset/>} exact></Route>
            <Route path="/reset1" element={<Main_reset/>} exact></Route>
            <Route path="/profile" element={<Profile/>} exact></Route>
            <Route path="/password" element={<Password/>} exact></Route>
            <Route path="/comm" element={<Community/>} exact></Route>
            <Route path="/lservice" element={<Local_service/>} exact></Route>
            <Route path="/alservice" element={<Addlocalservice/>} exact></Route>
            <Route path="/addemer" element={<Addemergencyno/>} exact></Route>
            <Route path="/addmanage" element={<Addmanagementteam/>} exact></Route>
            <Route path="/plumber" element={<Plumber/>} exact></Route>
            <Route path="/manage" element={<Managementteam/>} exact></Route>
            <Route path="/emer" element={<Emergency/>} exact></Route>
            <Route path="/guardlist" element={<Guardlist/>} exact></Route>
            <Route path="/addguard" element={<Addguard/>} exact></Route>
            <Route path="/editguard" element={<Editguard/>} exact></Route>
            <Route path="/guardprofile" element={<GuardProfile/>} exact></Route>
            <Route path="/payment" element={<Payment/>} exact></Route>
            <Route path="/vendorpayment" element={<Vendor_Payment/>} exact></Route>
            <Route path="/societydues" element={<Society_dues/>} exact></Route>
            <Route path="/utilitypayment" element={<Utility_payment/>} exact></Route>
            <Route path="/approvallist" element={<Approval_list/>} exact></Route>
            <Route path="/package" element={<Package/>} exact></Route>
          {/* </Route> */}
          <Route path="/Login" element={<Login />} exact></Route>
          <Route path="/" element={<Login_society />} exact></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
