const boardComponent = (board) => {
  let domString = '';
  domString += '<div class="col-3">';
  domString += `<div class="card user-card" id=${board.id}>`;
  domString += `<div class="card-header">${board.name}</div>`;
  domString += '<div class="card-body">';
  domString += `<p class="card-text">Description: ${board.description}</p>`;
  domString += '</div>';
  domString += '</div>';
  domString += '</div>';
  return domString;
};

export default { boardComponent };
