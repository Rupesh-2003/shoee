import React,{ useContext, useState } from 'react'
import { NavLink } from 'react-router-dom';

import './ProductItem.css'
import { AuthContext } from '../contexts/auth-context'

const ProductItem = props => {
    const auth = useContext(AuthContext)
    const temp = props.sidebarColor

    const [like, setLike] = useState(props.liked)

    const onLikeHandler = async () => {
        if(JSON.parse(sessionStorage.getItem('isLoggedIn'))) {
            if(like) {
                try {
                    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/removeFromLiked`, {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            mobile: sessionStorage.getItem('mobile'),
                            productId: props.productId
                        })
                    })
                    if(response.ok) {
                        const newLikedList = JSON.parse(sessionStorage.getItem('wishlist')).filter(product => product.productId != props.productId)
                        sessionStorage.setItem('wishlist', JSON.stringify(newLikedList))
                        setLike(false)
                    }   
                }catch(err) {
                    console.log(err)
                }
            }
            else {
                const product = {
                    productId : props.productId,
                    brand : props.brand,
                    model : props.model,
                    amount : props.amount,
                    image : props.image
                }
                try {
                    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/addToLiked`, {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            mobile: sessionStorage.getItem('mobile'),
                            productId: props.productId
                        })
                    })
                    if(response.ok) {
                        const newLikedList = JSON.parse(sessionStorage.getItem('wishlist'))
                        newLikedList.push(product)
                        sessionStorage.setItem('wishlist', JSON.stringify(newLikedList))
                        setLike(true)
                    }
                        
                }catch(err) {
                    console.log(err)
                }
            }
        }
        else {
            if(!auth.warning) {
                auth.setWarning("Warning: Please Login first!")
            }
        }
    }

    return (
        <li className="item">
            <div className="model">
               {props.model}
            </div>
            <div className="brand">
                {props.brand}
            </div>
            <NavLink to={'/product/'+ props.productId } >
                <div className="image">
                    <img src={props.image}
                        width="100%"
                        height="100%"
                        alt="product"/>
                </div>
            </NavLink>
            <div className="price">
                Price :
            </div>
            <div className="amount">
                Rs.{props.amount}
            </div>
            <NavLink to={'/product/'+ props.productId }>
                <button className="arrow">
                    <img src="./images/arrow.svg"
                        width="100%"
                        height="100%"
                        alt="arrow"/>
                </button>
            </NavLink>
            <button className="heart" onClick={onLikeHandler}>
                <img
                    src={` ${like ? "./images/heartLiked2.svg" : "./images/heart.svg"}`}
                    width="100%"
                    height="100%"
                    alt="arrow"/>
            </button>
            <div style={{backgroundColor: temp}} className="sidebar">
            </div>
        </li>
    )
}

export default ProductItem