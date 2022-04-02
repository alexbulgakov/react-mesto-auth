import React from 'react';
import { LoadingContext } from '../contexts/LoadingContext';

function ConfirmDeletePopup(props) {
    const loading = React.useContext(LoadingContext);

    return (
        <section className={`popup popup_type_delete ${props.isOpen ? `popup_opened` : ``}`}>
            <div className="popup__container">
                <button
                    className="popup__close-icon"
                    type="button"
                    onClick={props.onClose}
                >
                </button>
                <form className="popup-form"
                    name="popup-form-delete"
                    noValidate
                    onSubmit={props.onCardDelete}
                >
                    <h2 className="popup-form__heading">Вы уверены?</h2>
                    <fieldset className="popup-form__input-container popup-form__input-container_type_delete">
                        <button
                            className="popup-form__button popup-form__button_type_delete"
                            type="submit">{loading ? "Сохранение..." : "Да"}
                        </button>
                    </fieldset>
                </form>
            </div>
        </section>
    );
}

export default ConfirmDeletePopup;