import React from 'react'
import {Button} from 'react-bootstrap'
import '../Screens/LogOut4.css';

const LogOut4= () => {
    const guardLogout=()=>{
        localStorage.clear()
        window.location.href='/'
    }
  return (
    <Button type="button" onClick={()=>guardLogout()} className="btnlogout">Log Out<img src="/images/logout.svg" alt="header logo" /></Button>
  )
}

export default LogOut4;