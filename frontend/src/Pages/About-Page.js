import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import './About-Page.css'

const AboutPage = () => {
    let history = useHistory()
    const [like, setLike] = useState(false)

    const onGoHomeHandler = () => {
        history.goBack()
    }

    const onLikeHandler = () => {
        setLike(!like)
    }

    return (
        <div className="abc">
            <img onClick={onGoHomeHandler} className="homeIcon"
                src="images/home.svg"
                width="100%"
                height="100%"
                alt="homeIcon"/>
            <div onClick={onGoHomeHandler} className="homeText">Home</div>
            <div className="homeBar"></div>
            <img className="photo"
                src="images/rupesh.jpg"
                alt="developerPhoto"/>
            <div className="developerName">Rupesh Raut</div>
            <img className="age1"
                src="images/age.svg"
                alt="age"/>
            <img className="qualification"
                src="images/qualification.svg"
                alt="qualification"/>
            <div className="sampleProduct">
                <div className="sampleProductModel">Air-Max</div>
                <div className="sampleProductBrand">Nike</div>
                <div className="sampleProductSideBar"></div>
                <img className="sampleProductImage"
                    src="images/NikeAirMax.png"
                    alt="productImage"/>
                <div className="sampleProductPriceText">Price : </div>
                <div className="sampleProductPrice">Rs. 1999</div>
                <img onClick={onLikeHandler} className="sampleProductLike"
                    src={like ? "images/heartLiked2.svg" : "images/heart.svg"}
                    alt="likedHeart"/>
                    <img className="sampleProductArrow"
                        src="images/arrow.svg"
                        alt="nextArrow"/>
            </div>
            <div className="siteInfo">
                Shoe is a 
                underdevelopment <br/>
                E-commerce webApp. 
                Only for personal use.
            </div>
            <img className="techStackUsed"
                src="images/techStack.svg"
                alt="techStackUsed"/>
            <div className="contact">
                <div className="contactMe">Contact</div>
                <div className="location">
                    <img className="locationIcon"
                        src="images/location.svg"
                        alt="locationIcon"/>
                        Mumbai, India
                </div>
                <a href="https://github.com/Rupesh-2003">
                    <img className="gitHubIcon"
                        src="images/gitHub.png"
                        alt="githubIcon"/>
                </a>
                <a href="https://www.hackerrank.com/rupeshraut99396">
                    <img className="hackerrankIcon"
                        src="images/hackerrank.svg"
                        alt="hackerrankIcon"/>
                </a>
                <a href="https://www.instagram.com/rupeshraut2003">
                    <img className="instagramIcon"
                        src="images/instagram.svg"
                        alt="instagramIcon"/>
                </a>        
            </div>
        </div>
    )
}

export default AboutPage