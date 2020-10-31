import React, { useContext } from 'react'

import './ProductListLikedPage.css'
import ProductItemLikedPage from '../ListItems/ProductItemLikedPage'
import { AuthContext } from '../contexts/auth-context'

const ProductListLikedPage = () => {
    const auth = useContext(AuthContext)

    let num = 1;

    const giveNumber = () => {
        if(num>3) {
            num = 1
            return num++
        }
        return num++
    }

    return (
        <ul className="likedProductsLikedPage">   
            {auth.liked.map(product => {
                return <ProductItemLikedPage
                    productId ={product.productId}
                    model ={product.model}
                    brand ={product.brand}
                    image ={product.image}
                    amount ={product.amount}
                    sideBar ={product.sidebarColor}
                    color ={giveNumber()}
                />
            })}
        </ul>
    )
}

export default ProductListLikedPage