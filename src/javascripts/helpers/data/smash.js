import boardData from './boardData';
import pinData from './pinsData';

const completelyRemoveBoard = (boardId) => new Promise((resolve, reject) => {
  boardData.deleteBoard(boardId)
    .then(() => {
      // 1.  GET all farmerCows by cowId
      pinData.getPinsByBoardId(boardId).then((boardPins) => {
        // 2.  loop over all farmerCows from step 1 and DELETE each one
        boardPins.forEach((bPin) => {
          pinData.deletePin(bPin.id);
        });
        resolve();
      });
    })
    .catch((err) => reject(err));
});


export default { completelyRemoveBoard };
