import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
    const avatarRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    }

    return (
        <PopupWithForm
            name="new-avatar"
            title="Обновить аватар"
            buttonText="Сохранить"
            isOpen={props.isOpen}
            onClosePopups={props.onClosePopups}
            onSubmit={handleSubmit}
        >
            <label className="popup-form__field">
                <input
                    className="popup-form__item popup-form__item_avatar_link"
                    type="url"
                    name="link-avatar"
                    placeholder="Ссылка на аватар"
                    id="avatar-link"
                    ref={avatarRef}
                    required></input>
                <span className="popup-form__input-error avatar-link-error"></span>
            </label>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;