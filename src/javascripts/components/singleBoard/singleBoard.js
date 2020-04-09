import pinsData from '../../helpers/data/pinsData';


import utils from '../../helpers/utils';


const userBoards = $('#userBoards');

// co

const closeBoards = () => {
  userBoards.addClass('hide');
};

const fullPageView = () => {
  userBoards.removeClass('hide');
  $('#single-board').empty();
};

const buildBoards = (e) => {
  const boardId = e.target.closest('.card').id;
  console.error(boardId);
  pinsData.getPinsById()
    .then((pins) => {
      let domString = '';
      domString += '<i class="fas fa-times-circle" id="back-button"></i>';
      pins.forEach((pin) => {
        if (pin.boardId === boardId) {
          domString += `<div class="card" id="${pin.id}" style="width: 18rem;">`;
          domString += `<img class="card-img-top" src="${pin.imageUrl}" alt="Card image cap">`;
          domString += `<div class="card-body" id="${pin.boardId}">`;
          domString += `<button class="btn btn-danger delete-pin" id="${pin.id}" ><i class="fas fa-trash"></i></button>`;
          domString += '</div>';
          domString += '</div>';
        }
      });
      utils.printToDom('single-board', domString);
      closeBoards();
      $('#back-button').on('click', fullPageView);
      // $('body').on('click', '.delete-pin', removePin);
    })
    .catch((err) => console.error('problem with single board', err));
};

export default { buildBoards };
