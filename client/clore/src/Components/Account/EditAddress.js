import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Navigate, useParams, useNavigate } from 'react-router-dom'

const EditAddress = () => {

    const [currentUser, setCurrentUser] = useState("")

    const navigate = useNavigate()

    const [street, setStreet] = useState("")
    const [state, setState] = useState("")
    const [city, setCity] = useState("")
    const [pincode, setPincode] = useState("")

    const {id} = useParams("")

    const getUser = async () => {
        const user = await fetch(`http://localhost:1337/api/getuserid/${id}`, {
            method : "GET",
            headers : {
                "Content-Type" : "application/json"
            }
        })

        const userGot = await user.json()

        if(userGot.status === 422 || !userGot){
            console.log("error")
          } else {
            console.log("User : ",userGot)
            setCurrentUser(userGot)
          }
    }

    useEffect(()=>{
        getUser();
    }, [])

    const updateAddressListener = async (event)=>{
        event.preventDefault();

        var formData = new FormData();

        formData.append("street", street)
        formData.append("city", city)
        formData.append("pincode", pincode)
        formData.append("state", state)

        const config = {
            headers : {
                "Content-Type" : "application/json"
            }
        }

        const res = await axios.patch(`http://localhost:1337/api/updateaddress/${id}`, formData, config);

        if(res.data.status === 401  || !res.data){
            console.log("error")
        } else {
            alert("Address Updated Successfully")
            navigate("/Account")
        }
    }

    return (
        <div>
      <h1>Update Address</h1>
      <form>
          <div className='form_input'>
            <label htmlFor='street'>Enter House No. and Street</label>
            <input type="text"
             onChange={(e) => setStreet(e.target.value)}
            value={currentUser.street} 
            name="street" 
            placeholder='Enter House No. and Street' required/>
          </div>
          
        
         <div className='form_input'>
            <label htmlFor='city'>Enter City</label>
            <div className='two'>
              <input 
              type="text"
              name="city"
              onChange={(e) => setCity(e.target.value)}
              value={currentUser.city}
              placeholder='Enter City' required/>       
            </div>
          </div>

          <div className='form_input'>
            <label htmlFor='state'>Enter State</label>
            <div className='two'>
              <input 
              type="text"
              name="state"
              onChange={(e) => setState(e.target.value)}
              value={currentUser.state}
              placeholder='Enter State' required/>       
            </div>
          </div>

          <div className='form_input'>
            <label htmlFor='city'>Enter Pincode</label>
            <div className='two'>
              <input 
              type="number"
              name="pincode"
              onChange={(e) => setPincode(e.target.value)}
              value={currentUser.pincode}
              placeholder='Enter Pincode' maxLength={6} required/>       
            </div>
          </div>

          <button className='btn' onClick={updateAddressListener}>Update Address</button>
        </form>
    </div>
    )
}

export default EditAddress