import firebase from 'firebase/app';
import 'firebase/auth';

import boards from '../../components/boards/boards';

const authDiv = $('#auth');
const boardDiv = $('#board');
const logoutButton = $('#navbar-logout-button');
const userBoards = $('#userBoards');
const singleBoardDiv = $('#single-board');

// const boards =
const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // person is logged in
      authDiv.addClass('hide');
      boardDiv.removeClass('hide');
      logoutButton.removeClass('hide');
      boards.buildBoards();
      userBoards.removeClass('hide');
      singleBoardDiv.removeClass('hide');
    } else {
      // person is NOT logged in
      authDiv.removeClass('hide');
      boardDiv.addClass('hide');
      logoutButton.addClass('hide');
      userBoards.addClass('hide');
      singleBoardDiv.addClass('hide');
    }
  });
};

export default { checkLoginStatus, userBoards };
