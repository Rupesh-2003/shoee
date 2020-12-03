import React from 'react'

import './ProductList.css'
import ProductItem from '../ListItems/ProductItem'

const ProductList = props => {
    const wishlist = JSON.parse(sessionStorage.getItem('wishlist'))

    const isLiked = (productId) => {
        if(sessionStorage.getItem('isLoggedIn')) {
            if(wishlist !== null && wishlist.find(product => product.productId === productId)) {
                return true
            }
            return false
        }
        return false
    }

    return (
        <ul className="products">   
            {props.productList.map(product => {
                return <ProductItem
                    productId ={product.productId}
                    model ={product.model}
                    brand ={product.brand}
                    image ={product.image}
                    amount ={product.amount}
                    liked ={isLiked(product.productId)}
                    sidebarColor ={product.sidebarColor}
                />
            })}
        </ul>
    )
}

export default ProductList