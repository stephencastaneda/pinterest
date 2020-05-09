import firebase from 'firebase/app';
import 'firebase/auth';

// eslint-disable-next-line import/no-cycle
import singleBoard from '../../components/boards/boards';
import singleBoardComponent from '../../components/singleBoard/singleBoard';

const authDiv = $('#auth');
const boardDiv = $('#board');
const logoutButton = $('#navbar-logout-button');
const userBoards = $('#userBoards');
const singleBoardDiv = $('#single-board');
const newBoardDiv = $('#new-board');
const newPinDiv = $('#new-pin');
const editBoardDiv = $('#edit-board');
const updatePinsDiv = $('#edit-pins');

// const boards =
const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // person is logged in
      authDiv.addClass('hide');
      boardDiv.removeClass('hide');
      logoutButton.removeClass('hide');
      singleBoard.buildBoards();
      singleBoard.boardEvents();
      userBoards.removeClass('hide');
      singleBoardDiv.removeClass('hide');
      newBoardDiv.removeClass('hide');
      newPinDiv.removeClass('hide');
      editBoardDiv.removeClass('hide');
      updatePinsDiv.removeClass('hide');
      singleBoardComponent.singleBoardClickEvents();
    } else {
      // person is NOT logged in
      authDiv.removeClass('hide');
      boardDiv.addClass('hide');
      logoutButton.addClass('hide');
      userBoards.addClass('hide');
      singleBoardDiv.addClass('hide');
      newBoardDiv.addClass('hide');
      newPinDiv.addClass('hide');
      editBoardDiv.addClass('hide');
    }
  });
};

export default { checkLoginStatus, userBoards };
