import utils from '../../helpers/utils';

const showForm = () => {
  let domString = '';
  domString += '<h2 class="text-center">New Board</h2>';
  domString += '<form class="col-10 offset-1">';
  domString += '<div class="form-group">';
  domString += '<label for="board-name">Name</label>';
  domString += '<input type="text" class="form-control" id="board-name" placeholder="Places to Visit">';
  domString += '</div>';
  domString += '<div class="form-group">';
  domString += '<label for="board-description">Description</label>';
  domString += '<input type="text" class="form-control" id="board-description" placeholder="All the places to fulfill my wanderlust">';
  domString += '</div>';
  domString += '<button type="submit" class="btn btn-primary" id="board-creator">Add Board</button>';
  domString += '</form>';
  utils.printToDom('new-board', domString);
};

export default { showForm };
