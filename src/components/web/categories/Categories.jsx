import axios from 'axios';
import { useQuery } from 'react-query';
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
// css file
import './categories.css'
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../context/Cart';

export default function Categories() {
  const getCategories = async()=>{
    const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/categories/active?limit=10`);
    return data;
  }

  const {data,isLoading} = useQuery('web_categories',getCategories);
  if(isLoading){
    return <p>...loading</p>
  }

  return (
    <>
      <div className='categories py-5 text-center bg-info'>
        {/* <h1>All categories</h1> */}
        <div className="container">
        <div className="swiper-custom-pagination mb-3 mt-4 text-end"></div>
          <Swiper
          modules={[Navigation, Pagination, Scrollbar, Autoplay]}
          spaceBetween={50}
          slidesPerView={6.4}
          navigation
          loop={true}
          autoplay={{delay:3000}}
          pagination={{ 
            clickable: true,
            el: '.swiper-custom-pagination'
          }}
        >
          {data?.categories.length?data.categories.map((ele)=>{
              return(
              <SwiperSlide key={ele._id}>
                <Link to={`/products/category/${ele._id}`}>
                  <img src={ele.image.secure_url} className='rounded-4' alt="" />
                </Link>
              </SwiperSlide>
              )
          }):'No Categories Found'}
        </Swiper>   
        </div>
      </div>

    </>
  )
}
