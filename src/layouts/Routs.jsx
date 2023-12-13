import React from 'react'
import Layout from './Layout.jsx';
import Home from './../components/web/Home.jsx';
import Register from './../components/web/register/Register.jsx';
import Login from './../components/web/login/Login.jsx';
import Categories from '../components/web/categories/Categories.jsx';
import CategoriesDetails from './../components/web/categories/CategoriesDetails.jsx';
import Product from '../components/web/products/Product.jsx';
import Cart from './../components/web/cart/Cart.jsx';
import DashboardLayout from './DashboardLayout.jsx'
import HomeDashboard from '../components/dashboard/Home.jsx'
import CategoriesDashboard from '../components/dashboard/categories/Categories.jsx'
import { createBrowserRouter } from 'react-router-dom';
import ProtectedRoute from '../components/web/protectedRoute/ProtectedRoute.jsx';
import UserProfile from '../components/web/profile/UserProfile.jsx';
import PasswordRecovery from '../components/web/login/SendCode.jsx';
import PasswordRest from '../components/web/login/PasswordRest.jsx';
import UserInfo from '../components/web/profile/UserInfo.jsx';
import UserContact from '../components/web/profile/UserContact.jsx';
import Order from '../components/web/order/Order.jsx';
import GetOrder from '../components/web/order/GetOrder.jsx';
import AddOrder from '../components/web/order/AddOrder.jsx';

export const router = createBrowserRouter([
  {
    path : '/',
    element : <Layout />,
    children : [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'home',
        element: <Home />
      },
      {
        path: 'register',
        element: <Register />
      },
      {
        path: 'login',
        element: <ProtectedRoute protectFor={'login'}> <Login /> </ProtectedRoute>
      },
      {
        path: 'categories',
        element: <Categories />
      },
      {
        path: 'products/category/:categoryId',
        element: <CategoriesDetails />
      },
      {
        path: 'products/:productId',
        element: <Product />
      },
      {
        path: 'cart',
        element: <ProtectedRoute protectFor={'cart'}> <Cart /> </ProtectedRoute>,
      },
      {
        path: 'order',
        element: <Order />,
        children: [
          {
            path:'addOrder',
            element: <AddOrder />
          },{
            path: 'getOrder',
            element: <GetOrder />
          }
        ]
      },
      {
        path: 'profile',
        element: <ProtectedRoute protectFor={'profile'}> <UserProfile /> </ProtectedRoute>,
        children:[
          {
            path:'info',
            element: <UserInfo />
          },
          {
            path:'contact',
            element: <UserContact />
          }
        ]
      },
      {
        path:'password-recovery',
        element: <PasswordRecovery />
      },
      {
        path: 'password-rest',
        element: <PasswordRest />
      },
      {
        path: '*',
        element : <h2>404 page not find -- web</h2>
      }
    ]
  },
  {
    path : '/dashboard',
    element : <DashboardLayout />,
    children: [{
      path: 'home',
      element: <HomeDashboard />
    },{
      path: 'categories',
      element: <CategoriesDashboard />
    },{
      path: '*',
      element : <h2>404 page not find -- dashboard</h2>
    }]
  }
])