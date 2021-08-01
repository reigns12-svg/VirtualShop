import axios from 'axios'
import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import {listProductDetails,updateProduct} from '../actions/productActions'
import './LoginScreen.css'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'


const ProductEditScreen = ({history,match}) => {

    const productId = match.params.id
    
    const [price,setPrice] = useState(0)
    const [image,setImage] = useState('')
    const [name,setName] = useState('')    
    const [brand,setBrand] = useState('')
    const [category,setCategory] = useState('')
    const [countInStock,setCountInStock] = useState(0)
    const [description,setDescription] = useState('')
    const [uploading,setUploading] = useState(false)

    const dispatch = useDispatch()

    const productDetails = useSelector(state=>state.productDetails)
    const {loading,error,product} = productDetails
 
    const productUpdate = useSelector(state=>state.productUpdate)
    const {loading:loadingUpdate,error:errorUpdate,success:successUpdate} = productUpdate
   
    useEffect(()=>{
            if(successUpdate){
              dispatch({type:PRODUCT_UPDATE_RESET})
              history.push('/admin/productList')
            }else{
              if( !product.name || product._id!==productId){
                dispatch(listProductDetails(productId))
                
            }else{
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)
            }
            }           
               
    },[dispatch,history,productId,product,successUpdate])

    const submitHandler=(e)=>{
      e.preventDefault()
      dispatch(
        updateProduct({
          _id:productId,
          name,
          price,
          image,
          brand,
          category,
          description,
          countInStock,
        })
      )
    }
      
     const uploadFileHandler=async(e)=>{
       const file = e.target.files[0]
       const formData = new FormData()
       formData.append('image',file)
       setUploading(true)

      try {
        const config={
          headers:{
            'Content-Type':'multipart/form-data'
          }
        }

        const {data} = await axios.post('/api/upload',formData,config)
        setImage(data)
        setUploading(false)
      } catch (error) {
        console.error(error)
        setUploading(false)
      }
     }

    return (
        <>
            <div className='edit-list-link'><Link to='/admin/productList'><i className="far fa-hand-point-left"></i> Go back to product list</Link></div>
            <FormContainer>
           <div className='sign-in-form'> 
              <h1>Edit product</h1>
              {loadingUpdate && <Loader/>}
              {errorUpdate && <Message color='white' bgcolor='#f9714c'>{errorUpdate}</Message>}
             {loading ? <Loader/> : error ? ( <Message color='white' bgcolor='#f9714c'>{error}</Message> ):(
               
               <form onSubmit={submitHandler}>
             <div className='email-holder'>   
               <label><h2>Name </h2></label><br/>
               <input type='name' placeholder='Enter name' value={name} onChange={(e)=>setName(e.target.value)}></input><br/>
              </div >
              <div className='email-holder'>   
               <label><h2>price </h2></label><br/>
               <input type='number' placeholder='Enter price' value={price} onChange={(e)=>setPrice(e.target.value)}></input><br/>
              </div >
              <div className='email-holder'>   
               <label><h2>Image </h2></label><br/>
               <input type='text' placeholder='Enter image url' value={image} onChange={(e)=>setImage(e.target.value)}></input><br/>
              </div >
              <label><h2>Choose Image</h2></label><br/>
              <input type="file" onChange={uploadFileHandler}></input>
              {uploading && <Loader/>}
              <div className='email-holder'>   
               <label><h2>Brand </h2></label><br/>
               <input type='text' placeholder='Enter brand' value={brand} onChange={(e)=>setBrand(e.target.value)}></input><br/>
              </div >
              <div className='email-holder'>   
               <label><h2>Count In Stock</h2></label><br/>
               <input type='number' placeholder='Enter count in stock' value={countInStock} onChange={(e)=>setCountInStock(e.target.value)}></input><br/>
              </div >
              <div className='email-holder'>   
               <label><h2>Category </h2></label><br/>
               <input type='text' placeholder='Enter category' value={category} onChange={(e)=>setCategory(e.target.value)}></input><br/>
              </div >
              <div className='email-holder'>   
               <label><h2>Description </h2></label><br/>
               <input type='text' placeholder='Enter description' value={description} onChange={(e)=>setDescription(e.target.value)}></input><br/>
              </div >
                             
               <button type='submit' className='submit-btn' >Update</button>
             </form>
                
             )}
             
           </div> 
        </FormContainer>
        </>        
    )
}

export default ProductEditScreen
