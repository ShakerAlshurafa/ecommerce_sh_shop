import React, { useContext, useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import {router} from './layouts/Routs.jsx'
import { UserContext } from './components/web/context/User.jsx'
import { CartContext } from './components/web/context/Cart.jsx';


export default function App() {
  let {setUserToken} = useContext(UserContext);
  let {setCount,getCartContext} = useContext(CartContext);
  useEffect(()=>{
    if(localStorage.getItem('userToken') != null){
      setUserToken(localStorage.getItem('userToken'));
      setCount(getCartContext().count);
    }
  },[localStorage.getItem('userToken')])
  return (
  <RouterProvider router={router} />
  )
}
