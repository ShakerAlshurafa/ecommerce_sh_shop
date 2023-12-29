import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import style from './Products.module.css'
import { FaRegStar, FaStar } from 'react-icons/fa';

function AllProducts() {    

    const [currentPage, setCurrentPage] = useState(1);

    const pageNumber = (page=1)=>{
        if(page>data.page)
            setCurrentPage(data.page)
        else if(page<1)
            setCurrentPage(1);
        else
            setCurrentPage(page);
    }
    
    const getProducts = async()=>{
        const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/products?page=${currentPage}`)
        return(data);
    }

    
    const {data,isLoading} = useQuery('category_details',getProducts);
    if(isLoading){
        return(
            <p>...loading</p>
        )
    }
        

    const pageNumbers = [];
    if(data.products)
        for (let i = 1; i <= Math.ceil(data.total/data.products.length) ; i++) {
            pageNumbers.push(i);
        }

    const getRating = (rating)=>{
        return Array(5).fill().map((e,i)=>{return i<Math.floor(rating)})
    }
  return (
    <div className={`${style.products}`}>

        <div className="container mx-auto mt-2">
            <div className="row">
                {data?.products?<>{data.products.map((product)=>
                    <div className="col-md-3 mt-3">
                        {/* {console.log(product)} */}
                        <div className={`${style.card} w-100`}>
                            <img src={product.mainImage.secure_url} className={`${style.cardImg} w-100 mb-2`} alt="" />
                            <div className={`${style.cardBody} d-flex flex-column justify-content-center position-relative text-center`}>
                                <div className={`${style.line}`}>
                                    <h5 className={`${style.lineUp} card-title`}>{product.name}</h5>
                                    <div className={`${style.lineUp} rating`}>
                                        {
                                            getRating(product.avgRating).map((star,j)=>(<span>
                                                {star ? <FaStar color='orange'/> :<FaRegStar color='black'/>}
                                            </span> ))
                                        }
                                    </div>
                                </div>
                            </div>
                            <Link to={`/products/${product._id}`} className={`${style.btn} d-block text-center`}>details</Link>
                        </div>
                    </div>    
                )}
                <nav aria-label="Page navigation" className="d-flex justify-content-center my-2">
                    <ul className="pagination">
                        <li className="page-item">
                            <a className="page-link btn"  onClick={()=>pageNumber(currentPage-1)} aria-label="Previous">
                                <span aria-hidden="true">«</span>
                            </a>
                        </li>
                        {pageNumbers.map((number) => (
                            <li className={currentPage==number?"active page-item":"page-item"} key={number}><a className="page-link btn" onClick={()=>pageNumber(number)}>{number}</a></li>
                        ))}
        
                        <li className="page-item">
                            <a className="page-link btn" onClick={()=>pageNumber(currentPage+1)} aria-label="Next">
                                <span aria-hidden="true">»</span>
                            </a>
                        </li>
                    </ul>
                </nav>
                </>:<h2>no product</h2>}
            </div>
        </div>
    </div>
  )
}

export default AllProducts