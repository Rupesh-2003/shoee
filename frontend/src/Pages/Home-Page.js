import React, { useContext } from 'react'

import './Home-Page.css'
import Navbar from '../Navigation/Navbar'
import OptionBar from '../Navigation/OptionBar'
import ProductsHome from './Products-home'
import { AuthContext } from '../contexts/auth-context'

const HomePage = () => {

    const auth = useContext(AuthContext)

    const onRemoveWarningHandler = () => {
        auth.removeWarning()
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