import React,{useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { saveShippingAddress } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'
import './ShippingScreen.css'


const ShippingScreen = ({history}) => {

    const cart = useSelector(state=>state.cart)
    const {shippingAddress} = cart

    const dispatch = useDispatch()
    
    const [address,setAddress] = useState(shippingAddress.address)
    const [city,setCity] = useState(shippingAddress.city)
    const [postalCode,setPostalCode] = useState(shippingAddress.postalCode)
    const [country,setCountry] = useState(shippingAddress.country)

    const submitHandler=(e)=>{
     e.preventDefault();
     dispatch(saveShippingAddress({address,city,postalCode,country}))
     history.push('/payment')
    }

    return (
        <div className='address-form-container'>
           <CheckoutSteps step1 step2 />
            <h1>Shipping Address</h1>
           <form onSubmit={submitHandler}>
           <div className='email-holder'>   
               <label><h2>Address </h2></label><br/>
               <input type='text' required placeholder='Enter address' value={address} onChange={(e)=>setAddress(e.target.value)}></input><br/>
            </div >
            <div className='email-holder'>   
               <label><h2>City </h2></label><br/>
               <input type='text' required placeholder='Enter city' value={city} onChange={(e)=>setCity(e.target.value)}></input><br/>
            </div >
            <div className='email-holder'>   
               <label><h2>Postal code</h2></label><br/>
               <input type='text' required placeholder='Enter postal code' value={postalCode} onChange={(e)=>setPostalCode(e.target.value)}></input><br/>
            </div >
            <div className='email-holder'>   
               <label><h2>Country</h2></label><br/>
               <input type='text' required placeholder='Enter country ' value={country} onChange={(e)=>setCountry(e.target.value)}></input><br/>
            </div >
            <button type='submit' className='submit-btn' >Continue</button>
           </form>            
        </div>
    )
}

export default ShippingScreen
