import React from 'react'
import ReactDom from 'react-dom'

import './SideDrawer.css'

const SideDrawer = props => {
    const content =
            <aside className={props.show ? "side-drawer showDrawer" : ""} onClick={props.onClick}>{props.children}</aside>
    
    return ReactDom.createPortal(content, document.getElementById('drawer-hook'))
}

export default SideDrawer