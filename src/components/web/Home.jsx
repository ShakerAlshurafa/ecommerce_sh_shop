import React from 'react'
import Categories from './categories/Categories.jsx'
import style from './Home.module.css'

export default function Home() {
  return (
    <>
    <div className="col-md-12 py-4 text-center mb-0  bg-info-subtle">
      <h1 className={`${style.title} fs-1`}>Welcome in the Sh-Shop</h1>
    </div>
      <Categories />
    </>
  )
}
