import React, { useContext } from 'react'

import './YourOrders-Page.css'
import ProductItem from '../ListItems/ProductItemYourOrders'
import { AuthContext } from '../contexts/auth-context'

const YourOrders = () => {
    const auth = useContext(AuthContext)          

    return (
        <div>
            <img className="backArrowYourOrders" src="images/backArrow2.svg" alt="backArrow"></img>
            <span className="headingYourOrders">Your Orders</span>
            <ul className="yourOrdersList">
                {auth.yourOrders.map(productArray => {
                        return<ProductItem 
                            productArray = {productArray}
                        />
                    })
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