import React from 'react'
import {Link} from 'react-router-dom'
import Rating from './Rating'
import './Product.css'

const Product = ({product}) => {
    return (
        <div className='product-card'>
           <Link to={`/product/${product._id}`}> 
            <img src={product.image} className='image-product' alt=''/><br/>
            <strong className='name-product'>{product.name}</strong><br/>            
            </Link>
            <Rating value={product.rating}
            text={`${product.numReviews} reviews`}
            />
            
            <h3>Rs. {product.price}</h3>
        </div>
    )
}

export default Product
