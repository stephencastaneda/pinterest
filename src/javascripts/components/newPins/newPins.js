import utils from '../../helpers/utils';
// import singleBoard from '../singleBoard/singleBoard';

const showPinForm = (boardId) => {
  let domString = '';
  domString += '<h2 class="text-center">New Pin</h2>';
  domString += `<form class="col-10 offset-1 new-pin-form" id=${boardId}>`;
  domString += '<div class="form-group">';
  domString += '<label for="pin-image">Image</label>';
  domString += '<input type="url" class="form-control" id="pin-image" placeholder="Paste Image Url">';
  domString += '</div>';
  domString += '<button type="submit" class="btn btn-primary btn-success" id="pin-creator">Add Pin</button>';
  domString += '</form>';
  utils.printToDom('new-pin', domString);
};

export default { showPinForm };
