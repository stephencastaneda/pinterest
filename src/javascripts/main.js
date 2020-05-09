import 'bootstrap';

import firebase from 'firebase/app';
import apiKeys from './helpers/apiKeys.json';
// import singleBoard from './components/singleBoard/singleBoard';

import authData from './helpers/data/authData';
import auth from './components/auth/auth';
import myNavbar from './components/myNavbar/myNavbar';

import '../styles/main.scss';

const init = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  authData.checkLoginStatus();
  auth.loginButton();
  myNavbar.logoutEvent();
  $('body').on('mouseenter', '.user-card', (e) => e.target.closest('.card').classList.add('bg-success'));
  // $('body').on('click', '.open-pin', singleBoard.viewSingleBoard);
  // $('body').on('click', '.open-pin', openSingleBoard);
  $('body').on('mouseleave', '.user-card', (e) => e.target.closest('.card').classList.remove('bg-success'));
};

init();
