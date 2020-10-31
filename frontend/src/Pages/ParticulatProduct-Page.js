import React, { useContext, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'

import './ParticularProduct-Page.css'
import { PRODUCTS_HOME} from './Products-home'
import { AuthContext } from '../contexts/auth-context'

const ParticularProduct = () => {
    let history = useHistory()
    const auth = useContext(AuthContext)
    const requiredProductId = useParams().productId
    let initialSize 

    const temp = auth.cart.some(p => p.productId == requiredProductId ? initialSize = p.size: initialSize = initialSize)

    const [ isAddedToCart, setIsAddedToCart ] = useState(temp)

    const requiredProduct = PRODUCTS_HOME.find(p => p.productId == requiredProductId)

    const onRemoveWarningHandler = () => {
        auth.removeWarning()
    }

    const isSizeSelected = () => {
        let size = document.getElementsByTagName("input");
        for (var i = 0, len = size.length; i < len; i++) {
            if (size[i].checked) {
                return 6+i;
            }   
       }
       return false;
    }

    const addToCartHandler = async () => {
        auth.setWarning(false)

        if(!auth.isLoggedIn) {
            auth.setWarning('Warning: Please Login first!')
        }
        else {
            if(!isAddedToCart) {
                const size = isSizeSelected()
                if(!size) {
                    auth.setWarning('Warning: Please select size!')
                    return
                }
                requiredProduct.size = size
                try {
                    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/addToCart`, {
                        method: "POST",
                        headers: {
                            'Content-Type' : 'application/json'
                        },
                        body: JSON.stringify({
                            mobile: auth.mobile,
                            userCartProduct : requiredProduct
                        })
                    })
                    if(response.ok) {
                        const newCartList = auth.cart
                        newCartList.push(requiredProduct)
                        auth.setCart(newCartList)
                        setIsAddedToCart(true)
                        console.log("added successfully")
                    }
                } catch(err) {
                    console.log(err)
                }
            }
            else {
                history.push('/home/cart')
            }
        }
    }

    const buyNowHandler = () => {
        if(!auth.isLoggedIn) {
            history.push('/login')
        }
        else{
            if(isSizeSelected())
                history.push('/checkout')
            else 
                auth.setWarning('Warning: Please select size!')
        }
    }

    const onGoBackHandler = () => {
        history.goBack()
    }

    return (
        <div className="container-product">
            {auth.warning &&
                <div className="alert showAlert">
                    <img className="exclamation"
                        src="/images/exclamation.svg"
                        width="100%"
                        height="100%"
                        alt="exclamationMark"/>
                    <span className="msg">{auth.warning}</span>
                    <div className="close-btn">
                        <img src="/images/close.svg"
                            width="100%"
                            height="100%"
                            alt="closeBtn"
                            onClick={onRemoveWarningHandler}/>
                    </div>
                </div>
            }
            <img onClick={onGoBackHandler}
                className="backArrow"
                src="/images/backArrow.svg"
                width="100%"
                height="100%"
                alt="backArrow"/>
            <div className="photo-div">
                <img src= {requiredProduct.image}
                    width="100%"
                    height="100%"
                    alt="productImage"/>
            </div>
            <div className="model-product">
                {requiredProduct.brand} {requiredProduct.model}
            </div>
            <div className="price-product">
                Rs. {requiredProduct.amount}
            </div>
            <div className="inclusive">
                (Inclusive of all taxes)
            </div>
            <div className="free-delivery">
                <div>
                    Free delivery on orders above 799<br></br>
                    Easy 30 days returns<br></br>
                    This item is not exchangable
                </div>   
            </div>
            <div className="details">
                <div>
                    Product Deatails  :<br></br>
                    warranty: 5 months<br></br>
                    <br></br>
                    Material & care<br></br>
                    Mesh <br></br>
                    Wipe with clean, dry cloth to remove dust<br></br>
                </div>
            </div>
            <div className="sizeOptions">
                Size Chart :
            </div>
            <div className="SizeBar">
                <div>
                    <label>
                        <input type="radio" name="rupesh" id="6" />
                        <span>6</span>
                    </label>
                </div>
                <div>
                    <label>
                        <input type="radio" name="rupesh" id="7"/>
                        <span>7</span>
                    </label>
                </div>
                <div>
                    <label>
                        <input type="radio" name="rupesh" id="8"/>
                        <span>8</span>
                    </label>
                </div>
                <div>
                    <label>
                        <input type="radio" name="rupesh" id="9"/>
                        <span>9</span>
                    </label>
                </div>
                <div>
                    <label>
                        <input type="radio" name="rupesh" id="10"/>
                        <span>10</span>
                    </label>
                </div>
            </div>  
            <div className="addToCart" onClick={addToCartHandler}>
                <img src={isAddedToCart ? "/images/addedToCart.svg" : "/images/addToCart.svg" }
                    width="100%"
                    height="100%"
                    alt="addToCartBtn"/>
            </div> 
            <div className="buyNow" onClick={buyNowHandler}>
                <img src="/images/buyNow.svg"
                    width="100%"
                    height="100%"
                    alt="buyNowBtn"/>
            </div> 
        </div>
    )
}

export default ParticularProduct