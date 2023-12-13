import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../context/Cart'
import { Link } from 'react-router-dom';

function GetOrder() {
    const {getOrderCart} = useContext(CartContext);
    const [orders,setOrders] = useState(null);

    const getOrder = async()=>{
        const data = await getOrderCart();
        setOrders(data.orders);
    }
    useEffect(()=>{
        getOrder();
    },[])
  return (
    <div className='container'>
        <div className="row">
            {orders?orders.map((order)=>{
                return(
                    <div className="col-md-6" key={order._id}>
                        <div className="card p-4 bg-info">
                            <p>Address : {order.address}</p>
                            <p>phoneNumber : {order.phoneNumber}</p>
                            <p>{order.couponName?`Coupon Name: ${order.couponName}`:<span className='text-danger'>"No Coupon"</span>}</p>
                            <Link title='not complete' className='text-center text-decoration-none'>click to see products</Link>
                        </div>
                    </div>
                )
            })
            :<h2>No Order</h2>}
        </div>
    </div>
  )
}

export default GetOrder