import React,{useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import CheckoutSteps from '../components/CheckoutSteps'
import Message from '../components/Message'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'
import { USER_DETAILS_LOGOUT } from '../constants/userConstants'
import {createOrder} from '../actions/orderActions'

const PlaceOrderScreen = ({history}) => {

    const dispatch = useDispatch() 
    const cart = useSelector(state=>state.cart)

   cart.itemsPrice = cart.cartItems.reduce((acc,item)=>acc+item.price*item.qty,0)
   cart.shippingPrice = 20
   cart.taxPrice = Number((0.15*cart.itemsPrice).toFixed(2))
   cart.totalPrice = Number((cart.itemsPrice + cart.shippingPrice + cart.taxPrice).toFixed(2) )

   const orderCreate = useSelector(state=>state.orderCreate)
   const {order,success,error} = orderCreate

    useEffect(()=>{
         if(success){
              
              history.push(`/order/${order._id}`)
              dispatch({ type: USER_DETAILS_LOGOUT })
              dispatch({ type: ORDER_CREATE_RESET })
         }
    },[history,success])

    const placeOrderHandler=()=>{
        dispatch(
             createOrder({
                  orderItems:cart.cartItems,
                  shippingAddress: cart.shippingAddress,
                  paymentMethod: cart.paymentMethod,
                  itemsPrice:cart.itemsPrice,
                  shippingPrice:cart.shippingPrice,
                  taxPrice:cart.taxPrice,
                  totalPrice:cart.totalPrice,
             })
        )
    }

    return (
        <>            
            <div className='place-order-row'>
            <CheckoutSteps step1 step2 step3 step4/>
                <div className='place-order-coulmn1'>
                     <div className='place-order-item'>
                         <h1>Shipping</h1>
                         <p>
                             <strong>Address : </strong>
                             {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
                             {cart.shippingAddress.postalCode},{' '}
                             {cart.shippingAddress.country}
                         </p>
                     </div>
                     <div className='place-order-item'>
                          <h2>Payment Method</h2>
                          <strong>Method : </strong>
                          {cart.paymentMethod}
                     </div>
                     <div className='place-order-list'>
                          <h2>Order Items</h2>
                          {cart.cartItems.length===0 ? <Message color='white' bgcolor='#f9714c'>Your cart is empty</Message>:
                             (<> 
                                <div className='order-item-details'>
                                 { cart.cartItems.map((item,index)=>(
                                   <div className='order-item-row' key={index}>
                                  <span ><img src={item.image} alt={item.name}className='order-item-image'></img></span>
                                  <span className='order-item-name'><Link to={`/product/${item.product}`}>{item.name}</Link></span>
                                  <span className='order-item-price'>{item.qty} X {item.price} = Rs. {item.qty*item.price}</span>
                                   </div>
                            ))
                             }
                             </div>
                             <div className='order-item-pricing'>
                                 <h1>Order Summary </h1>
                                   <div className='items-price'>
                                        <span className='items-tag'>Items : </span>
                                        <span>Rs. {cart.itemsPrice}</span>
                                   </div>
                                   <div className='items-price'>
                                        <span className='items-tag'>Shipping : </span>
                                        <span>Rs. {cart.shippingPrice}</span>
                                   </div>
                                   <div className='items-price'>
                                        <span className='items-tag'>Tax : </span>
                                        <span>Rs. {cart.taxPrice}</span>
                                   </div>
                                   <div className='items-price'>
                                        <span className='items-tag'>Total : </span>
                                        <span>Rs. {cart.totalPrice}</span>
                                   </div>
                                   {error && <Message color='white' bgcolor='#f9714c'>{error}</Message>}
                                   <div className='items-price'>
                                        <button className='submit-btn'disabled={cart.cartItems.length===0} onClick={placeOrderHandler}>Place Order</button>
                                   </div>
                             </div>
                             </>
                             
                             )
                           }
                     </div>
                </div>
            </div>
        </>
    )
}

export default PlaceOrderScreen
