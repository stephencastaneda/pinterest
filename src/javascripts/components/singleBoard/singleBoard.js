import pinsData from '../../helpers/data/pinsData';
import newPinComponent from '../newPin/newPin';

import utils from '../../helpers/utils';
import editPins from '../editPins/editPins';


const userBoards = $('#userBoards');

const updatePinEvent = (e) => {
  e.preventDefault();
  console.log('button clicked');
  const pinId = e.target.closest('.pin-card').id;
  $('#updatePinModal').modal('show');
  editPins.showEditForm(pinId);
};

const addPinEvent = (e) => {
  console.log('button was clizzy');
  e.preventDefault();
  $('#addPinModal').modal('show');
  const { boardId } = e.target.closest('#show-add-pin-form').dataset;
  newPinComponent.showForm(boardId);
};

const createPinEvent = (e) => {
  e.preventDefault();
  // make a new cow object
  const boardId = e.target.closest('.new-pin-form').id;
  console.log(boardId);
  const newPin = {
    imageUrl: $('#new-pin-image').val(),
    boardId,
  };
  // save to firebase
  pinsData.addPin(newPin)
    .then(() => {
      $('#addPinModal').modal('hide');
      // eslint-disable-next-line no-use-before-define
      buildPins(boardId);
      utils.printToDom('new-pin', '');
    })
    .catch((err) => console.error('could not add pin', err));
};


const updatePin = (e) => {
  e.preventDefault();
  const pinId = $('.edit-pins-form-tag').data('id');
  const currentBoardId = $('.edit-pins-form-tag').data('board');
  console.log('duh pinid', pinId);
  const updatedPin = {
    imageUrl: $('#upate-pin-image').val(),
    boardId: $('#pin-board-id-drop-down-btn').val(),
  };
  pinsData.updatePin(pinId, updatedPin).then(() => {
    $('#updatePinModal').modal('hide');
    // eslint-disable-next-line no-use-before-define
    buildPins(currentBoardId);
    console.error('board refreshed', currentBoardId);
  })
    .catch((err) => console.error('could not update pin', err));
};
// const showPinForm = (e) => {
//   e.preventDefault();
//   const { boardId } = e.target.closest('#show-add-pin-form').dataset;
//   // newPins.showPinForm(boardId);
// };

const removePin = (e) => {
  const pinId = e.target.closest('.pin-card').id;
  console.error(e);
  const boardId = e.target.closest('.card-body').id;
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
  // const boardId = e.target.closest('.card-body').id;
  console.error('build pins board id', boardId);
  pinsData.getPinsById()
    .then((pins) => {
      let domString = '';
      domString += '<div class="text-center">';
      domString += '<h2 class="text-center">Pins</h2>';
      domString += '<button class="btn btn-danger text-center"><i class="fas fa-backward" id="back-button"></i></button>';
      domString += `<button data-board-id=${boardId} class="btn btn-success text-center" id="show-add-pin-form"><i class="fas fa-plus"></i></button>`;
      domString += '</div>';
      domString += '<div class="d-flex flex-wrap">';
      pins.forEach((pin) => {
        if (pin.boardId === boardId) {
          domString += `<div class="card pin-card offset-3 row" id="${pin.id}" style="width: 18rem;">`;
          domString += `<img class="card-img-top" src="${pin.imageUrl}" alt="Card image cap">`;
          domString += `<div class="card-body" id="${pin.boardId}">`;
          domString += `<button class="btn btn-danger delete-pin" id="${pin.id}" ><i class="fas fa-trash"></i></button>`;
          domString += '<button class="btn btn-warning edit-pin float-right"><i class="fas fa-pencil-alt"></i></button>';
          domString += '</div>';
          domString += '</div>';
        }
      });
      utils.printToDom('single-board', domString);
      closeBoards();
      $('#back-button').on('click', fullPageView);
      $('.edit-pin').on('click', updatePinEvent);
    })
    .catch((err) => console.error('problem with single board', err));
};

const singleBoardClickEvents = () => {
  $('body').on('click', '.update-pin-btn', updatePin);
  $('body').on('click', '#show-add-pin-form', addPinEvent);
  $('body').on('click', '#pin-creator-btn', createPinEvent);
};

export default {
  buildPins,
  removePin,
  createPinEvent,
  singleBoardClickEvents,
};
