import React from 'react';

class ImagePopup extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section className={`popup popup_type_image ${this.props.card.name !== ''  ? `popup_opened` : ''}`}>
                <div className="popup__container-img">
                    <button onClick={this.props.onClose} className="popup__close-icon" type="button"></button>
                    <img className="popup__picture" src={this.props.card.link} alt={this.props.card.name}></img>
                    <p className="popup__location-name">{this.props.card.name}</p>
                </div>
            </section>
        );
    }
}

export default ImagePopup;