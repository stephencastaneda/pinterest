import utils from '../../helpers/utils';

const showForm = (boardId) => {
  let domString = '';
  domString += '<h2 class="text-center">New Pin</h2>';
  domString += `<form class="col-10 new-pin-form" id=${boardId}>`;
  domString += '<div class="form-group">';
  domString += '<input type="text" class="form-control" id="new-pin-image" placeholder="Paste ImageUrl">';
  domString += '</div>';
  domString += '<div class="modal-footer">';
  domString += '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>';
  domString += '<button type="button" class="btn btn-primary" id="pin-creator-btn">Create Pin</button>';
  domString += '</div>';
  domString += '</form>';
  utils.printToDom('add-pin', domString);
};

export default { showForm };
