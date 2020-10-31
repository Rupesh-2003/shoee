import React, { useState, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'

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
        if(!auth.isLoggedIn) {
            history.push('/login')
        }
        else {
            auth.logout()
            closeMenuHandler()
            window.location.href = "http://localhost:3000/home"
        } 
    }

    const onAboutClickHandler = () => {
        history.push('/about')
    }

    const onYourOrdersClickHandler = () => {
        if(auth.isLoggedIn) {
            history.push('/yourOrders')
        }
        closeMenuHandler()
        auth.setWarning('Warning: Please Login first!')
    }

    return (
        <Header>
            <Link to="/home/cart">
                <div className="cart-logo">
                    <img className="cart-image"
                        src='./images/cart.svg' 
                        height="100%"
                        width="100%"
                        alt="cart-logo"/>
                </div>
            </Link>
            <Link to="/home/liked">
                <div className="heart-logo">
                    <img 
                        src='./images/heart.svg'
                        height="100%"
                        width="100%"
                        alt="heart-logo"/>
                </div>
            </Link>
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
                <div className="sideBarName">{auth.isLoggedIn ? auth.name : "Unkown User"}</div>
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
                    <div className="text">{!auth.isLoggedIn ? "SignIn / Login" : "LogOut"}</div>
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