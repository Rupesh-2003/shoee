import React, { useContext } from 'react'

import './ProductList.css'
import ProductItem from '../ListItems/ProductItem'
import { AuthContext } from '../contexts/auth-context'

const ProductList = props => {
    const auth = useContext(AuthContext)

    const isLiked = (productId) => {
        return auth.liked.find(product => product.productId === productId)
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