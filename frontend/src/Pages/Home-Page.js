import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'

import './Home-Page.css'
import Navbar from '../Navigation/Navbar'
import OptionBar from '../Navigation/OptionBar'
import ProductsHome from './Products-home'
import { AuthContext } from '../contexts/auth-context'

const HomePage = () => {
    let page = useParams().page

    if( page !== 'home' && page !== 'trending' && page !== 'casual' && page !== 'sports') {
        window.location.href = `/home`
    }

    if(JSON.parse(sessionStorage.getItem('isLoggedIn'))) {
        console.log('logged In')
    } else {
        console.log('logged Out')
    }

    const auth = useContext(AuthContext)

    const onRemoveWarningHandler = () => {
        auth.setWarning(false)
    }

    return (
        <React.Fragment>
            <Navbar/>
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
                </div>}
            <div className="discount-banner">
                <img src="./images/discount banner.jpg"
                    width="100%"
                    height="100%"
                    alt="discount-banner"/>
            </div>
            <div className="banner">
                <img src="./images/banner.jpg"
                    width="100%"
                    height="100%"
                    alt="banner"/>
            </div>
            <OptionBar/> 
            <div className="container">
                <ProductsHome/>
            </div>  
        </React.Fragment>
    )
}

export default HomePage