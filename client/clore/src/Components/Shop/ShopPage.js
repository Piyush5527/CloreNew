import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
// import Product from '../Home/Product'
import NavbarBoots from '../Navabar/NavbarBoots'
import classes from '../../CSS/ShopPage/shoppage.module.css';
import ProductNew from '../Home/ProductNew';



const Home = () => {

  const [list, setList] = useState([])

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

    }
  }

  const productDetailHandler = (productId) => {
    navigate(`/ShowProductDetail/${productId}`)
  }

  useEffect(() => {
    getData()

  }, [])



  return (
    <div>
      <NavbarBoots></NavbarBoots>
      <div className={classes.container_main}>
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