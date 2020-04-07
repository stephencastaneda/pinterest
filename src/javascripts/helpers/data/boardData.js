import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

// const getBoards = () => axios.get(`${baseUrl}/boards.json`);

const getBoardsByUid = (myUid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/boards.json?orderBy="uid"&equalTo="${myUid}"`)
    .then((response) => {
      const boardsData = response.data;
      const myBoards = [];
      console.error(boardsData);
      Object.keys(boardsData).forEach((board) => {
        boardsData[board].id = board;
        myBoards.push(boardsData[board]);
      });
      resolve(myBoards);
    })
    .catch((err) => reject(err));
});

const getBoardById = (boardId) => axios.get(`${baseUrl}/boards/${boardId}.json`);

export default { getBoardsByUid, getBoardById };