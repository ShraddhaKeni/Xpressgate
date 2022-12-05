import React from 'react'
import {Button} from 'react-bootstrap'
import './Utils.css';

const LogOut = () => {
    const guardLogout=()=>{
        localStorage.clear()
        window.location.href='/'
    }
  return (
    <Button type="button" onClick={()=>guardLogout()} className="btnlogout" id='logout'>Log Out<img src="/images/logout.svg" alt="header logo" /></Button>
  )
}

export default LogOut