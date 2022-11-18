import './Amenitylist.css';
import LogOut from './Utils/LogOut';

const Amenitylist = () => {

  return (
    <div className="alcontainer">
      <div id="alheadersection">
        <div class="alfirstheadersection">
          <div id="aldashboardlogo"><img src="/images/loginlogo.svg" alt="header logo" /></div>
          <div id="alsociety"><label>Society</label></div>
          <div id="aldashboardspace"></div>
          <div id="alnotification"><a href="abc"><img src="/images/notification.svg" alt="notificationicon" /></a></div>
          <div id="alsetting"><a href="abc"><img src="/images/setting.svg" alt="settingicon" /></a></div>
          <div id="allogoutbutton"><LogOut /></div>
        </div>
      </div>
      <div id="alsection">
        <div className='alname'>
        <img src="/images/societyicon.svg" alt="society name" />
          <label>Society Name</label>
        </div>
        <div className='alsideimage'><img src="/images/societysideimg.svg" alt="dashboard sideimage" /></div>
      </div>
      <div className='albackgroundimg'>
        <div className='aldisplay'>
          <label>Swimming pool</label>
        </div>
        <div className='row'>
          <div className='alsearchbox'>
            <span><img src="/images/vendorlistsearch.svg" alt='search icon'></img></span>
            <span><label className='alsearchlabel'>Search</label><input className='search_input'></input></span>
          </div>
        </div>
        <table id="altable" class="table table-striped table-bordered table-sm " cellspacing="0" style={{ border: '2px solid black' }}>
          <thead>
            <tr>
              <th class="th-sm">Sr No</th>
              <th class="th-sm">Owner Name</th>
              <th class="th-sm">Amenity</th>
              <th class="th-sm">Date</th>
              <th class="th-sm">Time</th>
              <th class="th-sm">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td >Neha Sharma</td>
              <td>Swimming Pool</td>
              <td>3/12/201</td>
              <td>3</td>
              <td>2</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Amenitylist

