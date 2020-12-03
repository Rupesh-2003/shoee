import React, { useEffect, useReducer, useState } from 'react'
import { NavLink } from 'react-router-dom'

import './Login-Page.css'
import { 
    validate, 
    VALIDATOR_MINLENGTH, 
    VALIDATOR_MOBILE } from '../Navigation/validators'
import ErrorModal from '../Navigation/ErrorModal'
import { PRODUCTS_HOME } from './Products-home'

const reducer = (state, action) => {

    switch(action.type) {
        case 'MOBILE' :
            return {
                ...state,
                mobile : action.mobile,
                isMobileValid : validate(action.mobile, [VALIDATOR_MOBILE()])
            }
        case 'PASSWORD' :
            return {
                ...state,
                password : action.password,
                isPasswordValid : validate(action.password, [VALIDATOR_MINLENGTH(5)])
            }
        case 'SET_FORMSTATE' :
            return {
                ...state,
                isFormValid : action.formState
            }
        default :
            return state
    }
}

const Login = () => {
    const [ error, setError ] = useState(false)

    const [formState, dispatch] = useReducer(reducer, {
        mobile : 0 ,
        isMobileValid : false,
        password : '',
        isPasswordValid : false,
        isFormValid: false,
    })

    const [ isMobileTouched, setMobileTouch ] = useState(false)
    const [ isPassTouched, setPassTouch ] = useState(false)

    const numberHandler = event => {
        dispatch({
            type: 'MOBILE',
            mobile: event.target.value
        })
    }

    const passwordHandler = event => {
        dispatch({
            type: 'PASSWORD',
            password: event.target.value
        })
    }

    const onBlurMobileHandler = () => {
        setMobileTouch(true)
    }

    const onBlurPassHandler = () => {
        setPassTouch(true)
    }

    const onLoginHandler = async event => {
        event.preventDefault()

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/login`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                   mobile: formState.mobile,
                   password: formState.password
                })
            })
            const data = await response.json()
            if(!response.ok) {
                throw new Error(data.message)
            }

            let likeProducts = []
            for(let i=0; i<data.likedProducts.length; i++) {
                let element = data.likedProducts[i]
                likeProducts.push(PRODUCTS_HOME.find(product => product.productId === element))
            }
                
            // auth.login()
            // auth.setMobile(formState.mobile)
            // auth.setName(data.name)
            // auth.setLiked(likeProducts)
            // auth.setCart(data.cartProducts)
            // auth.setYourOrders(data.listOfYourOrders)

            sessionStorage.setItem('isLoggedIn', 'true')
            sessionStorage.setItem('mobile', formState.mobile)
            sessionStorage.setItem('name', data.name)
            sessionStorage.setItem('wishlist', JSON.stringify(likeProducts))
            sessionStorage.setItem('cart', JSON.stringify(data.cartProducts))
            sessionStorage.setItem('yourOrders', JSON.stringify(data.listOfYourOrders))
            // sessionStorage.setItem('warning', 'false')


            //because app.js was not updating isLoggedIn value from sessionStorage
            window.location.href = `/home`

            // history.push("/home")
        } catch(error) {
            setError(error.message)
        }
    }

    const onCancelErrorHandler = () => {
        setError(false)
    }

    useEffect(() => {
        if(formState.isPasswordValid && formState.isMobileValid) {
            dispatch({
                type: 'SET_FORMSTATE',
                formState : true
            })
        }
        else {
            dispatch({
                type: 'SET_FORMSTATE',
                formState : false
            })
        }
    }, [formState.isMobileValid, formState.isPasswordValid])

    return (
        <div>
            <NavLink to="/home">
                <span className="store-name">Shoe</span>
            </NavLink>
            <span className="mobil">Mobile No.</span>
            <input className="mobil-input" 
                type="number"
                onChange={numberHandler}
                onBlur={onBlurMobileHandler}></input>
            {isMobileTouched && <div className="mobil-state">
                {formState.isMobileValid ? (<img src="./images/right.svg"
                    width="100%"
                    height="100%"
                    alt="inputRight"
                    />) :  (<img src="./images/wrong.svg"
                    width="100%"
                    height="100%"
                    alt="inputWrong"
                    />)}
            </div>}
            <span className="passwor">Password</span>
            <input className="passwor-input" 
                type="password"
                onChange={passwordHandler}
                onBlur={onBlurPassHandler}></input>
            {isPassTouched && <div className="passwor-state">
                {formState.isPasswordValid ? (<img src="./images/right.svg"
                    width="100%"
                    height="100%"
                    alt="inputRight"
                    />) : (<img src="./images/wrong.svg"
                    width="100%"
                    height="100%"
                    alt="inputWrong"
                    />)}
            </div>}
            <button className={`${formState.isFormValid ? "submit-btn" : 'submit-btn-disabled'}`}
                disabled={!formState.isFormValid}
                onClick={onLoginHandler}
                >Log In</button>
            <NavLink to="/signup" exact>
            <button className="signup" formAction="/signup">Don't have an account ? Sign Up</button>
            </NavLink>
            {error && <ErrorModal error={error} onClear={onCancelErrorHandler}/>}
        </div>
    )
}

export default Login