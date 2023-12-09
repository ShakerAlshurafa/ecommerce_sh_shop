
export const validate = (values)=> {
    let errors={};
    if(!values.userName){
        errors.userName='username is required';
    }else if (values.userName.length<5) {
        errors.userName="Username must be at least 5 characters";
    }

    if(!values.email){
        errors.email='email is required';
    }else if (values.email.length<5) {
        errors.email="Email must be at least 5 characters";
    }

    if(!values.password){
        errors.password='Password is required';
    }else if (values.password.length<5) {
        errors.password="Password must be at least 5 characters";
    }

    return errors;

}


// use yup
import * as yup from 'yup'

export const registerSchema = yup.object({
    userName : yup.string().required('Username is required').min(3,'At least 8 char').max(30,'Max 30 char'),
    email : yup.string().required('Email is required').email('Invalid email'),
    password : yup.string().required('Password is required').min(6,'At least 6 char').max(20,'Max 20 char')
})

export const loginSchema = yup.object({
    email : yup.string().required('Email is required').email('Invalid email'),
    password : yup.string().required('Password is required').min(6,'At least 6 char').max(20,'Max 20 char')
})

export const codeSendSchema = yup.object({
    email : yup.string().required('Email is required').email('Invalid email'),
})

export const restPasswordSchema = yup.object({
    email : yup.string().required('Email is required').email('Invalid email'),
    password : yup.string().required('Password is required').min(6,'At least 6 char').max(20,'Max 20 char'),
    code : yup.string().required('Code is required'),
})
