import boardData from './boardData';


const completelyRemoveBoard = (boardId) => new Promise((resolve, reject) => {
  boardData.deletePin(boardId)
    .then(() => {
      // 1.  GET all farmerCows by cowId
      boardData.getBoardById(boardId).then((boardPins) => {
        // 2.  loop over all farmerCows from step 1 and DELETE each one
        boardPins.forEach((bPin) => {
          boardData.deleteBoardPin(bPin.id);
        });
        resolve();
      });
    })
    .catch((err) => reject(err));
});

export default { completelyRemoveBoard };
