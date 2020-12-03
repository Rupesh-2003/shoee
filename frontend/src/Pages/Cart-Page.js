import React, { useContext, useState } from 'react'

import './Cart-Page.css'
import ProductListCartPage from '../Lists/ProductListCartPage'
import { AuthContext } from "../contexts/auth-context"
import { useHistory } from 'react-router-dom'

const CartPage = () => {

    const [cartList, setCartList] = useState(JSON.parse(sessionStorage.getItem('cart')))

    const auth = useContext(AuthContext)
    let history = useHistory()

    const reload = () => {
        setCartList(JSON.parse(sessionStorage.getItem('cart')))
    }

    const onGoBackHandler = () => {
        history.goBack()
    }

    const onCheckoutClickHandler = () => {
        sessionStorage.setItem('buy', JSON.stringify(JSON.parse(sessionStorage.getItem('cart'))))
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
                <ProductListCartPage
                reload = {reload}/>
            </div>
            {JSON.parse(sessionStorage.getItem('cart')).length > 0 && <div className="total">
                <div className="checkout" onClick={onCheckoutClickHandler}>
                    Proceed to checkout  &nbsp;
                    <img className="procced"
                        src="/images/backArrow.svg"
                        width="100%"
                        height="100%"
                        alt="procceedArrow"/>
                </div>
            </div>}
        </div>
    )
}

export default CartPage