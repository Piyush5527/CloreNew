import React, { Fragment } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import cartIcon from '../../icons/cart.svg';


const CartProducts = (props) => {
    return (
        <Fragment>

            <tr>
                <th scope="row">1</th>
                <td><img src={cartIcon} height={100} width={150}></img></td>
                <td>T shitrs</td>
                <td>500</td>
                <td><input type={"number"} width={20}></input></td>
                <td>500</td>

            </tr>
        </Fragment>
    )
}

export default CartProducts