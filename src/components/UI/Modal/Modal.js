import React from 'react';
import Backdrop from "../Backdrop/Backdrop";
import Button from '../Button/Button';

const Modal = (props) => {
    return (
        <>
            <Backdrop show={props.show}/>
            <div className={'modal fade ' + (props.show ? 'show pr-5 d-block' : 'd-none')}
                 tabIndex="-1"
                 role="dialog"
                 aria-modal="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">{props.title}</h5>
                            <button type="button" className="close" aria-label="Close" onClick={props.onModalClose}>
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>

                        <div className="modal-body">{props.children}</div>

                        <div className="modal-footer">
                            <Button aclass={'btn-secondary'} clicked={props.onModalClose}>Close</Button>
                            {props.onModalAccept ?
                                (<Button aclass={'btn-primary'} clicked={props.onModalAccept}>Save changes</Button>)
                                : null
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Modal;