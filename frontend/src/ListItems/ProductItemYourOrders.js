import React from 'react'

import './ProductItemYourOrders.css'

const ProductItem = props => {
    
    var monthNames = [
        "January", 
        "February", 
        "March", 
        "April", 
        "May", 
        "June", 
        "July", 
        "August", 
        "September", 
        "October", 
        "November", 
        "December"];

    var weekday = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ]

    let orderDate = new Date(props.productArray[0].orderDate)
    let deliveryDate = new Date(props.productArray[0].deliveryDate)

    return (
        <li className="outerDivYourOrders">
            <div className="headerDiv">
                <div className="orderNumber">ORDER NO&nbsp; &nbsp; &nbsp; &nbsp;A0001</div>
                <span>placed on {weekday[orderDate.getDay()]}, {orderDate.getDate()} {monthNames[orderDate.getMonth()]}, 2020</span>
                <div className="numberOfItems">ITEM  {props.productArray.length}</div>
                <div className="totalPriceYourOrders">TOTAL  Rs. 1</div>
            </div>
            <ul className="productListYourOrders">
                {props.productArray.map(p => {

                    return <li className="particularProductOfYourOrders">
                        <img className="productImageYourOrders"
                        src={p.image}
                        alt="productImage"/>
                        <div className="brandYourOrders">{p.brand}</div>
                        <div className="modelYourOrders">{p.model}</div>
                        <div className="priceYourOrders">Rs. {p.amount}</div>
                        <div className="sizeTextYourOrders">SIZE</div>
                        <div className="sizeYourOrders">{p.size}</div>
                        <div className="deliveryTextYourOrders">DELIVERY BY</div>
                        <div className="deliveryYourOrders">{monthNames[deliveryDate.getMonth()].slice('', 3).toUpperCase()}&nbsp;&nbsp;{deliveryDate.getDate()}</div>
                    </li>
                })}
            </ul>
            <div className="lastDivYourOrders">
                <div>
                    <span>PAID</span>
                    <img src="images/right.svg" width="20px" height="20px" alt="paid logo"/>
                </div>  
            </div>
        </li>
    )
}

export default ProductItem