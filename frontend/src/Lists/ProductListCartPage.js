import React, { useContext } from 'react'

import './ProductListCartPage.css'
import ProductItem from '../ListItems/ProductItemCartPage'
import { AuthContext } from '../contexts/auth-context'

// const DUMMY_ARRAY = [
//     {   
//         productId: 2,
//         model: "Air Max",
//         brand: "Nike",
//         image: "/images/NikeAirMax.png",
//         amount: 1999,
//         sidebarColor: "red",
//         size:9
//     },
//     {
//         productId: 9,
//         model: "Training Shoes",
//         brand: "Puma",
//         image: "/images/sports/PumaTrainingShoes.png",
//         amount: 3145,
//         sidebarColor: "black",
//         size: 8
//     },
//     {
//         productId: 18,
//         model: "Zoom",
//         brand: "Nike",
//         image: "/images/trending/NikeZoom.png",
//         amount: 2399,
//         sidebarColor: "#f88379",
//         size: 10
//     },
// ]

const ProductListCartPage = () => {
    const auth = useContext(AuthContext)
    let num = 1;

    const giveNumber = () => {
        if(num>3) {
            num = 1
            return num++
        }
        return num++
    }

    return(
        <ul className="productCartList">
            {auth.cart.map(product => {
                return (
                    <ProductItem 
                    productId ={product.productId}
                    model ={product.model}
                    brand ={product.brand}
                    image ={product.image}
                    amount ={product.amount}
                    sidebarColor = {product.sidebarColor}
                    size = {product.size}
                    color = {giveNumber()}/>   
                )
            })}
        </ul>
    )
}


// const ProductListCartPage = () => {
//     const auth = DUMMY_ARRAY
//     let num = 1;

//     const giveNumber = () => {
//         if(num>3) {
//             num = 1
//             return num++
//         }
//         return num++
//     }

//     return(
//         <ul className="productCartList">
//             {auth.map(product => {
//                 return (
//                     <ProductItem 
//                     productId ={product.productId}
//                     model ={product.model}
//                     brand ={product.brand}
//                     image ={product.image}
//                     amount ={product.amount}
//                     sidebarColor = {product.sidebarColor}
//                     size = {product.size}
//                     color = {giveNumber()}/>   
//                 )
//             })}
//         </ul>
//     )
// }

export default ProductListCartPage