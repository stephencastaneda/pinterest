import firebase from 'firebase/app';
import 'firebase/auth';

import boardData from '../../helpers/data/boardData';
import boardComponent from '../boardBuilder/boardBuilder';
import singleBoard from '../singleBoard/singleBoard';
import utils from '../../helpers/utils';


const buildBoards = () => {
  const firebaseUser = firebase.auth().currentUser;
  const myFirebaseUid = firebaseUser.uid;
  boardData.getBoardsByUid(myFirebaseUid)
    .then((boards) => {
      console.error(boards);
      let domString = '';
      domString += '<h2 class="text-center">Boards</h2>';
      domString += '<div class="d-flex flex-wrap">';
      boards.forEach((board) => {
        domString += boardComponent.boardComponent(board);
      });
      domString += '</div>';
      utils.printToDom('userBoards', domString);
      $('body').on('click', '.user-card', singleBoard.buildBoards);
    })
    .catch((err) => console.error('problem with getBoardsByUid', err));
};

export default { buildBoards };