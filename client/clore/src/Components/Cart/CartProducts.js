import React, { Fragment, useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import cartIcon from '../../icons/cart.svg';


const CartProducts = (props) => {

    const [cart, setCart] = useState([])

    const getCartItems = async (event) => {
        //event.preventDefault()
        const token = localStorage.getItem('usersdatatoken');
        console.log(token)

        const cartItems = await fetch("http://localhost:1337/api/getcartitems",{
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : token
            }
        })

        const getCartItems = await cartItems.json();

        if(getCartItems.status === 401 || !getCartItems){
            console.log("error")
        } else {
            console.log("User : ",getCartItems)
            setCart(getCartItems)
        }
    }

    useEffect(()=>{
        getCartItems()
    },[])

    return (
        <Fragment>

      {cart.map((item)=>{
        return (<>
        <tr>
                <td><img src={`http://localhost:1337/productImages/${item.product_id?.image1}`} height={100} width={150}></img></td>
                <td>{item.product_id?.product_name}</td>
                <td>{item.product_id?.size}</td>
                <td>{item.total_amount/item.qty}</td>
                <td><input value={item.qty} type={"number"} width={20}></input></td>
                <td>{item.total_amount}</td>
          
          
          <br></br>
          </tr></>)
      })}

        </Fragment>
    )
}

export default CartProducts