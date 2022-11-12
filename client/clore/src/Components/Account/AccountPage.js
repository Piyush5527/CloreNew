import React, { Fragment } from 'react'

const AccountPage = () => {
  return (
    <Fragment>
      <div>AccountPage</div>
      <a href='/Login' onClick={(e)=>{localStorage.clear()}}>Logout</a>
    </Fragment>
  )
}

export default AccountPage