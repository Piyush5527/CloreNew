import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'


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
      {
        list.length>0?

        list.map((item) => {
          return (
            <div onClick={()=>productDetailHandler(item._id)}>
              <img variant="top" style={{ width: "100px", textAlign: "center", margin: "auto" , height:"100px" }} src={`http://localhost:1337/productImages/${item.image1}`} className='mt-2' />
              name :{item.product_name} || 
              selling_price :{item.price} ||
              description :{item.short_desc} ||
              description :{item.long_desc} ||
              product_category : {item.category_id?.category_name} ||
              product_brand : {item.brand_id?.brand_name} ||
              product_brand : {item.sub_category_id?.sub_category_name} ||
              countInStock :{item.qty} ||
              Size :{item.size}  ||
              Color :{item.color} 
            </div>
            )
          })
          :
          ""
      }
      
    </div>
  )
}

export default Home