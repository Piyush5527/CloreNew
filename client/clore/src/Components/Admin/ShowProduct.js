import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'


const ShowProduct = () => {

  const [list, setList] = useState([])


  const deleteProduct = async (brandId) => {
    const res = await fetch(`http://localhost:1337/api/deleteProduct/${brandId}`, {
      method: "DELETE",
      headers: {
          "Content-Type": "application/json"
      }
    })

    const brandDelete = await res.json()
    if (res.status === 422 || !brandDelete) {
      console.log("error");
    } else {
        alert("Product Deleted Successfully")
        getData()
    }

  }

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
  
  useEffect(() => {
    getData()
    
  }, [])
  


  return (
    <div>
        <NavLink to={"/AddProduct"}>Add Product</NavLink><br></br><br></br>
      {
        list.length>0?

        list.map((item) => {
          return (
            <div>
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
              <NavLink to={`/EditProduct/${item._id}`}>Edit</NavLink>
              <button onClick={()=>deleteProduct(item._id)}>Delete</button><br></br>
            </div>
            )
          })
          :
          ""
      }
      
    </div>
  )
}

export default ShowProduct