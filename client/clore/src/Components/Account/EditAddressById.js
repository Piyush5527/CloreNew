import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, NavLink } from 'react-router-dom'
import axios from 'axios'

const EditAddressById = () => {

    const [address, setAddress] = useState("")

    const navigate = useNavigate()

    const [phone, setPhone] = useState("")
    const [street, setStreet] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [pincode, setPincode] = useState("")

    const {id} = useParams("")

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
            setPhone(getAddress.phone)
            setStreet(getAddress.street)
            setCity(getAddress.city)
            setState(getAddress.state)
            setPincode(getAddress.pincode)
        }
    }

    const updateAddressListener = async () => {
        var formData = new FormData();
        formData.append("phone", phone)
        formData.append("street", street)
        formData.append("city", city)
        formData.append("state", state)
        formData.append("pincode", pincode)

        const config = {
            headers: {
                "Content-Type":  "application/json"
            }
        }

        const res = await axios.patch(`http://localhost:1337/api/updateaddress/${id}/`, formData, config);
        if (res.data.status === 401 || !res.data) {
            console.log("error")
        } else {
            alert("Address Updated Successfully")
            navigate("/ShowSubCategory")
        }
        
    }

    useEffect(()=>{
        getAddressById()
    }, [])

    return (
        <div>
      <h1>Update Address</h1>
      <form>
        <NavLink to={"/EditAddress"}>Go to My Address</NavLink>
          <div className='form_input'>
            <label htmlFor='phone'>Enter New Mobile Number</label>
            <input type="number"
             onChange={(e) => setPhone(e.target.value)}
            value={phone} 
            name="phone" 
            placeholder='Enter New Mobile Number' />
          </div>

          <div className='form_input'>
            <label htmlFor='street'>Enter New House No. or Society Name</label>
            <input type="text"
             onChange={(e) => setStreet(e.target.value)}
            value={street} 
            name="street" 
            placeholder='Enter New House No. or Society Name' />
          </div>

          <div className='form_input'>
            <label htmlFor='city'>Enter New City Name</label>
            <input type="text"
             onChange={(e) => setCity(e.target.value)}
            value={city} 
            name="city" 
            placeholder='Enter New City Name' />
          </div>

          <div className='form_input'>
            <label htmlFor='state'>Enter New State Name</label>
            <input type="text"
             onChange={(e) => setState(e.target.value)}
            value={state} 
            name="state" 
            placeholder='Enter New State Name' />
          </div>

          <div className='form_input'>
            <label htmlFor='Pincode'>Enter New Pincode</label>
            <input type="number"
             onChange={(e) => setPincode(e.target.value)}
            value={pincode} 
            name="pincode" 
            placeholder='Enter New Pincode' />
          </div>

          <button className='btn' onClick={updateAddressListener}>Update Address</button>
        </form>
    </div>
    )
}

export default EditAddressById