import React, { useEffect, useState, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import styles from '../../CSS/ShopPage/ProductDetail.module.css';
import NavbarBoots from '../Navabar/NavbarBoots';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HiOutlineShoppingCart } from 'react-icons/hi';

const ShowProductDetail = () => {

  const [list, setList] = useState("")

  const { id } = useParams("")

  const getProductById = async () => {
    const res = await fetch(`http://localhost:1337/api/getproductid/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
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

  useEffect(() => {
    getProductById()
  }, [])

  const addProductToCart = async (productId) => {
    console.log(productId);

    const token = localStorage.getItem('usersdatatoken');

    const addToCart = await fetch(`http://localhost:1337/api/addtocart/${productId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      }
    })

    const getRes = await addToCart.json();

    if (getRes.status === 422 || !getRes) {
      console.log("error")
    } else {
      alert("Product Added in the Cart Successfully")
    }

  }

  return (
    <Fragment>
      <NavbarBoots></NavbarBoots>
      <div className='main_container'>
        {/* <h1 className={styles.header}>Product Details</h1> */}
        <div className={`${styles.main_container} ${styles.left}`}>
          {/* style={{ width: "500px", textAlign: "center", margin: "auto", height: "500px" }} */}
          <img className={styles.productImage} variant="top" src={`http://localhost:1337/productImages/${list.image1}`} />
          {/* <br></br> */}
        </div>
        <div className={`${styles.main_container} ${styles.right}`}>
        <h2><b>{list.product_name}</b></h2>
          <table className="table table-bordered mt-5">
            <tr>
              <th colSpan={2} style={{textAlign:'center'}}>Basic Details</th>
            </tr>
            <tr>
              <td>Product Name</td>
              <td>{list.product_name}</td>
            </tr>
            <tr>
              <td>Price</td>
              <td>{list.price} /-</td>
            </tr>
            <tr>
              <td>Size</td>
              <td>{list.size}</td>
            </tr>
            <tr>
              <td>Short Description</td>
              <td>{list.small_desc}</td>
            </tr>
            <tr>
              <td>Colours</td>
              <td>{list.color}</td>
            </tr>
            <tr>
              <td>More Details</td>
              <td>{list.long_desc}</td>
            </tr>
            
          </table>
          <a className='btn btn-warning' style={{color:'black'}} onClick={() => addProductToCart(list._id)}>Add to Cart  <HiOutlineShoppingCart/></a>
        </div>
      </div>
    </Fragment>
  )
}

export default ShowProductDetail