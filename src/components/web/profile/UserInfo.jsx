import React, { useContext } from 'react'
import { UserContext } from '../context/User'

function UserInfo() {
    const {userData} = useContext(UserContext);
  return (
    <div className="container">
            <div className="row justify-content-center align-items-center">
                <div className="card bg-opacity-75 bg-dark text-white pt-2 pb-3 ms-5">
                    <div className="card-body text-center">
                        {userData?<>
                            <img src={userData.image.secure_url} alt="User Avatar" style={{with:'220px',height:'220px'}} className="rounded-circle mb-3" />
                            <h3 className="card-title">{userData.userName}</h3>
                            <button className="btn btn-primary mt-2" title='The editing process is not yet available'>Edit Info</button>
                        </>:<h2>Loading......</h2>}
                    </div>
                </div>
            </div>
        </div>
  )
}

export default UserInfo