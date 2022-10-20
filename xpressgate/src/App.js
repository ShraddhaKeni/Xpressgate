import './App.css';
import React from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
//  import Login from './components/GuardModule/Login';
//   import Dashboard from './components/GuardModule/Dashboard';
//  import Addvendor from './components/GuardModule/Addvendor';
  // import Addguest from './components/GuardModule/Addguest';
  // import Dailyhelplist from './components/GuardModule/Dailyhelplist';
// import Videoclass from './components/GuardModule/Videoclass';
  // import Inoutbook from './components/GuardModule/Inoutbook';
  // import Vendorlist from './components/GuardModule/Vendorlist';
   //import Inoutbookcard from './components/GuardModule/Inoutbookcard';
  import Frequentvisitor from './components/GuardModule/Frequentvisitor';
  //import Dailyservicepasscode from './components/GuardModule/Dailyservicepasscode';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
           {/* <Route path="/" element={<Login />}></Route>    */}
          {/* <Route path="/" element={<Dashboard />}></Route>     */}
          {/* <Route path="/" element={<Addvendor />}></Route>    */}
           {/* <Route path="/" element={<Addguest />}></Route>    */}
           {/* <Route path="/" element={<Dailyhelplist />}></Route>    */}
           {/* <Route path="/" element={<Videoclass />}></Route>  */}
           {/* <Route path="/" element={<Inoutbook />}></Route>  */}
          {/* <Route path="/" element={<Vendorlist />}></Route>   */}
         {/* <Route path="/" element={<Inoutbookcard />}></Route>    */}
            <Route path="/" element={<Frequentvisitor />}></Route>  
           {/* <Route path="/" element={<Dailyservicepasscode />}></Route>  */}
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
