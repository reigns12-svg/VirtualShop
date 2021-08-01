import React,{useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {listUsers,deleteUser} from '../actions/userActions'
import './UserListScreen.css'

const UserListScreen = ({history}) => {

    const dispatch = useDispatch()

    const userList = useSelector(state=>state.userList)
    const {loading,error,users} = userList

    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo} = userLogin

    const userDelete = useSelector((state)=>state.userDelete)
    const {success:successDelete} = userDelete

    useEffect(()=>{
        if(userInfo && userInfo.isAdmin){
        dispatch(listUsers())
        }else{
            history.push('/login')
        }
    },[dispatch,history,successDelete,userInfo])

    const deleteHandler=(id)=>{
        if(window.confirm('Are you sure')){
            dispatch(deleteUser(id))
        }
       
    }

    return (
        <div className='userscreen'><h1>Users</h1>
            {loading ? <Loader/> : error ? <Message color='white' bgcolor='#f9714c'>{error}</Message> :(
                <table className='user-list-tables'>
                <thead>
                    <tr>
                        
                        <th className='table-spacing'>NAME</th>
                        <th className='table-spacing'>EMAIL</th>
                        <th className='table-spacing'>ADMIN</th>
                        <th className='table-spacing'>EDIT / DELETE</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user=>(
                        <tr key={user._id}>
                            
                            <td className='table-spacing'>{user.name}</td>
                            <td className='table-spacing'><a href={`mailto:${user.email}`}>{user.email}</a></td>
                            <td className='table-spacing'>
                                {user.isAdmin ? (<i className='fas fa-check' style={{color:'green'}}></i>) :
                                (<i className='fas fa-times' style={{color:'red'}}></i>)
                                }
                            </td>
                            <td className='table-spacing'>
                                <Link to={`/admin/user/${user._id}/edit`}>
                                    <i className='fas fa-edit'></i>
                                </Link>
                                <button className='deleteUser-button' onClick={()=>deleteHandler(user._id)}>
                                    <i className='fas fa-trash' ></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            )}
        </div>
    )
}

export default UserListScreen

