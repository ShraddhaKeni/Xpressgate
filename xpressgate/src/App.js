import './App.css';
import React from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
// import Login from './components/Login';
//  import Dashboard from './components/Dashboard';
// import Addvendor from './components/Addvendor';
//  import Addguest from './components/Addguest';
// import Dailyhelplist from './components/Dailyhelplist';
import Videoclass from './components/Videoclass';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* <Route path="/" element={<Login />}></Route>   */}
          {/* <Route path="/" element={<Dashboard />}></Route>    */}
          {/* <Route path="/" element={<Addvendor />}></Route>   */}
          {/* <Route path="/" element={<Addguest />}></Route>   */}
          {/* <Route path="/" element={<Dailyhelplist />}></Route>   */}
          <Route path="/" element={<Videoclass />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
