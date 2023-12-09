// UserProfile.js
import React, { useContext } from 'react';
import { UserContext } from '../context/User';

const UserProfile = () => {
  const {userData} = useContext(UserContext);
  return (
    <div className="profile pb-5 pt-2 bg-info">
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card bg-opacity-75 bg-dark text-white pt-2 pb-3">
                        <div className="card-body text-center">
                            {userData?<>
                                <img src={userData.image.secure_url} alt="User Avatar" style={{with:'220px',height:'220px'}} className="rounded-circle mb-3" />
                                <h3 className="card-title">{userData.userName}</h3>
                                <p className="card-text">{userData.email}</p>
                                <button className="btn btn-primary mt-2" title='The editing process is not yet available'>Edit Profile</button>
                            </>:<h2>Loading......</h2>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default UserProfile;
