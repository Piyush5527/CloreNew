import React from 'react';
import styles from '../../CSS/UI/ProductCard.module.css'
const ProductNew = (props) => {
  return (
    <div className={styles.main_card}>
        <img  src={process.env.PUBLIC_URL + "images/" + props.imageName}/>
        <h5>{props.productName}</h5>
        <p>{props.shortDesc}</p>
    </div>
  )
}

export default ProductNew;