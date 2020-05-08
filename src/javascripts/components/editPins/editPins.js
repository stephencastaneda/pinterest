import pinsData from '../../helpers/data/pinsData';
import utils from '../../helpers/utils';

const showEditForm = (pinsId) => {
  pinsData.getPinsById
    .then((resp) => {
      const pins = resp.data;
      console.log('da pins', pins);
      let domString = '';
      domString += '<h2 class="text-center">Edit Personnel</h2>';
      domString += `<form class="col-10 offset-1 edit-personnel-form-tag data.id=${pinsId}">`;
      domString += '<div class="form-group text-center">';
      domString += '<label for="personnel-name">Name</label>';
      domString += '<input type="text" class="form-control" id="edit-personnel-name" placeholder="Personnel Name" value="">';
      domString += '</div>';
      domString += '<div class="form-group text-center">';
      domString += '<label for="personnel-description">Description</label>';
      domString += '<input type="text" class="form-control" id="edit-personnel-description" placeholder="Personnel Description" value="">';
      domString += '</div>';
      domString += '<div class="form-group text-center">';
      domString += '<label for="personnel-image">Personnel Image</label>';
      domString += '<input type="text" class="form-control" id="edit-personnel-image" placeholder="Jumbo-Passenger" value="">';
      domString += '</div>';
      utils.printToDom('edit-pins', domString);
    })
    .catch((err) => console.error('could not edit pin', err));
};


export default { showEditForm };
