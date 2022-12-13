import React from 'react'
import { Button } from 'react-bootstrap'
import './Utils.css';

const LogOut = () => {
  const guardLogout = () => {
    localStorage.clear()
    window.location.href = '/'
  }
  return (
    <Button type="button" onClick={() => guardLogout()} className="btnlogout mx-4 mr-5" >Log Out<img src="/images/logout.svg" className='ml-4' alt="header logo" /></Button>
  )
}

export default LogOut