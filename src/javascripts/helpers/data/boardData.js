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

const getAllBoards = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/boards.json`)
    .then((response) => {
      const demBoards = response.data;
      const boards = [];
      if (demBoards) {
        Object.keys(demBoards).forEach((boardsId) => {
          demBoards[boardsId].id = boardsId;
          boards.push(demBoards[boardsId]);
        });
      }
      resolve(boards);
    })
    .catch((err) => reject(err));
});
const getBoardById = (boardId) => axios.get(`${baseUrl}/boards/${boardId}.json`);

const deleteBoard = (boardId) => axios.delete(`${baseUrl}/boards/${boardId}.json`);

// const deleteBoardPins = (boardId) => axios.delete(`${baseUrl}`)

const addBoard = (newBoard) => axios.post(`${baseUrl}/boards.json`, newBoard);

const updateBoard = (boardId, modifiedBoard) => axios.put(`${baseUrl}/boards/${boardId}.json`, modifiedBoard);


export default {
  getBoardsByUid,
  getBoardById,
  deleteBoard,
  addBoard,
  updateBoard,
  getAllBoards,
};
