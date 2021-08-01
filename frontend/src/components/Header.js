import React,{useState,useEffect} from 'react'
import {Route} from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import {Link} from 'react-router-dom';
import './Header.css'
import {logout} from '../actions/userActions'
import SearchBox from './SearchBox';

const Header = () => {

    let [cls,setCls]=useState('topnav');

    

    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo} = userLogin

    const dispatch = useDispatch()
    
    useEffect(()=>{
        //console.log(cls);
    },[cls])
    const showCartAndLogin=()=>{
        if(cls==='topnav')
        setCls('topnav responsive');
        else
        setCls('topnav');
    }
    const logoutHandler = ()=>{
      dispatch(logout())
    }

    return (
                    
           <div className={cls}>
            <Link to='/' className='home-link'>VirtualShop <i className="fas fa-shipping-fast"></i></Link>
            <Route render={({history})=><SearchBox history={history}/>}/>
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                  Admin
                 <div  className="dropdown-content admin-links">
                   <div className="dropdown-content1 "><Link to='/admin/userlist'>Users</Link></div>
                   <div className="dropdown-content1 "><Link to='/admin/productlist'>Products</Link></div>  
                   <div className="dropdown-content1 "><Link to='/admin/orderlist'>Orders</Link></div>                   
              </div>
             </div>
            )}
            {userInfo ? (
                <div className="dropdown">
                    {userInfo.name}
                    <div  className="dropdown-content">
                      <div className="dropdown-content1"><Link to='/profile'>Profile</Link></div>
                      <div className="dropdown-content1"><span onClick={logoutHandler}>Logout</span></div>                      
                    </div>
                </div>
            ):(
              <Link to='/login' className='login-link'><i className="fas fa-user"></i> Login</Link>
            )}
            
            <Link to='/cart' className='cart-link'><i className="fas fa-shopping-cart"></i> Cart</Link>                        
            <i className="fa fa-bars icon" onClick={showCartAndLogin}></i> 
          </div>
        
    )
}

export default Header
