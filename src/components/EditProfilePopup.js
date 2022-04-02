import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function EditProfilePopup(props) {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]);

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm
            name="edit"
            title="Редактировать профиль"
            buttonText="Сохранить"
            isOpen={props.isOpen}
            onClosePopups={props.onClosePopups}
            onSubmit={handleSubmit}
        >
            <label className="popup-form__field">
                <input
                    className="popup-form__item popup-form__item_el_name"
                    type="text"
                    name="name"
                    id="name-input"
                    required
                    minLength="2"
                    maxLength="40"
                    placeholder="Имя"
                    value={name || ''}
                    onChange={handleNameChange} >
                </input>
                <span className="popup-form__input-error name-input-error"></span>
            </label>
            <label className="popup-form__field">
                <input className="popup-form__item popup-form__item_el_about"
                    type="text"
                    name="about"
                    id="about-input"
                    required
                    minLength="2"
                    maxLength="200"
                    placeholder="Профессиональная деятельность"
                    value={description || ''}
                    onChange={handleDescriptionChange}>
                </input>
                <span className="popup-form__input-error about-input-error"></span>
            </label>
        </PopupWithForm>
    );
}

export default EditProfilePopup;