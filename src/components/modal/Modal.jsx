import React from 'react';
import Backdrop from '../backdrop/Backdrop';
import SubmitLoader from '../submitloader/SubmitLoader';
import './modal.scss'


const Modal = (props) => {
    return (

            <div 
                className="Modal"
                style = {{
                    transform:props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' :'0',
                }}
            >
                <Backdrop show={props.show} closeModal={props.clicked} />
                <div className="modaldialog modaldialogcentered" >
                    <div className="modalcontent">
                        <div className="modalheader">
                            <h6 className="crust-dark-blue mb-0">
                                {props.title}
                            </h6>
                        </div>

                        <div className="modalbody">
                            {props.children}
                        </div>

                        <div className="modalfooter">
                            <button type="button" className="button-secondary" onClick={props.clicked}>Close</button>
                            {props.submit&&
                            <button type="submit" className="button-primary ml-10" onClick={props.submit}>
                                {
                                    props.loading ?
                                    <SubmitLoader />
                                    :
                                    props.action

                                }
                            </button>
                            }
                        </div>
                    </div>
                </div>

            </div>
    )
}

export default Modal
