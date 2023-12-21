import React, { useContext } from 'react'
import { CartContext } from '../context/Cart';
import style from './Order.module.css'
import { Link, Outlet } from 'react-router-dom';

function Order() {

    
  return (
    <aside className={`${style.order}`}>
        <div className={`${style.orderLinks}`}>
            <nav>
                <Link to='addOrder'>Add Order</Link>
                <Link to='getOrder'>Your Orders</Link>
            </nav>
        </div>
        <div className={`${style.orderData}`}>
            <Outlet />
        </div>
    </aside>
  )
}

export default Order