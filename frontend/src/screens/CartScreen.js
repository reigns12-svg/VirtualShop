import React,{useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import Message from '../components/Message'
import {addToCart,removeFromCart} from '../actions/cartActions'
import './CartScreen.css'

const CartScreen = ({match,location,history}) => {

    const productId = match.params.id
     
    const qty = location.search? Number(location.search.split('=')[1]) : 1

    const dispatch=useDispatch()

    const cart = useSelector(state=>state.cart)
    const {cartItems} = cart

    useEffect(()=>{
        if(productId){
            dispatch(addToCart(productId,qty))
        }
    },[dispatch,productId,qty])

    const removeFromCartHandler=(id)=>{
      dispatch(removeFromCart(id))
      history.push('/cart')
    }
    const checkoutHandler=()=>{
    history.push('/login?redirect=shipping')
    }

    return (
        <div className='cart-row'>
           <div className='cart-coulmn-1'>
              <h1>Shopping Cart</h1>
              {cartItems.length===0 ? (
                  <Message color='white' bgcolor='#f9714c'>Your cart is empty &nbsp;<Link to='/'>Go Back</Link></Message>
              ):(
                  
                  <div className='cart-item-container'>
                      {
                          cartItems.map(item=>(
                              
                              <div className='item-product' key={item.product}>
                                 <div className='item-image'>
                                   <img src={item.image} alt={item.name} />  
                                </div> 
                                 <div className='item-name'>
                                   <Link to={`/product/${item.product}`}>{item.name}</Link>
                                 </div>
                                 <div className='item-price'>
                                      Rs. {item.price}
                                 </div>
                                 <div className='item-qty'>
                                       <form>
                                      <select value={item.qty} onChange={(e)=>dispatch(addToCart(item.product,Number(e.target.value)))} 
                                              className='select-cart-dropdown'>
                                          {
                                         [...Array(item.countInStock).keys()].map((x)=>(
                                             <option key={x+1} value={x+1}>{x+1}</option>
                                         ))
                                          }
                                      </select>
                                           </form>
                                 </div>
                                 <div className='item-remove'>
                                    <button className='item-remove-button' onClick={()=>removeFromCartHandler(item.product)}>
                                        <i className='fas fa-trash'></i>
                                    </button>    
                                 </div>
                              </div>
                              
                              
                          ))
                      }
                  </div>
              )}
                  
              
            </div>
            <div className='subtotal-container'>
                                 <div className='subtotal'>
                                     <h2>Subtotal &nbsp; ({cartItems.reduce((acc,item)=>acc+item.qty,0)})&nbsp;  items<br/><br/>
                                     Rs. {cartItems.reduce((acc,item)=>acc+item.qty*item.price,0)}</h2>
                                 </div>
                                 <div className='subtotal'>
                                     <button className='checkout-button' disabled={cartItems.length===0}
                                             onClick={checkoutHandler}><h2>Proceed to checkout</h2></button>
                                 </div>
            </div>
      </div>
    )
}

export default CartScreen
