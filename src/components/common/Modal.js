import React from 'react'
import './Modal.css';

const Modal = ({ handleClose, show, children, titulo }) => {

    const showHideClassName = show ? "modal displayModal-block" : "modal displayModal-none";
    
    return (
        <div className={showHideClassName}>
            
                
            
            <section className="modal-main">

                <div className='modal-titulo'>
                    {titulo}
                    <button type="button" onClick={handleClose}>
                        Cerrar
                    </button>
                </div>

                

                {children}
                
            </section>
        </div>
    )
}


export default Modal