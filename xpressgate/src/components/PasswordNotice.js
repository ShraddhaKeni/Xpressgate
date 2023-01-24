import React from 'react'
import '../components/GuardModule/Utils/Utils.css'
const PasswordNotice = () => {
  return (
    <div className="NoticeContainer">
      <label>Password doesn't match!</label>
      <ul>
        <li>Min 8 characters</li>
        <li>At least one upper case</li>
        <li>At least one lower case</li>
        <li>At least one number</li>
        <li>At least one of the special character i,e (@ # $ % &)</li>
      </ul>
    </div>
  );
}

export default PasswordNotice
