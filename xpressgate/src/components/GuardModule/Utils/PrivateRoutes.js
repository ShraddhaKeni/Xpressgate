import React from 'react'
import {Navigate,Outlet} from "react-router-dom"

const PrivateRoutes = () => {
  let auth;
 if(localStorage.getItem('accesstoken'))
 {
  auth=true
 }
 else
 {
  auth=false
 }
  return (
    auth?<Outlet/>:<Navigate to='/'/>
  )
}

export default PrivateRoutes