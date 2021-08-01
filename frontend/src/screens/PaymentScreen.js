import React,{useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { savePaymentMethod } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'
import {ORDER_CREATE_RESET} from '../constants/orderConstants'
import './ShippingScreen.css'


const PaymentScreen = ({history}) => {

    const cart = useSelector(state=>state.cart)
    const {shippingAddress} = cart

    if(!shippingAddress){
        history.push('/shipping')
    }

    const dispatch = useDispatch()
    
    const [paymentMethod,setPaymentMethod] = useState('Paypal')
    

    const submitHandler=(e)=>{
     e.preventDefault();
     dispatch(savePaymentMethod(paymentMethod))
     dispatch({type:ORDER_CREATE_RESET})
     history.push('/placeorder')
    }

    return (
        <div className='address-form-container'>
           <CheckoutSteps step1 step2 step3/>
            <h1>Payment Method</h1>
            <form onSubmit={submitHandler}>
               <input type="radio" id='Paypal' name='paymentMethod' 
                      checked value="Paypal" 
                      onChange={(e)=>setPaymentMethod(e.target.value)}/>
               <label >Paypal or credit card</label><br/>
{/*                <input type="radio" id='Stripe' name='paymentMethod'
                      onChange={(e)=>setPaymentMethod(e.target.value)}
                       value="Stripe" />
               <label >Stripe</label><br/> */}
               <button type='submit'  className='submit-btn' >Continue</button>
             </form>             
        </div>
    )
}

export default PaymentScreen
