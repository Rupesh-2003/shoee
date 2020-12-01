import React from 'react'

import './ProductItemCheckout.css'

const CheckoutItem = props => {
    return (
        <li className="liCheckoutPage">
            <div className="sr">{props.itemNo}</div>
            <div className="itemNameCheckoutItem">{props.itemName}</div>
            <div className="sizeCheckoutPage">{props.size}</div>
            <div className="priceCheckoutPage">{props.price}</div>
        </li>
    )
}

export default CheckoutItem