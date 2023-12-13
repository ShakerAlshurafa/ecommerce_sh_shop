import axios from 'axios'
import React, { useContext } from 'react'
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom'
import { CartContext } from '../context/Cart';

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
                <div className="col-lg-8 text-center">
                    <h2>{data.name}</h2>
                    <p>{data.price}</p>
                    <button className='btn btn-outline-primary' onClick={()=>addToCart(data._id)}>Add To Cart</button>
                </div>
            </div>
            :<h2>no product</h2>
        }
    </div>
  )
}

export default Product