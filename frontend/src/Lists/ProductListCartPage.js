import React, { useState } from 'react'

import { useHistory } from 'react-router-dom'

import './ProductListCartPage.css'
import ProductItem from '../ListItems/ProductItemCartPage'

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

const ProductListCartPage = props => {
    const history = useHistory()

    const [cartList, setCartList] = useState(JSON.parse(sessionStorage.getItem('cart')))

    let num = 1;

    const giveNumber = () => {
        if(num>3) {
            num = 1
            return num++
        }
        return num++
    }

    const onRemoveFromCartHandler = async (product) => {
        const newCartList = cartList.filter(p => p.productId != product.productId)
        sessionStorage.setItem('cart', JSON.stringify(newCartList))
        setCartList(newCartList)
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/removeFromCart`, {
                method: "POST",
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({
                    mobile: sessionStorage.getItem('mobile'),
                    productId: product.productId
                })
            })
            if(!response.ok) {
                newCartList.push(product)
                sessionStorage.setItem('cart', JSON.stringify(newCartList))
                setCartList(newCartList)
            }
            props.reload()

        } catch(err) {
            console.log(err)
        }
    }

    return(
        <ul className="productCartList">
            {cartList.length > 0 && cartList.map(product => {
                return (
                    <ProductItem 
                    productId ={product.productId}
                    model ={product.model}
                    brand ={product.brand}
                    image ={product.image}
                    amount ={product.amount}
                    sidebarColor = {product.sidebarColor}
                    size = {product.size}
                    color = {giveNumber()}
                    onRemoveFromCartHandler = {onRemoveFromCartHandler}/>   
                )
            })}
            {cartList.length === 0 && 
                    <div className="noOrdersDiv">
                        <span>Cart is Empty !</span>
                        <div>You haven't added anything
                             to cart yet.
                             Click the button below to see products</div>
                        <img src="/images/browseProducts.svg"
                            alt="orderNowIcon"
                            onClick={() => history.push('/home')}/>
                    </div>
                }
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