import React from 'react';
import Modal from "../Modal/Modal";

const ConfirmationDialog = props => (
    <Modal show={props.show}
           title={'Are you sure?'}
           onModalClose={props.closeModal}
           onModalAccept={props.acceptModal}
    >
        {props.children}
    </Modal>
);

export default ConfirmationDialog;
