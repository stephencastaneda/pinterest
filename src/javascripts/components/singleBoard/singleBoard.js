import pinsData from '../../helpers/data/pinsData';
import authData from '../../helpers/data/authData';

import utils from '../../helpers/utils';

const removeBoards = () => {
  authData.userBoards.addClass('hide');
};

const fullPageView = () => {
   console.error("back button clicked")
   authData.userBoards.removeClass('hide');
   $("#single-board").empty();
}

const buildBoards = (e) => {
  const boardId = e.target.closest('.card').id;
  pinsData.getPinsById()
    .then((pins) => {
      let domString = '';
          domString += '<i class="fas fa-times-circle" id="back-button"></i>'
      pins.forEach((pin) => {
        if (pin.boardId === boardId) {
          domString += '<div class="card" style="width: 18rem;">';
          domString += `<img class="card-img-top" src="${pin.imageUrl}" alt="Card image cap">`;
          domString += '<div class="card-body">';
          domString += '</div>';
          domString += '</div>';
        }
          
      });
      utils.printToDom('single-board', domString);
      removeBoards();
      $('#back-button').on('click', fullPageView)

    })
    .catch((err) => console.error('problem with single board', err));
};

export default { buildBoards };
