import React,{useState} from 'react'
import './SearchBox.css'

const SearchBox = ({history}) => {

    const [keyword, setKeyword] = useState('')

    const submitHandler=(e)=>{
      e.preventDefault()
      if(keyword.trim())
      {
          history.push(`/search/${keyword}`)
      }else{
          history.push('/')
      }
    }

    return (
        <form onSubmit={submitHandler} className='searchbox'>
          <input type="text" placeholder='Search Products...' onChange={(e)=>setKeyword(e.target.value)}></input> 
          <button type='submit' className='search-btn'>Search</button> 
        </form>
    )
}

export default SearchBox

