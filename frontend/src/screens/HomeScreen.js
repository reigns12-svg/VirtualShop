import React,{useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {listProducts} from '../actions/productActions'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import './HomeScreen.css'

const HomeScreen = ({match}) => {

  const pageNumber = match.params.pageNumber || 1

  const keyword = match.params.keyword  
  const dispatch = useDispatch()

  const productList = useSelector(state=>state.productList)
  const {loading,error,products,page,pages} = productList

   useEffect(()=>{
       dispatch(listProducts(keyword,pageNumber))
   },[dispatch,keyword,pageNumber])


    return (
        <>
            <h1 className='products-heading'>Latest,best and cheapest products!!</h1>
            <div className='products-row'>
            
                {loading?(<Loader/>):error ? (<Message color='white' bgcolor='#f9714c'>{error}</Message>):(
                    
                    products.map(product=>(
                       <div className='products-coulmn' key={product._id}> 
                       <Product product={product}/>
                       </div> 
                    )))
                }
            </div>
            <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
        </>
    )
}

export default HomeScreen
