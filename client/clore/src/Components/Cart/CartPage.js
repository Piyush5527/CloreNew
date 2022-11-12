import React, { Fragment } from 'react'
import Card from '../UI/Card'
import 'bootstrap/dist/css/bootstrap.min.css';
import CartProducts from './CartProducts';
import Styles from '../../CSS/Cart/CartPage.module.css';
import cartIcon from '../../icons/cart.svg';
import NavbarBoots from '../Navabar/NavbarBoots';
const CartPage = () => {
  return (
    <Fragment>
      <NavbarBoots></NavbarBoots>
      <Card className={Styles.main_container}>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Remove</th>
              <th scope="col">Pics</th>
              <th scope="col">Product</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">Total</th>
            </tr>
          </thead>
          <tbody class="table-group-divider">
            <CartProducts />
            <CartProducts />
          </tbody>
        </table>
      </Card>
    </Fragment>
  )
}

export default CartPage