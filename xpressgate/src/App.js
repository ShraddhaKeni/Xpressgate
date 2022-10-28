import './App.css';
import React from 'react';
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

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<PrivateRoutes/>}>
            <Route path="/dashboard" element={<Dashboard />} exact></Route>
            <Route path="/addvendor" element={<Addvendor />} exact></Route>   
            <Route path="/addguest" element={<Addguest />} exact></Route>   
            <Route path="/dailyhelp" element={<Dailyhelplist />} exact></Route>   
            <Route path="/videoclass" element={<Videoclass />} exact></Route> 
            <Route path="/inoutbook" element={<Inoutbook />} exact></Route> 
            <Route path="/vendorlist" element={<Vendorlist />} exact></Route>  
            <Route path="/inoutbookcard" element={<Inoutbookcard />} exact></Route>   
            <Route path="/frequent" element={<Frequentvisitor/>} exact></Route>   
            <Route path="/dailyservice" element={<Dailyservicepasscode />} exact></Route> 
          </Route>
          <Route path="/" element={<Login />} exact></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
