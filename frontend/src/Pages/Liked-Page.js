import React from 'react'

import './Liked-Page.css'
import ProductListLikedPage from "../Lists/ProductListLikedPage"
import { useHistory } from 'react-router-dom'

const LikedPage = () => {
    let history = useHistory()

    const onGoBackHandler = () => {
        history.goBack()
    }

    return (
        <React.Fragment>
            <img onClick={onGoBackHandler}
                className="back-arrow"
                src="/images/backArrow2.svg"
                width="100%"
                height="100%"
                alt="backArrow"/>
            <div className="headin">My Wishlist</div>
            <div className="ProductList">
                <ProductListLikedPage/>
            </div>   
        </React.Fragment>  
    )
}

export default LikedPage