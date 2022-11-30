import React from 'react'

export const CouponDetails = () => {
    return (
        <div className="container">
            <div className='page-label'>
                <label>Coupon Details</label>
            </div>
            <div className='main-container'>
                <div className="trans-bg-container">
                    <div>
                        <p className='h3 bold'><b>Coupon Details</b></p>
                        <div className='d-flex justify-content-end mr-5'><button className='highlight-active p-2 px-3'><span className='dot'></span>Active</button></div>
                    </div>
                    <p className='blue-bg d-inline-block p-4 h3'>COUPON101</p>
                    <p className='h3 bold mb-5'><b>Master Subscription</b></p>
                    <p className='bg-light-green-rounded px-4 h4'>Amount: 9999</p>
                    <p className='h5 text-center px-5 my-4'><b>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lectus eu velit quis ultricies nisi, dignissim ultricies euismod etiam. Sollicitudin ut sed rhoncus nec accumsan tristique. Sed sollicitudin semper tempor massa cras. Sit volutpat sit nulla amet blandit tempor orci. </b></p>
                    <button type='button' className='btn btn-danger my-5'>Delete Coupon</button>
                </div>
            </div>

        </div >
    )
}
