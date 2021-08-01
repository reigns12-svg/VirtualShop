import React,{useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import {listProducts,deleteProduct,createProduct} from '../actions/productActions'
import {PRODUCT_CREATE_RESET} from '../constants/productConstants'
import './ProductListScreen.css'


const ProductListScreen = ({history,match}) => {

    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch()

    const productList = useSelector(state=>state.productList)
    const {loading,error,products,page,pages} = productList

    const productDelete = useSelector(state=>state.productDelete)
    const {loading:loadingDelete,error:errorDelete,success:successDelete} = productDelete

    const productCreate = useSelector(state=>state.productCreate)
    const {loading:loadingCreate,error:errorCreate,success:successCreate,product:createdProduct} = productCreate

    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo} = userLogin

    useEffect(()=>{
        dispatch({type:PRODUCT_CREATE_RESET})
        if(!userInfo.isAdmin){
            history.push('/login')
        }
        if(successCreate){
            history.push(`/admin/product/${createdProduct._id}/edit`)
        }else{
            dispatch(listProducts('',pageNumber))
        }
    },[dispatch,history,userInfo,successDelete,successCreate,createdProduct,pageNumber])

    const deleteHandler=(id)=>{
        if(window.confirm('Are you sure')){
            dispatch(deleteProduct(id))
        }
       
    }
    
     const createProductHandler=()=>{
         dispatch(createProduct())
     }

    return (
        <div className='userscreen'>
           <div> 
               <div className='product-list-heading-col'>
                 <h1>Products</h1>
               </div>
                <div className='product-list-btn-col'>
                    <button  className='product-create-button'onClick={createProductHandler}><i className='fa fa-plus'></i> Create Product</button>
                </div>
           </div>  
           {loadingDelete && <Loader/>}
           {errorDelete && <Message color='white' bgcolor='#f9714c'>{errorDelete}</Message>}
           {loadingCreate && <Loader/>}
           {errorCreate && <Message color='white' bgcolor='#f9714c'>{errorCreate}</Message>}
            {loading ? <Loader/> : error ? <Message color='white' bgcolor='#f9714c'>{error}</Message> :(
              <>  
                <table className='user-list-tables'>
                <thead>
                    <tr>
                        
                        <th className='table-spacing'>NAME</th>
                        <th className='table-spacing'>PRICE</th>
                        <th className='table-spacing'>CATEGORY</th>
                        <th className='table-spacing'>BRAND</th>
                        <th className='table-spacing'>EDIT/DELETE</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product=>(
                        <tr key={product._id}>
                            
                            <td className='table-spacing'>{product.name}</td>
                            <td className='table-spacing'>Rs. {product.price}</td>
                            <td className='table-spacing'>
                                {product.category}
                            </td>
                            <td className='table-spacing'>{product.brand}</td>
                            <td className='table-spacing'>
                                <Link to={`/admin/product/${product._id}/edit`}>
                                    <i className='fas fa-edit'></i>
                                </Link>
                                <button className='deleteUser-button' onClick={()=>deleteHandler(product._id)}>
                                    <i className='fas fa-trash' ></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
               </table>
               <Paginate pages={pages} page={page} isAdmin={true}/>
            </>
            )}
        </div>
    )
}

export default ProductListScreen

