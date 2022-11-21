import React, { Fragment, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import AddCategory from './AddCategory';
import AdminNavbar from './AdminNavbar';

const ShowCategory = () => {

  const [list, setList] = useState([]);

  const deleteCategory = async (categoryId) => {
    const res = await fetch(`http://localhost:1337/api/deletecategory/${categoryId}`, {
      method: "DELETE",
      headers: {
          "Content-Type": "application/json"
      }
    })

    const categoryDelete = await res.json()
    if (res.status === 422 || !categoryDelete) {
      console.log("error");
    } else {
        alert("Category Deleted Successfully")
        getCategory()
    }

  }
  const getCategory = async () => {

    const res = await fetch("http://localhost:1337/api/getcategory", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })

    const categoryData = await res.json()
    if (res.status === 422 || !categoryData) {
        console.log("error");
    } else {
        setList(categoryData) 
    }
  }

  useEffect(()=>{
    getCategory()
  }, [])

  return (
    <div>
      <AdminNavbar/>
      <NavLink to={"/AddCategory"}>Add Category</NavLink><br></br>
      {list.map((item)=>{
        return (<>
          {item.category_name}
          <NavLink to={`/EditCategory/${item._id}`}>Edit</NavLink>
          <button onClick={()=>deleteCategory(item._id)}>Delete</button>
          <br></br>
        </>)
      })}
    </div>
  )
}

export default ShowCategory