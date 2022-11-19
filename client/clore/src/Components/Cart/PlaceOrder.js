import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const PlaceOrder = () => {

    const [currentUser, setCurrentUser] = useState("")
    const [address, setAddress] = useState("")
    const [cart, setCart] = useState([])
    const {id} = useParams("")

    var totalAmount = 0;
    var totalQty = 0;

    const token = localStorage.getItem('usersdatatoken')

    const getCartItems = async (event) => {

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

    const getUser = async () => {

        const user = await fetch("http://localhost:1337/api/user", {
          method : "GET",
          headers : {
            "Content-Type" : "application/json",
            "Authorization": token
          }
        })
  
        const getUser = await user.json();
  
        if(getUser.status === 422 || !getUser){
          console.log("error")
        } else {
          console.log("User : ",getUser)
          setCurrentUser(getUser)
        }
    }

    const getAddressById = async () => {
        const addressGet = await fetch(`http://localhost:1337/api/getaddressid/${id}`,{
            method : "GET",
            headers : {
                "Content-Type" : "application/json"
            }
        })

        const getAddress = await addressGet.json()

        if(getAddress.status === 401 || !getAddress){
            console.log("error")
        } else {
            console.log(getAddress)
            setAddress(getAddress)
        }
    }

    useEffect(()=>{
        getCartItems()
        getUser()
        getAddressById()
    }, [])
    return (<>
       
        <div>
            <h4>YOUR ITEMS</h4>
            <table class="table">
          <thead>
            <tr>
              <th scope="col">Pics</th>
              <th scope="col">Product</th>
              <th scope="col">Size</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">Total Amount</th>
            </tr>
          </thead>
          <tbody class="table-group-divider">
            
            
          
            {cart.map((item)=>{
                {totalQty+=item.qty}
                {totalAmount+=item.total_amount}
                return (<>
                    <tr>
                            <td><img src={`http://localhost:1337/productImages/${item.product_id?.image1}`} height={50} width={50}></img></td>
                            <td>{item.product_id?.product_name}</td>
                            <td>{item.product_id?.size}</td>
                            <td>{item.total_amount/item.qty}</td>
                            <td>{item.qty}</td>
                            <td>{"₹"+item.total_amount}</td>
                                   
                      <br></br>
                      </tr>
                      </>)
            })}
            <tr><th>Sub Total :</th><td></td><td></td><td></td><td></td><th>{"₹"+totalAmount}</th>
                        </tr>
        </tbody>
        </table>
            <br></br><br></br><br></br>
            <table>
                <tr>
                    <td>Deliver To : {currentUser.first_name+" "+currentUser.last_name},{" "+address.pincode}</td>
                </tr>
                <tr>
                    <td>{address.street}</td>
                </tr>
                <tr>
                    <td>{address.city+", "+address.state}</td>
                </tr>
                <tr>
                    <td>{address.phone}</td>
                </tr>
            </table>
        </div>
        <br></br><br></br>
        <div>
            <table>
                <tr>
                    <th>PRICE DETAILS</th>
                </tr>
                <tr>
                    <td>Price {"("+totalQty+" items)"}</td>
                    <td align='right'>{"₹"+totalAmount}</td>
                </tr>

                <tr>
                    <td>Delivery Charges</td>
                    <td align='right'>FREE</td>
                </tr>

                <tr>
                    <th>Total Payable</th>
                    <th align='right'>{"₹"+totalAmount}</th>
                </tr>
            </table>
        </div>
        <br></br>
        <div>
            <button>PLACE ORDER</button>
        </div>
        </>
    )
}

export default PlaceOrder