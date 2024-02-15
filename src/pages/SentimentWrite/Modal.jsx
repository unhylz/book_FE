import './Modal.scss';

const ModalFrame = ({ _handleModal, children, ...rest }) => {
    return (
        <div className="modal-container">
            <div className="modal-background" onClick={_handleModal} />
            <div className="modal-block" {...rest}>
                <div className="content">
                    {children}
                </div>
            </div>
        </div>
        
    );
};

export default ModalFrame;
