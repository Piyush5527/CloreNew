import React, { Fragment, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import AddBrand from './AddBrand';
import AdminNavbar from './AdminNavbar';

const ShowBrand = () => {

  const [list, setList] = useState([]);

  const deleteBrand = async (brandId) => {
    const res = await fetch(`http://localhost:1337/api/deletebrand/${brandId}`, {
      method: "DELETE",
      headers: {
          "Content-Type": "application/json"
      }
    })

    const brandDelete = await res.json()
    if (res.status === 422 || !brandDelete) {
      console.log("error");
    } else {
        alert("Brand Deleted Successfully")
        getBrand()
    }

  }
  const getBrand = async () => {

    const res = await fetch("http://localhost:1337/api/getbrand", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })

    const brandData = await res.json()
    if (res.status === 422 || !brandData) {
        console.log("error");
    } else {
        setList(brandData)
        
    }
  }

  useEffect(()=>{
    getBrand()
  }, [])

  return (
    <div>
      <AdminNavbar/>
      <NavLink to={"/AddBrand"}>Brands</NavLink><br></br>
      {list.map((item)=>{
        return (<>
          <img variant="top" style={{ width: "100px", textAlign: "center", margin: "auto" , height:"100px" }} src={`http://localhost:1337/productImages/${item.image_path}`} className='mt-2' />
          {item.brand_name}
          <NavLink to={`/EditBrand/${item._id}`}>Edit</NavLink>
          <button onClick={()=>deleteBrand(item._id)}>Delete</button>
          <br></br>
        </>)
      })}
    </div>
  )
}

export default ShowBrand