import React from 'react'
import {Button} from 'react-bootstrap'
import '../Screens/Utilss.css';

const LogOutt = () => {
    const guardLogout=()=>{
        localStorage.clear()
        window.location.href='/'
    }
  return (
    <Button type="button" onClick={()=>guardLogout()} className="btnlogout">Log Out<img src="/images/logout.svg" alt="header logo" /></Button>
  )
}

export default LogOutt;