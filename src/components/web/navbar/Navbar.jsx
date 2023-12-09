import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/User';
import { CartContext } from '../context/Cart';
import { useQuery } from 'react-query';

export default function Navbar() {
  const {userToken,setUserToken,userData,setUserData} = useContext(UserContext);
  const navigate = useNavigate();
  const {getCartContext} = useContext(CartContext);

  const logout = ()=>{
    localStorage.removeItem('userToken');
    setUserToken(null);
    setUserData(null);
    navigate('/');    //not work
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
        <a className="navbar-brand" href="#">SH-Shop</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav m-auto mb-2 mb-lg-0">
          
            <li className="nav-item">
              <Link className='nav-link' to='/'>Home</Link>
            </li>

            <li className="nav-item">
              <Link className='nav-link' to='/categories'>Categories</Link>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#">Products</a>
            </li>

            {userToken&& <li className="nav-item">
              <Link className='nav-link' to='/cart'>Cart 
              {async()=>{
                  const {data} = getCartContext();
                  return data.count;
                }}</Link>
            </li>}
          
          
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                {userData!=null? userData.userName : 'Account'}
              </a>
              <ul className="dropdown-menu ">
                {!userToken?
                <>
                  <li><Link to='/register' className="dropdown-item">register</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><Link to='/login' className="dropdown-item">login</Link></li>
                </> :
                <>
                <li><Link to='/profile' className="dropdown-item">Profile</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link className="dropdown-item" onClick={logout} to={'/login'}>logout</Link></li>
                </>
                }
              </ul>
            </li>
          </ul>
        
        </div>
      </div>
    </nav>
    </>
  )
}
