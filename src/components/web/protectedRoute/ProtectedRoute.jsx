import React from "react"
import { Navigate } from "react-router-dom";
export default function ProtectedRoute({children,protectFor}){
    if(protectFor=='cart'&&!localStorage.getItem('userToken')){
        return <Navigate to='/login' />
    }else if(protectFor=='login'&&localStorage.getItem('userToken')){
        return <Navigate to='/' />
    }
    return children;
}