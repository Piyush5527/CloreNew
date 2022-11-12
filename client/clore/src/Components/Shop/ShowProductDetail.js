import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'


const ShowProductDetail = () => {

    const [list, setList] = useState("")

    const {id} = useParams("")

    const getProductById = async () => {
        const res = await fetch(`http://localhost:1337/api/getproductid/${id}`, {
            method : "GET",
            headers : {
                "Content-Type" : "application/json"
            }
        })

        const productData = await res.json()

        if (res.status === 422 || !productData) {
            console.log("error");
        } else {
            console.log(productData)
            setList(productData)
        }
    }

    useEffect(()=>{
        getProductById()
    }, [])

    return (
        <div>
            <h1>Product Details</h1>
            <img variant="top" style={{ width: "500px", textAlign: "center", margin: "auto" , height:"500px" }} src={`http://localhost:1337/productImages/${list.image1}`} className='mt-2' /><br></br>
            {list.product_name}<br></br>
            {list.price}<br></br>
            {list.size}<br></br>
            {list.small_desc}<br></br>
            {list.long_desc}<br></br>
            {list.color}<br></br>
        
      </div>
    )
}

export default ShowProductDetail