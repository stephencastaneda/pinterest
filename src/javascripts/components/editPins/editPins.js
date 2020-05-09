import utils from '../../helpers/utils';
import pinsData from '../../helpers/data/pinsData';
import boardData from '../../helpers/data/boardData';

const showEditForm = (pinId) => {
  pinsData.getSinglePin(pinId)
    .then((resp) => {
      const pins = resp.data;
      console.log('da pins cuh', pins);
      let domString = '';
      domString += '<h2 class="text-center">Edit Pins</h2>';
      domString += `<form class="col-10 offset-1 edit-pins-form-tag" data-id="${pinId}" data-board="${pins.boardId}">`;
      domString += '<div class="form-group text-center">';
      domString += '<label for="pin-image">Image Url</label>';
      domString += `<input type="text" class="form-control" id="upate-pin-image" placeholder="Image" value="${pins.imageUrl}">`;
      domString += '</div>';
      domString += '<label class="pr-3" for="board name">Board Name:</label>';
      domString += '<select id="pin-board-id-drop-down-btn">';
      boardData.getAllBoards()
        .then((boards) => {
          console.log('duh boards', boards);
          boards.forEach((board) => {
            domString += `<option value=${board.id} ${board.id === pins.boardId ? 'selected' : ''}>${board.name}</option> `;
          });
          domString += '</select>';
          domString += '</div>';
          domString += '<div class="modal-footer">';
          domString += '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>';
          domString += '<button type="button" class="btn btn-primary update-pin-btn">Update Pin</button>';
          domString += '</div>';
          domString += '</form>';
          utils.printToDom('edit-pins', domString);
        })
        .catch((err) => console.error('could not edit pin', err));
    });
};

export default { showEditForm };
