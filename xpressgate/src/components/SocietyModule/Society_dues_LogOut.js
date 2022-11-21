import React from 'react'
import {Button} from 'react-bootstrap'
import '../SocietyModule/Society_dues_LogOut.css';

const Society_dues_LogOut= () => {
    const guardLogout=()=>{
        localStorage.clear()
        window.location.href='/'
    }
  return (
    <Button type="button" onClick={()=>guardLogout()} className="btnlogout">Log Out<img src="/images/logout.svg" alt="header logo" /></Button>
  )
}

export default Society_dues_LogOut;