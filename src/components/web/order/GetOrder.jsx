import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../context/Cart'
import style from './Order.module.css'

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
    console.log(orders)
  return (
    <div className='container'>
        <div className="row">
            {orders?orders.map((order)=>{
                return(
                    <div className="col-md-6 my-2">
                        <div className={`${style.card} p-5 bg-info`} key={order._id}>
                            <p><strong>Address :</strong> {order.address}</p>
                            <p><strong>phoneNumber :</strong> {order.phoneNumber}</p>
                            <p><strong>Payment Type :</strong> {order.paymentType}</p>
                            <p><strong>Coupon Name: </strong>{order.couponName?`${order.couponName}`:<span className='text-danger'> ----------</span>}</p>
                            <p><strong>Final Price :</strong> {order.finalPrice}</p>
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