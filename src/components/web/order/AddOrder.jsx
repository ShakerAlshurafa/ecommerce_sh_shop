import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import Input from '../../pages/Input';
import { couponSchema } from '../validation/validate';
import { useFormik } from 'formik';
import { CartContext } from '../context/Cart';
import { toast } from 'react-toastify';


function AddOrder() {
    const {createOrderCart} = useContext(CartContext);
    const navigat = useNavigate();
    
      const createOrder = async(order)=>{
        const {data} = await createOrderCart(order);
        return data;
      }
        const initialValues = {
          couponName : '',
          email : '',
          address : '',
          phone: '',
        };
        const onSubmit = async order=>{
          const res = await createOrder(order);
        }
        const formik = useFormik({
          initialValues,
          onSubmit,
          validationSchema: couponSchema
        });

  return (
    <div className="row">
        <form onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <Input 
            type='email' id='email' name='email' title='email'
            onChange={formik.handleChange} 
            errors={formik.errors}
            onBlur={formik.handleBlur}
            touched={formik.touched}
            />   
          </div>
          <div className="form-group">
            <Input 
            type='text' id='address' name='address' title='address'
            onChange={formik.handleChange} 
            errors={formik.errors}
            onBlur={formik.handleBlur}
            touched={formik.touched}
            />   
          </div>
          <div className="form-group">
            <Input 
            type='phone' id='phone' name='phone' title='phone'
            onChange={formik.handleChange} 
            errors={formik.errors}
            onBlur={formik.handleBlur}
            touched={formik.touched}
            />   
          </div>
          <div className="form-group mt-3">
            <div className="row">
              <h2>Have a coupon ?</h2>
              <p>Add your code for an instant cart discount</p>
              <div className="coupon-form">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={25}
                  viewBox="0 0 24 25"
                  fill="none"
                >
                  <path
                    d="M21.0181 15.3356L20.7727 16.0444H20.7727L21.0181 15.3356ZM21.0181 9.66437L21.2635 10.3731V10.3731L21.0181 9.66437ZM2.98189 15.3356L3.22727 16.0444H3.22727L2.98189 15.3356ZM2.98189 9.66437L2.73652 10.3731L2.73652 10.3731L2.98189 9.66437ZM15.5303 10.0303C15.8232 9.73744 15.8232 9.26256 15.5303 8.96967C15.2374 8.67678 14.7626 8.67678 14.4697 8.96967L15.5303 10.0303ZM8.46967 14.9697C8.17678 15.2626 8.17678 15.7374 8.46967 16.0303C8.76256 16.3232 9.23744 16.3232 9.53033 16.0303L8.46967 14.9697ZM6 20.75C4.20507 20.75 2.75 19.2949 2.75 17.5H1.25C1.25 20.1234 3.37665 22.25 6 22.25V20.75ZM21.25 17.5C21.25 19.2949 19.7949 20.75 18 20.75V22.25C20.6234 22.25 22.75 20.1234 22.75 17.5H21.25ZM18 4.25C19.7949 4.25 21.25 5.70507 21.25 7.5H22.75C22.75 4.87665 20.6234 2.75 18 2.75V4.25ZM6 2.75C3.37665 2.75 1.25 4.87665 1.25 7.5H2.75C2.75 5.70507 4.20507 4.25 6 4.25V2.75ZM21.2635 14.6269C20.3815 14.3216 19.75 13.4836 19.75 12.5H18.25C18.25 14.1424 19.3054 15.5363 20.7727 16.0444L21.2635 14.6269ZM19.75 12.5C19.75 11.5164 20.3815 10.6784 21.2635 10.3731L20.7727 8.95565C19.3054 9.46367 18.25 10.8576 18.25 12.5H19.75ZM4.25 12.5C4.25 13.4836 3.61845 14.3216 2.73652 14.6269L3.22727 16.0444C4.69461 15.5363 5.75 14.1424 5.75 12.5H4.25ZM2.73652 10.3731C3.61845 10.6784 4.25 11.5164 4.25 12.5H5.75C5.75 10.8576 4.69462 9.46367 3.22727 8.95565L2.73652 10.3731ZM22.75 8.5V7.5H21.25V8.5H22.75ZM21.25 16.5V17.5H22.75V16.5H21.25ZM1.25 16.5V17.5H2.75V16.5H1.25ZM2.75 8.5V7.5H1.25V8.5H2.75ZM18 20.75H6V22.25H18V20.75ZM18 2.75H6V4.25H18V2.75ZM2.73652 14.6269C2.05785 14.8619 1.25 15.4975 1.25 16.5H2.75C2.75 16.4441 2.77081 16.3708 2.85172 16.2813C2.9366 16.1873 3.06974 16.0989 3.22727 16.0444L2.73652 14.6269ZM21.2635 10.3731C21.9422 10.1381 22.75 9.50246 22.75 8.5H21.25C21.25 8.55587 21.2292 8.62917 21.1483 8.71871C21.0634 8.81265 20.9303 8.90111 20.7727 8.95565L21.2635 10.3731ZM3.22727 8.95565C3.06974 8.90111 2.9366 8.81265 2.85172 8.71871C2.77081 8.62917 2.75 8.55587 2.75 8.5H1.25C1.25 9.50246 2.05785 10.1381 2.73652 10.3731L3.22727 8.95565ZM20.7727 16.0444C20.9303 16.0989 21.0634 16.1873 21.1483 16.2813C21.2292 16.3708 21.25 16.4441 21.25 16.5H22.75C22.75 15.4975 21.9422 14.8619 21.2635 14.6269L20.7727 16.0444ZM9.25 9.5C9.25 9.63807 9.13807 9.75 9 9.75V11.25C9.9665 11.25 10.75 10.4665 10.75 9.5H9.25ZM9 9.75C8.86193 9.75 8.75 9.63807 8.75 9.5H7.25C7.25 10.4665 8.0335 11.25 9 11.25V9.75ZM8.75 9.5C8.75 9.36193 8.86193 9.25 9 9.25V7.75C8.0335 7.75 7.25 8.5335 7.25 9.5H8.75ZM9 9.25C9.13807 9.25 9.25 9.36193 9.25 9.5H10.75C10.75 8.5335 9.9665 7.75 9 7.75V9.25ZM15.25 15.5C15.25 15.6381 15.1381 15.75 15 15.75V17.25C15.9665 17.25 16.75 16.4665 16.75 15.5H15.25ZM15 15.75C14.8619 15.75 14.75 15.6381 14.75 15.5H13.25C13.25 16.4665 14.0335 17.25 15 17.25V15.75ZM14.75 15.5C14.75 15.3619 14.8619 15.25 15 15.25V13.75C14.0335 13.75 13.25 14.5335 13.25 15.5H14.75ZM15 15.25C15.1381 15.25 15.25 15.3619 15.25 15.5H16.75C16.75 14.5335 15.9665 13.75 15 13.75V15.25ZM14.4697 8.96967L8.46967 14.9697L9.53033 16.0303L15.5303 10.0303L14.4697 8.96967Z"
                    fill="#6C7275"
                  />
                </svg>
                    <Input 
                    type='text' id='couponName' name='couponName' 
                    onChange={formik.handleChange} 
                    errors={formik.errors}
                    onBlur={formik.handleBlur}
                    touched={formik.touched}
                    />   
                  </div>                                    
              </div>
          </div>
          <div className="form-group mt-4">
              <button type="submit" disabled={!formik.isValid} className='mx-auto rounded-pill w-50 py-2 bg-info border-0'>Apply</button>
          </div>
                                
        </form>
  </div>
  )
}

export default AddOrder