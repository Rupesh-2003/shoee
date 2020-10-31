import React, { useEffect, useReducer, useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom'

import './SignUp-Page.css'
import { 
    validate, 
    VALIDATOR_MINLENGTH, 
    VALIDATOR_MOBILE, 
    VALIDATOR_REQUIRE } from '../Navigation/validators'
import ErrorModal from '../Navigation/ErrorModal'

const reducer = (state, action) => {
    switch(action.type) {
        case 'NAME' : 
            return {
                ...state,
                name: action.name,
                isNameValid : validate(action.name, [VALIDATOR_REQUIRE()]),
            }
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

const SignUp = () => {

    const [formState, dispatch] = useReducer(reducer, {
        name: '',
        isNameValid : false,
        mobile : 0 ,
        isMobileValid : false,
        password : '',
        isPasswordValid : false,
        isFormValid: false,
    })

    const [ isNameTouched, setNameTouch ] = useState(false)
    const [ isMobileTouched, setMobileTouch ] = useState(false)
    const [ isPassTouched, setPassTouch ] = useState(false)
    const [ error, setError ] = useState(false)

    let history = useHistory()

    const nameHandler = event => {
        dispatch({
            type: 'NAME',
            name: event.target.value
        })
    }

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

    const onBlurNameHandler = () => {
        setNameTouch(true)
    }

    const onBlurMobileHandler = () => {
        setMobileTouch(true)
    }

    const onBlurPassHandler = () => {
        setPassTouch(true)
    }

    const onCancelErrorHandler = () => {
        setError(false)
    }

    useEffect(() => {
        if(formState.isNameValid && formState.isPasswordValid && formState.isMobileValid) {
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
    }, [formState.isNameValid, formState.isMobileValid, formState.isPasswordValid])

    const onSubmitHandler = async event => {
        event.preventDefault()
        
        try{
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/signup`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: formState.name,
                    mobile: formState.mobile,
                    password: formState.password
                })
            })
            const data = await response.json()
        
            if(!response.ok) {
                setError(data.message)
                return
            }

            history.push(formState.mobile+"/verification")
        }catch(err) {
            console.log(err)
        }

    }

    return (
        <div>
            <NavLink to="/home">
                <div className="store-name">Shoe</div>
            </NavLink>           
            <text className="name">Name</text>
            <input className="name-input" 
                type="text" 
                onChange={nameHandler}
                onBlur={onBlurNameHandler}></input>
            {isNameTouched && <div className="name-state">
                {formState.isNameValid ? (<img src="./images/right.svg"
                    width="100%"
                    height="100%"
                    alt="inputRight"
                    />) : (<img src="./images/wrong.svg"
                    width="100%"
                    height="100%"
                    alt="inputWrong"
                    />)}
            </div>}
            <text className="mobile">Mobile No.</text>
            <input className="mobile-input" 
                type="number" 
                onChange={numberHandler}
                onBlur={onBlurMobileHandler}></input>
            {isMobileTouched && <div className="mobile-state">
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
            <text className="password">Password</text>
            <input className="password-input" 
                type="password" 
                onChange={passwordHandler}
                onBlur={onBlurPassHandler}></input>
            {isPassTouched && <div className="password-state">
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
                onClick={onSubmitHandler}>SignUp</button>
            <NavLink to="/login" exact>
            <button className="login">Have an account ? Log In</button>
            </NavLink>
            {error && <ErrorModal error={error} onClear={onCancelErrorHandler} content="Hello"/>}
        </div>
    )
}

export default SignUp