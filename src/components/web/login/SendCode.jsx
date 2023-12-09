import { useFormik } from 'formik'
import React, { useContext } from 'react'
import { codeSendSchema } from '../validation/validate'
import Input from '../../pages/Input'
import { UserContext } from '../context/User';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function SendCode() {
    const navigate = useNavigate();
    const {userToken} = useContext(UserContext);
    const initialValues = {
        email : '',
    };
    const onSubmit = async user=>{
        const {data} = await axios.patch(`${import.meta.env.VITE_API_URL}/auth/sendcode`,user);
        if(data.message === 'success'){
            toast.success('code send succesfully',{
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
            });
            navigate('/password-rest');
        }
    }
    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema: codeSendSchema
    })
     
  return (
    <div className="SendCode py-5 bg-info">
        <div className="row">
            <div className="col-md-6 mx-auto">
                <div className="card">
                    <div className="card-header">
                        <h2 className="text-center">Password recovery</h2>
                    </div>
                    <div className="card-body pb-5">
                        <form onSubmit={formik.handleSubmit} className='m-auto w-50'>
                            <div className="form-group">
                                <div className="input-group my-3">
                                    <Input 
                                        type='email' id='email' name='email' title='email'
                                        onChange={formik.handleChange} 
                                        errors={formik.errors}
                                        onBlur={formik.handleBlur}
                                        touched={formik.touched}
                                        />                        
                                </div>
                            </div>
                            <div className="form-group">
                                <button type="submit" disabled={!formik.isValid} className='bg-info rounded-pill py-2 w-50 mt-3 border-0 mx-auto'>Send Code</button>
                                <Link to='/login' className='bg-body-secondary rounded-pill py-2 w-50 mt-3 border-0 ms-auto text-center text-decoration-none'>Return to Login</Link>
                            </div>
                        </form>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SendCode