import React from 'react'
import global from '../../../styles/global.css'
const SideLayOut = () => {
  return (
    <div className='sidelayout'>
      <div className='AdminNamecontainer'>
        <div><img src="./images/AdminSideicon.svg" alt="logo" className='adminsidelogo'></img></div>
        <div><label className='UserName'>User Name</label></div>
      </div>
      <div className='Dashboardside'>
      <label className='DashBoardLabel'><a href="abc">Dashboard</a></label>
      </div>
      <div className='Premiseside'>
      <label className="PremiseLabel"><a href="abc">Premise Management</a></label>
      </div>
      <div className='paymentside'>
      <label className='PaymentLabel'><a href="abc">Payment Management</a></label>
      </div>
      <div className='videoside'>
      <label className='VideoLabel'><a href="abc">Video Class</a></label>
      </div>
      <div className='reportsside'>
      <label className='ReportsLabel'><a href="abc">Reports</a></label>
      </div>
      <div className='Configurationside'>
      <label className='ConfigurationLabel'><a href="abc">Configuration</a></label>
      </div>
    </div>
  )
}

export default SideLayOut
