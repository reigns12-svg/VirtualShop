import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import {login} from '../actions/userActions'
import './LoginScreen.css'

const LoginScreen = ({location,history}) => {
    
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const dispatch = useDispatch()

    const userLogin = useSelector(state=>state.userLogin)
    const {loading,error,userInfo} = userLogin

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(()=>{
        if(userInfo){
            history.push(redirect)
        }
    },[history,userInfo,redirect])

    const submitHandler=(e)=>{
      e.preventDefault()
      dispatch(login(email,password))
    }

    return (
        <FormContainer>
           <div className='sign-in-form'> 
              <h1>Sign In</h1>
             {error && <Message color='white' bgcolor='#f9714c'>{error}</Message>}
             {loading && <Loader/>}
             <form onSubmit={submitHandler}>
              <div className='email-holder'>   
               <label><h2>Email </h2></label><br/>
               <input type='email' placeholder='Enter email' value={email} onChange={(e)=>setEmail(e.target.value)}></input><br/>
              </div >
              <div className='password-holder'>
               <label><h2>Password </h2></label><br/>
               <input type='password' placeholder='Enter password' value={password} onChange={(e)=>setPassword(e.target.value)}></input><br/>
               </div>
               <button type='submit' className='submit-btn' >Sign-In</button>
             </form>
               <div className='to-register'>New Customer?{' '}
                  <Link to={redirect ? `/register?redirect=${redirect}`:'/register'}>Register</Link>
               </div>
           </div> 
        </FormContainer>
    )
}

export default LoginScreen
