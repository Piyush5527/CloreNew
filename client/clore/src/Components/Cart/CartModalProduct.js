import React,{Fragment} from 'react'

const CartModalProduct = () => {
  return (
    <Fragment>
        <tr>
            <td>
                <img src={process.env.PUBLIC_URL+"images/slide-1.jpg"} height={75} width={150}/>
            </td>
            <td>    
                Product Name
                <br/>
                Qty
                <br/>
                Product Price
            </td>
            
        </tr>
    </Fragment>
  )
}

export default CartModalProduct