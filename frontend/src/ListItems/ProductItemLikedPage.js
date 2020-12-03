import React from 'react' 
import { NavLink } from "react-router-dom"

import './ProductItemLikedPage.css'

const ProductItemLikedPage = props => {
    const sideBarColor = props.sideBar

    let color
    if(props.color === 1)   
        color = "linear-gradient(75deg, #90e4ee 19%, #87a5cf 58%, #6767bc 89%)"
    else if(props.color === 2) 
        color = "linear-gradient(73deg, #99f140 8%, #4fde6c 61%, #2d952a 91%)"
    else 
        color = "linear-gradient(75deg, #f6ef2d 19%, #efb147 56%, #e96e38 89%)"

    return (
        <li className="itemLiked"
            style={{backgroundImage: color}}>
            <NavLink to={'/product/'+ props.productId }>
            <div className="productImage">
                <img src={props.image}
                    width="100%"
                    height="100%"
                    alt="likeProduct"/>
            </div>
            <div style={{backgroundColor: sideBarColor}} className="sidebarLikedPage" ></div>
            <div className="brandLikedPage">
                {props.brand}
            </div>
            <div className="modelLikedPage">
                {props.model}
            </div>
            </NavLink>
            <div className="priceLikedPage">
                Rs. {props.amount}
            </div>
            <img className="heartLikedPage"
                onClick= {() => props.removeLike(props)}
                src="/images/heartLiked2.svg"
                width="100%"
                height="100%"
                alt="arrow"/>
        </li>
    )
}

export default ProductItemLikedPage