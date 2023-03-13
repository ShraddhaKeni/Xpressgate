import React, { useEffect, useState } from "react";
import QRcode from "react-qr-code";
import axios from 'axios';
import { useLocation } from "react-router-dom";
import { Loader } from "./Loader";
import { ToastMessage } from './ToastMessage';
import ErrorScreen from '../common/ErrorScreen';

const Qrcode = () => {
    const [loading, setLoading] = useState(true);
    const [toast, setToast] = useState({ show: false });
    const [isError,setError] = useState(false);
    const [data, setData] = useState("");
    const location = useLocation()

    useEffect(() => {
        getGuestDetails();
        setLoading(false);
    }, []);

    const getGuestDetails = async () => {
        try {
            let id = location.pathname.split('/');
            const { data } = await axios.get(`${window.env_var}api/resident/guest/shareQR/${id[2]}`);
            let otp = data.data.guest_details[0].OTP;
            setData(""+otp);
            setError(false)
        } catch (error) {
            setError(true)
        }
    }
    
    if(isError)
        return <ErrorScreen/>
    return (
        <>
         
          <div className='QR_page_header'>
          <div id="PageLogo"><img src="/images/loginlogo.svg" alt="header logo" className='Pagelogoimg' /></div>
          <div className='pagelabels'>
            <label className='HelpLinelabel'>Helpline No</label><br />
            <label className='HelplineNolabel'>00-0000-0000</label>
          </div>
          <div className='UserSuplogo'><img src="/images/supportimg.svg" alt="User Support logo" className='supportlogoimg'></img> </div>
        </div>
        <br/>
        <div className="QR_Code_Container">
            <ToastMessage show={toast.show} message={toast.message} type={toast.type} handleClose={() => { setToast({ show: false }) }} />
            <Loader loading={loading}>
                <h1>Scan QRCode</h1>
                <br/>
                <QRcode value={data} />
            </Loader>
        </div>
        <div className='QR_copyright'>
          © Copyright 2023 Designed by <a href="https://www.axzoragroup.com/" target="_blank">Axzora Private Limited</a>
        </div> 
        </>
    );
};

export default Qrcode;