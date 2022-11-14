import './Societyheader.css';
import { Button } from 'react-bootstrap';
import LogOut from '../../SocietyModule/Utils/LogOut';

const Societyheader = () => {
 
  return (
    <> 
      <div id="sheadersection">
        <div className="sfirstheadersection">
          <div id="sdashboardlogo"><img src="/images/loginlogo.svg" alt="header logo" /></div>
          <div id="sdashboardguard"><label>Society</label></div>
          <div id="sdashboardspace"></div>
          <div id="sdashboardnotification"><a href="abc"><img src="/images/notification.svg" alt="notificationicon" /></a></div>
          <div id="sdashboardsetting"><a href="abc"><img src="/images/setting.svg" alt="settingicon" /></a></div>
          <div id="sdashboardlogoutbutton"><LogOut/></div>
        </div>
      </div>
    </>
  )
}

export default Societyheader

