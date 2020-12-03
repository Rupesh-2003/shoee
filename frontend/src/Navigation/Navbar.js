import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'

import './Navbar.css'
import Header from './Header'
import SideDrawer from './SideDrawer'
import BackDrop from './BackDrop'
import { AuthContext } from '../contexts/auth-context'

const Navbar = () => {
    const [menu, setMenu] = useState(false)
    const auth = useContext(AuthContext)
    let history = useHistory()

    const openMenuHandler = () => {
        setMenu(true)
    }

    const closeMenuHandler = () => {
        setMenu(false)
    }

    const onAuthClickHandler = () => {
        if(!JSON.parse(sessionStorage.getItem('isLoggedIn'))) {
            history.push('/login')
        }
        else {
            sessionStorage.setItem('isLoggedIn', 'false')
            sessionStorage.removeItem('name')
            sessionStorage.removeItem('mobile')
            sessionStorage.removeItem('wishlist')
            sessionStorage.removeItem('cart')
            sessionStorage.removeItem('yourOrders')
            sessionStorage.removeItem('buy')
            closeMenuHandler()
            window.location.href = `${ process.env.NODE_ENV === "production" ? process.env.REACT_APP_BACKEND_URL : "http://localhost:3000"}/home`
        } 
    }

    const onAboutClickHandler = () => {
        history.push('/about')
    }

    const onYourOrdersClickHandler = () => {
        if(JSON.parse(sessionStorage.getItem('isLoggedIn'))) {
            history.push('/yourOrders')
        }
        closeMenuHandler()
        auth.setWarning('Warning: Please Login first!')
    }

    const onGoToCartHandler = () => {
        if(JSON.parse(sessionStorage.getItem('isLoggedIn'))) {
            history.push("/home/cart")
        }
        else 
            history.push("/signup")
    }

    const onGoToWishlistHandler = () => {
        if(JSON.parse(sessionStorage.getItem('isLoggedIn'))) {
            history.push("/home/liked")
        }
        else 
            history.push("/signup")
    }

    return (
        <Header>
                <div className="cart-logo"
                    onClick={onGoToCartHandler}>
                    <img className="cart-image"
                        src='./images/cart.svg' 
                        height="100%"
                        width="100%"
                        alt="cart-logo"/>
                </div>    
                <div className="heart-logo"
                    onClick={onGoToWishlistHandler}>
                    <img 
                        src='./images/heart.svg'
                        height="100%"
                        width="100%"
                        alt="heart-logo"/>
                </div>
            <button className="menu-logo" onClick={openMenuHandler}>
                <img 
                    src='./images/menu.png'
                    height="100%"
                    width="100%"
                    alt="menu-logo"/>
            </button>
            { menu && <SideDrawer show={menu}>
                <img className="temp" 
                    onClick={closeMenuHandler}
                    src="./images/backArrow2.svg"
                    alt="arrow"/>
                <img className="profilePhoto"
                    src="images/profile.png"
                    alt="profilePhoto">
                </img>
                <div className="halfCirlce"></div>
                <div className="sideBarName">{JSON.parse(sessionStorage.getItem('isLoggedIn')) ? sessionStorage.getItem('name') : "Unkown User"}</div>
                <div className="yourOrders" onClick={onYourOrdersClickHandler}>
                    <img className="icon"
                        src="images/list.svg"
                        alt="yourOrdersIcon"/>
                    <div className="text">Your Orders</div>
                </div>
                <div className="auth" onClick={onAuthClickHandler}>
                    <img className="icon"
                        src="images/signIn.svg"
                        alt="authIcon"/>
                    <div className="text">{!JSON.parse(sessionStorage.getItem('isLoggedIn')) ? "SignIn / Login" : "LogOut"}</div>
                </div>
                <div className="about" onClick={onAboutClickHandler}>
                    <img className="icon"
                        src="images/about.svg"
                        alt="about"/>
                    <div className="text">About</div>
                </div> 
                <div className="copyright">
                    <img className="copyrightIcon"
                        src="images/copyright.svg"
                        alt="aboutIcon"/>
                    <div className="copyrightText">2020 Shoe.</div>
                </div> 
            </SideDrawer>}
            {menu && <BackDrop onClick={closeMenuHandler}/>}
        </Header>
    )
}

export default Navbar