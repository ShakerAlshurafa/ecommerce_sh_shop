import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

function AllProducts() {    

    const [currentPage, setCurrentPage] = useState(1);
    // const [nextPage, setNextPage] = useState(null);
    // const [previousPage, setPreviousPage] = useState(null);
    const [valid, setValid] = useState(false);

    const pageNumber = (page=1)=>{
        setCurrentPage(page);
        // if(page<data.page)
        //     setNextPage(page+1);
        // if(page>1)
        //     setPreviousPage(page-1);
        if(page>data.page)
            pageNumber(data.page)
        if(page<1)
            pageNumber(1);
        e.preventDefault();
    }
    
    const getProducts = async()=>{
        const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/products?page=${currentPage}`)
        {data?setValid(true):setValid(false)}
        return(data);
    }

    useEffect(()=>{
        getProducts();
    },[currentPage])

    const {data,isLoading} = useQuery('category_details',getProducts);
    if(isLoading){
        return(
            <p>...loading</p>
        )
    }


    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(data.total/data.products.length) ; i++) {
        pageNumbers.push(i);
    }
  return (
    <div className='products container'>
        <div className="row">
        {valid?<>{data.products.map((product)=>
            <div className="product col-lg-4 my-3" key={product._id}>
                <div className="card p-2">
                    <img src={product.mainImage.secure_url} className='w-50' alt="" />
                    <h2>{product.name}</h2>
                    <Link to={`/products/${product._id}`}>details</Link>
                </div>
            </div>
        )}
        
        <nav aria-label="Page navigation" className="d-flex justify-content-center my-3">
            <ul className="pagination">
                <li className="page-item">
                    <a className="page-link"  onClick={()=>pageNumber(currentPage-1)} aria-label="Previous">
                        <span aria-hidden="true">«</span>
                    </a>
                </li>
                {pageNumbers.map((number) => (
                    <li className="page-item" key={number}><a className="page-link" onClick={()=>pageNumber(number)}>{number}</a></li>
                ))}

                <li className="page-item">
                    <a className="page-link" onClick={()=>pageNumber(currentPage+1)} aria-label="Next">
                        <span aria-hidden="true">»</span>
                    </a>
                </li>
            </ul>
        </nav>

        </>:<h2>no product</h2>}
        </div>
    </div>
  )
}

export default AllProducts