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
// import Addlocalservice from './components/SocietyModule/Addlocalservice';

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
import PackageList from './components/SocietyModule/PackageList';

function App() {

  window.env_var = "http://143.110.187.80:5050/"
  //window.env_var = "http://localhost:3000/"
  useEffect(() => {

  }, [])
  return (
    <div className="App">
      <Router>
        <Routes>
            <Route path='/' element={<SelectMode/>} exact></Route>
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
            <Route path="/blocklist" element={<Blocklist />} exact></Route>
            <Route path="/addflat" element={<Addflat />} exact></Route>
            <Route path="/addnotice" element={<Addnotice />} exact></Route>
            <Route path="/noticelist" element={<Noticelist />} exact></Route>
            <Route path="/addvehicle" element={<Addvehicle />} exact></Route>
            <Route path="/guardLogin" element={<Login />} exact></Route>
            <Route path="/addFlat" element={<Addflat/>} exact></Route>
            <Route path="/blockList" element={<Blocklist/>} exact></Route>
            <Route path="/flatList" element={<Flatlist/>} exact></Route>
            <Route path="/naFlatList" element={<FlatListNA/>} exact></Route>
            <Route path="/approveFlat" element={<Flatapprovallist/>} exact></Route>
            <Route path="/noticeList" element={<Noticelist/>} exact></Route>
            <Route path="/addNotice" element={<Addnotice/>} exact></Route>
            <Route path="/addVehical" element={<Addvehicle/>} exact></Route>
            <Route path="/manageVehicle" element={<Vehiclemanagement/>} exact></Route>
            <Route path="/editGuard" element={<Editguard/>} exact></Route>
            <Route path="/scDashboard" element={<SocietyDashboard/>} exact></Route>
            <Route path="/addGuard" element={<Addguard/>} exact></Route>
            <Route path="/guardList" element={<Guardlist/>} exact></Route>
            <Route path="/guardDetails" element={<GuardProfile/>} exact></Route>
            <Route path="/profile" element={<Profile/>} exact></Route>
            <Route path="/management" element={<Managementteam/>} exact></Route>
            <Route path="/localservices" element={<Local_service/>} exact></Route>
            <Route path='/addManagement' element={<Addmanagementteam/>} exact></Route>
            <Route path='/servicevendors' element={<Plumber/>} exact></Route>
            <Route path='/societylogin' element={<Login_society/>} exact></Route>
            <Route path='/scotp' element={<Entercode/>} exact></Route>
            <Route path='/screset' element={<Reset/>} exact></Route>
            <Route path='/newpass' element={<Enter_new_pswd/>} exact></Route>
            <Route path='/resetpassword' element={<Password/>} exact></Route>
            <Route path='/addemergency' element={<Addemergencyno/>} exact></Route>
            <Route path='/emergencyList' element={<Emergency/>} exact></Route>
            <Route path='/vendorpayment' element={<Vendor_Payment/>} exact></Route>
            <Route path='/payment' element={<Payment/>} exact></Route>
            <Route path='/community' element={<Community/>} exact></Route>
            <Route path='/addlocalservice' element={<Addlocalservice/>} exact></Route>
            <Route path="/changeguardpass" element={<ChangePassword />} exact></Route>
            <Route path="/vehiclemanagement" element={<Vehiclemanagement />} exact></Route>
            <Route path="/guestManagement" element={<GuestManagement />} exact></Route>
            <Route path="/ticketlist" element={<Ticketlist />} exact></Route>
            <Route path="/ticket" element={<Ticket />} exact></Route>
            <Route path="/amenities" element={<Amenities />} exact></Route>
            <Route path="/amenitylist" element={<Amenitylist />} exact></Route>
            <Route path="/approvallistamenity" element={<Approvallistamenity />} exact></Route>
            <Route path="/addeditamenity" element={<Addeditamenity />} exact></Route>
            <Route path="/societydues" element={<SocietyDues/>} exact></Route>
            <Route path="/utilitypayment" element={<UtilityPayment/>} exact></Route>
            <Route path="/package" element={<Package />} exact></Route>
            <Route path="/packagelist" element={<PackageList />} exact></Route>
            <Route path="/paymenthistory" element={<SocietyPaymentHistory />} exact></Route>
          
         
        </Routes>
      </Router>
    </div>
  );
}

export default App;
