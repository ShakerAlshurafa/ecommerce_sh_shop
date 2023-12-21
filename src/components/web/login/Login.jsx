import React, { useContext } from 'react'
import Input from '../../pages/Input.jsx'
import { useFormik } from 'formik';
import {loginSchema} from '../validation/validate.js'
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserContext } from '../context/User.jsx';

export default function Login() {
    let {setUserToken} = useContext(UserContext);
    const navigate = useNavigate();
    
    const initialValues = {
            email : '',
            password : '',
    };

    const onSubmit = async users=>{
        const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signin`,users);
        if(data.message === 'success'){
            localStorage.setItem("userToken",data.token);
            setUserToken(data.token);
            toast.success('login succesfully',{
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
            })
            navigate('/home');
        }
    }
    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema: loginSchema
    })

    const inputs = [
        {
            id : 'email',
            type : 'email',
            name : 'email',
            title : 'user email',
            value : formik.values.email,
        },
        {
            id : 'password',
            type : 'password',
            name : 'password',
            title : 'user password',
            value : formik.values.password,
        }
    ];

    const renderInputs = inputs.map((input,index)=>
    <div className="form-group" key={index}>
        <Input 
        type={input.type} id={input.id} name={input.name} title={input.title} value={input.value}
        onChange={formik.handleChange} 
        errors={formik.errors} key={index}
        onBlur={formik.handleBlur}
        touched={formik.touched}
        />                        
    </div>
     )

  return (
    <div className='login bg-info pt-2 pb-5'>
        <div className="container my-5">
            <div className="row">
                <div className="col-md-6 mx-auto">
                    <div className="card">
                        <div className="card-header">
                            <h2 className="text-center">Login</h2>
                        </div>

                        <div className="card-body pb-5">
                            <form onSubmit={formik.handleSubmit} className='m-auto w-50'>
                                {renderInputs}     
                                <div className="form-group">
                                    <button type="submit" disabled={!formik.isValid} className='bg-info rounded-pill py-2 w-50 mt-3 border-0 mx-auto'>Login</button>
                                </div>
                                <div className="form-group">
                                    <Link className='ms-auto fs-6 mt-1' to='/password-recovery'>Forgot your password?</Link>
                                </div>
                            </form>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
