import React from 'react'
import { Button } from 'react-bootstrap'
import './Utils.css';

const LogOut = () => {
  const guardLogout = () => {
    localStorage.clear()
    window.location.href = '/'
  }
  return (
    <button type="button" onClick={() => guardLogout()} className="btnlogout" >Log Out<img src="/images/logout.svg" alt="header logo" /></button>
  )
}

export default LogOut