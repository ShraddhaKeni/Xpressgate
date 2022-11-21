import React from 'react'
import {Button} from 'react-bootstrap'
import '../SocietyModule/Utility_payment_LogOut.css';

const Utility_payment_LogOut= () => {
    const guardLogout=()=>{
        localStorage.clear()
        window.location.href='/'
    }
  return (
    <Button type="button" onClick={()=>guardLogout()} className="btnlogout">Log Out<img src="/images/logout.svg" alt="header logo" /></Button>
  )
}

export default Utility_payment_LogOut;