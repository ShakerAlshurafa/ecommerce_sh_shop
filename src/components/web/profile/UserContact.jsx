import React, { useContext } from 'react'
import { UserContext } from '../context/User'

function UserContact() {
    const {userData} = useContext(UserContext);
    return (
        <div className="container">
                <div className="row justify-content-center align-items-center">
                    <div className="card bg-opacity-75 bg-dark text-white pt-2 pb-3 ms-5">
                        <div className="card-body text-center">
                            {userData?<>
                                <h3 className="card-title">Email: {userData.email}</h3>
                                <button className="btn btn-primary mt-2" title='The editing process is not yet available'>Edit Contact</button>
                            </>:<h2>Loading......</h2>}
                        </div>
                    </div>
                </div>
            </div>
      )
}

export default UserContact