import React, { useEffect, useState } from 'react'
import { RouterProvider } from 'react-router-dom'
import {router} from './layouts/Routs.jsx'
import { CartContextProvider } from './components/web/context/Cart.jsx';


export default function App() {

  return (
    <CartContextProvider>
      <RouterProvider router={router} />
    </CartContextProvider>
  )
}
