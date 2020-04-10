import utils from '../../helpers/utils';

const showForm = () => {
  let domString = '';
  domString += '<h2>New Board</h2>';
  utils.printToDom('new-board', domString);
};

export default { showForm };
