import React, { useContext, useState } from 'react' 
import { NavLink } from "react-router-dom"

import './ProductItemCartPage.css'
import { AuthContext } from '../contexts/auth-context'

const ProductItemCartPage = props => {

    const [size, setSize] = useState(props.size)

    const auth = useContext(AuthContext)

    const temp = props.sidebarColor

    const increaseSizeHandler = async () => {
        if(size<10) {
            const selectedProduct = JSON.parse(sessionStorage.getItem('cart')).find(p => p.productId === props.productId)
            const selectedProductIndex = JSON.parse(sessionStorage.getItem('cart')).findIndex(p => p.productId === props.productId)
                    
            selectedProduct.size = size+1

            const newCartArray = JSON.parse(sessionStorage.getItem('cart')).filter(p => p.productId != props.productId )
            newCartArray.splice(selectedProductIndex, 0, selectedProduct)

            sessionStorage.setItem('cart', JSON.stringify(newCartArray))
            setSize(size+1)
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/changeSize`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        mobile: sessionStorage.getItem('mobile'),
                        productId: props.productId,
                        size: size+1
                    })
                })
                if(!response.ok) {
                    selectedProduct.size = props.size-1
                    newCartArray.splice(selectedProductIndex, 0, selectedProduct)
                    sessionStorage.setItem('cart', JSON.stringify(newCartArray))
                    setSize(size-1)    
                }
            } catch(err) {
                console.log(err)
            }
        }
    }

    const decreaseSizeHandler = async () => {
        if(size>6) {
            const selectedProduct = JSON.parse(sessionStorage.getItem('cart')).find(p => p.productId === props.productId)
            const selectedProductIndex = JSON.parse(sessionStorage.getItem('cart')).findIndex(p => p.productId === props.productId)
                    
            selectedProduct.size = size-1

            const newCartArray = JSON.parse(sessionStorage.getItem('cart')).filter(p => p.productId != props.productId )
            newCartArray.splice(selectedProductIndex, 0, selectedProduct)

            sessionStorage.setItem('cart', JSON.stringify(newCartArray))
            setSize(size-1)
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/changeSize`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        mobile: sessionStorage.getItem('mobile'),
                        productId: props.productId,
                        size: size-1
                    })
                })
                if(!response.ok) {
                    selectedProduct.size = size+1

                    newCartArray.splice(selectedProductIndex, 0, selectedProduct)

                    sessionStorage.setItem('cart', JSON.stringify(newCartArray))
                    setSize(size+1)
                }
            } catch(err) {
                console.log(err)
            }
        }
    }

    const changeSize = async (method) => {
        let cartList = JSON.parse(sessionStorage.getItem('cart'))
        const selectedProduct = cartList.find(p => p.productId === props.productId)
        const selectedProductIndex = cartList.findIndex(p => p.productId === props.productId)
        let newCartList = cartList.filter(p => p.productId != props.productId)
        let tempSize     

        if(method === 'increase') 
            selectedProduct.size = tempSize = size+1
        else
            selectedProduct.size = tempSize = size-1

        newCartList.splice(selectedProductIndex, 0, selectedProduct)
        sessionStorage.setItem('cart', JSON.stringify(newCartList))
        setSize(tempSize)

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/changeSize`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    mobile: sessionStorage.getItem('mobile'),
                    productId: props.productId,
                    size: tempSize
                })
            })
            if(!response.ok) {
                if(method === 'increase') 
                    tempSize = tempSize - 1
                else  
                    tempSize = tempSize + 1

                selectedProduct.size = tempSize
                newCartList.splice(selectedProductIndex, 0, selectedProduct)
                sessionStorage.setItem('cart', JSON.stringify(newCartList))
                setSize(tempSize)    
            }
        } catch(err) {
            console.log(err)
        }
    }

    

    let color
    if(props.color === 1)   
        color = "linear-gradient(75deg, #90e4ee 19%, #87a5cf 58%, #6767bc 89%)"
    else if(props.color === 2) 
        color = "linear-gradient(73deg, #99f140 8%, #4fde6c 61%, #2d952a 91%)"
    else 
        color = "linear-gradient(75deg, #f6ef2d 19%, #efb147 56%, #e96e38 89%)"


    return (
        <li className="liCartPage" 
            style={{backgroundImage: color}}>
            <NavLink to={'/product/'+ props.productId }>
            <div className="imageBox">
               <img className="productImageCart"
                    src={props.image} 
                    width="100%"
                    height="100%"
                    alt="productImage"/>
            </div>
            <div className="brandCartPage">
                {props.brand}
            </div>
            <div className="modelCartPage">
                {props.model}
            </div>
            </NavLink>
            <div style={{backgroundColor: temp}} className="sidebarCarPage">
            </div>
            <div className="priceCartPage">
                Rs. {props.amount}
            </div>
            <div className="sizeTag">
                Size :
            </div>
            <div className="sizeCartPage">
                <button className="decreaseSize" onClick={decreaseSizeHandler}>
                    <img className="minus"
                        src="/images/minus.svg"
                        width="100%"
                        height="100%"
                        alt="minus"/>
                </button>
                <div className="sizeNumber">
                    {size}
                </div>
                <button className="increaseSize" onClick={increaseSizeHandler}>
                    <img className="add"
                        src="/images/add.svg"
                        width="100%"
                        height="100%"
                        alt="minus"/>
                </button>
            </div>
            <img className="dustbin"
                onClick={() => props.onRemoveFromCartHandler(props)}
                src="/images/dustbin.svg"
                width="100%"
                height="100%"
                alt="dustbin"/>
        </li>
    )
}

export default ProductItemCartPage