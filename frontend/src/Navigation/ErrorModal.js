import React from 'react';
import Modal from './Modal';

import './ErrorModal.css'

const ErrorModal = props => {
  return (
    <Modal
      onCancel={props.onClear}
      // content={props.content}
      header="Error!"
      show={!!props.error}
      footer={<button className="btn" onClick={props.onClear}>Okay!</button>}
    >
      <p className="content">{props.error}</p>
    </Modal>
  );
};

export default ErrorModal;
