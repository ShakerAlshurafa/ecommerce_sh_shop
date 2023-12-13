import axios from "axios";
import { createContext, useState } from "react";
import { toast } from 'react-toastify';

export const CartContext = createContext(null);

export function CartContextProvider({children}){
    let [count,setCount] = useState(0);

    const addToCartContext = async (productId)=>{
        try {
            const token = localStorage.getItem("userToken");
            const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/cart`, {productId} , {headers:{Authorization:`Tariq__${token}` }})
            if(data.message=='success'){
                toast.success('product added successfully',{
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark',
                });
            }
            setCount(++count)
            return data;
        } catch (error) {
            console.log(error)
        }
    }
    
    const getCartContext = async ()=>{
        try {
            const token = localStorage.getItem("userToken");
            const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/cart`,{headers:{Authorization:`Tariq__${token}`}})
            setCount(data.count);
            return data;
        } catch (error) {
            console.log(error)
        }
    }

    const removeItemContext = async(productId)=>{
        try {
            const token = localStorage.getItem('userToken');
            const {data} = await axios.patch(`${import.meta.env.VITE_API_URL}/cart/removeItem`,{productId},{headers:{Authorization:`Tariq__${token}`}});
            return data;
        } catch (error) {
            console.log(error)
        }
    }

    const clearCartContext = async()=>{
        try {
            const token = localStorage.getItem('userToken');
            const {data} = await axios.patch(`${import.meta.env.VITE_API_URL}/cart/clear`,{},{headers:{Authorization:`Tariq__${token}`}})
            return data;
        } catch (error) {
            console.log(error)
        }
    }

    const increaseQuantityCart = async(productId)=>{
        try {
            const token = localStorage.getItem('userToken');
            const {data} = await axios.patch(`${import.meta.env.VITE_API_URL}/cart/incraseQuantity`,{productId},{headers:{Authorization:`Tariq__${token}`}})
            return data;
        } catch (error) {
            console.log(error)
        }
    }
    const decreaseQuantityCart = async(productId)=>{
        try {
            const token = localStorage.getItem('userToken');
            const {data} = await axios.patch(`${import.meta.env.VITE_API_URL}/cart/decraseQuantity`,{productId},{headers:{Authorization:`Tariq__${token}`}})
            return data;
        } catch (error) {
            console.log(error)
        }
    }

    const applayCouponCart = async()=>{
        try {
            const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/coupon`)
            console.log(data);
        } catch (error) {
            console.log(error)
        }
    }

    const createOrderCart = async(order)=>{
        try {
            const token = localStorage.getItem("userToken");
            const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/order`,order,{headers:{Authorization:`Tariq__${token}`}})
            setCount(0);
            return data;
        } catch (error) {
            console.log(error)
        }
    }
    const getOrderCart = async()=>{
        try {
            const token = localStorage.getItem("userToken");
            const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/order`,{headers:{Authorization:`Tariq__${token}`}})
            return data;
        } catch (error) {
            console.log(error)
        }
    }
    return <CartContext.Provider value={{ addToCartContext,getCartContext,removeItemContext,count,setCount,clearCartContext,
                                        increaseQuantityCart,decreaseQuantityCart,createOrderCart,getOrderCart }}>
        {children}
    </CartContext.Provider>;
}