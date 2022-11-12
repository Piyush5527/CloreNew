import React, { Fragment, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import AddCategory from './AddCategory';

const ShowSubCategory = () => {

  const [list, setList] = useState([]);

  const deleteSubCategory = async (subCategoryId) => {
    const res = await fetch(`http://localhost:1337/api/deletesubcategory/${subCategoryId}`, {
      method: "DELETE",
      headers: {
          "Content-Type": "application/json"
      }
    })

    const subCategoryDelete = await res.json()
    if (res.status === 422 || !subCategoryDelete) {
      console.log("error");
    } else {
        alert("Sub Category Deleted Successfully")
        getSubCategory()
    }

  }
  const getSubCategory = async () => {

    const res = await fetch("http://localhost:1337/api/getsubcategorywithcategory", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })

    const subCategoryData = await res.json()
    if (res.status === 422 || !subCategoryData) {
        console.log("error");
    } else {
        setList(subCategoryData) 
    }
  }

  useEffect(()=>{
    getSubCategory()
  }, [])

  return (
    <div>
      <NavLink to={"/AddSubCategory"}>Add Sub Category</NavLink><br></br>
      {list.map((item)=>{
        return (<>
          {item.sub_category_name}||
          {item.category_id?.category_name}
          <NavLink to={`/EditSubCategory/${item._id}`}>Edit</NavLink>
          <button onClick={()=>deleteSubCategory(item._id)}>Delete</button>
          <br></br>
        </>)
      })}
    </div>
  )
}

export default ShowSubCategory