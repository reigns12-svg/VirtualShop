import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {useDispatch,useSelector} from 'react-redux'
import {listProductDetails,createProductReview} from '../actions/productActions'
import './ProductScreen.css';
import { PRODUCT_DETAILS_RESET,PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'

const ProductScreen = ({history,match}) => {

    const [qty,setQty] = useState(1)
    const [rating,setRating] = useState(0)
    const [comment,setComment] = useState('')
    const dispatch = useDispatch()

    const productDetails = useSelector(state=>state.productDetails)
    const {loading,error,product} = productDetails

    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo} = userLogin

    const productReviewCreate = useSelector(state=>state.productReviewCreate)
    const {success:successProductReview,error:errorProductReview} = productReviewCreate

    useEffect(()=>{
        if(successProductReview){
            alert('Review Submitted!')
            setRating(0)
            setComment('')
            dispatch({type:PRODUCT_CREATE_REVIEW_RESET})
        }
        dispatch({type:PRODUCT_DETAILS_RESET})
        dispatch(listProductDetails(match.params.id))
    },[dispatch,match,successProductReview])


    const addToCartHandler =()=>{
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }
     
    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(createProductReview(match.params.id,{
            rating,
            comment
        }))
    }

    return (
        <>
           <Link className='backButton' to='/'>
               Go Back
           </Link>
           {loading ? <Loader/> : error ? <Message color='white' bgcolor='#f9714c'>{error}</Message>:(
           <> 
            <div className='product-details-row'>
              <div className='product-image-coulmn'>
                  <img src={product.image} alt={product.name}/>
              </div>
              <div className='product-list-coulmn'>
                <div className='product-list-item'>   
                    <h2>{product.name}</h2>
                </div>   
                <div className='product-list-item'>   
                    <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                    />
                </div>
                <div className='product-list-item'>   
                    Price: Rs. {product.price}
                </div>
                <div className='product-list-item'>   
                   Description: {product.description}
                </div>
              </div>
              <div className='product-cart-details'>
                  <div className='product-cart-row'>
                        <div className='product-cart-coulmn1'>Price : </div>
                        <div className='product-cart-coulmn2'><strong>Rs. {product.price}</strong></div>
                  </div>
                  <div className='product-cart-row'>
                        <div className='product-cart-coulmn1'>Status : </div>
                        <div className='product-cart-coulmn2'>{product.countInStock > 0 ? 'In stock' : 'Out of stock' }</div>
                  </div>
                  {product.countInStock>0 && (
                      <div className='product-cart-row'>
                        <div className='product-cart-coulmn1'>Qty : </div>
                        <div className='product-cart-coulmn2'>
                            <form>
                                <select value={qty} onChange={(e)=>setQty(e.target.value)} className='select-dropdown'>
                                    {
                                   [...Array(product.countInStock).keys()].map((x)=>(
                                       <option key={x+1} value={x+1}>{x+1}</option>
                                   ))
                                    }
                                </select>
                            </form>
                        </div>
                      </div>
                  )}
                  <div className='product-cart-button'>
                        <button className='addToCart' onClick={addToCartHandler}
                         disabled={product.countInStock===0}>Add to Cart</button>
                  </div>
              </div>
           </div>
           <div className='reviews-row'>
                <h2>Reviews</h2>
                {product.reviews.length===0 && <Message color='#1c1cf0' bgcolor='#e7feff'>No reviews</Message>}
                <div>
                    {product.reviews.map((review)=>(
                        <div className='review-item' key={review._id}>
                            <strong>{review.name}</strong>
                            <Rating value={review.rating}/>
                            <p>{review.createdAt.substring(0,10)}</p>
                            <p>{review.comment}</p>
                        </div>
                    ))}
                    <div className='review-item'>
                       <h2>Write a customer Review</h2>
                       {errorProductReview && <Message color='white' bgcolor='#f9714c'>{errorProductReview}</Message>}
                       {userInfo ? (
                           <form onSubmit={submitHandler}>
                              <label>Rating </label>
                              <select value={rating} onChange={(e)=>setRating(e.target.value)}>
                                <option value=' '>Select...</option>
                                <option value='1'>1-Poor</option>
                                <option value='2'>2-Average</option>
                                <option value='3'>3-Good</option>
                                <option value='4'>4-Very Good</option>
                                <option value='5'>5-Outstanding</option>
                              </select>
                              <div className='email-holder'>   
                                <label><h2>Comment</h2></label><br/>
                                <input type='textarea' placeholder='Enter comment' value={comment} onChange={(e)=>setComment(e.target.value)}></input><br/>
                              </div >
                            <button type='submit' className='submit-btn' >Submit</button>
                          </form>
                       ):(
                        <Message color='#1c1cf0' bgcolor='#e7feff'>Please <Link to='/login'>login</Link> to write a review</Message>
                       )}
                    </div>
                </div>
           </div>
           </>
           )}
           
        </>
    )
}

export default ProductScreen
