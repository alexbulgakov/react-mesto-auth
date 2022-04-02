import React from 'react';
import { LoadingContext } from '../contexts/LoadingContext';

function PopupWithForm(props) {

    const loading = React.useContext(LoadingContext);

    return (
        <section className={`popup popup_type_${props.name} ${props.isOpen ? `popup_opened` : ``}`}>
            <div className="popup__container">
                <button onClick={props.onClosePopups} className="popup__close-icon" type="button"></button>
                <form className="popup-form" name={`popup_form_${props.name}`} noValidate onSubmit={props.onSubmit}>
                    <h2 className="popup-form__heading">{props.title}</h2>
                    <fieldset className="popup-form__input-container">
                        {props.children}
                        <button className="popup-form__button" type="submit">{loading ? "Сохранение..." : props.buttonText}</button>
                    </fieldset>
                </form>
            </div>
        </section>
    );
}

export default PopupWithForm;