import firebase from 'firebase/app';
import 'firebase/auth';

import boardData from '../../helpers/data/boardData';
import boardComponent from '../boardBuilder/boardBuilder';
import singlePin from '../singleBoard/singleBoard';
import utils from '../../helpers/utils';
import newBoardComponent from '../newBoard/newBoard';
import editBoard from '../editBoard/editBoard';
import smash from '../../helpers/data/smash';


const editBoardEvent = (e) => {
  e.preventDefault();
  $('#edit-board').removeClass('hide');
  const boardId = e.target.closest('.card').id;
  editBoard.showEditForm(boardId);
};

const closeEditBoardEvent = (e) => {
  e.preventDefault();
  $('#edit-board').addClass('hide');
};

const closeAddBoardEvent = (e) => {
  e.preventDefault();
  $('#new-board').addClass('hide');
};

const modifyBoard = (e) => {
  e.preventDefault();
  const boardId = e.target.closest('.edit-board-form-tag').id;
  const modifiedBoard = {
    name: $('#edit-board-name').val(),
    description: $('#edit-board-description').val(),
    uid: firebase.auth().currentUser.uid,
  };
  boardData.updateBoard(boardId, modifiedBoard)
    .then(() => {
    // eslint-disable-next-line no-use-before-define
      buildBoards();
      utils.printToDom('edit-board', '');
    })
    .catch((err) => console.error('could not update board', err));
};

const makeABoard = (e) => {
  e.preventDefault();
  // make a new cow object
  const newBoard = {
    name: $('#board-name').val(),
    description: $('#board-description').val(),
    uid: firebase.auth().currentUser.uid,
  };
  // save to firebase
  boardData.addBoard(newBoard)
    .then(() => {
      // reprint cows
      // eslint-disable-next-line no-use-before-define
      buildBoards();
      utils.printToDom('new-board', '');
    })
    .catch((err) => console.error('could not add board', err));
};

const openSingleBoard = (e) => {
  const boardId = e.target.closest('.card').id;
  singlePin.buildPins(boardId);
};

const removeBoards = (e) => {
  const selectedBoardId = e.target.closest('.delete-board').id;
  console.error('selectedBoardId', selectedBoardId);
  smash.completelyRemoveBoard(selectedBoardId) // delete all the pins with the same boardId
    .then(() => {
    //  eslint-disable-next-line no-use-before-define
      buildBoards();
    // utils.printToDom('single-board', buildBoards());
    })
    .catch((err) => console.error('cant delete', err));
};

const buildBoards = () => {
  const firebaseUser = firebase.auth().currentUser;
  const myFirebaseUid = firebaseUser.uid;
  boardData.getBoardsByUid(myFirebaseUid)
    .then((boards) => {
      console.error(boards);
      let domString = '';
      domString += '<h2 class="text-center">Boards</h2>';
      domString += '<button class="btn btn-success" id="show-add-board-form"><i class="fas fa-plus"></i></button>';
      domString += '<div class="d-flex flex-wrap">';
      boards.forEach((board) => {
        domString += boardComponent.boardComponent(board);
      });
      domString += '</div>';
      utils.printToDom('userBoards', domString);
      $('body').on('click', '.open-pin', openSingleBoard);
      $('body').on('click', '.delete-board', removeBoards);
      $('body').on('click', '#board-close', closeAddBoardEvent);
      $('#show-add-board-form').click(newBoardComponent.showForm);
    })
    .catch((err) => console.error('problem with getBoardsByUid', err));
};

const boardEvents = () => {
  $('body').on('click', '.delete-pin', singlePin.removePin);
  $('body').on('click', '.edit-board', editBoardEvent);
  $('body').on('click', '#board-modifier', modifyBoard);
  $('body').on('click', '#board-edit-close', closeEditBoardEvent);
  $('body').on('click', '#board-creator', makeABoard);
};

export default { buildBoards, boardEvents };
