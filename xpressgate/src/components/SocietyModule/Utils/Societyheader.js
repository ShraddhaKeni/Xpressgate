import './Societyheader.css';
import { Button } from 'react-bootstrap';
import LogOut from '../../SocietyModule/Utils/LogOut';
import { Link } from 'react-router-dom'

const Societyheader = () => {
 
  return (
        <div className="sfirstheadersection">
          <div id="sdashboardlogo"><img src="/images/loginlogo.svg" alt="header logo" /></div>
          <div id="sdashboardguard"><label>Society</label></div>
          <div id="sdashboardspace"></div>
          <div id="sdashboardnotification"><a href="abc"><img className='bell_icon' src="/images/notification.svg" alt="notificationicon" /></a></div>
          <div id="sdashboardsetting"><Link to='/changesocpassword'><img className='cog_wheel' src="/images/setting.svg"  alt="settingicon" /></Link></div>
          <div id="sdashboardlogoutbutton"><LogOut/></div>
        </div>
  )
}

export default Societyheader

