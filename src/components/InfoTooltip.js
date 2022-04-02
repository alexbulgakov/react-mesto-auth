import PopupWithForm from './PopupWithForm';
import successIcon from '../images/infotooltip_success.svg'
import failureIcon from '../images/infotooltip_failure.svg'

function InfoTooltip(props) {
    if (props.failed) {
        return (
            <PopupWithForm
                isOpen={props.isOpen}
                onClose={props.onClose}
                submitted={props.submitted}
                name="popup__form"
            >
                <img src={failureIcon} className="popup__infotool-image" alt="Fail" />
                <h2 className={`form-heading popup__form-heading_centered`}>
                    Что-то пошло не так! Попробуйте ещё раз.
                </h2>
            </PopupWithForm>
        );
    } else {
        return (
            <PopupWithForm
                isOpen={props.isOpen}
                onClose={props.onClose}
                submitted={props.submitted}
                name="popup__form"
            >
                <img src={successIcon} className="popup__infotool-image" alt="Success" />
                <h2 className={`form-heading popup__form-heading_centered`}>
                    Вы успешно зарегистрировались!
                </h2>
            </PopupWithForm>
        );
    }
}

export default InfoTooltip;