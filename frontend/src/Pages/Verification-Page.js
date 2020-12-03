import React, { useState, useContext } from 'react'
import { useParams, NavLink, useHistory } from 'react-router-dom'

import './Verification-Page.css'
import ErrorModal from '../Navigation/ErrorModal'
import { AuthContext } from '../contexts/auth-context'

const Verification = () => {
    let history = useHistory()

    const auth = useContext(AuthContext)

    const mobileNumber = useParams().mobile

    const [ error, setError ] = useState()

    const [otp, setOtp] = useState(new Array(4).fill(""))

    const handleChange = (element, index) => {
        setOtp([...otp.map((d, idx) => (idx === index) ? element.value: d)])

        if(element.nextSibling) {
            element.nextSibling.focus()
        }
    }

    const onCancelErrorHandler = () => {
        setError(false)
    }

    const onSubmitHandler = async event => {
        event.preventDefault()

        try{
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/verification`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    mobile: mobileNumber,
                    otp: otp.join('')
                })
            })
            const data = await response.json()
            if(!response.ok) {
                throw new Error(data.message)
            }
            
            // auth.login()
            // auth.setName(data.name)
            // auth.setMobile(mobileNumber)

            sessionStorage.setItem('isLoggedIn', 'true')
            sessionStorage.setItem('name', data.name)
            sessionStorage.setItem('mobile', mobileNumber)
            
            history.push("/home")
        }catch(err) {
            setError(err.message || 'Rupesh')
        }
    }

    return (
        <div>
           <NavLink to="/home">
                <text className="store-name">Shoe</text>
            </NavLink>
           <text className="heading">Verification</text>
            {otp.map((data, index) => {
                return (
                    <input
                        className="otp-field"
                        type="text"
                        name="otp"
                        maxLength="1"
                        key={index}
                        value={data}
                        onChange={ e => handleChange(e.target, index)}
                        onFocus={e => e.target.select()} />
                )
            })}
            <br></br>
            <button 
                className="verify-btn"
                onClick={onSubmitHandler}>Verify</button>
            {error && <ErrorModal error={error} onClear={onCancelErrorHandler}/>}
        </div>
    )
}

export default Verification