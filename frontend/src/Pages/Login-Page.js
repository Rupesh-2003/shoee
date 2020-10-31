import React, { useEffect, useReducer, useState, useContext } from 'react'
import { NavLink, useHistory } from 'react-router-dom'

import './Login-Page.css'
import { 
    validate, 
    VALIDATOR_MINLENGTH, 
    VALIDATOR_MOBILE } from '../Navigation/validators'
import ErrorModal from '../Navigation/ErrorModal'
import { AuthContext } from '../contexts/auth-context'
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
    let history = useHistory()

    const auth = useContext(AuthContext)

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
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}//localhost:/login`, {
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

            auth.login()
            auth.setMobile(formState.mobile)
            auth.setName(data.name)

            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/listOfLikedProducts`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        mobile: formState.mobile
                    })
                })
                const data = await response.json()
                if(!response.ok) {
                    throw new Error(data.message)
                }

                let temp = []

                for(let i=0; i<data.likedProducts.length; i++) {
                    let element = data.likedProducts[i]
                    temp.push(PRODUCTS_HOME.find(product => product.productId === element))
                }

                auth.setLiked(temp)
            } catch(err) {
                console.log(err)
            }

            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/listOfCartProducts`, {
                    method: "POST",
                    headers: {
                        'Content-type' : 'application/json'
                    },
                    body: JSON.stringify({
                        mobile: formState.mobile
                    })
                })
                const data = await response.json()
                if(!response.ok) {
                    throw new Error(data.message)
                }
                auth.setCart(data.cartProducts)

            } catch(err) {
                console.log(err)
            }

            history.push("/home")
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
                <text className="store-name">Shoe</text>
            </NavLink>
            <text className="mobil">Mobile No.</text>
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
            <text className="passwor">Password</text>
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