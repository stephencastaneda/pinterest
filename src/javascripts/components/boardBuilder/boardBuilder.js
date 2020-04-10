const boardComponent = (board) => {
  let domString = '';
  domString += '<div class="col-3 mb-5 mt-3">';
  domString += `<div class="card user-card" id=${board.id}>`;
  domString += `<div class="card-header">${board.name}</div>`;
  domString += '<div class="card-body">';
  domString += `<p class="card-text">Description: ${board.description}</p>`;
  domString += `<button class="btn btn-danger delete-board" id=${board.id}><i class="fas fa-trash"></i></button>`;
  domString += '<button class="btn btn-danger open-pin"><i class="fas fa-hand-pointer"></i></button>';
  domString += '</div>';
  domString += '</div>';
  domString += '</div>';
  return domString;
};

export default { boardComponent };
