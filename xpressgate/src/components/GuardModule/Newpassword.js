import './Newpassword.css';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Newpassword = () => {

  const location = useLocation()
  const navigate = useNavigate()
  //console.log(location.state.guardid)

  const confirmPasword = async () => {
    let cp = document.getElementById('confirmpassword').value

    try {
      const cpassworddata = {
        password: cp,
        guard_id: location.state.guardid
      }

      let { data } = await axios.post(`${process.env.REACT_APP_SERVER_PATH}api/auth/guardupdatepass`, cpassworddata)
      navigate('/')
      console.log(data)
    }
    catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="nplogincontainer">
      <div id="nplogoid">
        <img src="/images/loginlogo.svg" alt="" />
        <div className="npsignin">
          <label className="nplabel">Forgot Password</label>
        </div>
      </div>
      <div id="nploginimgid">
        <img src="/images/loginsideimg.png" alt="" />
      </div>
      <div id="nploginformid">
        <Form>
          <div className='npinput_fields'>
            <div className='npemail_input'>
              <label className='npnewpassword'>New password</label>
              <input type="text" className="form-control emailtextbox" id="newpassword" placeholder='New Password' ></input>
            </div>
            <br></br><br></br>
            <div className='npemail_input'>
              <label className='npconfirmpassword'>Confirm Password</label>
              <input type="password" className="form-control passwordtextbox" id="confirmpassword" placeholder='Confirm password'></input>
            </div>
            <br></br>
            <Button type="button" className="btnconfirm" onClick={() => { confirmPasword() }}>Login</Button>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default Newpassword

