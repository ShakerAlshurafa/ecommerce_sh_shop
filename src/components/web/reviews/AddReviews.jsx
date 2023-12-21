import { useFormik } from 'formik'
import React, { useContext } from 'react'
import { reviewSchema } from '../validation/validate';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Input from '../../pages/Input';
import { UserContext } from '../context/User';
import { toast } from 'react-toastify';


function AddReviews() {
  const {productId} = useParams();
  const {userToken} = useContext(UserContext);

  const initialValues = {
    comment: '',
    rating: '',
  }
  const onSubmit = async review=>{
    const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/products/${productId}/review`,review,{headers:{Authorization:`Tariq__${userToken}` }})
    console.log(data);
    if(data.message === 'success'){
      toast.success('add review succesfully',{
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
      })
      navigate(`/products${productId}`);
    }
  }
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit,
    validationSchema: reviewSchema
  });

  const inputs = [
    {
      id : 'comment',
      type : 'text',
      name : 'comment',
      title : 'Your comment',
      value : formik.values.comment,
    },{
      id : 'rating',
      type : 'text',
      name : 'rating',
      title : 'Rating (must be between 1 and 5)',
      value : formik.values.rating,
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
    <div className="review p-5 bg-info">
      <div className="card p-5 mx-auto w-50">
          <form onSubmit={formik.handleSubmit}>
              {renderInputs}     
              <div className="form-group mt-3">
                  <button type="submit" disabled={!formik.isValid} className='bg-info rounded-pill py-2 w-50 mt-3 border-0 mx-auto'>save</button>
              </div>
          </form>       
      </div>
    </div>
  )
}

export default AddReviews