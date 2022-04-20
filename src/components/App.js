import React, { useState, useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import api from '../utils/api';
import '../index.css';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { defaultUser } from '../utils/utils';
import { LoadingContext } from '../contexts/LoadingContext';
import AddPlacePopup from './AddPlacePopup';
import ConfirmDeletePopup from './ConfirmDeletePopup';
import Login from './Login';
import { Switch, Route, useHistory, Redirect } from 'react-router-dom';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import * as auth from '../auth.js'

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ name: '', link: '' });
  const [currentUser, setCurrentUser] = useState(defaultUser);
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isRegistrationSuccessful, setIsRegistrationSuccessful] = useState();
  const [fail, setFail] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const history = useHistory();

  useEffect(() => {
    tokenCheck();
    if (!loggedIn) {
      return
    }
    api.getUserInfo()
      .then(res => {
        setCurrentUser(res);
      })
      .catch((error) => {
        console.log(error);
      });

    api.getCards()
      .then(res => {
        setCards(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(data) {
    setSelectedCard({ name: data.name, link: data.link });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.likeCard(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleCardDelete(e) {
    e.preventDefault();

    const { id } = selectedCard;
    api.deleteCard(id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== id));
      })
      .catch((error) =>
        console.log(error)
      )
      .finally(() =>
        setLoading(false)
      );
    setIsDeletePopupOpen(false);
  }

  function handleConfirmDelete(id) {
    setIsDeletePopupOpen(!isDeletePopupOpen);
    setSelectedCard({ ...selectedCard, id });
  }

  function handleUpdateUser(info) {
    setLoading(true);

    api.setUserInfo(info)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((error) =>
        console.log(error)
      )
      .finally(() =>
        setLoading(false)
      );
  }

  function handleUpdateAvatar({ avatar }) {
    setLoading(true);

    api.setUserAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((error) =>
        console.log(error)
      )
      .finally(() =>
        setLoading(false)
      );
  }

  function handleAddPlaceSubmit(card) {
    setLoading(true);

    api.addCard(card)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((error) =>
        console.log(error)
      )
      .finally(() =>
        setLoading(false)
      );
  }

  function tokenCheck() {
    const token = localStorage.getItem('token');

    if (token) {
      auth.getContent(token)
        .then((res) => {
          if (res) {
            const userEmail = res.data.email;

            setLoggedIn(true);
            setUserEmail(userEmail);
            history.push('/');
          }
        })
        .catch((err) => console.log(err))
    };
  };

  function handleLogin(email, password) {
    return auth.authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          setLoggedIn(true);
          history.push('/');
        }
      })
      .catch(() => {
        setIsInfoTooltipOpen(true);
        setIsRegistrationSuccessful(false);
      })
  }

  function signOut() {
    localStorage.removeItem('token');
    history.push('./signin');
  }

  function handleRegister(email, password) {
    return auth.register(email, password)
      .then(() => {
        setIsInfoTooltipOpen(true);
        setIsRegistrationSuccessful(true);
        history.push('/signin');
      })
      .catch(() => {
        setIsInfoTooltipOpen(true);
        setIsRegistrationSuccessful(false);
      })
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeletePopupOpen(false);
    setSelectedCard({ name: '', link: '' });
    setIsInfoTooltipOpen(false);
    setFail(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <Header
          userEmail={userEmail}
          signOut={signOut}
        />

        <LoadingContext.Provider value={loading}>
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClosePopups={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClosePopups={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClosePopups={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />

          <ConfirmDeletePopup
            isOpen={isDeletePopupOpen}
            onClose={closeAllPopups}
            onCardDelete={handleCardDelete}
          />
        </LoadingContext.Provider>

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          successResult={isRegistrationSuccessful}
          onClose={closeAllPopups}
          successMessage={'Вы успешно зарегистрировались!'}
          failMessage={'Что-то пошло не так! Попробуйте ещё раз.'}
        />

        <Switch>
          <Route path='/signup'>
            <Register
              handleRegister={handleRegister}
            />
          </Route>

          <Route path='/signin'>
            <Login handleLogin={handleLogin} />
          </Route>

          <ProtectedRoute
            path='/'
            loggedIn={loggedIn}
          >
            <Main
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              onConfirmDelete={handleConfirmDelete}
              cards={cards}
            />
            <Footer />
          </ProtectedRoute>
          <Route>
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
          </Route>
        </Switch>


      </div>

    </CurrentUserContext.Provider>
  );
}

export default App;
