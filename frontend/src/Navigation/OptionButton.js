import React from 'react'

import './OptionButton.css'
import { NavLink } from 'react-router-dom'

const OptionButton = props => {
    let className = props.className

    return (
        <NavLink to={props.link} exact>
            <button className={className}
                onClick={props.onClick}>
                {props.children}
            </button>
        </NavLink>
    )
}

export default OptionButton