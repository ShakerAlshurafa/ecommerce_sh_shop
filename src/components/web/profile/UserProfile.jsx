// UserProfile.js
import React, { useContext } from 'react';
import { UserContext } from '../context/User';
import { Link, Outlet } from 'react-router-dom';
import style from './Profile.module.css'

const UserProfile = () => {
  return (
    <aside className={`${style.profile}`}>
        <div className={`${style.profileLinks}`}>
            <nav>
                <Link to='info'>info</Link>
                <Link to='contact'>contact</Link>
            </nav>
        </div>
        <div className={`${style.userData}`}>
            <Outlet />
        </div>
    </aside>
  );
};

export default UserProfile;
