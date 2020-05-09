import utils from '../../helpers/utils';
import boardData from '../../helpers/data/boardData';

const showEditForm = (boardId) => {
  boardData.getBoardById(boardId)
    .then((resp) => {
      const board = resp.data;
      let domString = '';
      domString += '<h2 class="text-center">Edit Board</h2>';
      domString += `<form class="col-10 offset-1 edit-board-form-tag" id="${boardId}"`;
      domString += '<div class="form-group">';
      domString += '<label for="board-name">Name</label>';
      domString += `<input type="text" class="form-control" id="edit-board-name" placeholder="Places to Visit" value="${board.name}">`;
      domString += '</div>';
      domString += '<div class="form-group">';
      domString += '<label for="board-description">Description</label>';
      domString += `<input type="text" class="form-control" id="edit-board-description" placeholder="All the places to fulfill my wanderlust" value="${board.description}">`;
      domString += '</div>';
      domString += '<button type="submit" class="btn btn-primary" id="board-modifier">Modify Board</button>';
      domString += '<button type="submit" class="btn btn-danger ml-6" id="board-edit-close">Close</button>';
      domString += '</form>';

      utils.printToDom('edit-board', domString);
    })
    .catch((err) => console.error('could not edit board', err));
};

export default { showEditForm };
