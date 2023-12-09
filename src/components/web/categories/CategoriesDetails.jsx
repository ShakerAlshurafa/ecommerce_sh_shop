import axios from 'axios';
import React from 'react'
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom'

function CategoriesDetails() {
    const {categoryId} = useParams();
    
    const getCategoriesDetails = async()=>{
        const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/products/category/${categoryId}`)
        return(data.products);
    }

    const {data,isLoading} = useQuery('category_details',getCategoriesDetails);
    if(isLoading){
        return(
            <p>...loading</p>
        )
    }

  return (
    <div className='products container'>
        <div className="row">
        {data.length?data.map((product)=>
            <div className="product col-lg-6 my-3" key={product._id}>
                <img src={product.mainImage.secure_url} className='w-50' alt="" />
                <h2>{product.name}</h2>
                <Link to={`/products/${product._id}`}>details</Link>
            </div>
        ):<h2>no product</h2>}
        </div>
    </div>
  )
}

export default CategoriesDetails