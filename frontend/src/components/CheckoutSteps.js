import React from 'react'
import {Link} from 'react-router-dom'
import './CheckoutSteps.css'

const CheckoutSteps = ({step1,step2,step3,step4}) => {
    return (
        <div className='checkout-steps-nav'>
            <span className='checkout-steps-item'>
                {step1 ? (
                    <Link to='/login'>Sign In</Link>
                ):(
                    <span>Sign In</span>
                )}
            </span>
            <span className='checkout-steps-item'>
                {step2 ? (
                    <Link to='/shipping'>Shipping</Link>
                ):(
                    <span>Shipping</span>
                )}
            </span>
            <span className='checkout-steps-item'>
                {step3 ? (
                    <Link to='/payment'>Payment</Link>
                ):(
                    <span>Payment</span>
                )}
            </span>
            <span className='checkout-steps-item'>
                {step4 ? (
                    <Link to='/placeorder'>Place Order</Link>
                ):(
                    <span>Place Order</span>
                )}
            </span>
        </div>
    )
}

export default CheckoutSteps
