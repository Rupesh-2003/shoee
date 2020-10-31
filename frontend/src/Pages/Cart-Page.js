import React from 'react'

import './Cart-Page.css'
import ProductListCartPage from '../Lists/ProductListCartPage'
import { useHistory } from 'react-router-dom'

const CartPage = () => {
    let history = useHistory()

    const onGoBackHandler = () => {
        history.goBack()
    }

    const onCheckoutClickHandler = () => {
        history.push('/checkout')
    }

    return (
        <div>
            <img onClick={onGoBackHandler}
                className="backArrowCartPage" 
                src="/images/backArrow2.svg"
                width="100%"
                height="100%"
                alt="backArrow"/>
            <div className="cartPage">
                My Cart
            </div>
            <div className="ProductListCart">
                <ProductListCartPage/>
            </div>
            <div className="total">
                <div className="checkout" onClick={onCheckoutClickHandler}>
                    Proceed to checkout  &nbsp;
                    <img className="procced"
                        src="/images/backArrow.svg"
                        width="100%"
                        height="100%"
                        alt="procceedArrow"/>
                </div>
            </div>
        </div>
    )
}

export default CartPage