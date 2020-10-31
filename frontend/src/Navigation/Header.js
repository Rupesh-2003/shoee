import React from 'react'

import './Header.css'
const Header = props => {
    return (
        <div>
            <header className="header">{props.children}</header>
        </div>
        
    )
}

export default Header