import React from 'react'
import {Button} from 'react-bootstrap'
import './LogOut.css';

const LogOut = () => {
    const societyLogout=()=>{
        localStorage.clear()
        window.location.href='/'
    }
  return (
    <Button type="button" onClick={()=>societyLogout()} className="btnlogout">Log Out<img src="/images/logout.svg" alt="header logo" /></Button>
  )
}

export default LogOut