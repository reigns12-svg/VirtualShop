import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {PayPalButton} from 'react-paypal-button-v2'
import {Link} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {getOrderDetails,payOrder,deliverOrder} from '../actions/orderActions'
import {ORDER_PAY_RESET,ORDER_DELIVER_RESET} from '../constants/orderConstants'

const OrderScreen = ({match,history}) => {

    const orderId = match.params.id

    const [sdkReady,setSdkReady] = useState(false)

    const dispatch = useDispatch() 
    
   const orderDetails = useSelector(state=>state.orderDetails)
   const {order,loading,error} = orderDetails

   const userLogin = useSelector(state=>state.userLogin)
   const {userInfo} = userLogin

   const orderPay = useSelector(state=>state.orderPay)
   const {loading:loadingPay,success:successPay} = orderPay

   const orderDeliver = useSelector(state=>state.orderDeliver)
   const {loading:loadingDeliver,success:successDeliver} = orderDeliver

   if(!loading)
   order.itemsPrice = order.orderItems.reduce((acc,item)=>acc+item.price*item.qty,0)

    useEffect(()=>{
         if(!userInfo)history.push('/login')
         const addPayPalScript = async ()=>{
              const {data:clientId} = await axios.get('/api/config/paypal')
              const script = document.createElement('script')
              script.type = 'text/javascript'
              script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
              script.async = true
              script.onload=()=>{
                   setSdkReady(true)
              }
              document.body.appendChild(script)
         }
         
        if(!order ||order._id!==orderId || successPay || successDeliver){
          dispatch({type:ORDER_PAY_RESET})
          dispatch({type:ORDER_DELIVER_RESET})
         dispatch(getOrderDetails(orderId))
        }
         else if(!order.isPaid){
              if(!window.paypal){
                   addPayPalScript()
              }else{
                   setSdkReady(true)
              }
         }
    },[dispatch,order,orderId,successPay,successDeliver])

    const successPaymentHandler=(paymentResult)=>{
      console.log(paymentResult)
      dispatch(payOrder(orderId,paymentResult))
    }
    
    const deliverHandler=()=>{
         dispatch(deliverOrder(order))
    }
    
    return loading ? <Loader/> : error ? <Message color='white' bgcolor='#f9714c'>{error}</Message> :
    <>
       
       <div className='place-order-row'>
           <h1>Order </h1><h2>Id : {order._id}</h2>
                <div className='place-order-coulmn1'>
                     <div className='place-order-item'>
                         <h1>Shipping</h1>
                         <p><strong>Name : </strong> {order.user.name}</p>
                         <p>Email : <a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                         <p>
                             <strong>Address : </strong>
                             {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                             {order.shippingAddress.postalCode},{' '}
                             {order.shippingAddress.country}
                         </p>
                         <div className='message-holder'>
                         {order.isDelivered ? <Message color='white' bgcolor='#00cc00'>Delivered on {order.deliveredAt}</Message> :
                                           <Message color='white' bgcolor='#f9714c'>Not Delivered</Message>
                          }
                          </div>
                     </div>
                     <div className='place-order-item'>
                          <h2>Payment Method</h2>
                          <strong>Method : </strong>
                          <p>{order.paymentMethod}</p><br/>
                          <div className='message-holder'>
                          {order.isPaid ? <Message color='white' bgcolor='#00cc00'>Paid on {order.paidAt}</Message> :
                                           <Message color='white' bgcolor='#f9714c'>Not Paid</Message>
                          }
                          </div>
                     </div>
                     <div className='place-order-list'>
                          <h2>Order Items</h2>
                          {order.orderItems.length===0 ? <Message color='white' bgcolor='#f9714c'>Order is empty</Message>:
                             (<> 
                                <div className='order-item-details'>
                                 { order.orderItems.map((item,index)=>(
                                   <div className='order-item-row' key={index}>
                                  <span ><img src={item.image} alt={item.name}className='order-item-image'></img></span>
                                  <span className='order-item-name'><Link to={`/product/${item.product}`}>{item.name}</Link></span>
                                  <span className='order-item-price'>{item.qty} X {item.price} = Rs. {item.qty*item.price}</span>
                                   </div>
                            ))
                             }
                             </div>
                             <div className='order-item-pricing order-screen'>
                                 <h1>Order Summary </h1>
                                   <div className='items-price'>
                                        <span className='items-tag'>Items : </span>
                                        <span>Rs. {order.itemsPrice}</span>
                                   </div>
                                   <div className='items-price'>
                                        <span className='items-tag'>Shipping : </span>
                                        <span>Rs. {order.shippingPrice}</span>
                                   </div>
                                   <div className='items-price'>
                                        <span className='items-tag'>Tax : </span>
                                        <span>Rs. {order.taxPrice}</span>
                                   </div>
                                   <div className='items-price'>
                                        <span className='items-tag'>Total : </span>
                                        <span>Rs. {order.totalPrice}</span>
                                   </div>
                                   {error && <Message color='white' bgcolor='#f9714c'>{error}</Message>}
                                   <div className='items-price'>
                                        {!order.isPaid && (
                                             <div>
                                             {loadingPay && <Loader/>}
                                             {!sdkReady ? <Loader/> : (
                                                  <PayPalButton amount={order.totalPrice}
                                                                onSuccess={successPaymentHandler}/>
                                             )}
                                             </div>
                                        )}                                        
                                   </div>
                                   {loadingDeliver && <Loader/>}
                                   {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                         <div className='items-price'>
                                             <button className='submit-btn'onClick={deliverHandler}>Mark as delivered</button>
                                        </div>
                                             )}
                                             
                             </div>
                             </>
                             
                             )
                           }
                     </div>
                </div>
            </div>
    </>
}

export default OrderScreen
