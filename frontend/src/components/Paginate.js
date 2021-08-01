import React from 'react'
import {Link} from 'react-router-dom'
import './Paginate.css'

const Paginate = ({pages,page,isAdmin=false,keyword=''}) => {
    return pages>1 && (
        <div className='pagination'>
            {[...Array(pages).keys()].map(x=>(
                <Link key={x+1} to={!isAdmin ? keyword ? `/search/${keyword}/page/${x+1}`:`/page/${x+1}`: `/admin/productList/${x+1}`}>
                    <div className='pagination-item'>{x+1}</div>
                </Link>
            ))

            }
        </div>
    )
}

export default Paginate
