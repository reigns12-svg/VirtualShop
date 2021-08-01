import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {getUserDetails,updateUserProfile} from '../actions/userActions'
import {listMyOrders} from '../actions/orderActions'
import './ProfileScreen.css'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'

const ProfileScreen = ({location,history}) => {
    
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [name,setName] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [message,setMessage] = useState(null)

    const dispatch = useDispatch()

    const userDetails = useSelector(state=>state.userDetails)
    const {loading,error,user} = userDetails

    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo} = userLogin

    const userUpdateProfile = useSelector(state=>state.userUpdateProfile)
    const {success} = userUpdateProfile

    const orderListMy = useSelector(state=>state.orderListMy)
    const {loading:loadingOrders,error:errorOrders,orders} = orderListMy

    useEffect(()=>{
        if(!userInfo){
            history.push('/login')
        }else {
            if(!user || !user.name || success){
                dispatch({type:USER_UPDATE_PROFILE_RESET})
                dispatch(getUserDetails('profile'))
                dispatch(listMyOrders())
            }else{
                setName(user.name)
                setEmail(user.email)
            }
        }
    },[dispatch,history,userInfo,user,success])

    const submitHandler=(e)=>{
      e.preventDefault()
      if(password!==confirmPassword)
      setMessage('Passwords do not match')
      else{
        dispatch(updateUserProfile({id:user._id,name,email,password}))
      }
      
    }

    return (
        <div className='profile-row'>
            <div className='profile-coulmn'>
            <div className='profile-container'> 
              <h1>User Profile</h1>
              {message && <Message color='white' bgcolor='#f9714c'>{message}</Message>}
             {error && <Message color='white' bgcolor='#f9714c'>{error}</Message>}
             {success && <Message color='white' bgcolor='#00cc00'>User profile updated successfully</Message>}
             {loading && <Loader/>}
             <form onSubmit={submitHandler}>
             <div className='email-holder '>   
               <label><h2>Name </h2></label><br/>
               <input type='name' className='holder2'placeholder='Enter name' value={name} onChange={(e)=>setName(e.target.value)}></input><br/>
              </div >
              <div className='email-holder '>   
               <label><h2>Email </h2></label><br/>
               <input type='email' className='holder2'placeholder='Enter email' value={email} onChange={(e)=>setEmail(e.target.value)}></input><br/>
              </div >
              <div className='password-holder '>
               <label><h2>Password </h2></label><br/>
               <input type='password'className='holder2' placeholder='Enter password' value={password} onChange={(e)=>setPassword(e.target.value)}></input><br/>
               </div>
               <div className='password-holder '>
               <label><h2>Confirm Password </h2></label><br/>
               <input type='password' className='holder2'placeholder='Re-enter password' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}></input><br/>
               </div>
               <button type='submit' className='submit-btn' >Update</button>
             </form>
               
           </div> 
            </div>
            <div className='order-coulmn'>
                <h1>My Orders</h1>
                {loadingOrders ? <Loader/> : errorOrders ? <Message color='white' bgcolor='#f9714c'>{errorOrders}</Message>
                 :(
                     <table>
                       <thead >  
                         <tr>
                             
                             <th className='table-head-item'>DATE</th>                             
                             <th className='table-head-item'>PAID</th>
                             <th className='table-head-item'>DELIVERED</th>
                             <th className='table-head-item'>ORDER DETAILS</th>
                         </tr>
                         </thead>
                         <tbody>
                           {orders.map(order =>(
                               <tr key={order._id}>
                                   {/* <td className='table-body-item'>{order._id}</td> */}
                                   <td className='table-body-item'>{order.createdAt.substring(0,10)}</td>
                                   
                                   <td className='table-body-item'>{order.isPaid ? order.paidAt.substring(0,10) :(
                                       <i className='fas fa-times' style={{color:'red'}}></i>
                                   )}
                                   </td> 
                                   <td className='table-body-item'>{order.isDelivered ? order.deliveredAt.substring(0,10) :(
                                       <i className='fas fa-times' style={{color:'red'}}></i>
                                   )}
                                   </td>
                                   <td className='table-body-item'><Link to={`/order/${order._id}`}>Details</Link></td>  
                               </tr>
                           ))}
                         </tbody> 
                     </table>
                 )              
                }
            </div>
        </div>
    )
}

export default ProfileScreen
