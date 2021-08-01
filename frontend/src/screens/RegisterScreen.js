import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import {register} from '../actions/userActions'
import './LoginScreen.css'

const RegisterScreen = ({location,history}) => {
    
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [name,setName] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [message,setMessage] = useState(null)

    const dispatch = useDispatch()

    const userRegister = useSelector(state=>state.userRegister)
    const {loading,error,userInfo} = userRegister

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(()=>{
        if(userInfo){
            history.push(redirect)
        }
    },[history,userInfo,redirect])

    const submitHandler=(e)=>{
      e.preventDefault()
      if(password!==confirmPassword)
      setMessage('Passwords do not match')
      else
      dispatch(register(name,email,password))
    }

    return (
        <FormContainer>
           <div className='sign-in-form'> 
              <h1>Sign Up</h1>
              {message && <Message color='white' bgcolor='#f9714c'>{message}</Message>}
             {error && <Message color='white' bgcolor='#f9714c'>{error}</Message>}
             {loading && <Loader/>}
             <form onSubmit={submitHandler}>
             <div className='email-holder'>   
               <label><h2>Name </h2></label><br/>
               <input type='name' placeHolder='Enter name' value={name} onChange={(e)=>setName(e.target.value)}></input><br/>
              </div >
              <div className='email-holder'>   
               <label><h2>Email </h2></label><br/>
               <input type='email' placeHolder='Enter email' value={email} onChange={(e)=>setEmail(e.target.value)}></input><br/>
              </div >
              <div className='password-holder'>
               <label><h2>Password </h2></label><br/>
               <input type='password' placeHolder='Enter password' value={password} onChange={(e)=>setPassword(e.target.value)}></input><br/>
               </div>
               <div className='password-holder'>
               <label><h2>Confirm Password </h2></label><br/>
               <input type='password' placeHolder='Re-enter password' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}></input><br/>
               </div>
               <button type='submit' className='submit-btn' >Register</button>
             </form>
               <div className='to-register'>Already have an account ?{' '}
                  <Link to={redirect ? `/login?redirect=${redirect}`:'/login'}>Login</Link>
               </div>
           </div> 
        </FormContainer>
    )
}

export default RegisterScreen
