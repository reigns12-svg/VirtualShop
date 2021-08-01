import React from 'react'
import {BrowserRouter as Router,Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import CartScreen from './screens/CartScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import ProductListScreen from './screens/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import OrderListScreen from './screens/OrderListScreen'

const App=()=> {
  return (
    <Router>
     <div className='mainBody'>
       <Header/>
         <main>            
           <Route path='/order/:id' component={OrderScreen}/>
           <Route path='/placeorder' component={PlaceOrderScreen}/>
            <Route path='/payment' component={PaymentScreen}/>
            <Route path='/shipping' component={ShippingScreen}/>         
            <Route path='/login' component={LoginScreen} />
            <Route path='/register' component={RegisterScreen} />
            <Route path='/profile' component={ProfileScreen} />
            <Route path='/product/:id' component={ProductScreen} />
            <Route path='/cart/:id?' component={CartScreen} />
            <Route path='/admin/userList' component={UserListScreen} />
            <Route path='/admin/productList' component={ProductListScreen} exact />
            <Route path='/admin/productList/:pageNumber' component={ProductListScreen} exact/>
            <Route path='/admin/user/:id/edit' component={UserEditScreen} />
            <Route path='/admin/product/:id/edit' component={ProductEditScreen} />
            <Route path='/admin/orderList' component={OrderListScreen} />
            <Route path='/search/:keyword' component={HomeScreen} exact />
            <Route path='/page/:pageNumber' component={HomeScreen}  />
            <Route path='/search/:keyword/page/:pageNumber' component={HomeScreen}  />
            <Route path='/' component={HomeScreen} exact />
         </main>  
       <Footer/>
    </div>
    </Router>
  );
}

export default App;
