import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Card from './Card';
import pen from '../images/pen.svg';
import plus from '../images/plus.svg';

class Main extends React.Component {
    static contextType = CurrentUserContext;

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <main className="content">
                <section className="profile">
                    <div className="profile__avatar-box">
                        <img className="profile__avatar" src={this.context.avatar} alt="Аватар"></img>
                        <button onClick={this.props.onEditAvatar} type="button" className="profile__avatar-btn"><img className="profile__avatar-edit-img"
                            src={pen} alt="Кнопка редактирования"></img></button>
                    </div>
                    <div className="profile__profile-info">
                        <h1 className="profile__name">{`${this.context.name}`}</h1>
                        <p className="profile__about">{this.context.about}</p>
                    </div>
                    <button onClick={this.props.onEditProfile} className="profile__edit-button" type="button"><img className="profile__edit-button-img"
                        src={pen} alt="Кнопка редактирования"></img></button>
                    <button onClick={this.props.onAddPlace} className="profile__add-button" type="button">
                        <img className="profile__add-button-img" src={plus}
                            alt="Кнопка добавления"></img>
                    </button>
                </section>

                <section className="elements">
                    <ul className="elements__list">
                        {this.props.cards.map((card) => (
                            <Card currentCard={card} key={card._id} onCardClick={this.props.onCardClick} onCardLike={this.props.onCardLike} onCardDelete={this.props.onCardDelete}/>
                        ))}
                    </ul>
                </section>
            </main>
        );
    }
}

export default Main;