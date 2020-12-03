import React, { useContext } from 'react'

import './YourOrders-Page.css'
import ProductItem from '../ListItems/ProductItemYourOrders'
import { AuthContext } from '../contexts/auth-context'
import { useHistory } from 'react-router-dom'

const YourOrders = () => {
    const auth = useContext(AuthContext) 
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
                {yourOrders1 !== null | yourOrders1.length === 0 && 
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

 





// const YOUR_ORDERS = [
//     [{
//         amount: 1999,
//         brand: "Nike",
//         image: "images/NikeAirMax.png",
//         model: 'Air-Max',
//         orderDate: "2020-12-01T07:32:36.173Z",
//         deliveryDate: "2020-12-04T07:44:29.063Z",
//         productId: 21,
//         sidebarColor: "#ffa500",
//         size: 9,
//     },
//     {
//         amount: 3149,
//         brand: "Puma",
//         image: "images/sports/PumaTrainingShoes.png",
//         model: 'Training-Shoes',
//         orderDate: "2020-12-01T07:32:36.173Z",
//         deliveryDate: "2020-12-04T07:44:29.063Z",
//         productId: 5,
//         sidebarColor: "#ffa500",
//         size: 9    
//     }],
//     [{
//         amount: 3145,
//         brand: "Nike",
//         image: "/images/sports/NikeImpact.png",
//         model: "Impact",
//         orderDate: "2020-10-15T07:32:36.173Z",
//         deliveryDate: "2020-10-18T07:44:29.063Z",
//         productId: 5,
//         sidebarColor: "#ffa500",
//         size: 9,
//     }]
// ]