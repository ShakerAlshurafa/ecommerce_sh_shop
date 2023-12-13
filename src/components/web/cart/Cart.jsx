import React, { useContext, useEffect, useState } from 'react'
import './cart.css'
import { CartContext } from '../context/Cart'
import { useQuery } from 'react-query';
import { useFormik } from 'formik';
import { couponSchema } from '../validation/validate';
import Input from '../../pages/Input';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

function Cart() {
  const {removeItemContext,getCartContext,clearCartContext,increaseQuantityCart,decreaseQuantityCart} = useContext(CartContext);
 


  const getCart = async()=>{
    const res = getCartContext();
    setLoading(false);
    return res;
  }

  const [loading,setLoading] = useState(false); //not complete 

  const removeFromCart = async(productId)=>{
    await removeItemContext(productId);
  }
  if(loading){
    <span class="loader"></span>
  }

  const increaseCart = async(productId)=>{
    await increaseQuantityCart(productId);
    await getCart();
  }
  const decreaseCart = async(productId)=>{
    await decreaseQuantityCart(productId);
  }

  

  const subTotal = ()=>{
    let sum = 0;
    data?.products?
    data.products.map((product)=>{
      sum+= product.details.price*product.quantity;
    }): sum=0;
      return sum;
  }

  const {data,isLoading} = useQuery('cart',getCart);
  if(isLoading){
    return <div>loading...</div>;
  }

  const clearCart= async()=>{
    await clearCartContext();
  }
  return (

    <div className="cart position-relative">
      <div className="container">
        <div className="row">
          <div className="cart-items">
            <div className="products" id="products">
              <div className="item">
                <div className="product-info">
                  <h2>Product</h2>
                </div>
                <div className="quantity">
                  <h2>Quantity</h2>
                </div>
                <div className="price">
                  <h2>Price</h2>
                </div>
                <div className="subtotal">
                  <h2>Subtotal</h2>
                </div>
              </div>
              
              {data?.products?( data.products.map((product)=>
                <div className="item" key={product.details._id}>
                  <div className="product-info">
                    <img src= {product.details.mainImage.secure_url} />
                    <div className="product-details">
                      <h2>{product.details.name}</h2>
                      <span>Color:black</span>
                      <button onClick={()=>removeFromCart(product.details._id)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={25}
                          viewBox="0 0 24 25"
                          fill="none"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M5.29289 5.79289C5.68342 5.40237 6.31658 5.40237 6.70711 5.79289L12 11.0858L17.2929 5.79289C17.6834 5.40237 18.3166 5.40237 18.7071 5.79289C19.0976 6.18342 19.0976 6.81658 18.7071 7.20711L13.4142 12.5L18.7071 17.7929C19.0976 18.1834 19.0976 18.8166 18.7071 19.2071C18.3166 19.5976 17.6834 19.5976 17.2929 19.2071L12 13.9142L6.70711 19.2071C6.31658 19.5976 5.68342 19.5976 5.29289 19.2071C4.90237 18.8166 4.90237 18.1834 5.29289 17.7929L10.5858 12.5L5.29289 7.20711C4.90237 6.81658 4.90237 6.18342 5.29289 5.79289Z"
                            fill="#6C7275"
                          />
                        </svg>
                        remove
                      </button>
                      
                    </div>
                  </div>
                  
                  <div className="quantity">

                    <button onClick={()=>decreaseCart(product.details._id)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={16}
                        height={17}
                        viewBox="0 0 16 17"
                        fill="none"
                      >
                        <path
                          d="M3.22852 8.5H12.5618"
                          stroke="#121212"
                          strokeWidth="0.75"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>

                    <span>{product.quantity}</span>

                    <button onClick={()=>increaseCart(product.details._id)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={16}
                        height={17}
                        viewBox="0 0 16 17"
                        fill="none"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M8.37565 3.83333C8.37565 3.62622 8.20776 3.45833 8.00065 3.45833C7.79354 3.45833 7.62565 3.62622 7.62565 3.83333V8.125H3.33398C3.12688 8.125 2.95898 8.29289 2.95898 8.5C2.95898 8.7071 3.12688 8.875 3.33398 8.875H7.62565V13.1667C7.62565 13.3738 7.79354 13.5417 8.00065 13.5417C8.20776 13.5417 8.37565 13.3738 8.37565 13.1667V8.875H12.6673C12.8744 8.875 13.0423 8.7071 13.0423 8.5C13.0423 8.29289 12.8744 8.125 12.6673 8.125H8.37565V3.83333Z"
                          fill="#121212"
                        />
                      </svg>
                    </button>
                    
                  </div>

                  <div className="price">${product.details.price}</div>
                  <div className="subtotal">${product.details.price*product.quantity}</div>
                </div>
              ))
                :<h2>no item</h2>
              }

              {data?.products.length?
                <button button className='btn bg-success rounded-pill py-2 w-25 text-white' onClick={()=>clearCart()}>Clear Cart</button>
              :<h2 className='border-start border-4 ps-1 border-danger'>The Cart is empty</h2>}

            </div>
            <div className="cart-summary">
              <h2>Cart summary</h2>
              <div className="summery-items">
                <div className="summary-item">
                  <div className="form-group">
                    <input type="radio" /> <label>Free shipping</label>
                  </div>
                  <span>$0.00</span>
                </div>
                <div className="summary-item">
                  <div className="form-group">
                    <input type="radio" /> <label>Express shipping</label>
                  </div>
                  <span>+$15.00</span>
                </div>
                <div className="summary-item">
                  <div className="form-group">
                    <input type="radio" /> <label>Pick Up</label>
                  </div>
                  <span>%21.00</span>
                </div>
                <div className="summary-footer">
                  <label>Subtotal</label>
                  <span>${subTotal()}</span>
                </div>
                <div className="summary-footer">
                  <label className="total">Total</label>
                  <span>${subTotal()}</span>
                </div>
                <div className="checkout">
                  <Link to='/order'>Chekout</Link>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>

  )
}

export default Cart