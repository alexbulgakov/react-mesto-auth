import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
    const [name, setName] = React.useState("");
    const [link, setLink] = React.useState("");

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleLinkChange(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        props.onAddPlace({ name, link });
    }

    React.useEffect(() => {
        setName('');
        setLink('');
    }, [props.isOpen]);

    return (
        <PopupWithForm
            name="new-card"
            title="Новое место"
            buttonText="Создать"
            isOpen={props.isOpen}
            onClosePopups={props.onClosePopups}
            onSubmit={handleSubmit}
        >
            <label className="popup-form__field">
                <input
                    className="popup-form__item popup-form__item_el_name"
                    type="text"
                    name="name"
                    placeholder="Название"
                    id="name"
                    required
                    minLength="2"
                    maxLength="30"
                    onChange={handleNameChange}
                    value={name}
                >
                </input>
                <span className="popup-form__input-error name-error"></span>
            </label>
            <label className="popup-form__field">
                <input
                    className="popup-form__item popup-form__item_el_link"
                    type="url"
                    name="link"
                    placeholder="Ссылка на картинку"
                    id="link"
                    required
                    onChange={handleLinkChange}
                    value={link}
                >
                </input>
                <span className="popup-form__input-error link-error"></span>
            </label>
        </PopupWithForm>

    );
}

export default AddPlacePopup;