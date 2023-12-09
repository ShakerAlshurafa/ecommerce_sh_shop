import React from 'react'
import Input from '../../pages/Input.jsx'
import { useFormik } from 'formik';
// import {validate} from '../validation/validate.js'
import {registerSchema} from '../validation/validate.js'
import axios from 'axios';
import { toast }  from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function Register() {

    const navigate = useNavigate();

    const initialValues = {
            userName : '',
            email : '',
            password : '',
            image : '',
    };

    const handelFieldChange = (event)=>{
        formik.setFieldValue('image',event.target.files[0])
    }
    const onSubmit = async users=>{
        const formData = new FormData();
        formData.append("userName",users.userName);
        formData.append("email",users.email);
        formData.append("password",users.password);
        formData.append("image",users.image);

        const {data} = await axios.post(`https://ecommerce-node4.vercel.app/auth/signup`,formData);

        if(data.message == 'success'){
            formik.resetForm();
            toast('account created succesfully , plz verify your email to login',{
                position: "bottom-center",
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
            navigate('/login');
        }
    }
    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema: registerSchema
    })

    const inputs = [
        {
            id : 'username',
            type : 'text',
            name : 'userName',
            title : 'user name',
            value : formik.values.userName,
        },
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
        },
        {
            id : 'image',
            type : 'file',
            name : 'image',
            title : 'user image',
            onChange : handelFieldChange 
        }
    ];

    const renderInputs = inputs.map((input,index)=>
     <Input 
     type={input.type} id={input.id} name={input.name} title={input.title} value={input.value}
      onChange={input.onChange || formik.handleChange} 
      errors={formik.errors} key={index}
      onBlur={formik.handleBlur}
      touched={formik.touched}
      />
     )

  return (
    <div className='bg-secondary-subtle py-5'>
    <div className="container">
        <h2 className='text-center mb-4'>Create Account</h2>
        <form onSubmit={formik.handleSubmit} encType='multipart/form-data' className='m-auto w-50'>
            {renderInputs}  
            <input type="submit" disabled={!formik.isValid} className='bg-info rounded-pill px-5 py-2 w-100 mt-3 border-0' />
        </form>
    </div>
    </div>
  )
}
