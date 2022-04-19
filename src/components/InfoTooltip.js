import successIcon from '../images/infotooltip_success.svg'
import failureIcon from '../images/infotooltip_failure.svg'

function InfoTooltip({ isOpen, successResult, onClose, successMessage, failMessage }) {
    return (
        <section className={`popup popup_type_info-tooltip ${isOpen && 'popup_opened'}`}>
            <div className="popup__overlay" onClick={onClose}></div>
            <div className="popup__container">
                <button className="popup__close-icon" type="button" onClick={onClose}></button>
                <figure className="popup__img-response">
                    <img alt="" src={successResult ? successIcon : failureIcon} className="popup__response-image" />
                    <p className="popup__response">{successResult ? successMessage : failMessage}</p>
                </figure>
            </div>
        </section>
    );
}

export default InfoTooltip;