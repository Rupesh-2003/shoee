import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import './ProductListLikedPage.css'
import ProductItemLikedPage from '../ListItems/ProductItemLikedPage'

const ProductListLikedPage = () => {
    const history = useHistory()
    const [wishlist, setWishlist] = useState(JSON.parse(sessionStorage.getItem('wishlist')))

    let num = 1;
    const giveNumber = () => {
        if(num>3)
            num = 1
        return num++
    }

    const removeLike = async (product) => {
        let newLikedList = wishlist.filter(p => p.productId != product.productId)
        setWishlist(newLikedList)
        sessionStorage.setItem('wishlist', JSON.stringify(newLikedList))
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/removeFromLiked`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    mobile: sessionStorage.getItem('mobile'),
                    productId: product.productId
                })
            })
            const data = await response.json()
            if(!response.ok) {
                newLikedList.push(product)
                setWishlist(newLikedList)
                sessionStorage.setItem('wishlist', JSON.stringify(newLikedList))
                throw new Error(data.message)
            }
        }catch(err) {
            console.log(err)
        }
    }

    return (
        <ul className="likedProductsLikedPage">   
            {wishlist !== null && wishlist.length > 0 && wishlist.map(product => {
                return <ProductItemLikedPage
                    productId ={product.productId}
                    model ={product.model}
                    brand ={product.brand}
                    image ={product.image}
                    amount ={product.amount}
                    sideBar ={product.sidebarColor}
                    color ={giveNumber()}
                    removeLike ={removeLike}
                />
            })}
            {wishlist === null || wishlist.length === 0 && 
                <div className="noOrdersDiv">
                <span>No Product in WishList yet !</span>
                <div>You haven't wishlisted anything from shoee yet.Click the button below to browse products</div>
                <img src="/images/browseProducts.svg" alt="browseProductsIcon" onClick={() => history.push('/home')}/>
             </div>   
            }
        </ul>
    )
}

export default ProductListLikedPage