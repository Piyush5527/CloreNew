import React, { Fragment, useEffect, useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'

const AccountPage = () => {

  const [currentUser, setCurrentUser] = useState([])

  const navigate = useNavigate()

  const logoutHandler = async () => {
    localStorage.clear()
    const res = await fetch("http://localhost:1337/api/logout", {
      method: "GET",
      headers: {
          "Content-Type": "application/json"
      }
    })

    const logoutMessage = await res.json()
    if (res.status === 422 || !logoutMessage) {
      console.log("error");
    } else {
        alert("You Have Successfully Logout")
        navigate("/")
    }

  }

  const getUser = async () => {

      

      console.log("Current Users Id : ", localStorage.getItem('userid'));

      const token = localStorage.getItem('usersdatatoken');
      console.log(token)
     
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

  useEffect(()=>{
    getUser()
  },[])

  return (
    <Fragment>
      <div>Account Page</div>
      Name : {currentUser.first_name} {currentUser.last_name}<br></br>
      Phone Number : {currentUser.phone} <br></br>
      Email : {currentUser.email} <br></br>
      <NavLink to={"/EditAddress"}>Edit or Add Address</NavLink><br></br><br></br>
      <a href='/Login' onClick={logoutHandler}>Logout</a>
    </Fragment>
  )
}

export default AccountPage