import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
// import Product from '../Home/Product'
import NavbarBoots from '../Navabar/NavbarBoots'
import classes from '../../CSS/ShopPage/shoppage.module.css';
import ProductNew from '../Home/ProductNew';
import Filter from './Filter';


const Home = () => {

  const [list, setList] = useState([])
  const [histData,setHistData]=useState([])

  const navigate = useNavigate()

  const getData = async () => {

    const res = await fetch("http://localhost:1337/api/getproduct", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const productData = await res.json();
    if (res.status === 422 || !productData) {
      console.log("error");
    } else {

      setList(productData)
      setHistData(productData)

    }
  }

  const productDetailHandler = (productId) => {
    navigate(`/ShowProductDetail/${productId}`)
  }

  useEffect(() => {
    getData()

  }, [])
  const brandsFilterSubmit=(brandList)=>{
    if (brandList !== "") {
      
      setList(histData)
      setList(prevData => {
        const updatedData = prevData.filter((item) => {
          return item.brand_id._id === brandList;
        })
        return updatedData;
      })
      
    }
  }
  const categoryFilterSubmit=(categoryList)=>{
    if (categoryList !== "") {
     
      setList(histData)
      setList(prevData => {
        const updatedData = prevData.filter((item) => {
          return item.category_id._id === categoryList;
        })
        return updatedData;
      })
  }
}
  const sizeFilterSubmit=(sizeList)=>{
    if ( sizeList!== "") {
      setList(histData)
      setList(prevData => {
        const updatedData = prevData.filter((item) => {
          return item.size === sizeList;
        })
        return updatedData;
      })
    }
  }

  const onReset=()=>{
    setList(histData)
  }

  

  return (
    <div className={classes.master_container}>
      <NavbarBoots></NavbarBoots>
      <div className={classes.container_main}>
        {/* <Filter onFilterDataSubmitHandler={filterDataOnSubmit}></Filter> */}
        <Filter onBrandChange={brandsFilterSubmit} onCategoryChange={categoryFilterSubmit} onSizeChange={sizeFilterSubmit} onResetFilter={onReset}></Filter>
        {
          list.length > 0 ?
            // onClick={() => productDetailHandler(item._id)}
            list.map((item) => {
              return (
                <div >

                  <ProductNew imageName={`http://localhost:1337/productImages/${item.image1}`} productName={item.product_name} shortDesc={item.small_desc}
                    _id={item._id}
                  />
                </div>
              )
            })
            :
            ""
        }
      </div>

    </div>
  )
}

export default Home