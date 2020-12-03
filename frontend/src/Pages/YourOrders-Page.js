import React from 'react'

import './YourOrders-Page.css'
import ProductItem from '../ListItems/ProductItemYourOrders'
import { useHistory } from 'react-router-dom'

const YourOrders = () => {
    const history = useHistory()  
    
    const goBackHandler = () => {
        history.push('/home')
    }

    const yourOrders1 = JSON.parse(sessionStorage.getItem('yourOrders'))

    return (
        <div>
            <img className="backArrowYourOrders" 
                src="images/backArrow2.svg" 
                alt="backArrow"
                onClick={goBackHandler}></img>
            <span className="headingYourOrders">Your Orders</span>
            <ul className="yourOrdersList">
                {yourOrders1 !== null && yourOrders1.length >0 && yourOrders1.map(productArray => {
                        return<ProductItem 
                            productArray = {productArray}
                        />
                    })
                }
                {yourOrders1 === null || yourOrders1.length === 0 && 
                    <div className="noOrdersDiv">
                        <span>No Orders yet !</span>
                        <div>You haven't ordered anything
                             from shoee yet.
                             Click the button below to see products</div>
                        <img src="images/orderNow.svg"
                            alt="orderNowIcon"/>
                    </div>
                }
            </ul>
        </div>
    )
}

export default YourOrders