import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'

import './Checkout-Page.css'
import CheckoutItem from '../ListItems/ProductItemCheckout'
import { AuthContext } from '../contexts/auth-context'
import StripeCheckout from 'react-stripe-checkout'

const Checkout = () => {
    const auth = useContext(AuthContext)
    const history  = useHistory()
    var itemNo = 0
    var subTotal = 0

    const makePayment = async token => {

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/payment`, {
                method: "POST",
                headers: {
                    'Content-type' : 'application/json'
                },
                body: JSON.stringify({
                    token,
                    product: auth.buy,
                    customerNo: auth.mobile
                })        
            })
            const data = await response.json()
            if(!response.ok) {
                throw new Error(data.message)
            }

            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/listOfYourOrders`, {
                    method: "POST",
                    headers: {
                        'Content-type' : 'application/json'
                    },
                    body: JSON.stringify({
                        mobile: auth.mobile
                    })
                })
                const data = await response.json()
                if(!response.ok) {
                    throw new Error(data.message)
                }
                auth.setYourOrders(data.listOfYourOrders)
                
            } catch(error) {
                console.log(error)
            }

            history.push('/yourOrders')
        }catch(error) {
            console.log(error)
        }
    } 

    return (
        <div>
            <div className="totalDiv">
                <span>Total</span>
                <div className="line"></div>
                    <div className="srno">no.</div>
                    <div className="itemsCheckout">Items</div>
                    <div className="sizeCheckout">Size</div>
                    <div className="priceCheckout">Price</div>
                <div className="line2"></div>
                <ul className="checkoutList">
                    {auth.buy.map(item => {
                        subTotal += item.amount
                        return <CheckoutItem
                            itemNo = {++itemNo}
                            itemName= {item.brand+" "+item.model}
                            size={item.size}
                            price={item.amount}
                        />
                    })}
                </ul>
                <div className="line2"></div>
                <div className="subtotalHeading">Subtotal</div>
                <div className="subtotalAmount">{subTotal}</div><br/>
                <div className="specialDiscount">Special discount</div>
                <div className="specialDiscountAmount">- {subTotal-1}</div>
                <div className="line2"></div>
                <div className="totalCheckoutPage">Total</div>
                <div className="totalAmount">Rs. 1</div>
            </div>
            <div className="addressCheckout">
                <span>Address</span>
                <textarea placeholder="Enter your address"></textarea>
            </div>
            <div className="paymentMethod">
                <div className="paymentMethodText">Pay by Card</div>
            </div>
            <StripeCheckout 
                stripeKey="pk_test_51HoqxpBwubh9L4b5hKOKMZvcHRI9WbQkoKVrUv9NhdYEuNWGGbv3ENZFNRIbtRUFu0YMhBweJJo0RXryf4HU1bxr00NvFGi232"
                name="Shoee"
                amount = {100}
                token = {makePayment}
                // shippingAddress
                // billingAddress
                currency="INR">
                <button className="paymentButton">Pay Rs. 1</button>
            </StripeCheckout>
        </div>
    )
}

export default Checkout