import axios from 'axios'
import React, { useContext } from 'react'
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom'
import { CartContext } from '../context/Cart';
import style from './Products.module.css'
import { FaRegStar, FaStar } from "react-icons/fa";
import Rating from 'react-rating';

function Product() {
    const {productId} = useParams();
    const {addToCartContext} = useContext(CartContext);

    const getProduct = async()=>{
        const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/products/${productId}`)
        return(data.product)
    }
    const {data,isLoading} = useQuery('product',getProduct);
    if (isLoading){
        return <div>loading...</div>
    }

    const addToCart = async(productId)=>{
        const res = await addToCartContext(productId);
        return(res)
    }

    // let stars = [false];
    const getRating = (rating)=>{
        return Array(5).fill().map((e,i)=>{return i<Math.floor(rating)})
    }
    // console.log(data)
  return (
    <div className='container'>
        {data?
            <div className="row my-5">
                <div className="col-lg-4">
                    <div className="row">
                        {data.subImages.map((img,index)=>
                            <div className="col-md-4" key={index}>
                                <img src={img.secure_url} className='img-fluid' alt="product" />
                            </div>
                        )}            
                    </div>
                </div>
                <div className="col-lg-8 text-white pb-2">
                    <h2>{data.name}</h2>
                    <p>Price: {data.price==0?<><del>${data.price}</del><span className='text-success fw-bold'>${data.finalPrice}</span></>:<span>${data.finalPrice}</span>} </p>
                    <button className='btn btn-outline-primary' onClick={()=>addToCart(data._id)}>Add To Cart</button>
                    <Link className='btn btn-outline-primary ms-2' to={`/addReviews/${data._id}`}>Add Review</Link>
                    <hr />
                </div>
                <div className="col-lg-4 mt-4">
                    <img className='img-thumbnail mx-auto w-75' src={data.mainImage.secure_url} />
                </div>
                <div className='text-center col-lg-8'>
                    <div className={`overflow-y-scroll bg-info bg-opacity-50 mx-auto mt-4 p-2 ${style.comments}`}>
                        <h3 className='mb-2 fw-bold'>Comments</h3>
                        {data.reviews.map((review)=>{
                        return(
                            <div className="comment mt-3 bg-info bg-opacity-25 py-2" key={review._id}>
                                {/* {console.log(review)} */}
                                <h6>{review.comment}</h6>
                                
                                    {
                                        getRating(review.rating).map((star,j)=>(<span>
                                            {star ? <FaStar color='orange'/> :<FaRegStar color='black'/>}
                                       </span> ))
                                    }
                                
                            </div>
                        )
                    })}</div>
                </div>
            </div>
            :<h2>no product</h2>
        }
    </div>
  )
}

export default Product