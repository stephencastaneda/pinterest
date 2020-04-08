import pinsData from '../../helpers/data/pinsData';
import authData from '../../helpers/data/authData';

import utils from '../../helpers/utils';

const removePin = (e) => {
  const pinId = e.target.closest('.card').id;
  smashData.completelyRemovePin(pinId)
    .then(() => {
    // eslint-disable-next-line no-use-before-define
      buildBoards();
      utils.printToDom('si ')
    })
    .catch((err) => console.error('could not delete pin', err));
};


const removeBoards = () => {
  authData.userBoards.addClass('hide');
};

const fullPageView = () => {
  authData.userBoards.removeClass('hide');
  $('#single-board').empty();
};

const buildBoards = (e) => {
  const boardId = e.target.closest('.card').id;
  pinsData.getPinsById()
    .then((pins) => {
      let domString = '';
      domString += '<i class="fas fa-times-circle" id="back-button"></i>';
      pins.forEach((pin) => {
        if (pin.boardId === boardId) {
          domString += `<div class="card" id="${pin.id}" style="width: 18rem;">`;
          domString += `<img class="card-img-top" src="${pin.imageUrl}" alt="Card image cap">`;
          domString += '<div class="card-body">';
          domString += '<button class="btn btn-danger delete-pin"><i class="fas fa-trash"></i></button>';
          domString += '</div>';
          domString += '</div>';
        }
      });
      utils.printToDom('single-board', domString);
      removeBoards();
      $('#back-button').on('click', fullPageView);
      $('body').on('click', '.delete-pin', removePin);
    })
    .catch((err) => console.error('problem with single board', err));
};

export default { buildBoards };
