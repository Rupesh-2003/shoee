import React from 'react'
import ReactDOM from 'react-dom'

import './Modal.css'
import BackDrop from '../Navigation/BackDrop'

const ModalOverlay = props => {
    const content = (
        <div className={`modal ${props.className}`} style={props.style}>
            <header className={`modal__header ${props.headerClass}`}>
                <h2>{props.header}</h2>
            </header>
            <form onSubmit={
                props.onSubmit ? props.onSubmit : event => event.preventDefault()
            }>
                <content className={`modal__content ${props.contentClass}`}>
                    {props.children}
                </content>
                <footer className={`modal__footer ${props.footerClass}`}>
                    {props.footer}
                </footer>
            </form>
        </div>
    );
    return ReactDOM.createPortal(content, document.getElementById('modal-hook'));
};

const Modal = props => {
    return (
        <React.Fragment>
            {props.show && <BackDrop onClick={props.onCancel}/>}
                <ModalOverlay {...props}/>
        </React.Fragment>
    );
};

export default Modal





