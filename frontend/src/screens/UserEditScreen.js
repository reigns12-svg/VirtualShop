import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import {getUserDetails,updateUser} from '../actions/userActions'
import {USER_UPDATE_RESET} from '../constants/userConstants'
import './LoginScreen.css'

const UserEditScreen = ({history,match}) => {

    const userId = match.params.id
    
    const [email,setEmail] = useState('')
    const [isAdmin,setIsAdmin] = useState(false)
    const [name,setName] = useState('')    
    

    const dispatch = useDispatch()

    const userDetails = useSelector(state=>state.userDetails)
    const {loading,error,user} = userDetails

    const userUpdate = useSelector(state=>state.userUpdate)
    const {loading:loadingUpdate,error:errorUpdate,success:successUpdate} = userUpdate


    useEffect(()=>{
        if(successUpdate){
            dispatch({type: USER_UPDATE_RESET})
            history.push('/admin/userList')
        }else{
            if(!user || !user.name || user._id!==userId){
                dispatch(getUserDetails(userId))
            }else{
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }        
    },[dispatch,history,userId,user,successUpdate])

    const submitHandler=(e)=>{
      e.preventDefault()
      dispatch(updateUser({_id:userId,name,email,isAdmin}))
    }

    return (
        <>
           <div className='edit-list-link'><Link to='/admin/userList' ><i className="far fa-hand-point-left"></i> Go back to user list</Link></div>
            <FormContainer>
           <div className='sign-in-form'> 
              <h1>Edit user</h1>
              {loadingUpdate && <Loader/>}
              {errorUpdate && <Message color='white' bgcolor='#f9714c'>{errorUpdate}</Message> }
             {loading ? <Loader/> : error ? ( <Message color='white' bgcolor='#f9714c'>{error}</Message> ):(
               
               <form onSubmit={submitHandler}>
             <div className='email-holder'>   
               <label><h2>Name </h2></label><br/>
               <input type='name' placeHolder='Enter name' value={name} onChange={(e)=>setName(e.target.value)}></input><br/>
              </div >
              <div className='email-holder'>   
               <label><h2>Email </h2></label><br/>
               <input type='email' placeHolder='Enter email' value={email} onChange={(e)=>setEmail(e.target.value)}></input><br/>
              </div >
              <div className='checkbox-holder'>
              <input type='checkbox'  checked={isAdmin} onChange={(e)=>setIsAdmin(e.target.checked)}></input>
               <label><h2>Is Admin </h2></label><br/>
               
               </div>
               
               <button type='submit' className='submit-btn' >Update</button>
             </form>
                
             )}
             
           </div> 
        </FormContainer>
        </>        
    )
}

export default UserEditScreen
