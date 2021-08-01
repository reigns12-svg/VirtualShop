import React,{useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {listOrders} from '../actions/orderActions'


const OrderListScreen = ({history}) => {

    const dispatch = useDispatch()

    const orderList = useSelector(state=>state.orderList)
    const {loading,error,orders} = orderList

    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo} = userLogin

    
    useEffect(()=>{
        if(userInfo && userInfo.isAdmin){
        dispatch(listOrders())
        }else{
            history.push('/login')
        }
    },[dispatch,history,userInfo])

    

    return (
        <div className='userscreen'><h1>Users</h1>
            {loading ? <Loader/> : error ? <Message color='white' bgcolor='#f9714c'>{error}</Message> :(
                <table className='user-list-tables'>
                <thead>
                    <tr>
                        
                        <th className='table-spacing'>ID</th>
                        <th className='table-spacing'>USER</th>
                        <th className='table-spacing'>DATE</th>
                        <th className='table-spacing'>TOTAL</th>
                        <th className='table-spacing'>PAID</th>
                        <th className='table-spacing'>DELEVERED</th>
                        <th className='table-spacing'></th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order=>(
                        <tr key={order._id}>
                            
                            <td className='table-spacing'>{order._id}</td>
                            <td className='table-spacing'>{order.user && order.user.name}</td>
                            <td className='table-spacing'>{order.createdAt.substring(0,10)}</td>
                            <td className='table-spacing'>Rs. {order.totalPrice}</td>
                            <td className='table-spacing'>
                                {order.isPaid ? (order.paidAt.substring(0,10)) :
                                (<i className='fas fa-times' style={{color:'red'}}></i>)
                                }
                            </td>
                            <td className='table-spacing'>
                                {order.isDelivered ? (order.deliveredAt.substring(0,10)) :
                                (<i className='fas fa-times' style={{color:'red'}}></i>)
                                }
                            </td>
                            <td className='table-spacing'>
                                <Link to={`/order/${order._id}`}>
                                <i className="fas fa-info-circle"></i> Details
                                </Link>
                                
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            )}
        </div>
    )
}

export default OrderListScreen

