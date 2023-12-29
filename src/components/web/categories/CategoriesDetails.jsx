import axios from 'axios';
import React from 'react'
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom'
import style from '../products/Products.module.css'
import { FaRegStar, FaStar } from 'react-icons/fa';

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

    const getRating = (rating)=>{
        return Array(5).fill().map((e,i)=>{return i<Math.floor(rating)})
    }
  return (
    <div className={`${style.products}`}>
        <div className="container h-100 mx-auto mt-3">
            <div className="row  d-flex justify-content-center align-items-center h-100">
                {data?.length?<>{data.map((product)=>
                    <div className="col-md-4 my-3">
                        <div className={`${style.card}  w-100 position-relative`} style={{width: '18rem'}}>
                            <img src={product.mainImage.secure_url} className={`${style.cardImg} w-100 mb-2`} alt="" />
                            <div className={`${style.cardBody} d-flex flex-column justify-content-center position-relative text-center`}>
                                <div className={`${style.line}`}>
                                    <h5 className={`${style.lineUp} card-title mx-2`}>{product.name}</h5>
                                    <div className={`${style.lineUp} rating`}>
                                        {
                                            getRating(product.avgRating).map((star,j)=>(<span>
                                                {star ? <FaStar color='orange'/> :<FaRegStar color='black'/>}
                                            </span> ))
                                        }
                                    </div>
                                </div>
                            </div>
                            <Link to={`/products/${product._id}`} className={`${style.btn} d-block text-center`}>details</Link>
                        </div>
                    </div>    
                )}
                </>:<h2>no product</h2>}
            </div>
        </div>
    </div>
  )
}

export default CategoriesDetails