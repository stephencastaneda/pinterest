import pinsData from '../../helpers/data/pinsData';

import utils from '../../helpers/utils';


const userBoards = $('#userBoards');

const buildNewPin = {

};

const removePin = (e) => {
  const pinId = e.target.closest('.pin-card').id;
  console.error(e);
  const boardId = e.target.closest('.single-board').id;
  console.error(boardId);
  // const selectedBoardId = e.target.closest('.delete-pin').id;
  pinsData.deletePin(pinId)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      buildPins(boardId);
    })
    .catch((err) => console.error('cannot delete pin', err));
};

const closeBoards = () => {
  userBoards.addClass('hide');
};

const fullPageView = () => {
  userBoards.removeClass('hide');
  $('#single-board').empty();
};

const buildPins = (boardId) => {
  pinsData.getPinsById()
    .then((pins) => {
      let domString = '';
      domString += `<div class="single-board" id=${boardId}>`;
      domString += '<i class="fas fa-times-circle" id="back-button"></i>';
      domString += '<button class="new-pin">Create New Pin</button>';
      pins.forEach((pin) => {
        if (pin.boardId === boardId) {
          domString += `<div class="card pin-card" id="${pin.id}"style="width: 18rem;">`;
          domString += `<img class="card-img-top" src="${pin.imageUrl}" alt="Card image cap">`;
          domString += '<div class="card-body">';
          domString += `<button class="btn btn-danger delete-pin" id="${pin.id}" ><i class="fas fa-trash"></i></button>`;
          domString += '</div>';
          domString += '</div>';
        }
      });
      domString += '</div>';
      utils.printToDom('single-board', domString);
      closeBoards();
      $('#back-button').on('click', fullPageView);
      $('body').on('click', '.delete-pin', removePin);
      $('.new-pin').on('click', buildNewPin);
      // $('.delete-pin').click(selectedBoard, removePin);
      // $('.delete-pin-button').click(selectedBoard, removePin);
    })
    .catch((err) => console.error('problem with single board', err));
};

// const viewSingleBoard = (e) => {
//   const myUid = firebase.auth().currentUser.uid;
//   boardData.getBoardsByUid(myUid)
//     .then((boards) => {
//       const boardId = e.target.closest('.card').id;
//       const selectedBoard = boards.find((currentBoard) => boardId === currentBoard.id);
//       buildPins(selectedBoard);
//     })
//     .catch((err) => console.error('messed up', err));
// };

export default { buildPins };
